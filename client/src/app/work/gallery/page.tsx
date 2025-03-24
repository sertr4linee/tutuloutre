"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '@/components/ui/background'
import ResponsiveGrid from '@/components/ui/ResponsiveGrid'
import { getPublicAlbums } from '@/app/actions'

interface Album {
  id: string
  title: string
  description: string | null
  category: string
  coverImage: string | null
  images: {
    id: string
    url: string
    caption: string | null
  }[]
}

export default function Gallery() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const categories = ['Tous', 'Urban', 'Portrait', 'Nature', 'Architecture']

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const result = await getPublicAlbums()
        if (result.error) {
          throw new Error(result.error)
        }
        if (result.data) {
          setAlbums(result.data.map(album => ({
            ...album,
            images: []
          })))
        }
      } catch (error) {
        console.error('Error fetching albums:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

  const filteredAlbums = selectedCategory === 'Tous'
    ? albums
    : albums.filter(album => album.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5]">
        <div className="relative">
          <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full"></div>
          <div className="relative animate-spin rounded-full h-32 w-32 border-4 border-black border-t-[#FFFBF5] bg-[#FFFBF5]"></div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF5] relative">
      <GradientBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header with category filters */}
        <div className="mb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Galerie Photo</h1>
              <p className="text-gray-600">Découvrez mes séries photographiques</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border-2 border-black transition-all transform hover:-translate-y-0.5 ${
                    selectedCategory === category
                      ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white hover:bg-gray-50 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
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
          <div className="text-center py-12">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl"></div>
              <div className="relative bg-white border-2 border-black rounded-xl p-8">
                <p className="text-xl font-bold mb-2">Aucun album trouvé</p>
                <p className="text-gray-600">Il n'y a pas encore d'albums dans cette catégorie</p>
              </div>
            </div>
          </div>
        ) : (
          <ResponsiveGrid
            columns={{ sm: 1, md: 2, lg: 3 }}
            gap={{ sm: 6, md: 8, lg: 8 }}
            className="mb-12"
          >
            {filteredAlbums.map((album) => (
              <Link
                key={album.id}
                href={`/work/gallery/${album.id}`}
                className="group relative block"
              >
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <div className="relative border-2 border-black rounded-xl overflow-hidden bg-white">
                  <div className="relative aspect-[4/3]">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-1">{album.title}</h2>
                    {album.description && (
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{album.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#E9B949] text-black rounded-full text-sm border-2 border-black">
                        {album.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {album.images?.length || 0} photos
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </ResponsiveGrid>
        )}
      </div>
    </main>
  )
} 