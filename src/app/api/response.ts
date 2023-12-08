import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export class ApiResponse {
  static ok<T = any>(data: T): NextResponse {
    return NextResponse.json(data, { status: 200 })
  }

  static unauthorized(): NextResponse {
    return NextResponse.json({ errors: ['Unauthorized'] }, { status: 401 })
  }

  static badRequest(err: unknown) {
    return NextResponse.json(
      { errors: processErrorMessage(err) },
      { status: 400 },
    )
  }

  static notFound(message: string = 'Not Found') {
    return NextResponse.json({ errors: [message] }, { status: 404 })
  }

  static forbidden(): NextResponse {
    return NextResponse.json({ errors: ['Forbidden'] }, { status: 403 })
  }

  static noContent() {
    return NextResponse.json({}, { status: 200 })
  }
}

function processErrorMessage(err: unknown): string[] {
  if (typeof err === 'string') {
    return [err]
  } else if (Array.isArray(err)) {
    return err.map((e) => e.toString())
  } else if (err instanceof ZodError) {
    return err.issues.map((issue) => issue.message)
  }
  return ['Something went wrong']
}
