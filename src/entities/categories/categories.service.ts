import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Category } from './category.entity.ts';

@Injectable()
export class CategoriesService {
  public constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  public findAll(parentId?: string): Promise<Category[]> {
    return this.categoriesRepo.find({
      where: parentId ? { parentId } : { parentId: IsNull() },
      relations: { children: true },
      order: { sortOrder: 'ASC' },
    });
  }

  public async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepo.findOne({
      where: { id },
      relations: { children: true, parent: true },
    });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  public save(category: Partial<Category>): Promise<Category> {
    return this.categoriesRepo.save(category);
  }

  public async remove(id: string): Promise<void> {
    await this.categoriesRepo.delete(id);
  }
}
