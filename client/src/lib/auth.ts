import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { headers } from 'next/headers'
import { validateToken } from './redis'

export async function verifyAuth() {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { 
        error: 'Unauthorized',
        status: 401
      }
    }

    const token = authHeader.split(' ')[1]
    const decoded = verify(token, process.env.JWT_SECRET!) as { id: string }

    if (!decoded?.id) {
      return {
        error: 'Invalid token',
        status: 401
      }
    }

    // Vérifier si le token est dans Redis
    const isValid = await validateToken(decoded.id, token)
    if (!isValid) {
      return {
        error: 'Token expired or invalid',
        status: 401
      }
    }

    return {
      userId: decoded.id
    }
  } catch (error) {
    console.error('Auth error:', error)
    return {
      error: 'Invalid token',
      status: 401
    }
  }
}

export function withAuth(handler: Function) {
  return async function(req: Request, ...args: any[]) {
    const auth = await verifyAuth()

    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    return handler(req, auth.userId, ...args)
  }
} 