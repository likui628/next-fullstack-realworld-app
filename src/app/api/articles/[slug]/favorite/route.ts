import { NextRequest } from "next/server";
import { prisma } from "@/utils/connect";
import { Response } from "@/app/api/response";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getArticle } from "@/app/actions/getArticle";

interface IParams {
  slug: string;
}

export const POST = async (req: NextRequest, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return Response.error(["user not login"], 403);
  }

  const article = await prisma.article.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!article) {
    return Response.error(["article not exists"]);
  }

  const articleId = article.id;
  const userId = currentUser.id;
  try {
    await prisma.favorites.create({
      data: {
        favoriting: { connect: { id: articleId } },
        favoritedBy: { connect: { id: userId } },
      },
    });
  } catch (e) {
    console.log(e);
  }

  const newArticle = await getArticle({ slug: params.slug });
  return Response.ok(newArticle);
};

export const DELETE = async (req: NextRequest, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not login");
  }

  const article = await prisma.article.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!article) {
    return Response.error(["article not exists"]);
  }

  const articleId = article.id;
  const userId = currentUser.id;
  try {
    await prisma.favorites.delete({
      where: {
        articleId_userId: {
          articleId,
          userId,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }

  const newArticle = await getArticle({ slug: params.slug });
  return Response.ok(newArticle);
};
