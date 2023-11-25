import {NextRequest, NextResponse} from "next/server";

export const GET = async (req: NextRequest) => {
    return new NextResponse(JSON.stringify({tags: ['a', 'b']}));
};