import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (pathname === '/') {
    return await homeMiddleware(request)
  } else {
    return await authMiddleware(request)
  }
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

async function authMiddleware(request: NextRequest) {
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
