import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Community } from './community.entity.ts';
import { Audience } from '../audiences/audiences.entity.ts';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community) private readonly communitiesRepo: Repository<Community>,
    @InjectRepository(Audience) private readonly audiencesRepo: Repository<Audience>,
  ) {}

  findAll(): Promise<Community[]> {
    return this.communitiesRepo.find({
      where: { isActive: true },
      relations: { targetAudiences: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Community> {
    const community = await this.communitiesRepo.findOne({
      where: { id },
      relations: { targetAudiences: true },
    });
    if (!community) throw new NotFoundException();
    return community;
  }

  async save(data: Partial<Community> & { audienceIds?: string[] }): Promise<Community> {
    const { audienceIds, ...rest } = data;
    const community = this.communitiesRepo.create(rest);

    if (audienceIds?.length)
      community.targetAudiences = await this.audiencesRepo.findBy({ id: In(audienceIds) });

    return this.communitiesRepo.save(community);
  }

  async remove(id: string): Promise<void> {
    await this.communitiesRepo.delete(id);
  }
}
