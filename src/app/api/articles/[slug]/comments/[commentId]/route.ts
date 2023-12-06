import { NextRequest } from 'next/server'
import { Response } from '@/app/api/response'
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
    return Response.error(['user not login'], 403)
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
    return Response.error('Delete comment fail')
  }

  return Response.ok({})
}
