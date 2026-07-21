import { Controller, Get } from '@nestjs/common';
import { AudiencesService } from './audiences.service.ts';
import { Public } from '../../utilities/decorators.ts';

@Controller('audiences')
export class AudiencesController {
  public constructor(private readonly audiencesService: AudiencesService) {}

  @Get()
  @Public()
  public findAll() {
    return this.audiencesService.findAll();
  }
}
