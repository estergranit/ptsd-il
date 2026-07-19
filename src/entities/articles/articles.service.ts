import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { In, Repository } from 'typeorm';
import { Article } from './articles.entity.ts';
import { AgeGroup } from '../age-groups/age-group.entity.ts';
import { Audience } from '../audiences/audiences.entity.ts';
import { Category } from '../categories/category.entity.ts';
import type { QueryArticleDto } from './dto/query-article.dto.ts';
import type { CreateArticleDto } from './dto/create-article.dto.ts';
import type { UpdateArticleDto } from './dto/update-article.dto.ts';

@Injectable()
export class ArticlesService {
  public constructor(
    @InjectRepository(Article) private readonly articlesRepo: Repository<Article>,
    @InjectRepository(Category) private readonly categoriesRepo: Repository<Category>,
    @InjectRepository(Audience) private readonly audiencesRepo: Repository<Audience>,
    @InjectRepository(AgeGroup) private readonly ageGroupsRepo: Repository<AgeGroup>,
  ) {}

  public async findPublished(query: QueryArticleDto): Promise<Article[]> {
    const { langId, categoryId, audienceId, ageGroupId } = query;

    const qb = this.articlesRepo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.categories', 'category')
      .leftJoinAndSelect('article.audiences', 'audience')
      .leftJoinAndSelect('article.ageGroups', 'ageGroup')
      .where('article.isPublished = true');

    if (langId) {
      qb.andWhere('article.langId = :langId', { langId });
    }
    if (categoryId) {
      qb.andWhere('category.id = :categoryId', { categoryId });
    }
    if (audienceId) {
      qb.andWhere('audience.id = :audienceId', { audienceId });
    }
    if (ageGroupId) {
      qb.andWhere('ageGroup.id = :ageGroupId', { ageGroupId });
    }

    return await qb.orderBy('article.sortOrder', 'ASC').addOrderBy('article.createdAt', 'DESC').getMany();
  }

  public findAll(query: QueryArticleDto): Promise<Article[]> {
    const { langId, categoryId } = query;
    return this.articlesRepo.find({
      where: {
        ...(langId && { langId }),
        ...(categoryId && { categories: { id: categoryId } }),
      },
      relations: { categories: true, audiences: true, ageGroups: true },
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  public findByGroupId(groupId: string): Promise<Article[]> {
    return this.articlesRepo.find({
      where: { groupId },
      relations: { categories: true, audiences: true, ageGroups: true },
    });
  }

  public async findOne(id: string): Promise<Article> {
    const article = await this.articlesRepo.findOne({
      where: { id },
      relations: { categories: true, audiences: true, ageGroups: true, author: true },
    });
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  public async create(dto: CreateArticleDto): Promise<Article> {
    const { categoryIds, audienceIds, ageGroupIds, groupId, ...rest } = dto;

    const article = this.articlesRepo.create({ ...rest, groupId: groupId ?? randomUUID() });

    if (categoryIds?.length) {
      article.categories = await this.categoriesRepo.findBy({ id: In(categoryIds) });
    }
    if (audienceIds?.length) {
      article.audiences = await this.audiencesRepo.findBy({ id: In(audienceIds) });
    }
    if (ageGroupIds?.length) {
      article.ageGroups = await this.ageGroupsRepo.findBy({ id: In(ageGroupIds) });
    }

    return await this.articlesRepo.save(article);
  }

  public async update(id: string, dto: UpdateArticleDto): Promise<Article> {
    const { categoryIds, audienceIds, ageGroupIds, ...rest } = dto;
    const article = await this.findOne(id);

    Object.assign(article, rest);

    if (categoryIds) {
      article.categories = await this.categoriesRepo.findBy({ id: In(categoryIds) });
    }
    if (audienceIds) {
      article.audiences = await this.audiencesRepo.findBy({ id: In(audienceIds) });
    }
    if (ageGroupIds) {
      article.ageGroups = await this.ageGroupsRepo.findBy({ id: In(ageGroupIds) });
    }

    return await this.articlesRepo.save(article);
  }

  public async remove(id: string): Promise<void> {
    await this.articlesRepo.delete(id);
  }
}
