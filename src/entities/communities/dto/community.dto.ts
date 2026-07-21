import { z } from 'zod';

export const CreateCommunitySchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  meetingType: z.string().nullable().optional(),
  organization: z.string().nullable().optional(),
  contactUrl: z.url().nullable().optional(),
  isActive: z.boolean().optional(),
});

export const UpdateCommunitySchema = CreateCommunitySchema.partial();

export type CreateCommunityDto = z.infer<typeof CreateCommunitySchema>;
export type UpdateCommunityDto = z.infer<typeof UpdateCommunitySchema>;
