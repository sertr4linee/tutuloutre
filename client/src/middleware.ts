import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuthToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Protéger toutes les routes /admin sauf /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    const token = request.cookies.get('auth_token')
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await verifyAuthToken(token.value)
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
} 