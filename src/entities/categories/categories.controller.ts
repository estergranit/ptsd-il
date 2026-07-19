import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service.ts';
import { Public } from '../../utilities/decorators.ts';

@Controller('categories')
export class CategoriesController {
  public constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Public()
  public findAll(@Query('parentId') parentId?: string) {
    return this.categoriesService.findAll(parentId);
  }

  @Get(':id')
  @Public()
  public findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }
}
