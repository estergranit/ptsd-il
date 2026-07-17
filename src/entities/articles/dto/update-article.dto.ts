import { z } from 'zod';

export const UpdateArticleSchema = z.object({
  langId: z.string().uuid().optional(),
  header: z.string().min(1).optional(),
  content: z.string().optional(),
  authorId: z.string().uuid().optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  audienceIds: z.array(z.string().uuid()).optional(),
  ageGroupIds: z.array(z.string().uuid()).optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  isPublished: z.boolean().optional(),
});

export type UpdateArticleDto = z.infer<typeof UpdateArticleSchema>;
