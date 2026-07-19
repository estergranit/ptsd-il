import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles.entity.ts';
import { ArticlesService } from './articles.service.ts';
import { ArticlesController } from './articles.controller.ts';
import { AgeGroup } from '../age-groups/age-group.entity.ts';
import { Audience } from '../audiences/audiences.entity.ts';
import { Category } from '../categories/category.entity.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category, Audience, AgeGroup])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
