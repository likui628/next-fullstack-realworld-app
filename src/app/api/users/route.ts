import { NextRequest } from "next/server";
import { prisma } from "@/utils/connect";
import { Response } from "@/app/api/response";
import { issueToken } from "@/app/api/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  try {
    const user = await prisma.user.create({
      data: {
        username: body.user.username,
        email: body.user.email,
        password: body.user.password,
      },
    });

    const { id, username } = user;
    const payload = { sub: id, user: username };
    return Response.ok({
      user: {
        ...user,
        token: issueToken(payload),
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      // Error codes
      // https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
      if (e.code === "P2002") {
        return Response.error(["Username or email already exists"], 403);
      }
    }
  }
};
