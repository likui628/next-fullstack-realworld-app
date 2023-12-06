import { NextRequest } from 'next/server'
import { prisma } from '@/libs/prisma'
import slug from 'slug'
import { Response } from '@/app/api/response'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { articleInputSchema } from '@/app/validation/schema'

export const POST = async (req: NextRequest) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return Response.unauthorized()
  }
  const body = await req.json()

  const result = articleInputSchema.safeParse(body.article)
  if (!result.success) {
    return Response.badInput(result.error)
  }

  const { title, description = '', body: articleBody, tagList } = result.data
  const article = await prisma.article.create({
    data: {
      title,
      slug: slug(title),
      description,
      body: articleBody,
      authorId: currentUser.id,
      tagList: {
        create: tagList?.map((tag) => ({
          tag: {
            connectOrCreate: {
              create: { name: tag },
              where: { name: tag },
            },
          },
        })),
      },
    },
    include: {
      author: true,
      tagList: {
        select: {
          tag: true,
        },
      },
    },
  })

  return Response.ok({ article })
}
