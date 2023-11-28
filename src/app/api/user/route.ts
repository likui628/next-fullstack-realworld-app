import { NextRequest } from "next/server";
import { Response } from "@/app/api/response";
import { loadCurrentUser } from "@/app/api/utils";
import { prisma } from "@/utils/connect";

export const GET = async (req: NextRequest) => {
  const token = req.headers.get("Authorization");
  if (!token) {
    return Response.error(["Unauthorized"], 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: loadCurrentUser(token),
    },
  });
  return Response.ok({
    user: {
      ...user,
      token,
    },
  });
};
