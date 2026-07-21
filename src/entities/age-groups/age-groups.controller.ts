import { Controller, Get } from '@nestjs/common';
import { Public } from '../../utilities/decorators.ts';
import { AgeGroupsService } from './age-groups.service.ts';

@Controller('age-groups')
export class AgeGroupsController {
  public constructor(private readonly ageGroupsService: AgeGroupsService) {}

  @Get()
  @Public()
  public findAll() {
    return this.ageGroupsService.findAll();
  }
}
