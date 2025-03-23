import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { withAuth } from '@/lib/auth'

const prisma = new PrismaClient()

async function handler(req: Request, userId: string) {
  if (req.method === 'GET') {
    try {
      const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(blogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
    }
  }

  if (req.method === 'POST') {
    try {
      const data = await req.json()
      const blog = await prisma.blog.create({
        data: {
          ...data,
          authorId: userId
        }
      })
      return NextResponse.json(blog)
    } catch (error) {
      console.error('Error creating blog:', error)
      return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export const GET = withAuth(handler)
export const POST = withAuth(handler) 