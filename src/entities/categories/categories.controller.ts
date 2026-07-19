import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { CategoriesService } from './categories.service.ts';
import { Public, AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { CreateCategorySchema, type CreateCategoryDto, UpdateCategorySchema, type UpdateCategoryDto } from './dto/category.dto.ts';

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

  @Post()
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public create(
    @Body(new ZodValidationPipe(CreateCategorySchema)) body: CreateCategoryDto,
  ) {
    return this.categoriesService.save(body);
  }

  @Put(':id')
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateCategorySchema)) body: UpdateCategoryDto,
  ) {
    return this.categoriesService.save({ ...body, id });
  }

  @Delete(':id')
  @AllowedRoles([UserRoles.ADMIN])
  public remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
