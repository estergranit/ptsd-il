import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommunitiesService } from './communities.service.ts';
import { Public } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { QueryCommunitySchema, type QueryCommunityDto } from './dto/community.dto.ts';

@Controller('communities')
export class CommunitiesController {
  public constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  @Public()
  public findAll(@Query(new ZodValidationPipe(QueryCommunitySchema)) query: QueryCommunityDto) {
    return this.communitiesService.findAll(query);
  }

  @Get(':id')
  @Public()
  public findOne(@Param('id') id: string) {
    return this.communitiesService.findOne(id);
  }
}
