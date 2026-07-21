import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AgeGroup } from './age-group.entity.ts';

@Injectable()
export class AgeGroupsService {
  public constructor(
    @InjectRepository(AgeGroup)
    private readonly ageGroupsRepo: Repository<AgeGroup>,
  ) {}

  public findAll(): Promise<AgeGroup[]> {
    return this.ageGroupsRepo.find({ order: { min: 'ASC' } });
  }

  public async findOne(id: string): Promise<AgeGroup> {
    const group = await this.ageGroupsRepo.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException();
    }
    return group;
  }

  public save(data: Partial<AgeGroup>): Promise<AgeGroup> {
    return this.ageGroupsRepo.save(data);
  }

  public async remove(id: string): Promise<void> {
    await this.ageGroupsRepo.delete(id);
  }
}
