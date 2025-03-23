import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const albums = await prisma.album.findMany()
    return NextResponse.json(albums)
  } catch (error) {
    console.error('Error fetching albums:', error)
    return NextResponse.json({ error: 'Failed to fetch albums' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const album = await prisma.album.create({
      data
    })
    return NextResponse.json(album)
  } catch (error) {
    console.error('Error creating album:', error)
    return NextResponse.json({ error: 'Failed to create album' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json()
    const album = await prisma.album.update({
      where: { id },
      data
    })
    return NextResponse.json(album)
  } catch (error) {
    console.error('Error updating album:', error)
    return NextResponse.json({ error: 'Failed to update album' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.album.delete({
      where: { id }
    })
    return NextResponse.json({ message: 'Album deleted successfully' })
  } catch (error) {
    console.error('Error deleting album:', error)
    return NextResponse.json({ error: 'Failed to delete album' }, { status: 500 })
  }
} 