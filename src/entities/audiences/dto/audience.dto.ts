import { z } from 'zod';

export const CreateAudienceSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
});

export const UpdateAudienceSchema = CreateAudienceSchema.partial();

export type CreateAudienceDto = z.infer<typeof CreateAudienceSchema>;
export type UpdateAudienceDto = z.infer<typeof UpdateAudienceSchema>;
