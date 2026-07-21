import { z } from 'zod';
import { ArticleType } from '../articles.entity.ts';

// Types whose primary payload IS an external link (so url is mandatory). Content-ish types
// (book/video/activity/story) may be offline recommendations with no url, so they are exempt.
const URL_REQUIRED_TYPES = new Set<string>([
  ArticleType.SOURCE,
  ArticleType.DOWNLOAD,
  ArticleType.APP,
]);

const ArticleLinkSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
});

export const CreateArticleSchema = z
  .object({
    type: z.enum(ArticleType).default(ArticleType.ARTICLE),
    groupId: z.uuid().optional(),
    langId: z.string().min(2).max(5),
    title: z.string().min(1),
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
  })
  .superRefine((dto, ctx) => {
    if (URL_REQUIRED_TYPES.has(dto.type) && !dto.url) {
      ctx.addIssue({
        code: 'custom',
        path: ['url'],
        message: `url is required when type is '${dto.type}'`,
      });
    }
  });

export type CreateArticleDto = z.infer<typeof CreateArticleSchema>;
