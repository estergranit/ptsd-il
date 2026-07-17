import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { AudiencesService } from './audiences.service.ts';
import { Public, AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { CreateAudienceSchema, UpdateAudienceSchema } from './dto/audience.dto.ts';
import type { CreateAudienceDto, UpdateAudienceDto } from './dto/audience.dto.ts';

@Controller('audiences')
export class AudiencesController {
  constructor(private readonly audiencesService: AudiencesService) {}

  @Get()
  @Public()
  findAll() {
    return this.audiencesService.findAll();
  }

  @Post()
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  create(@Body(new ZodValidationPipe(CreateAudienceSchema)) body: CreateAudienceDto) {
    return this.audiencesService.save(body);
  }

  @Put(':id')
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateAudienceSchema)) body: UpdateAudienceDto,
  ) {
    return this.audiencesService.save({ ...body, id });
  }

  @Delete(':id')
  @AllowedRoles([UserRoles.ADMIN])
  remove(@Param('id') id: string) {
    return this.audiencesService.remove(id);
  }
}
