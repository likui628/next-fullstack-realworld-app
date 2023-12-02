import { prisma } from "@/utils/connect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { defaultImage } from "@/utils/constants";
import { CurrentUser } from "@/types/server";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      image: currentUser.image || defaultImage,
      password: undefined,
    } as CurrentUser;
  } catch (error: any) {
    return null;
  }
}
