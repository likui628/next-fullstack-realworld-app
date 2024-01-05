import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import createIntlMiddleware from 'next-intl/middleware'
import { withAuth } from 'next-auth/middleware'
import { locales } from '@/navigation'

const requireAuth = ['/editor', '/settings']

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en',
})

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/login',
    },
  },
)

async function feedMiddleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tag = searchParams.get('tag')
  const feed = searchParams.get('feed')

  const token = await getToken({ req: request })
  if (token) {
    if (!tag && !feed) {
      return NextResponse.redirect(new URL('/?feed=feed', request.url))
    }
  } else {
    if (feed === 'feed') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}

// TODO chain middlewares
export async function middleware(request: NextRequest) {
  /*
  const authPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${requireAuth
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  )
  const isAuthPage = authPathnameRegex.test(request.nextUrl.pathname)
  if (isAuthPage) {
    return (authMiddleware as any)(request)
  } else {
    return intlMiddleware(request)
  }
  */
  return intlMiddleware(request)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|zh)/:path*'],
}
