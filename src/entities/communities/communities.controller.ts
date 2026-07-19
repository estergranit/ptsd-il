import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRoles } from '../users/user.entity.ts';
import { CommunitiesService } from './communities.service.ts';
import { AllowedRoles, Public } from '../../utilities/decorators.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import { CreateCommunitySchema, UpdateCommunitySchema, type CreateCommunityDto, type UpdateCommunityDto } from './dto/community.dto.ts';

@Controller('communities')
export class CommunitiesController {
  public constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  @Public()
  public findAll() {
    return this.communitiesService.findAll();
  }

  @Get(':id')
  @Public()
  public findOne(@Param('id') id: string) {
    return this.communitiesService.findOne(id);
  }

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
