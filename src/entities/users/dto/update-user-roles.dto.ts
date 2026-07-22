import { z } from 'zod';
import { UserRoles } from '../user.entity.ts';

export const UpdateUserRolesSchema = z.object({
  roles: z.array(z.enum(UserRoles)).min(1),
});

export type UpdateUserRolesDto = z.infer<typeof UpdateUserRolesSchema>;
