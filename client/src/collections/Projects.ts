import { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'featured'],
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
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Branding',
          value: 'Branding',
        },
        {
          label: 'UI/UX',
          value: 'UI/UX',
        },
        {
          label: 'Illustration',
          value: 'Illustration',
        },
        {
          label: 'Web Design',
          value: 'Web Design',
        },
        {
          label: 'Print',
          value: 'Print',
        },
      ],
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie d\'images supplémentaires',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'objectives',
      type: 'array',
      label: 'Objectifs du projet',
      minRows: 1,
      fields: [
        {
          name: 'objective',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Compétences utilisées',
      minRows: 1,
      fields: [
        {
          name: 'skill',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'color',
      type: 'text',
      label: 'Couleur du projet (code hex)',
      defaultValue: '#f67a45',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Mettre en avant ce projet',
      defaultValue: false,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu détaillé du projet',
    },
  ],
} 