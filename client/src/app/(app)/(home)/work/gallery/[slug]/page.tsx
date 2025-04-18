"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react"
import GradientBackground from "@/components/ui/background"
import { NeoButton } from "@/components/ui/neo-button"
import { NeoCard } from "@/components/ui/neo-card"
import { PHOTO_ALBUMS } from "@/lib/constants"

export default function GalleryPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const router = useRouter()

  // Trouver l'album correspondant dans PHOTO_ALBUMS
  const album = PHOTO_ALBUMS.find((p) => p.slug === slug || p.id === slug)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") previousImage()
    if (e.key === "Escape") setIsImageViewerOpen(false)
  }, [])

  const nextImage = useCallback(() => {
    if (!album) return
    setCurrentImageIndex((prev) => (prev + 1) % album.images.length)
  }, [album])

  const previousImage = useCallback(() => {
    if (!album) return
    setCurrentImageIndex((prev) => (prev - 1 + album.images.length) % album.images.length)
  }, [album])

  useEffect(() => {
    if (isImageViewerOpen) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isImageViewerOpen, handleKeyDown])

  if (!album) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <GradientBackground />
        <NeoCard className="max-w-md w-full rounded-xl">
          <h1 className="text-3xl font-black mb-4 neo-heading">Album non trouvé</h1>
          <p className="text-xl mb-6 font-bold">L'album que vous recherchez n'existe pas ou a été supprimé.</p>
          <NeoButton variant="primary" className="rounded-full">
            <Link href="/work" className="inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux albums
            </Link>
          </NeoButton>
        </NeoCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-12 pb-20">
      <GradientBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/work">
          <NeoButton variant="secondary" className="mb-8 rounded-full">
            <span className="inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux albums
            </span>
          </NeoButton>
        </Link>

        <div className="border-3 border-black bg-white p-6 md:p-10 mb-8 shadow-neo rounded-xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6 neo-heading">{album.title}</h1>
          
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-[#f4a990] border-3 border-black px-4 py-2 font-bold rounded-full">
                <span>{album.category}</span>
              </div>
              <div className="text-gray-600">
                {new Date(album.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </div>
            </div>
            <p className="text-lg font-medium">{album.description}</p>
          </div>

          {/* Grille de photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {album.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] border-3 border-black rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => {
                  setCurrentImageIndex(index)
                  setIsImageViewerOpen(true)
                }}
              >
                <Image
                  src={image}
                  alt={`${album.title} - Photo ${index + 1}`}
                  fill
                  quality={95}
                  priority={index < 6}
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {isImageViewerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setIsImageViewerOpen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button 
              onClick={() => setIsImageViewerOpen(false)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-[#f8d7e6] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={album.images[currentImageIndex]}
                alt={`${album.title} - Photo ${currentImageIndex + 1}`}
                fill
                quality={100}
                priority
                className="object-contain"
              />

              {album.images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full hover:bg-[#f8d7e6] transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full hover:bg-[#f8d7e6] transition-colors"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {album.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-4 h-4 border-2 border-white rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 