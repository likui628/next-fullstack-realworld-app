import { NextRequest } from 'next/server'
import { ApiResponse } from '@/app/api/response'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { prisma } from '@/libs/prisma'

interface IParams {
  slug: string
  commentId: string
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: IParams },
) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.forbidden()
  }

  try {
    await prisma.comment.update({
      where: {
        article: {
          slug: params.slug,
        },
        id: params.commentId,
        authorId: currentUser.id,
      },
      data: {
        del: true,
      },
    })
  } catch (e) {
    return ApiResponse.badRequest('Delete comment fail')
  }

  return ApiResponse.noContent()
}
