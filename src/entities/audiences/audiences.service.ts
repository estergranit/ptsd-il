import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audience } from './audiences.entity.ts';

@Injectable()
export class AudiencesService {
  constructor(
    @InjectRepository(Audience)
    private readonly audiencesRepo: Repository<Audience>,
  ) {}

  findAll(): Promise<Audience[]> {
    return this.audiencesRepo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<Audience> {
    const audience = await this.audiencesRepo.findOne({ where: { id } });
    if (!audience) throw new NotFoundException();
    return audience;
  }

  save(data: Partial<Audience>): Promise<Audience> {
    return this.audiencesRepo.save(data);
  }

  async remove(id: string): Promise<void> {
    await this.audiencesRepo.delete(id);
  }
}
