// Types pour la page Work
export interface Blog {
  id: string
  title: string
  excerpt: string
  content?: string
  category: string
  publishDate: string | Date
  status?: string
  slug: string
  coverImage: string | null
  featured: boolean
  tags: string[]
}

export interface Album {
  id: string
  title: string
  description: string | null
  category: string
  coverImage: string | null
  imageCount: number
  createdAt: string
}

export interface SchoolProject {
  id: string
  title: string
  description: string
  year: string
  category: string
  tags: string[]
  image: string | null
  objectives: string[]
  skills: string[]
  color: string
  featured: boolean
  slug?: string
} 