import { z } from '@hono/zod-openapi';

export const signInInput = z.object({
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type SignInInput = z.infer<typeof signInInput>;
