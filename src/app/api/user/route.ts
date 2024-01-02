import { NextRequest } from 'next/server'
import { ApiResponse } from '@/app/api/response'
import { prisma } from '@/libs/prisma'
import { userMapper } from '@/app/api/mapper'
import bcrypt from 'bcrypt'

export async function PUT(req: NextRequest) {
  const body = await req.json()

  let data: Record<string, string> = {}
  for (let key of ['username', 'email', 'bio', 'image']) {
    if (body.user[key]) {
      data[key] = body.user[key]
    }
  }

  if (body.user.password) {
    const hashPassword = await bcrypt.hash(body.user.password, 10)
    data['password'] = hashPassword
  }

  const user = await prisma.user.update({
    where: {
      id: body.user.id as string,
    },
    data,
  })
  return ApiResponse.ok({ user: userMapper(user) })
}
