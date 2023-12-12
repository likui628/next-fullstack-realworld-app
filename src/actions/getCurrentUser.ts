import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'
import { userMapper } from '@/app/api/mapper'
import { authOptions } from '@/libs/auth'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }

    return userMapper(currentUser)
  } catch (error: any) {
    return null
  }
}
