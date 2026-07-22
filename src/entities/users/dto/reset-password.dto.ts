import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  newPassword: z.string().min(8),
});

export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
