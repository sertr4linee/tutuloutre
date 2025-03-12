import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const slug = formData.get('slug') as string

    if (!file || !slug) {
      return NextResponse.json(
        { error: 'File and slug are required' },
        { status: 400 }
      )
    }

    // Créer le chemin du dossier pour ce blog
    const blogDir = path.join(process.cwd(), 'public', 'blogs', slug)
    
    // Créer le dossier s'il n'existe pas
    try {
      await mkdir(blogDir, { recursive: true })
    } catch (error) {
      console.error('Error creating directory:', error)
    }

    // Générer un nom de fichier unique
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const filepath = path.join(blogDir, filename)

    // Convertir le File en Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Écrire le fichier
    await writeFile(filepath, buffer)

    // Retourner l'URL relative pour accéder à l'image
    const imageUrl = `/blogs/${slug}/${filename}`
    return NextResponse.json({ url: imageUrl })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
} 