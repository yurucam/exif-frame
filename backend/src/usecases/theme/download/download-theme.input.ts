import { z } from '@hono/zod-openapi';

export const downloadThemeInput = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

export type DownloadThemeInput = z.infer<typeof downloadThemeInput>;
