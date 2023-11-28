import { NextRequest } from "next/server";
import { prisma } from "@/utils/connect";
import { issueToken } from "@/app/api/utils";
import { Response } from "@/app/api/response";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const user = await prisma.user.findUnique({ where: { email: body.user.email } });
  if (!user) {
    return Response.error(["User not found"], 403);
  }
  const { id, username, password } = user;
  if (body.user.password !== password) {
    return Response.error(["Password not correct"], 403);
  }

  const payload = { sub: id, user: username };
  return Response.ok({
    user: {
      ...user,
      token: issueToken(payload),
    },
  });
};
