import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { AllowedRoles, Public } from '../../utilities/decorators.ts';
import { UserRoles } from '../users/user.entity.ts';
import { AgeGroupsService } from './age-groups.service.ts';
import { CreateAgeGroupSchema, UpdateAgeGroupSchema, type CreateAgeGroupDto, type UpdateAgeGroupDto } from './dto/age-group.dto.ts';

@Controller('age-groups')
export class AgeGroupsController {
  public constructor(private readonly ageGroupsService: AgeGroupsService) {}

  @Get()
  @Public()
  public findAll() {
    return this.ageGroupsService.findAll();
  }

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
