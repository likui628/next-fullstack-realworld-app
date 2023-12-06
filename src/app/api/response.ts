import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export class Response {
  static ok<T = any>(data: T): NextResponse {
    return NextResponse.json(data)
  }

  static error(message: string | string[], status = 404): NextResponse {
    return NextResponse.json(
      { errors: Array.isArray(message) ? message : [message] },
      { status },
    )
  }

  static unauthorized(): NextResponse {
    return NextResponse.json({ errors: ['Unauthorized'] }, { status: 401 })
  }

  static badInput(error: ZodError) {
    return NextResponse.json(
      { errors: error.issues.map((issue) => issue.message) },
      { status: 400 },
    )
  }
}
