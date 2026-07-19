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
import { CreateLanguageSchema, UpdateLanguageSchema, type CreateLanguageDto, type UpdateLanguageDto } from './dto/language.dto.ts';

@Controller('languages')
export class LanguagesController {
  public constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @Public()
  public findAll() {
    return this.languagesService.findAll();
  }

  @Post()
  @AllowedRoles([UserRoles.ADMIN])
  public create(
    @Body(new ZodValidationPipe(CreateLanguageSchema)) body: CreateLanguageDto,
  ) {
    return this.languagesService.save(body);
  }

  @Put(':id')
  @AllowedRoles([UserRoles.ADMIN])
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateLanguageSchema)) body: UpdateLanguageDto,
  ) {
    return this.languagesService.save({ ...body, id });
  }

  @Delete(':id')
  @AllowedRoles([UserRoles.ADMIN])
  public remove(@Param('id') id: string) {
    return this.languagesService.remove(id);
  }
}
