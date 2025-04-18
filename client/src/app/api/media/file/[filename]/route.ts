import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    // Attendre les paramètres avant de les utiliser (pour résoudre l'avertissement des API Routes)
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

    // Si on a trouvé le média dans Payload
    if (mediaQuery.docs && mediaQuery.docs.length > 0) {
      console.log('Media trouvé dans Payload:', mediaQuery.docs[0].filename);

      // Récupérer l'URL du fichier
      const fileUrl = mediaQuery.docs[0].url;
      if (!fileUrl) {
        return NextResponse.json({ error: 'File URL not found' }, { status: 404 });
      }

      // Redirect to the file URL (will be handled by the cloud storage adapter)
      return NextResponse.redirect(fileUrl);
    }

    // Si le média n'est pas trouvé
    return NextResponse.json({ error: 'Media not found' }, { status: 404 });
  } catch (error) {
    console.error('Error while processing media request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}