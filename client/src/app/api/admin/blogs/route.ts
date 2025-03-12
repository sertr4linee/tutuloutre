import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminFromDB } from '@/lib/db'

// Simulation d'une base de données (à remplacer par une vraie DB)
let blogs = [
  {
    id: '1',
    title: 'Comment j\'ai conçu l\'identité visuelle pour Studio Lumière',
    excerpt: 'Une plongée dans mon processus créatif pour développer une identité de marque qui capture l\'essence de la photographie contemporaine.',
    content: '...',
    coverImage: '/blog/studio-lumiere.jpg',
    category: 'Branding',
    publishDate: '2023-05-12',
    status: 'published'
  },
  {
    id: '2',
    title: 'L\'importance de la typographie dans le design web moderne',
    excerpt: 'Découvrez comment la typographie peut transformer l\'expérience utilisateur et renforcer l\'identité de votre marque en ligne.',
    content: '...',
    coverImage: '/blog/typography.jpg',
    category: 'Web Design',
    publishDate: '2023-04-03',
    status: 'published'
  },
  {
    id: '3',
    title: 'Créer des illustrations qui racontent une histoire',
    excerpt: 'Techniques et astuces pour créer des illustrations narratives qui captivent votre audience.',
    content: '...',
    coverImage: '/blog/illustrations.jpg',
    category: 'Illustration',
    publishDate: '2023-03-18',
    status: 'published'
  }
]

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        publishDate: 'desc'
      }
    })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Générer le slug à partir du titre
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        coverImage: data.coverImage,
        status: data.status,
        featured: data.featured,
        tags: data.tags,
        slug,
        authorId: 'admin', // Temporaire, à remplacer par l'ID réel de l'admin
        readTime: Math.ceil(data.content.split(' ').length / 200) // Estimation basée sur 200 mots par minute
      }
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const blog = await prisma.blog.update({
      where: { id: data.id },
      data
    });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.blog.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 