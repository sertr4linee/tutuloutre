import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Admin {
  id: string
  hashedPassword: string
  totpSecret: string | null
}

export interface Session {
  id: string
  adminId: string
  createdAt: Date
  expiresAt: Date
}

export async function getAdminFromDB(): Promise<Admin> {
  const admin = await prisma.admin.findFirst()
  if (!admin) throw new Error('No admin found')
  return admin
}

export async function updateAdminTOTP(adminId: string, totpSecret: string) {
  return prisma.admin.update({
    where: { id: adminId },
    data: { totpSecret }
  })
}

export async function createSession(session: Session) {
  return prisma.session.create({
    data: session
  })
}

export async function getSession(sessionId: string) {
  return prisma.session.findUnique({
    where: { id: sessionId }
  })
}

// Fonction utilitaire pour initialiser l'admin
export async function initializeAdmin(hashedPassword: string) {
  const existingAdmin = await prisma.admin.findFirst()
  if (existingAdmin) return existingAdmin

  return prisma.admin.create({
    data: {
      id: 'admin',
      hashedPassword,
      totpSecret: null
    }
  })
} 