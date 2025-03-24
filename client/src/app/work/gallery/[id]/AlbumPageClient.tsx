"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '@/components/ui/background'

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

interface AlbumPageClientProps {
  initialData: Album | null
}

export default function AlbumPageClient({ initialData }: AlbumPageClientProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle keyboard navigation for the modal
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      } else if (e.key === 'ArrowLeft' && selectedImage > 0) {
        setSelectedImage(selectedImage - 1)
      } else if (e.key === 'ArrowRight' && initialData && selectedImage < initialData.images.length - 1) {
        setSelectedImage(selectedImage + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, initialData])

  if (!mounted) return null

  if (!initialData) {
    return (
      <main className="relative min-h-screen">
        <GradientBackground />
        <div className="relative z-30 container mx-auto px-4 py-12">
          {/* <div className="mb-8">
            <Link
              href="/work/gallery"
              className="inline-flex items-center text-[#f67a45] hover:underline"
            >
              ← Retour à la galerie
            </Link>
          </div> */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Album non trouvé</h1>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen">
      <GradientBackground />
      
      {/* Floating decorative elements */}
      <div className="fixed z-10 top-[15%] right-[5%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] animate-float">
        <Image
          src="/stars.svg"
          alt="Decorative star"
          width={120}
          height={120}
          className="w-full h-full"
          priority
          style={{
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))",
            animationDuration: "8s",
          }}
        />
      </div>

      <div className="fixed z-10 bottom-[10%] left-[8%] w-[60px] h-[60px] md:w-[100px] md:h-[100px] animate-bounce"
        style={{ animationDuration: "6s" }}>
        <Image
          src="/stars.svg"
          alt="Decorative star"
          width={100}
          height={100}
          className="w-full h-full"
          priority
          style={{
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5)) hue-rotate(340deg)",
            opacity: 0.9,
          }}
        />
      </div>

      <div className="relative z-30 container mx-auto px-4 py-12">
        {/* Album header */}
        <div className="relative border-4 border-black bg-white p-6 rounded-xl mb-12">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
          
          <div className="relative mb-6">
            <div className="absolute -top-8 left-4 transform rotate-3 z-10">
              <div className="bg-[#E9B949] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm">
                {initialData.category}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mt-4">{initialData.title}</h1>
                {initialData.description && (
                  <p className="text-gray-600 mt-2">{initialData.description}</p>
                )}
              </div>
              <Link 
                href="/work/gallery"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors mt-4"
              >
                <span>Retour à la galerie</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Image grid avec disposition dynamique */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {initialData.images.map((image, index) => {
              // Alterner entre différentes tailles pour créer un effet dynamique
              const isLarge = index % 5 === 0 // Toutes les 5 images seront plus grandes
              const isMedium = index % 3 === 1 // Certaines images seront de taille moyenne
              
              return (
                <div 
                  key={image.id}
                  className={`break-inside-avoid mb-4 ${isLarge ? 'row-span-2' : ''}`}
                >
                  <button
                    onClick={() => setSelectedImage(index)}
                    className="relative group w-full block"
                  >
                    <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-lg transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    <div className="relative border-2 border-black rounded-lg overflow-hidden bg-white">
                      <div className={`relative ${isLarge ? 'aspect-[3/4]' : isMedium ? 'aspect-[4/5]' : 'aspect-square'}`}>
                        <Image
                          src={image.url}
                          alt={image.caption || ''}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform group-hover:scale-105"
                          priority={index < 4}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                            console.error('Image load error for URL:', image.url);
                          }}
                        />
                      </div>
                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          {image.caption}
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal with improved accessibility */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:opacity-75"
            aria-label="Fermer"
          >
            ×
          </button>
          <button
            onClick={() => setSelectedImage(prev => prev !== null && prev > 0 ? prev - 1 : null)}
            className="absolute left-4 text-white text-4xl hover:opacity-75"
            aria-label="Image précédente"
            disabled={selectedImage === 0}
          >
            ←
          </button>
          <button
            onClick={() => setSelectedImage(prev => prev !== null && prev < initialData.images.length - 1 ? prev + 1 : null)}
            className="absolute right-4 text-white text-4xl hover:opacity-75"
            aria-label="Image suivante"
            disabled={selectedImage === initialData.images.length - 1}
          >
            →
          </button>
          <div className="relative w-full max-w-5xl max-h-[90vh] mx-4">
            <Image
              src={initialData.images[selectedImage].url}
              alt={initialData.images[selectedImage].caption || initialData.title}
              width={1920}
              height={1080}
              className="w-full h-full object-contain"
              priority
              sizes="(max-width: 1920px) 100vw, 1920px"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            {initialData.images[selectedImage].caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white text-center">
                {initialData.images[selectedImage].caption}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
} 