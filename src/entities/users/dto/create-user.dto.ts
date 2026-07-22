import { z } from 'zod';
import { UserRoles } from '../user.entity.ts';

export const CreateUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  phone: z.string().min(1).optional(),
  roles: z.array(z.enum(UserRoles)).min(1).optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
