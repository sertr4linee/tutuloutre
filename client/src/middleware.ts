import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const publicPaths = ['/', '/about', '/work', '/services', '/contact']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Debug logs
  console.log('Middleware - Path:', pathname)
  console.log('Middleware - Token exists:', !!token)

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      console.log('Middleware - No token found, redirecting to /')
      return NextResponse.redirect(new URL('/', request.url))
    }

    try {
      // Make sure JWT_SECRET is available
      const secret = process.env.JWT_SECRET
      if (!secret) {
        console.error('JWT_SECRET is not defined in environment variables')
        return NextResponse.redirect(new URL('/', request.url))
      }

      // Create secret key for jose
      const secretKey = new TextEncoder().encode(secret)
      
      // Verify token with jose
      await jose.jwtVerify(token, secretKey)
      
      console.log('Middleware - Token verified successfully')
      return NextResponse.next()
    } catch (error) {
      console.error('Middleware - Token verification failed:', error)
      // Create a new response to delete the cookie
      const response = NextResponse.redirect(new URL('/', request.url))
      response.cookies.delete('token')
      return response
    }
  }

  // Allow API routes and other paths
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 