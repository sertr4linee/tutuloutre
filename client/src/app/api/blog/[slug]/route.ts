import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: params.slug },
      include: {
        author: true  // On inclut tout l'auteur pour l'instant
      }
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // On formate la réponse pour ne pas exposer les données sensibles
    const formattedBlog = {
      ...blog,
      tags: blog.tags || [], // S'assurer que tags est toujours un tableau
      author: {
        name: 'Une Môme' // Pour l'instant on hardcode le nom
      }
    }

    return NextResponse.json(formattedBlog)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
} 