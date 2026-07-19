import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { AudiencesService } from './audiences.service.ts';
import { Public, AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { CreateAudienceSchema, UpdateAudienceSchema, type CreateAudienceDto, type UpdateAudienceDto } from './dto/audience.dto.ts';

@Controller('audiences')
export class AudiencesController {
  public constructor(private readonly audiencesService: AudiencesService) {}

  @Get()
  @Public()
  public findAll() {
    return this.audiencesService.findAll();
  }

  @Post()
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public create(@Body(new ZodValidationPipe(CreateAudienceSchema)) body: CreateAudienceDto) {
    return this.audiencesService.save(body);
  }

  @Put(':id')
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateAudienceSchema)) body: UpdateAudienceDto,
  ) {
    return this.audiencesService.save({ ...body, id });
  }

  @Delete(':id')
  @AllowedRoles([UserRoles.ADMIN])
  public remove(@Param('id') id: string) {
    return this.audiencesService.remove(id);
  }
}
