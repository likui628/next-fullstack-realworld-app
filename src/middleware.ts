import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import createIntlMiddleware from 'next-intl/middleware'
import { locales } from '@/i18n'
import { withAuth } from 'next-auth/middleware'

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en',
})

const authMiddleware = withAuth((req) => intlMiddleware(req), {})

export async function middleware(request: NextRequest) {
  return intlMiddleware(request)
  // const pathname = request.nextUrl.pathname
  // if (pathname === '/') {
  //   return await homeMiddleware(request)
  // } else {
  //   return await authMiddleware1(request)
  // }
}

async function homeMiddleware(request: NextRequest) {
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

const requireAuth = ['/editor', '/settings']

async function authMiddleware1(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (requireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({ req: request })
    if (!token) {
      const url = new URL(`/login`, request.url)
      return NextResponse.redirect(`${url}?callback=${pathname}`)
    }
  }
  return NextResponse.next()
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|zh)/:path*'],
}
