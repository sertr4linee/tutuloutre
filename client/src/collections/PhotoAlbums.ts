import { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const PhotoAlbums: CollectionConfig = {
  slug: 'photo-albums',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'createdAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Architecture',
          value: 'Architecture',
        },
        {
          label: 'Portrait',
          value: 'Portrait',
        },
        {
          label: 'Nature',
          value: 'Nature',
        },
        {
          label: 'Urban',
          value: 'Urban',
        },
      ],
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Photos de l\'album',
      minRows: 1,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Légende',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Mettre en avant cet album',
      defaultValue: false,
    },
  ],
  timestamps: true,
} 