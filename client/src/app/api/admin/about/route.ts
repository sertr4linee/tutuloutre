import { NextResponse } from 'next/server'
import { getAdminFromDB } from '@/lib/db'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromDB()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    
    const about = await prisma.about.upsert({
      where: {
        id: 'default'
      },
      update: {
        myApproach: data.myApproach,
        degree: data.education.degree,
        school: data.education.school,
        years: data.education.years,
        skills: data.skills
      },
      create: {
        id: 'default',
        myApproach: data.myApproach,
        degree: data.education.degree,
        school: data.education.school,
        years: data.education.years,
        skills: data.skills
      }
    })

    // Transform the response to match the expected format
    const response = {
      ...about,
      education: {
        degree: about.degree,
        school: about.school,
        years: about.years
      }
    }

    return NextResponse.json({ success: true, data: response })
  } catch (error) {
    console.error('Error updating about page:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Ajouter une route GET pour récupérer les données
export async function GET() {
  try {
    const about = await prisma.about.findFirst()
    if (!about) {
      return NextResponse.json(null)
    }

    // Transform the response to match the expected format
    const response = {
      ...about,
      education: {
        degree: about.degree,
        school: about.school,
        years: about.years
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching about data:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 