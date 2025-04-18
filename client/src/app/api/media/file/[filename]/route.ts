import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

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
      const media = mediaQuery.docs[0];
      
      // Vérifier s'il existe une URL externe
      if (media.externalURL) {
        return NextResponse.redirect(media.externalURL);
      }
      
      // Sinon, utiliser l'URL standard si disponible
      if (media.url) {
        // Construire une URL complète si c'est une URL relative
        if (media.url.startsWith('/')) {
          const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || new URL(request.url).origin;
          return NextResponse.redirect(`${baseUrl}${media.url}`);
        }
        return NextResponse.redirect(media.url);
      }
    }

    // Si le média n'est pas trouvé
    return NextResponse.json({ error: 'Media not found' }, { status: 404 });
  } catch (error) {
    console.error('Error while processing media request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}