// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogPosts } from './collections/BlogPosts'
import { PhotoAlbums } from './collections/PhotoAlbums'
import { Projects } from './collections/Projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Déterminer l'URL de base en fonction de l'environnement
const serverURL = process.env.VERCEL
  ? 'https://une-momes.vercel.app'
  : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

const config = buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users, 
    Media, 
    BlogPosts,
    PhotoAlbums,
    Projects
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  // Suppression de la configuration upload qui cause l'erreur TypeScript
  sharp,
  plugins: [
    payloadCloudPlugin(),
  ],
  // Définir les URLs pour le serveur Payload
  serverURL: serverURL,
})

export default config
