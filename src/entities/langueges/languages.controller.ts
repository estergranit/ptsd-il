import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { LanguagesService } from './languages.service.ts';
import { AllowedRoles, Public } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import type { CreateLanguageDto, UpdateLanguageDto } from './dto/language.dto.ts';
import { CreateLanguageSchema, UpdateLanguageSchema } from './dto/language.dto.ts';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @Public()
  findAll() {
    return this.languagesService.findAll();
  }

  @Post()
  @AllowedRoles([UserRoles.ADMIN])
  create(
    @Body(new ZodValidationPipe(CreateLanguageSchema)) body: CreateLanguageDto,
  ) {
    return this.languagesService.save(body);
  }

  @Put(':id')
  @AllowedRoles([UserRoles.ADMIN])
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateLanguageSchema)) body: UpdateLanguageDto,
  ) {
    return this.languagesService.save({ ...body, id });
  }

  @Delete(':id')
  @AllowedRoles([UserRoles.ADMIN])
  remove(@Param('id') id: string) {
    return this.languagesService.remove(id);
  }
}
