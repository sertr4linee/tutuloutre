import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

// Define the Media type to match your collection structure
interface MediaDocument {
  id: string;
  filename?: string;
  alt?: string;
  url?: string;
  externalURL?: string; // Add the externalURL field to fix TypeScript errors
  [key: string]: any; // Allow other properties
}

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    // Attendre les paramètres avant de les utiliser
    const paramsData = await Promise.resolve(params);
    const { filename } = paramsData;
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Décodage de l'URL pour gérer les caractères spéciaux
    const decodedFilename = decodeURIComponent(filename);
    
    console.log('Recherche du média:', decodedFilename);

    // Initialiser Payload
    const payload = await getPayload({
      config: configPromise,
    });

    // Recherche du média
    const mediaQuery = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: decodedFilename,
        },
      },
    });

    // Si on a trouvé le média dans Payload
    if (mediaQuery.docs && mediaQuery.docs.length > 0) {
      const media = mediaQuery.docs[0] as MediaDocument;
      
      // Vérifier s'il existe une URL externe
      if (media.externalURL) {
        // Utilisez un proxy pour éviter les problèmes CORS et les boucles de redirection
        try {
          const response = await fetch(media.externalURL);
          const buffer = await response.arrayBuffer();
          const headers = new Headers();
          
          // Copie des headers de type de contenu
          if (response.headers.get('content-type')) {
            headers.set('content-type', response.headers.get('content-type') || '');
          } else {
            // Déterminer le type MIME en fonction de l'extension
            const ext = decodedFilename.split('.').pop()?.toLowerCase();
            if (ext === 'jpg' || ext === 'jpeg') headers.set('content-type', 'image/jpeg');
            else if (ext === 'png') headers.set('content-type', 'image/png');
            else if (ext === 'gif') headers.set('content-type', 'image/gif');
            else if (ext === 'webp') headers.set('content-type', 'image/webp');
            else headers.set('content-type', 'application/octet-stream');
          }
          
          // Cache pour 24 heures
          headers.set('cache-control', 'public, max-age=86400');
          
          return new NextResponse(buffer, {
            status: 200,
            headers,
          });
        } catch (fetchError) {
          console.error('Error fetching external media:', fetchError);
          return NextResponse.json({ error: 'Error fetching external media' }, { status: 500 });
        }
      }
      
      // Pour les fichiers gérés par Payload, utiliser l'API de fichiers de Payload directement
      try {
        const file = await payload.findByID({
          collection: 'media',
          id: media.id,
          depth: 0,
        });
        
        if (file) {
          // Éviter une boucle infinie de redirection en ajoutant un paramètre
          const currentUrl = new URL(request.url);
          if (currentUrl.searchParams.get('direct') !== 'true') {
            // Redirection unique vers l'URL de Payload avec un paramètre pour éviter les boucles
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || currentUrl.origin;
            const directUrl = new URL(`/api/files/media/${media.id}`, baseUrl);
            directUrl.searchParams.set('direct', 'true');
            return NextResponse.redirect(directUrl.toString());
          }
        }
      } catch (fileError) {
        console.error('Error accessing media file through Payload:', fileError);
      }
    }

    // Si le média n'est pas trouvé dans la base ou si une erreur survient, essayer de servir depuis /public/media
    try {
      // Tenter d'utiliser l'URL statique via la redirection vers /media/filename
      // Cela fonctionnera si le fichier est présent dans le dossier public/media
      const staticUrl = `/media/${decodedFilename}`;
      return NextResponse.redirect(staticUrl);
    } catch (error) {
      console.error("Impossible d'accéder au fichier statique:", error);
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error while processing media request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}