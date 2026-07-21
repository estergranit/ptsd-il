import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audience } from './audiences.entity.ts';

@Injectable()
export class AudiencesService {
  public constructor(
    @InjectRepository(Audience)
    private readonly audiencesRepo: Repository<Audience>,
  ) {}

  public findAll(): Promise<Audience[]> {
    return this.audiencesRepo.find({ order: { name: 'ASC' } });
  }

  public async findOne(id: string): Promise<Audience> {
    const audience = await this.audiencesRepo.findOne({ where: { id } });
    if (!audience) {
      throw new NotFoundException();
    }
    return audience;
  }

  public save(data: Partial<Audience>): Promise<Audience> {
    return this.audiencesRepo.save(data);
  }

  public async remove(id: string): Promise<void> {
    await this.audiencesRepo.delete(id);
  }
}
