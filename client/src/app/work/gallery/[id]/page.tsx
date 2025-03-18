"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '@/components/ui/background'

interface Album {
  id: string
  title: string
  description?: string
  category: string
  coverImage?: string
  images: {
    id: string
    url: string
    caption?: string
  }[]
}

export default function AlbumPage() {
  const params = useParams()
  const [album, setAlbum] = useState<Album | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const res = await fetch(`/api/admin/albums/${params.id}`)
        if (!res.ok) throw new Error('Failed to fetch album')
        const data = await res.json()
        setAlbum(data)
      } catch (error) {
        console.error('Error fetching album:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchAlbum()
    }
  }, [params.id])

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

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5]">
        <div className="relative">
          <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl"></div>
          <div className="relative bg-white border-2 border-black rounded-xl p-8">
            <h1 className="text-2xl font-bold">Album non trouvé</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF5] relative">
      <GradientBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* En-tête */}
        <div className="mb-8">
          <Link 
            href="/work/gallery"
            className="inline-flex items-center text-sm font-medium mb-4 hover:underline"
          >
            ← Retour à la galerie
          </Link>
          <h1 className="text-4xl font-bold mb-2">{album.title}</h1>
          {album.description && (
            <p className="text-gray-600">{album.description}</p>
          )}
          <span className="inline-block px-3 py-1 bg-[#E9B949] text-black rounded-full border-2 border-black text-sm mt-2">
            {album.category}
          </span>
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {album?.images?.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image.url)}
              className="group relative border-4 border-black rounded-xl overflow-hidden aspect-[4/3]"
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.url}
                  alt={image.caption || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
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
            </button>
          ))}
        </div>
      </div>

      {/* Modal pour l'image en plein écran */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={selectedImage}
              alt=""
              width={1200}
              height={800}
              className="object-contain max-h-[90vh]"
              unoptimized={process.env.NODE_ENV === 'development'}
            />
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  )
} 