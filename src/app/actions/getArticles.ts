import { prisma } from "@/utils/connect";
import { ArticlesResp } from "@/types/server";
import { ARTICLE_PAGE_LIMIT } from "@/utils/constants";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IArticlesParams {
  limit?: number;
  offset?: number;
}

const defaultImage = process.env.DEFAULT_USER_AVATAR || "";

export default async function getArticles(params: IArticlesParams): Promise<ArticlesResp> {
  const { limit = ARTICLE_PAGE_LIMIT, offset = 0 } = params;

  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  let query: any = {};

  const articlesCount = await prisma.article.count({
    where: query,
  });

  const data = await prisma.article.findMany({
    where: query,
    skip: offset,
    take: limit,
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
  });

  return {
    articles: data.map((article) => {
      const following = article.author.followedBy.some((follow) => follow.followerId === userId);
      const favorited = article.favoritedBy.some((fav) => fav.userId === userId);

      return {
        ...article,
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
        author: {
          ...article.author,
          image: article.author.image || defaultImage,
          following,
        },
        tagList: article.tagList.map((tag) => tag.tag.name),
        favorited,
        favoritesCount: article._count.favoritedBy,
      };
    }),
    articlesCount,
  };
}
