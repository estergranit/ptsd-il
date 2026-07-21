import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { DecoratorKey } from '../../utilities/decorators.ts';
import type { JwtPayload } from '../strategies/jwt.strategy.ts';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.#isRoutePublic(context);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.#extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // TODO: change this according to the implement jwt strategy
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      request.context = {
        id: payload.sub,
        email: payload.email,
        roles: payload.roles,
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  #isRoutePublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean, DecoratorKey>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  #extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
