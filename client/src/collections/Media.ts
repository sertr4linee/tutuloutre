import type { CollectionConfig } from 'payload';
import path from 'path';
import fs from 'fs';

// Fonction utilitaire pour copier le fichier vers le dossier public/media
const copyToPublicMedia = async (filePath: string, fileName: string): Promise<void> => {
  try {
    // Chemin absolu vers le dossier public/media
    const publicMediaDir = path.resolve(process.cwd(), 'public/media');
    const publicPath = path.join(publicMediaDir, fileName);
    
    // Vérifier si le dossier public/media existe, sinon le créer
    if (!fs.existsSync(publicMediaDir)) {
      fs.mkdirSync(publicMediaDir, { recursive: true });
    }
    
    // Copier le fichier
    fs.copyFileSync(filePath, publicPath);
    console.log(`Fichier copié vers: ${publicPath}`);
    
    return;
  } catch (error) {
    console.error('Erreur lors de la copie du fichier:', error);
    throw error;
  }
};

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        console.log('Media afterChange hook called with document:', doc);
        
        // Si nous avons un fichier et qu'il a été téléchargé
        if (doc.filename && doc.url) {
          try {
            // Chemin du fichier téléchargé
            // Pour les fichiers téléchargés, l'URL est relative à la racine du projet
            // Par exemple: /media/mon-image.jpg
            let uploadedFilePath = '';
            
            if (doc.url.startsWith('/')) {
              // Si l'URL commence par /, on supprime le premier caractère
              uploadedFilePath = path.join(process.cwd(), doc.url.substring(1));
            } else {
              uploadedFilePath = path.join(process.cwd(), doc.url);
            }
            
            console.log('Chemin du fichier uploadé:', uploadedFilePath);
            
            // Vérifier si le fichier existe
            if (fs.existsSync(uploadedFilePath)) {
              console.log('Fichier trouvé, copie vers public/media...');
              // Copier vers public/media
              await copyToPublicMedia(uploadedFilePath, doc.filename);
            } else {
              console.warn(`Le fichier ${uploadedFilePath} n'existe pas. Essai de chemin alternatif...`);
              
              // Essayer un chemin alternatif - parfois les fichiers sont dans /media directement
              const altPath = path.join(process.cwd(), 'media', doc.filename);
              if (fs.existsSync(altPath)) {
                console.log('Fichier trouvé dans le chemin alternatif:', altPath);
                await copyToPublicMedia(altPath, doc.filename);
              } else {
                console.error('Impossible de trouver le fichier à copier.');
              }
            }
          } catch (error) {
            console.error('Erreur lors du traitement du média:', error);
          }
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
};
