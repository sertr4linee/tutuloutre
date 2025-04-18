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

    // Initialiser Payload
    const payload = await getPayload({
      config: configPromise,
    });

    // Recherche du média par filename
    const media = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: decodedFilename,
        },
      },
    });

    if (!media.docs || media.docs.length === 0) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Récupérer l'URL du fichier
    const fileUrl = media.docs[0].url;
    if (!fileUrl) {
      return NextResponse.json({ error: 'File URL not found' }, { status: 404 });
    }

    // Rediriger vers l'URL réelle du fichier
    return NextResponse.redirect(fileUrl);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}