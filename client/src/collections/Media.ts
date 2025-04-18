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
    // Suppression de filesRequireAuth qui cause l'erreur
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
        // Simplification du nom de fichier pour éviter les problèmes
        if (data.filename) {
          // Remplacer les espaces par des tirets et supprimer les caractères spéciaux
          data.filename = data.filename
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-_.]/g, '')
            .toLowerCase();
        }
        return data;
      },
    ],
  },
};
