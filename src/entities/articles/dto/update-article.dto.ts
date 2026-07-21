import { z } from 'zod';
import { ArticleType } from '../articles.entity.ts';

const ArticleLinkSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
});

export const UpdateArticleSchema = z.object({
  type: z.enum(ArticleType).optional(),
  langId: z.string().min(2).max(5).optional(),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  url: z.url().nullable().optional(),
  authors: z.string().nullable().optional(),
  year: z.string().nullable().optional(),
  links: z.array(ArticleLinkSchema).nullable().optional(),
  parentId: z.uuid().nullable().optional(),
  authorId: z.uuid().optional(),
  categoryIds: z.array(z.uuid()).optional(),
  audienceIds: z.array(z.uuid()).optional(),
  ageGroupIds: z.array(z.uuid()).optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  isPublished: z.boolean().optional(),
});

export type UpdateArticleDto = z.infer<typeof UpdateArticleSchema>;
