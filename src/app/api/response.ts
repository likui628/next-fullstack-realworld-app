import { NextResponse } from "next/server";

export class Response {
  static ok<T = any>(data: T): NextResponse {
    return NextResponse.json(data);
  }

  static error(errors: string[], status = 404): NextResponse {
    return NextResponse.json({ errors }, { status });
  }
}
