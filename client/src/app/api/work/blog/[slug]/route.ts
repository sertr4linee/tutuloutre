import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = await prisma.blog.findFirst({
      where: { 
        slug: params.slug,
        status: 'published' // On s'assure que l'article est publié
      },
      include: {
        author: true
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
      id: blog.id,
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      category: blog.category,
      publishDate: blog.publishDate,
      coverImage: blog.coverImage,
      readTime: blog.readTime,
      tags: blog.tags || [],
      status: blog.status,
      featured: blog.featured,
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