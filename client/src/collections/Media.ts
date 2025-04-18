import type { CollectionConfig } from 'payload';

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
    },
    // Pour les environnements serverless, nous pouvons ajouter un champ pour une URL externe
    {
      name: 'externalURL',
      type: 'text',
      label: 'URL externe (optionnel)',
      admin: {
        description: 'URL d\'une image stockée ailleurs (Cloudinary, etc.)',
      },
    }
  ],
  upload: {
    // Utilisez uniquement staticURL sans staticDir pour éviter les opérations de système de fichiers
    staticURL: '/media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
};
