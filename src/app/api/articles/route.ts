import { NextRequest } from 'next/server'
import { prisma } from '@/libs/prisma'
import slug from 'slug'
import { ApiResponse } from '@/app/api/response'
import getCurrentUser from '@/actions/getCurrentUser'
import { articleInputSchema } from '@/validation/schema'

export const POST = async (req: NextRequest) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.unauthorized()
  }
  const body = await req.json()

  const result = articleInputSchema.safeParse(body.article)
  if (!result.success) {
    return ApiResponse.badRequest(result.error)
  }

  const { title, description = '', body: articleBody, tagList } = result.data

  const isSlugExist = async (slug: string) => {
    return !!(await prisma.article.findFirst({ where: { slug } }))
  }

  let slugTitle = slug(title)
  let counter = 1
  while (await isSlugExist(slugTitle)) {
    slugTitle = `${slugTitle}-${counter}`
    counter++
  }

  try {
    const article = await prisma.article.create({
      data: {
        title,
        slug: slugTitle,
        description,
        body: articleBody,
        authorId: currentUser.id,
        tagList: {
          create: tagList?.map((tag) => ({
            tag: {
              connectOrCreate: {
                create: { name: tag },
                where: { name: tag },
              },
            },
          })),
        },
      },
    })
    return ApiResponse.ok({ article })
  } catch (e: any) {
    return ApiResponse.badRequest('Create article failed')
  }
}
