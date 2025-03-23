import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

const publicPaths = ['/', '/about', '/work', '/services', '/contact']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    try {
      verify(token, process.env.JWT_SECRET!)
      return NextResponse.next()
    } catch (error) {
      request.cookies.delete('token')
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Allow API routes and other paths
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 