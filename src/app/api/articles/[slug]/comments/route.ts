import { NextRequest } from 'next/server'
import { ApiResponse } from '@/app/api/response'
import { getComments } from '@/actions/getComments'
import { prisma } from '@/libs/prisma'
import getCurrentUser from '@/actions/getCurrentUser'
import { userMapper } from '@/app/api/mapper'

interface IParams {
  slug: string
}

export const GET = async (
  req: NextRequest,
  { params }: { params: IParams },
) => {
  const comments = await getComments({ slug: params.slug })
  return ApiResponse.ok({ comments })
}

export const POST = async (
  req: NextRequest,
  { params }: { params: IParams },
) => {
  const body = await req.json()
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.unauthorized()
  }
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      author: true,
    },
  })
  if (!article) {
    return ApiResponse.notFound('Article not exists')
  }

  const data = await prisma.comment.create({
    data: {
      body: body.comment as string,
      articleId: article.id,
      authorId: currentUser.id,
    },
    include: {
      author: true,
    },
  })

  const comment = {
    ...data,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
    author: userMapper(data.author),
  }

  return ApiResponse.ok({ comment })
}
