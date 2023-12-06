import { NextRequest } from 'next/server'
import { Response } from '@/app/api/response'
import { prisma } from '@/utils/connect'
import { userMapper } from '@/app/api/mapper'

export async function PUT(req: NextRequest) {
  const body = await req.json()

  let data: Record<string, string> = {}
  for (let key in ['username', 'email', 'bio', 'image']) {
    if (body.user[key]) {
      data[key] = body.user[key]
    }
  }

  const user = await prisma.user.update({
    where: {
      id: body.user.id as string,
    },
    data,
  })
  return Response.ok({ user: userMapper(user) })
}
