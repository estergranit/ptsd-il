import type { UserRoles } from '../../entities/users/user.entity.ts';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: UserRoles[];
  iat?: number;
  exp?: number;
}
