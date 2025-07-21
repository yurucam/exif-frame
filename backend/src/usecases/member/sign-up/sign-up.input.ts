import { z } from '@hono/zod-openapi';

export const signUpInput = z
  .object({
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters long'),
    nickname: z.string().min(1, 'Nickname is required'),
    bio: z.string().optional().default(''),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password must match',
  });

export type SignUpInput = z.infer<typeof signUpInput>;
