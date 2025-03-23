import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { withAuth } from '@/lib/auth'

const prisma = new PrismaClient()

async function handler(req: Request, userId: string) {
  if (req.method === 'GET') {
    try {
      const about = await prisma.about.findFirst()
      return NextResponse.json(about || {})
    } catch (error) {
      console.error('Error fetching about data:', error)
      return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
    }
  }

  if (req.method === 'POST') {
    try {
      const data = await req.json()
      const about = await prisma.about.upsert({
        where: { id: '1' },
        update: data,
        create: { id: '1', ...data }
      })
      return NextResponse.json(about)
    } catch (error) {
      console.error('Error updating about data:', error)
      return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export const GET = withAuth(handler)
export const POST = withAuth(handler) 