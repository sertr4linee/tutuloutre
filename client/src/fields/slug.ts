import { Field } from 'payload/types'

export const slugField = (field: string): Field => ({
  name: 'slug',
  type: 'text',
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      ({ data, siblingData }) => {
        if (!siblingData?.slug && data?.[field]) {
          return generateSlug(data[field])
        }
      },
    ],
  },
})

const generateSlug = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/[^\w\-]+/g, '') // Supprime les caractères spéciaux
    .replace(/\-\-+/g, '-') // Remplace les doubles tirets par un seul
    .replace(/^-+/, '') // Supprime les tirets au début
    .replace(/-+$/, '') // Supprime les tirets à la fin
} 