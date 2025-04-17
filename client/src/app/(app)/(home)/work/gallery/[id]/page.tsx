"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Share2, Heart, Bookmark, ChevronLeft, ChevronRight } from "lucide-react"
import GradientBackground from "@/components/ui/background"
import { NeoButton } from "@/components/ui/neo-button"
import { NeoCard } from "@/components/ui/neo-card"
import { NeoAlert } from "@/components/ui/neo-alert"

interface Photo {
  id: string
  url: string
  alt: string
  caption: string
  width?: number
  height?: number
}

interface PhotoAlbum {
  id: string
  title: string
  description: string
  category: string
  coverImage: string | null
  photos: Photo[]
  featured: boolean
  createdAt: string
  slug?: string
}

// Function to fetch a photo album by its ID
async function getPhotoAlbum(id: string) {
  try {
    const response = await fetch(`/api/gallery/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Error fetching photo album")
    }

    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    return {
      error: "Failed to fetch photo album",
      data: null,
    }
  }
}

export default function GalleryPage() {
  // Get params using the useParams hook
  const params = useParams()
  const id = params?.id as string

  const [album, setAlbum] = useState<PhotoAlbum | null>(null)
  const [loading, setLoading] = useState(true)
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Utiliser useCallback pour récupérer l'album photo
  const fetchAlbum = useCallback(async (idValue: string) => {
    try {
      const result = await getPhotoAlbum(idValue)
      if (result && result.data) {
        setAlbum(result.data)
        // Définir la première photo comme active par défaut
        if (result.data.photos && result.data.photos.length > 0) {
          setActivePhoto(result.data.photos[0])
          setActiveIndex(0)
        }
      }
    } catch (error) {
      console.error("Error fetching photo album:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (id) {
      fetchAlbum(id)
    }
  }, [id, fetchAlbum])

  const navigatePhoto = (direction: "next" | "prev") => {
    if (!album || !album.photos.length) return

    let newIndex
    if (direction === "next") {
      newIndex = (activeIndex + 1) % album.photos.length
    } else {
      newIndex = (activeIndex - 1 + album.photos.length) % album.photos.length
    }

    setActivePhoto(album.photos[newIndex])
    setActiveIndex(newIndex)
  }

  if (!mounted) return null

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <GradientBackground />
        <div className="border-3 border-black bg-white p-8 shadow-neo animate-bounce">
          <div className="flex items-center space-x-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 bg-[#f67a45] border-2 border-black"
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          <h2 className="text-2xl font-black mt-4">CHARGEMENT...</h2>
        </div>
      </main>
    )
  }

  if (!album) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <GradientBackground />
        <NeoCard className="max-w-md">
          <h1 className="text-2xl font-black mb-4">Album non trouvé</h1>
          <p className="mb-6">L'album photo que vous recherchez n'existe pas ou a été supprimé.</p>
          <NeoButton variant="primary">
            <Link href="/work" className="inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux travaux
            </Link>
          </NeoButton>
        </NeoCard>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-12 pb-20">
      <GradientBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/work">
          <NeoButton variant="secondary" className="mb-8">
            <span className="inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux travaux
            </span>
          </NeoButton>
        </Link>

        <NeoAlert type="info" title="Galerie photo">
          Parcourez cette collection de {album.photos.length} photos
        </NeoAlert>

        <div className="border-3 border-black bg-white p-6 md:p-10 mb-8 shadow-neo">
          {/* Album Header */}
          <div className="mb-8">
            {album.category && (
              <div className="inline-block px-6 py-3 border-3 border-black font-black text-xl mb-4 bg-yellow-400">
                {album.category}
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-black mb-6 neo-heading">{album.title}</h1>

            {album.description && <p className="text-lg mb-6">{album.description}</p>}

            <div className="flex items-center text-sm mb-6">
              <span className="bg-blue-400 border-3 border-black px-4 py-2 font-bold">
                {new Date(album.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="mx-2">•</span>
              <span className="bg-green-400 border-3 border-black px-4 py-2 font-bold">
                {album.photos.length} photos
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <NeoButton variant="primary" size="sm">
                <Heart className="h-4 w-4 mr-1" /> J'aime
              </NeoButton>
              <NeoButton variant="secondary" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> Partager
              </NeoButton>
              <NeoButton variant="secondary" size="sm">
                <Bookmark className="h-4 w-4 mr-1" /> Sauvegarder
              </NeoButton>
              <NeoButton variant="secondary" size="sm">
                <Download className="h-4 w-4 mr-1" /> Télécharger
              </NeoButton>
            </div>
          </div>

          {/* Main Photo Display */}
          {activePhoto && (
            <div className="mb-8 relative">
              <div
                className="border-3 border-black overflow-hidden cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <div className="relative aspect-[16/9] md:aspect-[16/10]">
                  <Image
                    src={activePhoto.url || "/placeholder.svg"}
                    alt={activePhoto.alt || album.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-contain"
                  />
                </div>
                {activePhoto.caption && (
                  <div className="bg-white p-3 border-t-3 border-black">
                    <p className="font-bold">{activePhoto.caption}</p>
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4">
                <button
                  onClick={() => navigatePhoto("prev")}
                  className="bg-white border-3 border-black p-2 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => navigatePhoto("next")}
                  className="bg-white border-3 border-black p-2 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Photo counter */}
              <div className="absolute bottom-4 right-4 bg-white border-3 border-black px-3 py-1 font-bold">
                {activeIndex + 1} / {album.photos.length}
              </div>
            </div>
          )}

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {album.photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => {
                  setActivePhoto(photo)
                  setActiveIndex(index)
                }}
                className={`cursor-pointer border-3 overflow-hidden transition-transform hover:translate-x-1 hover:translate-y-1 ${
                  activePhoto?.id === photo.id
                    ? "border-[#FF6B6B] shadow-[4px_4px_0_0_#FF6B6B]"
                    : "border-black shadow-neo"
                }`}
              >
                <div className="relative aspect-square">
                  <Image
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.alt || album.title}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && activePhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image
              src={activePhoto.url || "/placeholder.svg"}
              alt={activePhoto.alt || album.title}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigatePhoto("prev")
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border-3 border-black p-2"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigatePhoto("next")
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border-3 border-black p-2"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white border-3 border-black p-2 font-bold"
            >
              Fermer
            </button>
            {activePhoto.caption && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border-3 border-black p-3 max-w-md">
                <p className="font-bold text-center">{activePhoto.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
