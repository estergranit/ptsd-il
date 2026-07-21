import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './language.entity.ts';

@Injectable()
export class LanguagesService {
  public constructor(
    @InjectRepository(Language)
    private readonly languagesRepo: Repository<Language>,
  ) {}

  public findAll(): Promise<Language[]> {
    return this.languagesRepo.find({ where: { isActive: true }, order: { id: 'ASC' } });
  }

  public async findOne(id: string): Promise<Language> {
    const lang = await this.languagesRepo.findOne({ where: { id } });
    if (!lang){
      throw new NotFoundException();
    }
    return lang;
  }

  public save(lang: Partial<Language>): Promise<Language> {
    return this.languagesRepo.save(lang);
  }

  public async remove(id: string): Promise<void> {
    await this.languagesRepo.delete(id);
  }
}
