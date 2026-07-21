import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { AudiencesService } from '../audiences/audiences.service.ts';
import { CreateAudienceSchema, UpdateAudienceSchema, type CreateAudienceDto, type UpdateAudienceDto } from '../audiences/dto/audience.dto.ts';

@Controller('admin/audiences')
export class AdminAudiencesController {
  public constructor(private readonly audiencesService: AudiencesService) {}

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
