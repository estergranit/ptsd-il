import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Community } from './community.entity.ts';
import { Audience } from '../audiences/audiences.entity.ts';
import type { QueryCommunityDto } from './dto/community.dto.ts';

@Injectable()
export class CommunitiesService {
  public constructor(
    @InjectRepository(Community) private readonly communitiesRepo: Repository<Community>,
    @InjectRepository(Audience) private readonly audiencesRepo: Repository<Audience>,
  ) {}

  public findAll(query: QueryCommunityDto = {}): Promise<Community[]> {
    const { langId, audienceId, audienceSlug } = query;

    const qb = this.communitiesRepo
      .createQueryBuilder('community')
      .leftJoinAndSelect('community.targetAudiences', 'audience')
      .where('community.isActive = true');

    if (langId) {
      qb.andWhere('community.langId = :langId', { langId });
    }
    if (audienceId) {
      qb.andWhere('audience.id = :audienceId', { audienceId });
    }
    if (audienceSlug) {
      qb.andWhere('audience.slug = :audienceSlug', { audienceSlug });
    }

    return qb.orderBy('community.name', 'ASC').getMany();
  }

  public async findOne(id: string): Promise<Community> {
    const community = await this.communitiesRepo.findOne({
      where: { id },
      relations: { targetAudiences: true },
    });
    if (!community) {
      throw new NotFoundException();
    }
    return community;
  }

  public findByGroupId(groupId: string): Promise<Community[]> {
    return this.communitiesRepo.find({
      where: { groupId },
      relations: { targetAudiences: true },
      order: { langId: 'ASC' },
    });
  }

  public async save(data: Partial<Community> & { audienceIds?: string[] }): Promise<Community> {
    const { audienceIds, ...rest } = data;
    const community = this.communitiesRepo.create(rest);

    if (!community.id && !community.groupId) {
      community.groupId = randomUUID();
    }

    if (audienceIds?.length) {
      community.targetAudiences = await this.audiencesRepo.findBy({ id: In(audienceIds) });
    }

    return await this.communitiesRepo.save(community);
  }

  public async remove(id: string): Promise<void> {
    await this.communitiesRepo.delete(id);
  }
}
