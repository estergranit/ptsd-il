import { z } from 'zod';
import { ArticleType } from '../articles.entity.ts';

export const QueryArticleSchema = z.object({
  type: z.enum(ArticleType).optional(),
  langId: z.string().min(2).max(5).optional(),
  categoryId: z.uuid().optional(),
  categorySlug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  audienceId: z.uuid().optional(),
  audienceSlug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  ageGroupId: z.uuid().optional(),
  ageGroupSlug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  parentId: z.uuid().optional(),
});

export type QueryArticleDto = z.infer<typeof QueryArticleSchema>;
