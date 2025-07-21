import { z } from '@hono/zod-openapi';

export const downloadThemeOutput = z.object({
  downloadCount: z.number(),
  message: z.string(),
});

export type DownloadThemeOutput = z.infer<typeof downloadThemeOutput>;
