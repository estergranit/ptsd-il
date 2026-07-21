import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { ArticlesService } from '../articles/articles.service.ts';
import { QueryArticleSchema, type QueryArticleDto } from '../articles/dto/query-article.dto.ts';
import { CreateArticleSchema, type CreateArticleDto } from '../articles/dto/create-article.dto.ts';
import { UpdateArticleSchema, type UpdateArticleDto } from '../articles/dto/update-article.dto.ts';

@Controller('admin/articles')
export class AdminArticlesController {
  public constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public findAll(@Query(new ZodValidationPipe(QueryArticleSchema)) query: QueryArticleDto) {
    return this.articlesService.findAll(query);
  }

  @Get(':id')
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Post()
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  @UsePipes(new ZodValidationPipe(CreateArticleSchema))
  public create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto);
  }

  @Patch(':id')
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateArticleSchema)) dto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, dto);
  }

  @Delete(':id')
  @AllowedRoles([UserRoles.ADMIN])
  public remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
