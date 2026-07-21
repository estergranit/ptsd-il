import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service.ts';
import { Public } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { QueryArticleSchema, type QueryArticleDto } from './dto/query-article.dto.ts';

@Controller('articles')
export class ArticlesController {
  public constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @Public()
  public findPublished(@Query(new ZodValidationPipe(QueryArticleSchema)) query: QueryArticleDto) {
    return this.articlesService.findPublished(query);
  }

  @Get(':id')
  @Public()
  public findOnePublished(@Param('id') id: string) {
    return this.articlesService.findOnePublished(id);
  }
}
