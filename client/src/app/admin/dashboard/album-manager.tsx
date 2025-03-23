"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  getAlbums, 
  createAlbum, 
  updateAlbum, 
  deleteAlbum, 
  addImageToAlbum 
} from '@/app/actions'
import type { AlbumData } from '@/types/server-actions'

interface AlbumImage {
  id: string
  url: string
  caption: string | null
  order: number
}

interface Album extends AlbumData {
  images: AlbumImage[]
}

const categories = ['Urban', 'Portrait', 'Nature', 'Architecture']

export default function AlbumManager() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: categories[0],
    images: [] as File[]
  })

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const result = await getAlbums()
        
        if (result.error) {
          throw new Error(result.error)
        }
        
        if (result.data) {
          setAlbums(result.data as Album[])
        }
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    }

    fetchAlbums()
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setLoading(true)
    try {
      const uploadPromises = files.map(async (file) => {
        const formDataUpload = new FormData()
        formDataUpload.append('file', file)
        formDataUpload.append('albumTitle', selectedAlbum?.title || formData.title || 'untitled')

        console.log('Uploading file:', file.name)
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formDataUpload
        })

        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || 'Failed to upload image')
        }

        const data = await res.json()
        console.log('Upload response:', data)
        return { url: data.url, file }
      })

      const imageResults = await Promise.all(uploadPromises)
      console.log('All images uploaded:', imageResults)

      // Ajouter les images à l'album
      if (selectedAlbum) {
        for (const { file, url } of imageResults) {
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          
          const result = await addImageToAlbum(
            selectedAlbum.id,
            buffer,
            file.name,
            file.type
          )
          
          if (result.error) {
            throw new Error(result.error)
          }
        }
      }

      // Rafraîchir la liste des albums
      const albumsResult = await getAlbums()
      if (albumsResult.error) {
        throw new Error(albumsResult.error)
      }
      if (albumsResult.data) {
        setAlbums(albumsResult.data as Album[])
      }
      setMode('list')
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Erreur lors de l\'upload des images')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = mode === 'create'
        ? await createAlbum(formData)
        : await updateAlbum(selectedAlbum!.id, formData)
      
      if (result.error) {
        throw new Error(result.error)
      }
      
      setMode('list')
      router.refresh()
    } catch (error) {
      console.error('Error saving album:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cet album ?')) return

    try {
      const result = await deleteAlbum(id)
      
      if (result.error) {
        throw new Error(result.error)
      }

      setAlbums(albums.filter(a => a.id !== id))
    } catch (error) {
      console.error('Error deleting album:', error)
    }
  }

  return (
    <div className="space-y-8">
      {mode === 'list' ? (
        <div>
          <button
            onClick={() => {
              setMode('create')
              setFormData({
                title: '',
                description: '',
                category: categories[0],
                images: []
              })
            }}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Créer un nouvel album
          </button>

          {/* Liste des albums */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {albums.map((album) => (
              <div
                key={album.id}
                className="border-4 border-black rounded-xl p-4 shadow-brutal"
              >
                {album.coverImage && (
                  <div className="relative h-48 mb-4">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold">{album.title}</h3>
                <p className="text-gray-600">{album.category}</p>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedAlbum(album)
                      setMode('edit')
                      setFormData({
                        title: album.title,
                        description: album.description || '',
                        category: album.category,
                        images: []
                      })
                    }}
                    className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(album.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titre
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full border-2 border-black rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full border-2 border-black rounded-md shadow-sm p-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full border-2 border-black rounded-md shadow-sm p-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              className="mt-1 block w-full"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={() => setMode('list')}
              className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  )
}