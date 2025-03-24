"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '@/components/ui/background'
import { getAlbum } from '@/app/actions'

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
    order: number
  }[]
}

export default function AlbumPage() {
  const params = useParams()
  const [album, setAlbum] = useState<Album | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const result = await getAlbum(params.id as string)
        if (result.error) {
          throw new Error(result.error)
        }
        if (result.data) {
          setAlbum(result.data)
        }
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

  const handleImageClick = (url: string, index: number) => {
    setSelectedImage(url)
    setCurrentImageIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!album) return
    const newIndex = (currentImageIndex - 1 + album.images.length) % album.images.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(album.images[newIndex].url)
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!album) return
    const newIndex = (currentImageIndex + 1) % album.images.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(album.images[newIndex].url)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          const event = new MouseEvent('click', { bubbles: true })
          handlePrevImage(event as any)
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          const event = new MouseEvent('click', { bubbles: true })
          handleNextImage(event as any)
        }
        if (e.key === 'Escape') {
          closeModal()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, currentImageIndex, album])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Album non trouvé</h1>
          <Link 
            href="/work/gallery" 
            className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Retour à la galerie
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <GradientBackground />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb et titre */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link href="/work" className="hover:underline">Work</Link>
            <span>/</span>
            <Link href="/work/gallery" className="hover:underline">Gallery</Link>
            <span>/</span>
            <span className="font-medium">{album.title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{album.title}</h1>
              {album.description && (
                <p className="text-gray-600 max-w-2xl">{album.description}</p>
              )}
            </div>
            <span className="inline-block px-4 py-2 bg-[#E9B949] text-black rounded-full border-2 border-black text-sm font-medium">
              {album.category}
            </span>
          </div>
        </div>

        {/* Grille de photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {album.images.map((image, index) => (
            <div key={image.id} className="group relative">
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-lg transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
              <div className="relative border-2 border-black rounded-lg overflow-hidden bg-white">
                <div 
                  className="relative aspect-[4/3] cursor-pointer"
                  onClick={() => handleImageClick(image.url, index)}
                >
                  <Image
                    src={image.url}
                    alt={image.caption || ''}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                {image.caption && (
                  <div className="p-3 border-t-2 border-black">
                    <p className="text-sm">{image.caption}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-gray-100 transition-transform hover:-translate-y-1 border-2 border-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-gray-100 transition-transform hover:-translate-y-1 border-2 border-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div 
            className="relative max-w-5xl max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-lg"></div>
            <div className="relative border-2 border-black rounded-lg overflow-hidden bg-white">
              <Image
                src={selectedImage}
                alt={album.images[currentImageIndex].caption || ''}
                width={1200}
                height={800}
                className="w-full h-full object-contain"
              />
              {album.images[currentImageIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-black">
                  <p>{album.images[currentImageIndex].caption}</p>
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-transform hover:-translate-y-1 border-2 border-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
} 