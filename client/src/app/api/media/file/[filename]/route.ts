import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import path from 'path';
import fs from 'fs';

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

    // Servir directement depuis le dossier public/media si possible
    const publicMediaPath = path.join(process.cwd(), 'public', 'media', decodedFilename);
    
    if (fs.existsSync(publicMediaPath)) {
      console.log('Fichier trouvé dans public/media:', publicMediaPath);
      try {
        const fileBuffer = fs.readFileSync(publicMediaPath);
        const fileExtension = path.extname(decodedFilename).toLowerCase();
        
        // Déterminer le type MIME en fonction de l'extension
        let contentType = 'application/octet-stream';
        switch (fileExtension) {
          case '.jpg':
          case '.jpeg':
            contentType = 'image/jpeg';
            break;
          case '.png':
            contentType = 'image/png';
            break;
          case '.gif':
            contentType = 'image/gif';
            break;
          case '.svg':
            contentType = 'image/svg+xml';
            break;
          case '.webp':
            contentType = 'image/webp';
            break;
        }
        
        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      } catch (fsError) {
        console.error('Erreur lors de la lecture du fichier:', fsError);
      }
    }

    // Si le fichier n'est pas trouvé dans public/media, utiliser Payload
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

      // Important: convertir en URL absolue si c'est une URL relative
      let absoluteFileUrl = fileUrl;
      if (fileUrl.startsWith('/')) {
        // Pour le développement local, utiliser l'URL de la requête comme base
        const baseUrl = new URL(request.url).origin;
        absoluteFileUrl = `${baseUrl}${fileUrl}`;
      }

      // Copier le fichier vers public/media pour les futures requêtes
      try {
        // Chemin source depuis le répertoire media à la racine
        const srcPath = path.join(process.cwd(), 'media', decodedFilename);
        if (fs.existsSync(srcPath)) {
          const destPath = path.join(process.cwd(), 'public', 'media', decodedFilename);
          const destDir = path.dirname(destPath);
          
          // Assurer que le répertoire existe
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          
          // Copier le fichier
          fs.copyFileSync(srcPath, destPath);
          console.log(`Fichier copié vers public/media: ${destPath}`);
        }
      } catch (copyError) {
        console.warn('Erreur lors de la copie du fichier vers public/media:', copyError);
        // On continue même si la copie échoue
      }

      // Lire directement depuis le disque si c'est une URL locale
      if (absoluteFileUrl.startsWith('http')) {
        // Servir l'image depuis l'URL distante
        try {
          const imageResponse = await fetch(absoluteFileUrl);
          
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
        }
      } else {
        // URL locale, renvoyer vers l'URL du frontend où l'image sera servie correctement
        const baseUrl = new URL(request.url).origin;
        return NextResponse.redirect(`${baseUrl}/media/${decodedFilename}`);
      }
    }

    // Si on arrive ici, c'est qu'on n'a pas réussi à servir l'image
    console.log('Impossible de servir l\'image:', decodedFilename);
    
    // Retourner une image par défaut ou une erreur
    return NextResponse.json({ error: 'Media not found or cannot be served' }, { status: 404 });
  } catch (error) {
    console.error('Error in media API:', error);
    return NextResponse.json({ error: 'Internal server error'}, { status: 500 });
  }
}