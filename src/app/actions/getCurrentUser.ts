import { getUserId } from "@/app/api/utils";
import { prisma } from "@/utils/connect";

export default async function getCurrentUser() {
  try {
    const userId = getUserId();

    if (!userId) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}
