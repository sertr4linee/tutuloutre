import { NextResponse } from 'next/server'
import { compare } from 'bcrypt'
import { getAdminFromDB } from '@/lib/db'
import { createSession } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    const admin = await getAdminFromDB()

    const isValid = await compare(password, admin.hashedPassword)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Créer une session
    const session = await createSession(admin.id)

    return NextResponse.json({
      isFirstLogin: !admin.totpSecret,
      sessionId: session.id
    })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 