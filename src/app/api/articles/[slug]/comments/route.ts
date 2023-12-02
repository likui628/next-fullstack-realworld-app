import { NextRequest } from "next/server";
import { Response } from "@/app/api/response";
import { getComments } from "@/app/actions/getComments";

interface IParams {
  slug: string;
}

export const GET = async (req: NextRequest, { params }: { params: IParams }) => {
  const comments = await getComments({ slug: params.slug });
  return Response.ok({ comments });
};
