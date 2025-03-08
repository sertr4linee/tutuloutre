import { NextResponse } from 'next/server'
import { verifyTOTP } from '@/lib/totp'
import { getAdminFromDB } from '@/lib/db'
import { createAuthToken } from '@/lib/auth'
// import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    // Pour le développement, on va temporairement désactiver la vérification de session
    // const session = await getSession(req)
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { code } = await req.json()
    const admin = await getAdminFromDB()

    const isValid = verifyTOTP(code, admin.totpSecret || '')
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 401 })
    }

    // Créer un token JWT pour l'authentification
    const token = await createAuthToken(admin.id)

    // Définir le cookie
    const response = NextResponse.json({ success: true })
    
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 jours
    })

    return response
  } catch (error) {
    console.error('TOTP verification error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 