import { z } from 'zod';

export const CreateAgeGroupSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  min: z.number().int().nonnegative(),
  max: z.number().int().nonnegative(),
});

export const UpdateAgeGroupSchema = CreateAgeGroupSchema.partial();

export type CreateAgeGroupDto = z.infer<typeof CreateAgeGroupSchema>;
export type UpdateAgeGroupDto = z.infer<typeof UpdateAgeGroupSchema>;
