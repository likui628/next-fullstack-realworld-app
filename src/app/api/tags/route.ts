import { NextResponse} from "next/server";
import {prisma} from "@/utils/connect";

export const GET = async () => {
    const tags= await prisma.tags.findMany();
    return NextResponse.json({
        tags: tags.map(tag => tag.value)
    });
}