import { NextRequest } from 'next/server'
import { prisma } from '@/libs/prisma'
import { ApiResponse } from '@/app/api/response'
import getCurrentUser from '@/actions/getCurrentUser'
import { userMapper } from '@/app/api/mapper'
import { revalidatePath } from 'next/cache'

interface IParams {
  username: string
}

function revalidate() {
  revalidatePath(`/article/[slug]`, 'page')
  revalidatePath(`/profile/[username]`, 'page')
}

export const POST = async (
  req: NextRequest,
  { params }: { params: IParams },
) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.unauthorized()
  }

  const followUser = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  })
  if (!followUser) {
    return ApiResponse.notFound('User not exists')
  }

  const profile = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      following: {
        connectOrCreate: {
          where: {
            followerId_followingId: {
              followerId: currentUser.id,
              followingId: followUser.id,
            },
          },
          create: {
            followingId: followUser.id,
          },
        },
      },
    },
  })
  revalidate()
  return ApiResponse.ok({ profile: userMapper(profile, true) })
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: IParams },
) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.unauthorized()
  }

  const followUser = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  })
  if (!followUser) {
    return ApiResponse.notFound('User not exists')
  }

  const profile = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      following: {
        delete: {
          followerId_followingId: {
            followerId: currentUser.id,
            followingId: followUser.id,
          },
        },
      },
    },
  })
  revalidate()
  return ApiResponse.ok({ profile: userMapper(profile, false) })
}
