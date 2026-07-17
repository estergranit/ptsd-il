import { z } from 'zod';

export const CreateArticleSchema = z.object({
  groupId: z.string().uuid().optional(),
  langId: z.string().uuid(),
  header: z.string().min(1),
  content: z.string().optional(),
  authorId: z.string().uuid().optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  audienceIds: z.array(z.string().uuid()).optional(),
  ageGroupIds: z.array(z.string().uuid()).optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  isPublished: z.boolean().optional(),
});

export type CreateArticleDto = z.infer<typeof CreateArticleSchema>;
