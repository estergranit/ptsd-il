import { z } from 'zod';

export const CreateCategorySchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  parentId: z.uuid().nullable().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
