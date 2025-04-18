import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Payload } from 'payload'

// Interface pour les objets média
interface MediaObject {
  filename?: string;
  url?: string;
}

// Interfaces pour les objets retournés par Payload
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  publishDate: string;
  status: string;
  slug: string;
  coverImage?: MediaObject;
  featured: boolean;
  tags?: { tag: string }[];
}

interface PhotoAlbum {
  id: string;
  title: string;
  description: string | null;
  category: string;
  coverImage?: MediaObject;
  photos?: any[];
  imageCount?: number;
  createdAt: string;
  slug?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  category: string;
  tags?: { tag: string }[];
  image?: MediaObject;
  objectives?: { objective: string }[];
  skills?: { skill: string }[];
  color: string;
  featured: boolean;
  slug?: string;
}

// Type pour les résultats des collections
interface CollectionResult<T> {
  docs: T[];
  [key: string]: any;
}

// Fonction utilitaire pour transformer les URL des médias
function transformMediaUrl(mediaObject: MediaObject | undefined): string | null {
  if (!mediaObject) return null;
  
  // Si nous avons un filename, utiliser le chemin statique dans /public/media
  if (mediaObject.filename) {
    return `/media/${mediaObject.filename}`;
  }
  
  // Fallback sur l'URL normale
  if (mediaObject.url) {
    return mediaObject.url;
  }
  
  return null;
}

export async function GET() {
  try {
    // Initialiser Payload correctement
    const payload = await getPayload({
      config: configPromise,
    })

    // Fonction pour récupérer les données d'une collection de manière sécurisée
    const fetchCollection = async <T>(collection: 'blog-posts' | 'photo-albums' | 'projects' | string, options: Record<string, any>): Promise<CollectionResult<T>> => {
      try {
        // Type cast pour éviter l'erreur TypeScript
        const result = await (payload as any).find({
          collection,
          ...options
        });
        return result as CollectionResult<T>;
      } catch (error) {
        console.error(`Erreur lors de la récupération de ${collection}:`, error)
        return { docs: [] } as CollectionResult<T>; // Retourne un tableau vide si la collection n'existe pas
      }
    }

    // Récupérer les différents types de contenu
    const [blogPosts, photoAlbums, projects] = await Promise.all([
      fetchCollection<BlogPost>('blog-posts', {
        limit: 10,
        sort: '-publishDate',
        where: {
          status: {
            equals: 'published',
          },
        },
        depth: 1, // Pour récupérer les médias associés
      }),
      
      fetchCollection<PhotoAlbum>('photo-albums', {
        limit: 10,
        sort: '-createdAt',
        depth: 1, // Pour récupérer les médias associés
      }),
      
      fetchCollection<Project>('projects', {
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
      blogs: (blogPosts.docs || []).map((post) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishDate: post.publishDate,
        status: post.status,
        slug: post.slug,
        coverImage: transformMediaUrl(post.coverImage), // Utiliser la fonction de transformation
        featured: post.featured,
        tags: post.tags?.map((tag) => tag.tag) || [],
      })),
      
      albums: (photoAlbums.docs || []).map((album) => ({
        id: album.id,
        title: album.title,
        description: album.description,
        category: album.category,
        coverImage: transformMediaUrl(album.coverImage), // Utiliser la fonction de transformation
        imageCount: album.photos?.length || 0,
        createdAt: album.createdAt,
        slug: album.slug,
      })),
      
      projects: (projects.docs || []).map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        year: project.year,
        category: project.category,
        tags: project.tags?.map((tag) => tag.tag) || [],
        image: transformMediaUrl(project.image), // Utiliser la fonction de transformation
        objectives: project.objectives?.map((obj) => obj.objective) || [],
        skills: project.skills?.map((skill) => skill.skill) || [],
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