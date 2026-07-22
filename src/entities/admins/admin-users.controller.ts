import { Body, Controller, Delete, ForbiddenException, Get, Param, Put, Req } from '@nestjs/common';
import type { Request } from 'express';
import { UserRoles } from '../users/user.entity.ts';
import { AllowedRoles } from '../../utilities/decorators.ts';
import { UsersService } from '../users/users.service.ts';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe.ts';
import {
  UpdateUserRolesSchema,
  type UpdateUserRolesDto,
} from '../users/dto/update-user-roles.dto.ts';

@Controller('admin/users')
export class AdminUsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @AllowedRoles([UserRoles.MASTERADMIN])
  public findAll() {
    return this.usersService.findAll();
  }

  @Put(':id/roles')
  @AllowedRoles([UserRoles.MASTERADMIN])
  public updateRoles(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateUserRolesSchema)) body: UpdateUserRolesDto,
  ) {
    return this.usersService.updateRoles(id, body.roles);
  }

  @Delete(':id')
  @AllowedRoles([UserRoles.MASTERADMIN])
  public remove(@Param('id') id: string, @Req() request: Request) {
    if (id === request.context.id) {
      throw new ForbiddenException('You cannot delete your own account');
    }
    return this.usersService.remove(id);
  }
}
