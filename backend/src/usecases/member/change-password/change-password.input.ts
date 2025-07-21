import { z } from '@hono/zod-openapi';

export const changePasswordInput = z
  .object({
    currentPassword: z.string().min(8, 'Current password must be at least 8 characters long'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
    confirmNewPassword: z.string().min(8, 'Confirm new password must be at least 8 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New password and confirm new password must match',
  });

export type ChangePasswordInput = z.infer<typeof changePasswordInput>;
