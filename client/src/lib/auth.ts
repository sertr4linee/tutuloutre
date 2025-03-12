import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'
import { createSession as dbCreateSession, getSession as dbGetSession } from './db'
import { compare } from 'bcryptjs'
import { prisma } from './prisma'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key')

export async function loginAdmin(password: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: 'admin' }
    })

    if (!admin) {
      throw new Error('Admin not found')
    }

    const isValid = await compare(password, admin.hashedPassword)
    if (!isValid) {
      throw new Error('Invalid password')
    }

    const token = await createAuthToken(admin.id)
    return { token }
  } catch (error) {
    throw new Error('Authentication failed')
  }
}

export async function createSession(adminId: string) {
  const sessionId = nanoid()
  await dbCreateSession({
    id: sessionId,
    adminId,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
  })
  return { id: sessionId }
}

export async function getSession(req: Request) {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('session_id')?.value
    if (!sessionId) return null

    const session = await dbGetSession(sessionId)
    if (!session || session.expiresAt < new Date()) return null

    return session
  } catch (error) {
    console.error('Session error:', error)
    return null
  }
}

export async function createAuthToken(adminId: string) {
  const token = await new SignJWT({ adminId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(JWT_SECRET)
  
  return token
}

export async function verifyAuthToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
} 