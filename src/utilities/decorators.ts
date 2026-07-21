import { SetMetadata } from '@nestjs/common';
import type { UserRoles } from '../entities/users/user.entity.ts';

type DecoratorKey = 'isPublic' | 'allowedRoles';

const Public = () => {
  return SetMetadata<DecoratorKey>('isPublic', true);
};

const AllowedRoles = (roles: UserRoles[]) => {
  return SetMetadata<DecoratorKey>('allowedRoles', roles);
};

export { Public, AllowedRoles, type DecoratorKey };
