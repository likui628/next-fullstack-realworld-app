import { z } from 'zod'

export const userRegisterSchema = z.object({
  username: z.string().max(20, 'Username is too long'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password is too short'),
})

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

export const articleUpdateSchema = articleInputSchema.merge(
  z.object({
    slug: z.string({ required_error: 'Slug is required' }),
  }),
)

export const commentSchema = z.object({
  comment: z.string().min(1, 'Body is required').max(65535, 'Body is too long'),
})
