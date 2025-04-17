import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  try {
    // Initialiser Payload correctement
    const payload = await getPayload({
      config: configPromise,
    })

    // Fonction pour récupérer les données d'une collection de manière sécurisée
    const fetchCollection = async (collectionName, options) => {
      try {
        return await payload.find({
          collection: collectionName,
          ...options
        })
      } catch (error) {
        console.error(`Erreur lors de la récupération de ${collectionName}:`, error)
        return { docs: [] } // Retourne un tableau vide si la collection n'existe pas
      }
    }

    // Récupérer les différents types de contenu
    const [blogPosts, photoAlbums, projects] = await Promise.all([
      fetchCollection('blog-posts', {
        limit: 10,
        sort: '-publishDate',
        where: {
          status: {
            equals: 'published',
          },
        },
        depth: 1, // Pour récupérer les médias associés
      }),
      
      fetchCollection('photo-albums', {
        limit: 10,
        sort: '-createdAt',
        depth: 1, // Pour récupérer les médias associés
      }),
      
      fetchCollection('projects', {
        limit: 10,
        sort: '-year',
        depth: 1, // Pour récupérer les médias associés
      }),
    ])

    // Log pour déboguer
    console.log('Blogs récupérés:', blogPosts.docs?.length || 0);
    console.log('Albums récupérés:', photoAlbums.docs?.length || 0);
    console.log('Projets récupérés:', projects.docs?.length || 0);

    // Pour debug, examiner la structure des médias
    if (blogPosts.docs?.[0]?.coverImage) {
      console.log('Structure d\'un média:', JSON.stringify(blogPosts.docs[0].coverImage, null, 2));
    }

    // Transformer les données pour correspondre à la structure utilisée dans le frontend
    const transformedData = {
      blogs: (blogPosts.docs || []).map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishDate: post.publishDate,
        status: post.status,
        slug: post.slug,
        coverImage: post.coverImage?.url ? post.coverImage.url : null,
        featured: post.featured,
        tags: post.tags?.map(tag => tag.tag) || [],
      })),
      
      albums: (photoAlbums.docs || []).map(album => ({
        id: album.id,
        title: album.title,
        description: album.description,
        category: album.category,
        coverImage: album.coverImage?.url ? album.coverImage.url : null,
        imageCount: album.photos?.length || 0,
        createdAt: album.createdAt,
        slug: album.slug,
      })),
      
      projects: (projects.docs || []).map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        year: project.year,
        category: project.category,
        tags: project.tags?.map(tag => tag.tag) || [],
        image: project.image?.url ? project.image.url : null,
        objectives: project.objectives?.map(obj => obj.objective) || [],
        skills: project.skills?.map(skill => skill.skill) || [],
        color: project.color,
        featured: project.featured,
        slug: project.slug,
      })),
    }

    return NextResponse.json({ data: transformedData })
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json({ 
      data: {
        blogs: [],
        albums: [],
        projects: []
      },
      error: 'Erreur lors de la récupération des données de la base'
    }, { status: 500 }) // Retourne une erreur 500 pour indiquer un problème serveur
  }
} 