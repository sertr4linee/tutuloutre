import type { CollectionConfig } from 'payload';
import path from 'path';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    }
  ],
  upload: {
    // Configuration pour utiliser le dossier public/media
    staticDir: path.resolve(process.cwd(), 'public', 'media'),
    // Propriétés standards pour la version de Payload que vous utilisez
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    // Suppression de formatFilename qui n'existe pas dans votre version de Payload
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1200,
        height: 900,
        position: 'centre',
      },
    ],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.filename) {
          // Nettoyer le nom de fichier ici au lieu d'utiliser formatFilename
          data.filename = data.filename
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-_.]/g, '')
            .toLowerCase();
        }
        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        // Si nous sommes sur Vercel (production)
        if (process.env.VERCEL) {
          // Si le document a une URL et c'est une URL relative
          if (doc.url && doc.url.startsWith('/')) {
            // Remplacer l'URL relative par une URL absolue
            doc.url = `https://une-momes.vercel.app${doc.url}`;
          }
          
          // Faire de même pour les versions d'image si elles existent
          if (doc.sizes) {
            Object.keys(doc.sizes).forEach((size) => {
              if (doc.sizes[size].url && doc.sizes[size].url.startsWith('/')) {
                doc.sizes[size].url = `https://une-momes.vercel.app${doc.sizes[size].url}`;
              }
            });
          }
        }
        return doc;
      },
    ],
  },
};
