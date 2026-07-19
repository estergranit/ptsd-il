import { z } from 'zod';

export const CreateArticleSchema = z.object({
  groupId: z.uuid().optional(),
  langId: z.uuid(),
  header: z.string().min(1),
  content: z.string().optional(),
  authorId: z.uuid().optional(),
  categoryIds: z.array(z.uuid()).optional(),
  audienceIds: z.array(z.uuid()).optional(),
  ageGroupIds: z.array(z.uuid()).optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  isPublished: z.boolean().optional(),
});

export type CreateArticleDto = z.infer<typeof CreateArticleSchema>;
