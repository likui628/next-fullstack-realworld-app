import { prisma } from '@/utils/connect'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { userMapper } from '@/app/api/mapper'
import { Response } from '@/app/api/response'

interface IArticleParams {
  slug: string
}

export async function getArticle(params: IArticleParams) {
  const currentUser = await getCurrentUser()
  const userId = currentUser?.id

  const data = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        include: {
          followedBy: {
            where: {
              followerId: userId,
            },
          },
        },
      },
      favoritedBy: {
        where: {
          userId: userId,
        },
      },
      _count: {
        select: { favoritedBy: true },
      },
      tagList: {
        select: {
          tag: {
            select: { name: true },
          },
        },
      },
    },
  })
  if (data) {
    const following = data.author.followedBy.some(
      (follow) => follow.followerId === userId,
    )
    const favorited = data.favoritedBy.some((fav) => fav.userId === userId)

    return {
      ...data,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
      author: {
        ...userMapper(data.author),
        following,
      },
      tagList: data.tagList.map((tag) => tag.tag.name),
      favorited,
      favoritesCount: data._count.favoritedBy,
    }
  } else {
    throw Error('Not found')
  }
}
