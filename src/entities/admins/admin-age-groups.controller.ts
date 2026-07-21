import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { AgeGroupsService } from '../age-groups/age-groups.service.ts';
import { CreateAgeGroupSchema, UpdateAgeGroupSchema, type CreateAgeGroupDto, type UpdateAgeGroupDto } from '../age-groups/dto/age-group.dto.ts';

@Controller('admin/age-groups')
export class AdminAgeGroupsController {
  public constructor(private readonly ageGroupsService: AgeGroupsService) {}

  @Post()
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public create(@Body(new ZodValidationPipe(CreateAgeGroupSchema)) body: CreateAgeGroupDto) {
    return this.ageGroupsService.save(body);
  }

  @Put(':id')
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateAgeGroupSchema)) body: UpdateAgeGroupDto,
  ) {
    return this.ageGroupsService.save({ ...body, id });
  }

  @Delete(':id')
  @AllowedRoles([UserRoles.ADMIN])
  public remove(@Param('id') id: string) {
    return this.ageGroupsService.remove(id);
  }
}
