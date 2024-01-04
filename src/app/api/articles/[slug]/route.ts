import { NextRequest } from 'next/server'
import getCurrentUser from '@/actions/getCurrentUser'
import { ApiResponse } from '@/app/api/response'
import { prisma } from '@/libs/prisma'
import { articleUpdateSchema } from '@/validation/schema'
import slug from 'slug'

interface IParams {
  slug: string
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: IParams },
) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.unauthorized()
  }

  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  })

  if (!article) {
    return ApiResponse.notFound("Article doesn't exist")
  }

  if (article.authorId !== currentUser.id) {
    return ApiResponse.forbidden()
  }

  try {
    await prisma.article.delete({
      where: {
        id: article.id,
      },
    })
  } catch (e) {
    return ApiResponse.badRequest('Delete article fail')
  }

  return ApiResponse.noContent()
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: IParams },
) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.unauthorized()
  }

  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  })

  if (!article) {
    return ApiResponse.notFound("Article doesn't exist")
  }

  if (article.authorId !== currentUser.id) {
    return ApiResponse.forbidden()
  }

  const body = await req.json()
  const result = articleUpdateSchema.safeParse(body.article)
  if (!result.success) {
    return ApiResponse.badRequest(result.error)
  }
  const {
    title,
    description = '',
    body: articleBody,
    tagList = [],
  } = result.data

  try {
    const updatedArticle = await prisma.article.update({
      where: {
        id: article.id,
      },
      data: {
        title,
        description,
        body: articleBody,
        slug: article.slug,
        tagList: {
          deleteMany: { articleId: article.id },
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
    })

    return ApiResponse.ok({ article: updatedArticle })
  } catch (e) {
    return ApiResponse.badRequest('Update article fail')
  }
}
