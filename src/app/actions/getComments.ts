import { prisma } from "@/utils/connect";
import { defaultImage } from "@/utils/constants";

interface IArticleParams {
  slug: string;
}

export async function getComments(params: IArticleParams) {
  const comments = await prisma.comment.findMany({
    where: {
      article: {
        slug: params.slug,
      },
      del: false,
    },
    include: {
      author: true,
    },
  });

  return comments.map((comment) => {
    const { username, bio, image = defaultImage } = comment.author;
    return {
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
      author: {
        username,
        bio,
        image: image || defaultImage,
        following: false,
      },
    };
  });
}
