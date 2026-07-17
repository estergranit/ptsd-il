import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AgeGroup } from './age-group.entity.ts';

@Injectable()
export class AgeGroupsService {
  constructor(
    @InjectRepository(AgeGroup)
    private readonly ageGroupsRepo: Repository<AgeGroup>,
  ) {}

  findAll(): Promise<AgeGroup[]> {
    return this.ageGroupsRepo.find({ order: { min: 'ASC' } });
  }

  async findOne(id: string): Promise<AgeGroup> {
    const group = await this.ageGroupsRepo.findOne({ where: { id } });
    if (!group) throw new NotFoundException();
    return group;
  }

  save(data: Partial<AgeGroup>): Promise<AgeGroup> {
    return this.ageGroupsRepo.save(data);
  }

  async remove(id: string): Promise<void> {
    await this.ageGroupsRepo.delete(id);
  }
}
