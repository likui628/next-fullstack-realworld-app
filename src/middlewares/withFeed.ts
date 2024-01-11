import {
  NextMiddleware,
  NextRequest,
  NextFetchEvent,
  NextResponse,
} from 'next/server'
import { NextMiddlewareFactory } from '@/middlewares/chain'
import { getToken } from 'next-auth/jwt'
import { locales } from '@/navigation'

const homePageRegex = RegExp(`^(/(${locales.join('|')}))?/?$`, 'i')

export const withFeed: NextMiddlewareFactory = (middleware: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const match = request.nextUrl.pathname.match(homePageRegex)
    if (match) {
      const locale = match[2] || ''

      const searchParams = request.nextUrl.searchParams
      const tag = searchParams.get('tag')
      const feed = searchParams.get('feed')

      const token = await getToken({ req: request })
      if (token) {
        if (!tag && !feed) {
          return NextResponse.redirect(
            new URL(`/${locale}?feed=feed`, request.url),
          )
        }
      } else {
        if (feed === 'feed') {
          return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
        }
      }
    }
    return middleware(request, _next)
  }
}
