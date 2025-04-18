"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import GradientBackground from "@/components/ui/background"
import LoadingSpinner from "@/components/work/LoadingSpinner"

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

// Function to fetch all photo albums
async function getPhotoAlbums() {
  try {
    const response = await fetch(`/api/gallery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error("Error fetching photo albums")
    }

    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    return {
      error: "Failed to fetch photo albums",
      data: { albums: [] },
    }
  }
}

export default function AllGalleriesPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("Tous")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch albums
  const fetchAlbums = useCallback(async () => {
    try {
      const result = await getPhotoAlbums()
      if (result && result.data && result.data.albums) {
        setAlbums(result.data.albums)
      }
    } catch (error) {
      console.error("Error fetching albums:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlbums()
  }, [fetchAlbums])

  // Get unique categories
  const categories = ["Tous", ...Array.from(new Set(albums.map(album => album.category)))]

  // Filter albums based on selected category
  const filteredAlbums = albums.filter(album => 
    filter === "Tous" ? true : album.category === filter
  )

  if (!mounted) return null

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <main className="min-h-screen pt-12 pb-20 px-4">
      <GradientBackground />

      <div className="max-w-6xl mx-auto">
        <Link href="/work">
          <button className="relative group inline-flex items-center mb-8">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
            <div className="relative inline-flex items-center px-5 py-2 bg-white border-2 border-black rounded-full font-medium transition-transform group-hover:-translate-y-0.5">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux travaux
            </div>
          </button>
        </Link>

        {/* Header */}
        <div className="relative mb-10">
          <div className="absolute -top-10 -left-6 transform -rotate-3 z-10">
            <div className="bg-[#E9B949] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm">
              Photographie
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#2D2D2D] mb-4 mt-8">
            Tous mes albums photos
          </h1>
          <p className="text-lg text-[#3C3C3C] max-w-2xl">
            Découvrez l'ensemble de mes travaux photographiques classés par thèmes et projets.
          </p>
        </div>

        {/* Category filters */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl -z-10"></div>
          <div className="border-3 border-black bg-white p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Filtrer par catégorie</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full border-2 border-black transition-colors ${
                    filter === category 
                      ? 'bg-black text-white' 
                      : category === 'Tous' 
                        ? 'bg-[#E9B949] hover:bg-gray-100'
                        : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Albums grid */}
        {filteredAlbums.length === 0 ? (
          <div className="relative">
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl -z-10"></div>
            <div className="border-3 border-black bg-white p-8 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-2">Aucun album trouvé</h3>
              <p className="text-gray-600">Aucun album dans cette catégorie pour le moment.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => (
              <Link
                key={album.id}
                href={`/work/gallery/${album.slug || album.id}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <article className="border-3 border-black rounded-xl overflow-hidden bg-white">
                  <div className="relative aspect-[4/3]">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                      {album.category}
                    </div>
                  </div>
                  <div className="p-5 border-t-3 border-black">
                    <h3 className="text-xl font-bold mb-1">{album.title}</h3>
                    {album.description && (
                      <p className="text-gray-600 mb-2 line-clamp-2">{album.description}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">
                        {new Date(album.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-bold border border-gray-300">
                        {album.imageCount} photos
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Link to gallery view */}
        <div className="mt-16 text-center">
          <Link href="/gallery-view" className="relative inline-block group">
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-full transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
            <button className="relative px-8 py-3 bg-[#E9B949] border-3 border-black rounded-full font-bold transition-transform group-hover:-translate-y-0.5 inline-flex items-center">
              Voir tout mon portfolio
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}