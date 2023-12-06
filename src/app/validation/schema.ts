import { z } from 'zod'

export const articleInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title is too long'),
  description: z.string().optional(),
  body: z.string().min(1, 'Body is required').max(65535, 'Body is too long'),
  tagList: z.array(z.string().trim().max(100, 'Tag is too long')).optional(),
})
