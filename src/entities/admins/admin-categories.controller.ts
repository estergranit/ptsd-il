import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { CategoriesService } from '../categories/categories.service.ts';
import { CreateCategorySchema, type CreateCategoryDto, UpdateCategorySchema, type UpdateCategoryDto } from '../categories/dto/category.dto.ts';

@Controller('admin/categories')
export class AdminCategoriesController {
  public constructor(private readonly categoriesService: CategoriesService) {}

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
