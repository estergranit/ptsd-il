import { Controller, Get } from '@nestjs/common';
import { Public } from '../utilities/decorators.ts';

@Controller()
export class HealthController {
  @Public()
  @Get('alive')
  public alive() {
    return { status: 'ok' };
  }

  @Public()
  @Get('ready')
  public ready() {
    return { status: 'ok' };
  }
}
