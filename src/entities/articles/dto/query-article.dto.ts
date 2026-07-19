import { z } from 'zod';

export const QueryArticleSchema = z.object({
  langId: z.uuid().optional(),
  categoryId: z.uuid().optional(),
  audienceId: z.uuid().optional(),
  ageGroupId: z.uuid().optional(),
});

export type QueryArticleDto = z.infer<typeof QueryArticleSchema>;
