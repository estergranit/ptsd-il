import { Controller, Get, Param } from '@nestjs/common';
import { CommunitiesService } from './communities.service.ts';
import { Public } from '../../utilities/decorators.ts';

@Controller('communities')
export class CommunitiesController {
  public constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  @Public()
  public findAll() {
    return this.communitiesService.findAll();
  }

  @Get(':id')
  @Public()
  public findOne(@Param('id') id: string) {
    return this.communitiesService.findOne(id);
  }
}
