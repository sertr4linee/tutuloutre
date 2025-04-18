import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;
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

    // Recherche du média en utilisant plusieurs stratégies
    let mediaQuery = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: decodedFilename,
        },
      },
    });

    // Si rien n'est trouvé, essayer avec like au lieu de equals
    if (!mediaQuery.docs || mediaQuery.docs.length === 0) {
      mediaQuery = await payload.find({
        collection: 'media',
        where: {
          filename: {
            like: decodedFilename,
          },
        },
      });
    }

    // Si toujours rien, rechercher par une partie du nom de fichier
    if (!mediaQuery.docs || mediaQuery.docs.length === 0) {
      const simplifiedName = decodedFilename.split('.')[0];
      mediaQuery = await payload.find({
        collection: 'media',
        where: {
          filename: {
            like: simplifiedName,
          },
        },
      });
    }

    // Si on a toujours rien trouvé
    if (!mediaQuery.docs || mediaQuery.docs.length === 0) {
      console.log('Media non trouvé:', decodedFilename);
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    console.log('Media trouvé:', mediaQuery.docs[0].filename);

    // Récupérer l'URL du fichier
    const fileUrl = mediaQuery.docs[0].url;
    if (!fileUrl) {
      return NextResponse.json({ error: 'File URL not found' }, { status: 404 });
    }

    // Servir l'image directement au lieu de rediriger
    try {
      const imageResponse = await fetch(fileUrl);
      
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.status}`);
      }
      
      const imageBuffer = await imageResponse.arrayBuffer();
      const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
      
      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch (fetchError) {
      console.error('Error fetching image from source:', fetchError);
      // Fallback à la redirection si le fetch échoue
      return NextResponse.redirect(fileUrl);
    }
  } catch (error) {
    console.error('Error in media API:', error);
    return NextResponse.json({ error: 'Internal server error'}, { status: 500 });
  }
}