import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { AllowedRoles } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { CommunitiesService } from '../communities/communities.service.ts';
import { CreateCommunitySchema, UpdateCommunitySchema, type CreateCommunityDto, type UpdateCommunityDto } from '../communities/dto/community.dto.ts';

@Controller('admin/communities')
export class AdminCommunitiesController {
  public constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public create(@Body(new ZodValidationPipe(CreateCommunitySchema)) body: CreateCommunityDto) {
    return this.communitiesService.save(body);
  }

  @Put(':id')
  @AllowedRoles([UserRoles.ADMIN, UserRoles.MODERATOR])
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateCommunitySchema)) body: UpdateCommunityDto,
  ) {
    return this.communitiesService.save({ ...body, id });
  }

  @Delete(':id')
  @AllowedRoles([UserRoles.ADMIN])
  public remove(@Param('id') id: string) {
    return this.communitiesService.remove(id);
  }
}
