import { z } from 'zod';

export const CreateCommunitySchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  meetingType: z.string().nullable().optional(),
  organization: z.string().nullable().optional(),
  contactUrl: z.url().nullable().optional(),
  isActive: z.boolean().optional(),
  langId: z.string().min(2).max(5),
  groupId: z.uuid().optional(),
  audienceIds: z.array(z.uuid()).optional(),
});

export const UpdateCommunitySchema = CreateCommunitySchema.partial();

export const QueryCommunitySchema = z.object({
  langId: z.string().min(2).max(5).optional(),
  audienceId: z.uuid().optional(),
  audienceSlug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
});

export type CreateCommunityDto = z.infer<typeof CreateCommunitySchema>;
export type UpdateCommunityDto = z.infer<typeof UpdateCommunitySchema>;
export type QueryCommunityDto = z.infer<typeof QueryCommunitySchema>;
