import { NextResponse } from "next/server";

export class Response {
  static ok<T = any>(data: T): NextResponse {
    return NextResponse.json(data);
  }

  static error(message: string | string[], status = 404): NextResponse {
    return NextResponse.json({ errors: Array.isArray(message) ? message : [message] }, { status });
  }

  static unauthorized(): NextResponse {
    return NextResponse.json({ errors: ["Unauthorized"] }, { status: 401 });
  }
}
