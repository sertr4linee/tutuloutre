"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import GradientBackground from "@/components/ui/background"

// Types pour les données
interface Blog {
  id: string
  title: string
  excerpt: string
  category: string
  publishDate: string | Date
  slug: string
  coverImage: string | null
  featured: boolean
  tags: string[]
}

interface Album {
  id: string
  title: string
  description: string | null
  category: string
  coverImage: string | null
  imageCount: number
  createdAt: string
  slug?: string
}

interface SchoolProject {
  id: string
  title: string
  description: string
  year: string
  category: string
  tags: string[]
  image: string | null
  featured: boolean
  slug?: string
}

// Composant de filtre et recherche
const FilterBar = ({ 
  activeFilter, 
  setActiveFilter, 
  searchTerm, 
  setSearchTerm 
}: { 
  activeFilter: string, 
  setActiveFilter: (filter: string) => void,
  searchTerm: string,
  setSearchTerm: (term: string) => void
}) => {
  return (
    <div className="sticky top-4 z-50 w-full max-w-6xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl -z-10"></div>
        <div className="bg-[#FFFBF5] border-3 border-black rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setActiveFilter("all")} 
                className={`px-3 py-1.5 rounded-full border-2 border-black text-sm font-bold transition-all ${activeFilter === "all" ? "bg-black text-white" : "bg-[#FFD2BF] hover:bg-[#f67a45] hover:text-white"}`}
              >
                Tous
              </button>
              <button 
                onClick={() => setActiveFilter("blog")} 
                className={`px-3 py-1.5 rounded-full border-2 border-black text-sm font-bold transition-all ${activeFilter === "blog" ? "bg-black text-white" : "bg-[#FFD2BF] hover:bg-[#f67a45] hover:text-white"}`}
              >
                Blogs
              </button>
              <button 
                onClick={() => setActiveFilter("album")} 
                className={`px-3 py-1.5 rounded-full border-2 border-black text-sm font-bold transition-all ${activeFilter === "album" ? "bg-black text-white" : "bg-[#E9B949] hover:bg-[#f67a45] hover:text-white"}`}
              >
                Albums
              </button>
              <button 
                onClick={() => setActiveFilter("project")} 
                className={`px-3 py-1.5 rounded-full border-2 border-black text-sm font-bold transition-all ${activeFilter === "project" ? "bg-black text-white" : "bg-[#F67A45] hover:bg-[#f67a45] hover:text-white"}`}
              >
                Projets
              </button>
            </div>
            
            <div className="relative flex-grow">
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full -z-10"></div>
              <input 
                type="text"
                placeholder="Recherche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-2 border-black rounded-full py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#F67A45]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Carte d'un blog
const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/work/blog/${blog.slug}`} className="group">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
        <article className="border-3 border-black rounded-lg overflow-hidden bg-white h-full flex flex-col transition-transform group-hover:-translate-y-1">
          <div className="relative h-[180px] overflow-hidden">
            <Image
              src={blog.coverImage || "/placeholder.svg"}
              alt={blog.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-[#FFD2BF] text-black font-bold px-3 py-1 rounded-full border-2 border-black text-xs">
              {blog.category}
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.excerpt}</p>
            </div>
            <div className="flex justify-between items-center">
              <time className="text-xs text-gray-500">
                {new Date(blog.publishDate).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
              <div className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-full">Lire l'article</div>
            </div>
          </div>
        </article>
      </div>
    </Link>
  )
}

// Carte d'un album
const AlbumCard = ({ album }: { album: Album }) => {
  return (
    <Link href={`/work/gallery/${album.slug || album.id}`} className="group">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
        <article className="border-3 border-black rounded-lg overflow-hidden bg-white h-full flex flex-col transition-transform group-hover:-translate-y-1">
          <div className="relative h-[200px] overflow-hidden">
            {album.coverImage ? (
              <Image
                src={album.coverImage}
                alt={album.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="absolute top-3 left-3 bg-[#E9B949] text-black font-bold px-3 py-1 rounded-full border-2 border-black text-xs">
              {album.category || "Photographie"}
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">{album.title}</h3>
              {album.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{album.description}</p>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {album.imageCount || 0} photos
              </div>
              <div className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-full">Voir l'album</div>
            </div>
          </div>
        </article>
      </div>
    </Link>
  )
}

// Carte d'un projet
const ProjectCard = ({ project }: { project: SchoolProject }) => {
  return (
    <Link href={`/work/project/${project.slug || project.id}`} className="group">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
        <article className="border-3 border-black rounded-lg overflow-hidden bg-white h-full flex flex-col transition-transform group-hover:-translate-y-1">
          <div className="relative h-[200px] overflow-hidden" style={{ backgroundColor: `${project.year ? '#F67A45' : '#FFD2BF'}30` }}>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            )}
            <div className="absolute top-3 left-3 bg-[#F67A45] text-black font-bold px-3 py-1 rounded-full border-2 border-black text-xs">
              {project.year || "Projet"}
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-[#FFE8DD] px-2 py-0.5 text-xs rounded-full border border-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-full">Voir le projet</div>
            </div>
          </div>
        </article>
      </div>
    </Link>
  )
}

// Fonctions pour récupérer les données
async function fetchAllContent() {
  try {
    const response = await fetch('/api/work', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données')
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur:', error)
    return {
      error: 'Échec de la récupération des données',
      data: {
        blogs: [],
        albums: [],
        projects: []
      }
    }
  }
}

// Page principale
export default function GalleryViewPage() {
  // États pour les données et filtres
  const [data, setData] = useState<{ blogs: Blog[], albums: Album[], projects: SchoolProject[] }>({ 
    blogs: [], 
    albums: [], 
    projects: [] 
  })
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Récupération des données
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const result = await fetchAllContent()
        if (result && result.data) {
          setData({
            blogs: result.data.blogs || [],
            albums: (result.data.albums || []).map((album: Album) => ({
              ...album,
              imageCount: album.imageCount || 0
            })),
            projects: result.data.projects || []
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrage des données
  const filteredContent = () => {
    let filteredItems: Array<{type: string, data: any}> = []

    // Ajouter les blogs si filtre = all ou blog
    if (activeFilter === "all" || activeFilter === "blog") {
      filteredItems = [
        ...filteredItems,
        ...data.blogs.map(blog => ({type: 'blog', data: blog}))
      ]
    }

    // Ajouter les albums si filtre = all ou album
    if (activeFilter === "all" || activeFilter === "album") {
      filteredItems = [
        ...filteredItems,
        ...data.albums.map(album => ({type: 'album', data: album}))
      ]
    }

    // Ajouter les projets si filtre = all ou project
    if (activeFilter === "all" || activeFilter === "project") {
      filteredItems = [
        ...filteredItems,
        ...data.projects.map(project => ({type: 'project', data: project}))
      ]
    }

    // Filtrer par terme de recherche si non vide
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filteredItems = filteredItems.filter(item => {
        if (item.type === 'blog') {
          return (
            item.data.title.toLowerCase().includes(term) ||
            item.data.excerpt.toLowerCase().includes(term) ||
            item.data.category.toLowerCase().includes(term) ||
            item.data.tags?.some((tag: string) => tag.toLowerCase().includes(term))
          )
        } else if (item.type === 'album') {
          return (
            item.data.title.toLowerCase().includes(term) ||
            (item.data.description && item.data.description.toLowerCase().includes(term)) ||
            (item.data.category && item.data.category.toLowerCase().includes(term))
          )
        } else if (item.type === 'project') {
          return (
            item.data.title.toLowerCase().includes(term) ||
            item.data.description.toLowerCase().includes(term) ||
            item.data.year.toLowerCase().includes(term) ||
            item.data.category?.toLowerCase().includes(term) ||
            item.data.tags?.some((tag: string) => tag.toLowerCase().includes(term))
          )
        }
        return false
      })
    }

    return filteredItems
  }

  // Composant d'affichage durant le chargement
  if (!mounted) return null

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <GradientBackground />
        <div className="relative z-30">
          <div className="relative">
            <div className="bg-[#FFFBF5] border-4 border-black p-8 rounded-lg shadow-brutal relative">
              <div className="flex items-center space-x-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 bg-[#f67a45] border-2 border-black"
                    style={{
                      animation: `bounce 0.6s ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
              <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-black bg-black -z-10" />
            </div>
          </div>
        </div>
        <style jsx global>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
        `}</style>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen py-8 px-4">
      <GradientBackground />
      
      {/* En-tête avec titre */}
      <div className="relative z-30 max-w-6xl mx-auto mb-8">
        <div className="relative inline-block">
          <div className="absolute -top-10 -left-6 transform -rotate-3 z-10">
            <div className="bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm">
              Portfolio
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#2D2D2D] mb-4">
            Ma Collection Complète
          </h1>
        </div>
        <p className="text-lg md:text-xl text-[#3C3C3C] max-w-2xl">
          Tous mes blogs, albums photos et projets réunis en un seul endroit pour une vue d'ensemble de mon travail créatif.
        </p>
      </div>

      {/* Barre de filtres */}
      <FilterBar 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />

      {/* Contenu de la galerie */}
      <div className="relative z-20 max-w-6xl mx-auto">
        {filteredContent().length === 0 ? (
          <div className="bg-white border-3 border-black rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Aucun élément trouvé</h3>
            <p className="text-gray-600">Essayez d'autres critères de recherche ou de filtrage.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent().map((item, index) => {
              if (item.type === 'blog') {
                return <BlogCard key={`blog-${item.data.id || index}`} blog={item.data} />
              } else if (item.type === 'album') {
                return <AlbumCard key={`album-${item.data.id || index}`} album={item.data} />
              } else if (item.type === 'project') {
                return <ProjectCard key={`project-${item.data.id || index}`} project={item.data} />
              }
              return null
            })}
          </div>
        )}
      </div>
      
      {/* Statistiques */}
      <div className="relative z-20 max-w-6xl mx-auto mt-16">
        <div className="relative">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
          <div className="bg-[#FFFBF5] border-3 border-black rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Statistiques du Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#FFD2BF] rounded-lg p-4 border-2 border-black">
                <div className="text-3xl font-bold">{data.blogs.length}</div>
                <div className="text-sm font-medium">Articles de Blog</div>
              </div>
              <div className="bg-[#E9B949] rounded-lg p-4 border-2 border-black">
                <div className="text-3xl font-bold">{data.albums.length}</div>
                <div className="text-sm font-medium">Albums Photo</div>
              </div>
              <div className="bg-[#F67A45] rounded-lg p-4 border-2 border-black">
                <div className="text-3xl font-bold">{data.projects.length}</div>
                <div className="text-sm font-medium">Projets d'École</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liens de navigation */}
      <div className="relative z-20 max-w-6xl mx-auto mt-12 mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/work" className="relative inline-block group">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <button className="relative px-6 py-2.5 bg-[#FFFBF5] border-2 border-black rounded-full font-medium transition-transform">
              ← Retour à la page Work
            </button>
          </Link>
          <Link href="/" className="relative inline-block group">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <button className="relative px-6 py-2.5 bg-[#FFFBF5] border-2 border-black rounded-full font-medium transition-transform">
              Accueil
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}