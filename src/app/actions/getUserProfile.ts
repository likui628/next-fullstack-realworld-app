'use server'

import { prisma } from '@/libs/prisma'
import { userMapper } from '@/app/api/mapper'
import getCurrentUser from '@/app/actions/getCurrentUser'

export default async function getUserProfile(username: string) {
  const currentUser = await getCurrentUser()
  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        followedBy: {
          where: {
            followerId: currentUser?.id,
          },
        },
      },
    })

    if (!userProfile) {
      return null
    }

    const following = userProfile.followedBy.some(
      (item) => item.followerId === currentUser?.id,
    )
    return userMapper(userProfile, following)
  } catch (error: any) {
    return null
  }
}
