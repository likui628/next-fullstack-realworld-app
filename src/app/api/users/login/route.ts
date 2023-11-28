import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import { issueToken } from "@/app/api/utils";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const user = await prisma.user.findUnique({ where: { email: body.user.email } });
  if (!user) {
    return NextResponse.json(
      {
        errors: ["User not found"],
      },
      {
        status: 403,
      }
    );
  }
  const { id, username, password } = user;
  if (body.user.password !== password) {
    return NextResponse.json(
      {
        errors: ["username or password not correct"],
      },
      {
        status: 403,
      }
    );
  }

  const payload = { sub: id, user: username };

  return NextResponse.json({
    user: {
      ...user,
      token: issueToken(payload),
    },
  });
};
