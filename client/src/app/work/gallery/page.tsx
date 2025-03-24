"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '@/components/ui/background'
import { getPublicAlbums } from '@/app/actions'
import { motion } from 'framer-motion'

interface Album {
  id: string
  title: string
  description: string | null
  category: string
  coverImage: string | null
  imageCount: number
  previewImage: {
    id: string
    url: string
    caption: string | null
    order: number
  }
  createdAt: string
  updatedAt: string
}

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const result = await getPublicAlbums()
        if (result.data) {
          setAlbums(result.data)
        }
      } catch (error) {
        console.error('Error fetching albums:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

  const categories = Array.from(new Set(albums.map(album => album.category)))
  const filteredAlbums = selectedCategory 
    ? albums.filter(album => album.category === selectedCategory)
    : albums

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <GradientBackground />
        <motion.div 
          className="relative z-30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="bg-[#FFFBF5] border-4 border-black p-8 rounded-lg shadow-brutal relative">
              <div className="flex items-center space-x-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-5 h-5 bg-[#f67a45] border-2 border-black rounded-full"
                    animate={{
                      y: ["0%", "-50%", "0%"],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen">
      <GradientBackground />
      
      {/* Hero Section */}
      <div className="relative z-30 pt-6 sm:pt-12 pb-12 sm:pb-24">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute left-4 sm:left-8 top-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href="/"
              className="group flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border-2 border-black rounded-full hover:bg-[#FFD2BF] transition-colors shadow-brutal mt-4 ml-10"
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">Retour</span>
              </div>
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16 mt-8 sm:mt-0">
            <motion.h1 
              className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-3 sm:mb-6 tracking-tight text-black"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Galerie Photo
            </motion.h1>
            <motion.p 
              className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Découvrez mes collections de photographies à travers différents univers et ambiances
            </motion.p>

            {/* Categories */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 sm:px-6 sm:py-3 rounded-full border-2 border-black transition-all transform hover:-translate-y-1 text-xs sm:text-base ${
                  !selectedCategory ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
                }`}
              >
                Tous
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 sm:px-6 sm:py-3 rounded-full border-2 border-black transition-all transform hover:-translate-y-1 text-xs sm:text-base ${
                    selectedCategory === category ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Albums Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {filteredAlbums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredAlbum(album.id)}
                onHoverEnd={() => setHoveredAlbum(null)}
              >
                <Link href={`/work/gallery/${album.id}`}>
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 rounded-lg sm:rounded-xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2 sm:group-hover:translate-x-3 sm:group-hover:translate-y-3"></div>
                    <div className="relative border-2 sm:border-3 border-black rounded-lg sm:rounded-xl overflow-hidden bg-white">
                      <div className="relative aspect-[4/3]">
                        {album.coverImage ? (
                          <Image
                            src={album.coverImage}
                            alt={album.title}
                            fill
                            className={`object-cover transition-all duration-500 ${
                              hoveredAlbum === album.id ? 'scale-110' : 'scale-100'
                            }`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-xs sm:text-sm">No cover image</span>
                          </div>
                        )}
                        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                          hoveredAlbum === album.id ? 'opacity-40' : 'opacity-0'
                        }`} />
                      </div>
                      <div className="p-3 sm:p-6">
                        <div className="mb-2 sm:mb-3">
                          <span className="inline-block px-2 py-1 sm:px-4 sm:py-1 bg-[#E9B949] text-black text-xs sm:text-sm font-medium rounded-full border-2 border-black transform -translate-y-6 sm:-translate-y-8 shadow-brutal-sm">
                            {album.category}
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{album.title}</h2>
                        {album.description && (
                          <p className="text-gray-600 text-xs sm:text-base line-clamp-2">{album.description}</p>
                        )}
                        <div className="mt-3 sm:mt-4 flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-gray-500">
                            {album.imageCount} photos
                          </span>
                          <motion.span 
                            className="text-[#f67a45] flex items-center text-xs sm:text-sm"
                            animate={{
                              x: hoveredAlbum === album.id ? 5 : 0
                            }}
                          >
                            Voir l'album
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="fixed z-10 top-[15%] right-[5%] w-[120px] h-[120px]"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image
          src="/stars.svg"
          alt="Decorative star"
          width={120}
          height={120}
          className="w-full h-full"
          style={{
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))"
          }}
        />
      </motion.div>

      <motion.div 
        className="fixed z-10 bottom-[10%] left-[8%] w-[100px] h-[100px]"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image
          src="/stars.svg"
          alt="Decorative star"
          width={100}
          height={100}
          className="w-full h-full"
          style={{
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5)) hue-rotate(340deg)",
            opacity: 0.9
          }}
        />
      </motion.div>
    </main>
  )
} 