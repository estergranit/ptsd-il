import { z } from 'zod';

export const QueryArticleSchema = z.object({
  langId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  audienceId: z.string().uuid().optional(),
  ageGroupId: z.string().uuid().optional(),
});

export type QueryArticleDto = z.infer<typeof QueryArticleSchema>;
