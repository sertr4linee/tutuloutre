"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '../../../components/ui/background'
// ou
// import GradientBackground from '@/components/ui/background'

export default function Gallery() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    // Fetch albums data
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/admin/albums')
        const data = await response.json()
        setAlbums(data)
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    }

    fetchAlbums()
  }, [])

  return (
    <main className="relative min-h-screen">
      <GradientBackground />
      <div className="relative z-30 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album: any) => (
            <Link href={`/work/gallery/${album.id}`} key={album.id}>
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <div className="relative border-3 border-black rounded-xl p-4 bg-white">
                  <h2 className="text-xl font-bold mb-2">{album.title}</h2>
                  <p className="text-gray-600">{album.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 