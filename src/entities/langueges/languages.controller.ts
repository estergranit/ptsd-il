import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service.ts';
import { Public } from '../../utilities/decorators.ts';

@Controller('languages')
export class LanguagesController {
  public constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @Public()
  public findAll() {
    return this.languagesService.findAll();
  }
}
