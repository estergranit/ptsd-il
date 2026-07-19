import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { LanguagesService } from '../langueges/languages.service.ts';
import { CreateLanguageSchema, UpdateLanguageSchema, type CreateLanguageDto, type UpdateLanguageDto } from '../langueges/dto/language.dto.ts';

@Controller('admin/languages')
export class AdminLanguagesController {
  public constructor(private readonly languagesService: LanguagesService) {}

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
