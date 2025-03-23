import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { authenticator } from 'otplib'
import { saveToken, removeToken } from '@/lib/redis'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  console.log('POST /api/admin/auth - Start')
  try {
    const body = await request.json()
    console.log('Request body:', { ...body, password: '[REDACTED]' })

    const { username, password, totp } = body

    const admin = await prisma.admin.findUnique({
      where: { id: username }
    })
    console.log('Admin found:', admin ? 'yes' : 'no')

    if (!admin) {
      console.log('Invalid credentials - admin not found')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValidPassword = await compare(password, admin.hashedPassword)
    console.log('Password valid:', isValidPassword)
    
    if (!isValidPassword) {
      console.log('Invalid credentials - wrong password')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValidTOTP = authenticator.verify({
      token: totp,
      secret: admin.totpSecret!
    })
    console.log('TOTP valid:', isValidTOTP)

    if (!isValidTOTP) {
      console.log('Invalid TOTP code')
      return NextResponse.json({ error: 'Invalid TOTP code' }, { status: 401 })
    }

    const token = sign({ id: admin.id }, process.env.JWT_SECRET!, {
      expiresIn: '1d'
    })
    console.log('JWT token generated')

    await saveToken(admin.id, token)
    console.log('Token saved to Redis')

    console.log('Login successful')
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  console.log('DELETE /api/admin/auth - Start')
  try {
    const authHeader = request.headers.get('authorization')
    console.log('Auth header present:', !!authHeader)
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid auth header')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verify(token, process.env.JWT_SECRET!) as { id: string }
    console.log('Token verified, user id:', decoded.id)
    
    await removeToken(decoded.id)
    console.log('Token removed from Redis')
    
    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 