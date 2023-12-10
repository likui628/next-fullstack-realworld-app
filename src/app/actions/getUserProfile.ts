'use server'

import { prisma } from '@/libs/prisma'
import { userMapper } from '@/app/api/mapper'

export default async function getUserProfile(username: string) {
  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!userProfile) {
      return null
    }

    return userMapper(userProfile)
  } catch (error: any) {
    return null
  }
}
