import { NextRequest } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { ApiResponse } from '@/app/api/response'
import { prisma } from '@/libs/prisma'

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
    return ApiResponse.notFound("Article doesn't exists")
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
