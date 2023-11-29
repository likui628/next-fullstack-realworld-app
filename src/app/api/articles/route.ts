import { NextRequest } from "next/server";
import { Response } from "@/app/api/response";
import { prisma } from "@/utils/connect";
import { loadCurrentUser } from "@/app/api/utils";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 10);
  const offset = Number(searchParams.get("offset") || 0);

  const token = req.headers.get("Authorization");
  const userId = loadCurrentUser(token);

  //todo: add filter
  const where = {};

  const data = await prisma.article.findMany({
    where,
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
      tagList: true,
    },
  });

  const articlesCount = await prisma.article.count({ where });

  const articles = data.map((article) => {
    const following = article.author.followedBy.some((follow) => follow.followerId === userId);
    const favorited = article.favoritedBy.some((fav) => fav.userId === userId);
    return {
      ...article,
      author: {
        ...article.author,
        following,
      },
      favorited,
      favoritesCount: article._count.favoritedBy,
      updatedAt: new Date(article.updatedAt),
      createdAt: new Date(article.createdAt),
    };
  });

  return Response.ok({
    articles,
    articlesCount,
  });
};
