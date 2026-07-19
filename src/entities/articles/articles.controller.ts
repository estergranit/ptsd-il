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
import { ArticlesService } from './articles.service.ts';
import { Public, AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { QueryArticleSchema, type QueryArticleDto } from './dto/query-article.dto.ts';
import { CreateArticleSchema, type CreateArticleDto } from './dto/create-article.dto.ts';
import { UpdateArticleSchema, type UpdateArticleDto } from './dto/update-article.dto.ts';

@Controller('articles')
export class ArticlesController {
  public constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @Public()
  public findPublished(@Query(new ZodValidationPipe(QueryArticleSchema)) query: QueryArticleDto) {
    return this.articlesService.findPublished(query);
  }

  @Get('admin')
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
