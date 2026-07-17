import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import type { Request } from 'express';
import { Reflector } from '@nestjs/core';
import type { DecoratorKey } from '../../utilities/decorators.ts';
import type { UserRoles } from '../../entities/users/user.entity.ts';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (this.#isRoutePublic(context)) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    if (this.#hasAccess(context, request)) {
      return true;
    }

    throw new ForbiddenException();
  }

  #isRoutePublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean, DecoratorKey>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  #hasAccess(context: ExecutionContext, request: Request) {
    const allowedRoles = this.reflector.get<UserRoles[] | undefined, string>(
      'allowedRoles',
      context.getHandler(),
    );

    if (!allowedRoles) {
      // TODO: add logger
      throw new InternalServerErrorException();
    }

    return allowedRoles?.some((roleName) => {
      return request.context.roles.includes(roleName);
    });
  }
}
