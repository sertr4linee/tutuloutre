import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Make sure slug exists before proceeding
    const slug = params?.slug;
    if (!slug) {
      console.error('No project slug provided');
      return NextResponse.json(
        { error: 'Project slug is required' },
        { status: 400 }
      );
    }
    
    console.log('Fetching project with slug:', slug);
    
    // Initialize payload with config
    const payload = await getPayload({
      config: await configPromise,
    });
    
    // Log available collections for debugging
    console.log('Available collections:', Object.keys(payload.collections));
    
    // Check if the projects collection exists
    if (!Object.keys(payload.collections).includes('projects')) {
      console.error('Collection projects not found');
      return NextResponse.json(
        { error: 'Projects collection not configured properly' },
        { status: 500 }
      );
    }

    // Récupérer le projet par son slug - remove the status filter initially to debug
    const projectResult = await payload.find({
      collection: 'projects' as any, // Type cast to avoid TS error
      where: {
        slug: {
          equals: slug,
        },
        // Temporarily remove status filter for testing
        // status: {
        //   equals: 'published',
        // },
      },
      depth: 1, // Pour récupérer les champs liés comme les images
    });

    console.log('Project query result:', projectResult.docs ? `Found ${projectResult.docs.length} docs` : 'No docs found');

    // Si aucun projet n'est trouvé
    if (!projectResult.docs || projectResult.docs.length === 0) {
      return NextResponse.json(
        { error: 'Projet non trouvé', slug: slug },
        { status: 404 }
      )
    }

    const project = projectResult.docs[0];
    
    // Log found project data
    console.log('Found project with title:', project.title);
    
    // Map specific array fields properly
    const tags = project.tags?.map((tag: any) => 
      typeof tag === 'object' && tag.tag ? tag.tag : tag
    ) || [];
    
    const objectives = project.objectives?.map((obj: any) => 
      typeof obj === 'object' && obj.objective ? obj.objective : obj
    ) || [];
    
    const skills = project.skills?.map((skill: any) => 
      typeof skill === 'object' && skill.skill ? skill.skill : skill
    ) || [];

    // Transformer les données pour le frontend
    const transformedProject = {
      id: project.id,
      title: project.title,
      description: project.description,
      year: project.year,
      category: project.category,
      tags: tags,
      image: project.image?.url || null,
      objectives: objectives,
      skills: skills,
      color: project.color || '#F67A45',
      featured: project.featured || false,
      slug: project.slug,
      content: project.content,
    }

    // Ajouter des logs pour déboguer
    console.log(`Projet trouvé: ${project.title}`);

    return NextResponse.json({ 
      data: transformedProject
    })

  } catch (error) {
    console.error('Erreur lors de la récupération du projet :', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du projet', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
} 