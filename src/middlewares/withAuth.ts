import {
  NextMiddleware,
  NextRequest,
  NextFetchEvent,
  NextResponse,
} from 'next/server'
import { NextMiddlewareFactory } from '@/middlewares/chain'
import { getToken } from 'next-auth/jwt'
import { locales } from '@/navigation'

const requireAuth = ['/editor', '/settings']

const authPathnameRegex = RegExp(
  `^(/(${locales.join('|')}))?(${requireAuth
    .flatMap((p) => (p === '/' ? ['', '/'] : p))
    .join('|')})/?$`,
  'i',
)

export const withAuth: NextMiddlewareFactory = (middleware: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname

    if (authPathnameRegex.test(pathname)) {
      const token = await getToken({ req: request })
      if (!token) {
        const url = new URL(`/login`, request.url)
        return NextResponse.redirect(`${url}?callback=${pathname}`)
      }
    }
    return middleware(request, _next)
  }
}
