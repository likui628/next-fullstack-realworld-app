import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return homeMiddleware(request)
  }
  return NextResponse.next()
}

function homeMiddleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tag = searchParams.get('tag')
  const feed = searchParams.get('feed')
  if (hasLogin(request)) {
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

function hasLogin(request: NextRequest) {
  const sessionToken = request.cookies.get('next-auth.session-token')?.value
  return !!sessionToken
}

// Matching Paths
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
export const config = {
  matcher: '/',
}
