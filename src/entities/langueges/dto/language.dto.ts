import { z } from 'zod';

export const CreateLanguageSchema = z.object({
  id: z.string().min(2).max(5),
  name: z.string().min(1),
  direction: z.enum(['ltr', 'rtl']).optional(),
  isActive: z.boolean().optional(),
});

export const UpdateLanguageSchema = CreateLanguageSchema.omit({ id: true }).partial();

export type CreateLanguageDto = z.infer<typeof CreateLanguageSchema>;
export type UpdateLanguageDto = z.infer<typeof UpdateLanguageSchema>;
