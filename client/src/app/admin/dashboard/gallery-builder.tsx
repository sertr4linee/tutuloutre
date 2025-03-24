"use client"

import { useState, useEffect } from 'react'
import { Upload, Move } from 'lucide-react'
import Image from 'next/image'
import { getAlbums, createAlbum, updateAlbum, deleteAlbum, uploadImage, addImageToAlbum, deleteImage, updateImageOrder } from '@/app/actions'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

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
  createdAt: string
  updatedAt: string
}

interface GalleryBuilderProps {
  setToast: (toast: { show: boolean; message: string; type: 'success' | 'error' }) => void;
}

const categories = ['Urban', 'Portrait', 'Nature', 'Architecture']

export default function GalleryBuilder({ setToast }: GalleryBuilderProps) {
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [albums, setAlbums] = useState<Album[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [loading, setLoading] = useState(true)

  const [formData, setAlbum] = useState<Omit<Album, 'id' | 'createdAt' | 'updatedAt' | 'images'>>({
    title: '',
    description: '',
    category: '',
    coverImage: null
  })

  useEffect(() => {
    fetchAlbums()
  }, [])

  async function fetchAlbums() {
    try {
      const result = await getAlbums()
      
      if (result.error) {
        throw new Error(result.error)
      }
      
      if (result.data) {
        setAlbums(result.data)
      }
    } catch (error) {
      console.error('Error fetching albums:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet album ?')) return

    try {
      const result = await deleteAlbum(id)
      
      if (result.error) {
        throw new Error(result.error)
      }

      setToast({
        show: true,
        message: 'Album supprimé avec succès',
        type: 'success'
      })

      fetchAlbums()
    } catch (error) {
      setToast({
        show: true,
        message: 'Erreur lors de la suppression',
        type: 'error'
      })
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('type', 'gallery')
      formDataUpload.append('id', selectedAlbum?.id || 'temp')

      const result = await uploadImage(formDataUpload)

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.data) {
        setAlbum(prev => ({ ...prev, coverImage: result.data.url }))
        setToast({
          show: true,
          message: 'Image téléchargée avec succès',
          type: 'success'
        })
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Erreur lors du téléchargement',
        type: 'error'
      })
    }
  }

  const handleSave = async () => {
    try {
      const result = selectedAlbum 
        ? await updateAlbum(selectedAlbum.id, formData)
        : await createAlbum(formData)
      
      if (result.error) {
        throw new Error(result.error)
      }

      setToast({
        show: true,
        message: selectedAlbum ? 'Album mis à jour!' : 'Album créé!',
        type: 'success'
      })

      setMode('list')
      fetchAlbums()
    } catch (error) {
      setToast({
        show: true,
        message: 'Erreur lors de la sauvegarde',
        type: 'error'
      })
    }
  }

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedAlbum) return
    
    const files = Array.from(e.target.files || [])
    
    for (const file of files) {
      try {
        const formDataUpload = new FormData()
        formDataUpload.append('file', file)
        formDataUpload.append('type', 'gallery')
        formDataUpload.append('id', selectedAlbum.id)

        const result = await uploadImage(formDataUpload)

        if (result.error) {
          throw new Error(result.error)
        }

        if (result.data) {
          await addImageToAlbum(selectedAlbum.id, file, file.name, file.type)
        }
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }

    fetchAlbums()
    setToast({
      show: true,
      message: 'Images ajoutées avec succès',
      type: 'success'
    })
  }

  const handleDeleteImage = async (imageId: string) => {
    try {
      const result = await deleteImage(imageId)
      
      if (result.error) {
        throw new Error(result.error)
      }

      fetchAlbums()
      setToast({
        show: true,
        message: 'Image supprimée avec succès',
        type: 'success'
      })
    } catch (error) {
      setToast({
        show: true,
        message: 'Erreur lors de la suppression de l\'image',
        type: 'error'
      })
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination || !selectedAlbum) return

    const items = Array.from(selectedAlbum.images)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const newImageOrder = items.map(item => item.id)
    
    try {
      const result = await updateImageOrder(selectedAlbum.id, newImageOrder)
      
      if (result.error) {
        throw new Error(result.error)
      }

      fetchAlbums()
    } catch (error) {
      console.error('Error updating image order:', error)
    }
  }

  // Réinitialiser le formulaire quand on crée un nouvel album
  useEffect(() => {
    if (mode === 'create') {
      setAlbum({
        title: '',
        description: '',
        category: '',
        coverImage: null
      })
    }
  }, [mode])

  // Charger les données de l'album sélectionné pour l'édition
  useEffect(() => {
    if (mode === 'edit' && selectedAlbum) {
      setAlbum({
        title: selectedAlbum.title,
        description: selectedAlbum.description || '',
        category: selectedAlbum.category,
        coverImage: selectedAlbum.coverImage
      })
    }
  }, [mode, selectedAlbum])

  if (mode === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Albums Photos</h2>
          <button
            onClick={() => setMode('create')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Nouvel album
          </button>
        </div>

        <div className="grid gap-4">
          {albums.map((album) => (
            <div key={album.id} className="bg-white p-4 rounded-lg border-2 border-black">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  {album.coverImage && (
                    <div className="relative w-24 h-24">
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold">{album.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{album.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs bg-gray-100 rounded-full border border-black">
                        {album.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {album.images.length} photos
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedAlbum(album)
                      setMode('edit')
                    }}
                    className="px-3 py-1 text-sm border-2 border-black rounded hover:bg-gray-100"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(album.id)}
                    className="px-3 py-1 text-sm border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMode('list')}
            className="text-gray-600 hover:text-black"
          >
            ← Retour
          </button>
          <h2 className="text-2xl font-bold">
            {mode === 'edit' ? 'Modifier l\'album' : 'Nouvel Album'}
          </h2>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Sauvegarder
        </button>
      </div>

      {/* Cover Image Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Image de couverture</label>
        <div className="flex items-center gap-4">
          {formData.coverImage ? (
            <div className="relative w-40 h-24">
              <Image
                src={formData.coverImage}
                alt="Cover"
                width={160}
                height={90}
                className="w-full h-full object-cover rounded-lg border-2 border-black"
              />
              <button
                onClick={() => setAlbum(prev => ({ ...prev, coverImage: null }))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-40 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-black">
              <Upload className="w-6 h-6 mb-1" />
              <span className="text-sm">Upload image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* Title & Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Titre</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setAlbum(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 border-2 border-black rounded-lg"
            placeholder="Titre de l'album"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Catégorie</label>
          <select
            value={formData.category}
            onChange={(e) => setAlbum(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-3 border-2 border-black rounded-lg"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setAlbum(prev => ({ ...prev, description: e.target.value }))}
          className="w-full p-3 border-2 border-black rounded-lg"
          rows={3}
          placeholder="Description de l'album"
        />
      </div>

      {/* Image Gallery */}
      {mode === 'edit' && selectedAlbum && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="font-medium">Photos de l'album</label>
            <label className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer">
              Ajouter des photos
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleAddImages}
              />
            </label>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="gallery" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {selectedAlbum.images.map((image, index) => (
                    <Draggable key={image.id} draggableId={image.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative group"
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={image.url}
                              alt=""
                              fill
                              className="object-cover rounded-lg border-2 border-black"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                                <button
                                  className="p-2 bg-white rounded-full"
                                  title="Déplacer"
                                >
                                  <Move className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteImage(image.id)}
                                  className="p-2 bg-white rounded-full text-red-500"
                                  title="Supprimer"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  )
} 