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
  ],
  upload: {
    // The plugin-cloud-storage will handle the actual storage
    // so we don't need staticDir anymore
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
};
