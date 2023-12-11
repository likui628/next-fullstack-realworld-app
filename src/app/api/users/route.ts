import { NextRequest } from 'next/server'
import { prisma } from '@/libs/prisma'
import { ApiResponse } from '@/app/api/response'
import { userRegisterSchema } from '@/app/validation/schema'
import { userMapper } from '@/app/api/mapper'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const result = userRegisterSchema.safeParse(body.user)
  if (!result.success) {
    return ApiResponse.badRequest(result.error)
  }

  const { username, email, password } = result.data
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    })

    return ApiResponse.ok(userMapper(user))
  } catch (e) {
    return ApiResponse.badRequest('Register fail')
  }
}
