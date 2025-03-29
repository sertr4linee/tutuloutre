"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Upload, X, ArrowUp, ArrowDown, Edit, Trash } from 'lucide-react'
import { 
  getSchoolProject, 
  createSchoolProject, 
  updateSchoolProject, 
  uploadProjectImage,
  addProjectImage,
  updateProjectImage,
  deleteProjectImage,
  reorderProjectImages
} from '@/app/actions'
import GradientBackground from '@/components/ui/background'
import type { SchoolProject, ProjectImage } from '@/app/actions'

interface Props {
  id: string
}

export default function EditProjectClient({ id }: Props) {
  const router = useRouter()
  const isNew = id === 'new'

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [project, setProject] = useState<SchoolProject | null>(null)
  const [formData, setFormData] = useState<Omit<SchoolProject, 'id' | 'createdAt' | 'updatedAt' | 'images'>>({
    title: '',
    description: '',
    year: '',
    category: '',
    tags: [],
    image: null,
    objectives: [''],
    skills: [''],
    color: '#FFD2BF',
    featured: false,
    slug: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [galleryFile, setGalleryFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [newTag, setNewTag] = useState('')
  const [newObjective, setNewObjective] = useState('')
  const [newSkill, setNewSkill] = useState('')
  const [newImageCaption, setNewImageCaption] = useState('')
  const [editingImageId, setEditingImageId] = useState<string | null>(null)
  const [editingCaption, setEditingCaption] = useState('')
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([])
  const [uploadingImage, setUploadingImage] = useState(false)
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null)
  const [galleryImagePreview, setGalleryImagePreview] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProject() {
      if (id === 'new') {
        setLoading(false)
        return
      }

      try {
        const response = await getSchoolProject(id)
        if (response.error) {
          console.error('Error:', response.error)
        } else if (response.data) {
          const { 
            title, 
            description, 
            year, 
            category, 
            tags, 
            image, 
            objectives, 
            skills, 
            color, 
            featured,
            slug,
            images
          } = response.data

          setFormData({
            title,
            description,
            year,
            category,
            tags,
            image,
            objectives: objectives.length ? objectives : [''],
            skills: skills.length ? skills : [''],
            color,
            featured,
            slug
          })
          setProjectImages(images || [])
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      console.log('Saving project with data:', formData)
      
      if (isNew) {
        console.log('Creating new project...')
        const response = await createSchoolProject(formData)
        console.log('Create project response:', response)
        
        if (response.error) {
          console.error('Error creating project:', response.error)
          alert('Erreur lors de la création du projet: ' + response.error)
        } else if (response.data) {
          console.log('Project created successfully:', response.data)
          router.push('/admin/projects')
        }
      } else {
        console.log('Updating existing project...')
        const response = await updateSchoolProject({
          id,
          ...formData
        })
        console.log('Update project response:', response)
        
        if (response.error) {
          console.error('Error updating project:', response.error)
          alert('Erreur lors de la mise à jour du projet: ' + response.error)
        } else if (response.data) {
          console.log('Project updated successfully:', response.data)
          router.push('/admin/projects')
        }
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Une erreur est survenue lors de la sauvegarde du projet')
    }

    setSaving(false)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  const addObjective = () => {
    if (newObjective.trim() && !formData.objectives.includes(newObjective.trim())) {
      setFormData({
        ...formData,
        objectives: [...formData.objectives, newObjective.trim()]
      })
      setNewObjective('')
    }
  }

  const removeObjective = (objective: string) => {
    setFormData({
      ...formData,
      objectives: formData.objectives.filter(o => o !== objective)
    })
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      })
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      
      // Créer une URL d'aperçu
      const previewUrl = URL.createObjectURL(file)
      setMainImagePreview(previewUrl)
      
      // Nettoyer l'URL à la fin
      return () => URL.revokeObjectURL(previewUrl)
    }
  }

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setGalleryFile(file)
      
      // Créer une URL d'aperçu
      const previewUrl = URL.createObjectURL(file)
      setGalleryImagePreview(previewUrl)
      
      // Nettoyer l'URL à la fin
      return () => URL.revokeObjectURL(previewUrl)
    }
  }

  const handleUploadMainImage = async () => {
    if (!selectedFile) return

    setSaving(true)
    const formData = new FormData()
    formData.append('file', selectedFile)
    
    // Pour un nouveau projet, utiliser un ID temporaire
    formData.append('projectId', id === 'new' ? 'temp-new-project' : id)

    try {
      const response = await uploadProjectImage(formData)
      if (response.error) {
        console.error('Error uploading image:', response.error)
        alert(`Erreur lors de l'upload: ${response.error}`)
      } else if (response.data) {
        const url = response.data.url
        if (url) {
          setFormData(prev => ({ ...prev, image: url }))
          setSelectedFile(null)
          setMainImagePreview(null)
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Une erreur inattendue est survenue')
    } finally {
      setSaving(false)
    }
  }

  const handleAddProjectImage = async () => {
    if (!galleryFile) return
    
    // Pour un nouveau projet, on ne peut pas ajouter des images avant de l'avoir créé
    if (id === 'new') {
      alert('Veuillez d\'abord créer le projet avant d\'ajouter des images à la galerie')
      return
    }

    setUploadingImage(true)
    const imageFormData = new FormData()
    imageFormData.append('file', galleryFile)
    imageFormData.append('projectId', id)
    
    console.log("Début téléchargement image de galerie", {
      fileName: galleryFile.name,
      projectId: id
    })

    try {
      // First upload the image file
      const uploadResponse = await uploadProjectImage(imageFormData)
      console.log("Réponse upload:", uploadResponse)
      
      if (uploadResponse.error) {
        console.error('Error uploading image:', uploadResponse.error)
        alert(`Erreur lors du téléchargement: ${uploadResponse.error}`)
        return
      }

      if (uploadResponse.data && uploadResponse.data.url) {
        // Then save it as a project image with caption
        const imageUrl = uploadResponse.data.url
        console.log("URL image reçue:", imageUrl)
        
        const imageData = {
          projectId: id,
          url: imageUrl,
          caption: newImageCaption || galleryFile.name
        }
        console.log("Ajout de l'image au projet avec données:", imageData)
        
        const imageResponse = await addProjectImage(imageData)
        console.log("Réponse ajout image:", imageResponse)

        if (imageResponse.error) {
          console.error('Error adding project image:', imageResponse.error)
          alert(`Erreur lors de l'ajout de l'image: ${imageResponse.error}`)
        } else if (imageResponse.data) {
          console.log("Image ajoutée avec succès:", imageResponse.data)
          const newImage = imageResponse.data
          setProjectImages(prevImages => [...prevImages, newImage])
          setGalleryFile(null)
          setGalleryImagePreview(null)
          setNewImageCaption('')
          
          // Réinitialiser l'input file en ciblant l'élément DOM
          const fileInput = document.getElementById('gallery-file-input') as HTMLInputElement
          if (fileInput) fileInput.value = ''
          
          alert('Image ajoutée avec succès!')
        }
      }
    } catch (error) {
      console.error('Error handling project image:', error)
      alert('Une erreur inattendue est survenue')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleMoveImage = async (imageId: string, direction: 'up' | 'down') => {
    const index = projectImages.findIndex(img => img.id === imageId)
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === projectImages.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newImages = [...projectImages]
    const temp = newImages[index]
    newImages[index] = newImages[newIndex]
    newImages[newIndex] = temp
    setProjectImages(newImages)

    // Update the order in the database
    const imageIds = newImages.map(img => img.id)
    await reorderProjectImages(id, imageIds)
  }

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      return
    }

    try {
      const response = await deleteProjectImage(imageId)
      if (response.error) {
        console.error('Error deleting image:', response.error)
      } else {
        setProjectImages(prev => prev.filter(img => img.id !== imageId))
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const handleEditCaption = (imageId: string, currentCaption: string) => {
    setEditingImageId(imageId)
    setEditingCaption(currentCaption || '')
  }

  const handleSaveCaption = async () => {
    if (!editingImageId) return

    try {
      const response = await updateProjectImage(editingImageId, {
        caption: editingCaption
      })

      if (response.error) {
        console.error('Error updating caption:', response.error)
      } else if (response.data) {
        setProjectImages(prev => prev.map(img => 
          img.id === editingImageId 
            ? { ...img, caption: editingCaption }
            : img
        ))
        setEditingImageId(null)
        setEditingCaption('')
      }
    } catch (error) {
      console.error('Error saving caption:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] p-4">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen">
      <GradientBackground />
      <div className="relative z-30 container mx-auto px-4 py-12">
        <div className="relative border-4 border-black bg-white p-6 rounded-xl mb-12">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
          
          <div className="relative mb-6">
            <div className="absolute -top-8 left-4 transform rotate-3 z-10">
              <div className="bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm">
                Administration
              </div>
            </div>
            <div className="flex justify-between items-start mt-4">
              <h1 className="text-4xl font-bold">
                {id === 'new' ? 'Nouveau projet' : 'Modifier le projet'}
              </h1>
              <Link
                href="/admin/projects"
                className="relative inline-block group"
              >
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                <div className="relative px-4 py-2 bg-white border-2 border-black rounded-xl font-medium inline-flex items-center space-x-2 transition-transform group-hover:-translate-y-0.5">
                  <span>Retour</span>
                </div>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="h-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Informations de base</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Titre</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black rounded-lg h-32"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Année</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-black rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Catégorie</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-black rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Slug Field */}
                <div>
                  <label className="block mb-2 font-medium">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-3 border-2 border-black rounded-md"
                    placeholder="slug-du-projet"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Laissez vide pour générer automatiquement
                  </p>
                  {errors.slug && (
                    <p className="text-red-600 text-sm mt-1">{errors.slug}</p>
                  )}
                </div>
              </div>

              {/* Tags Field */}
              <div>
                <label className="block mb-2 font-medium">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.tags.map((tag, index) => (
                    <div 
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full border border-black flex items-center gap-1"
                    >
                      <span>{tag}</span>
                      <button 
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-black hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Ajouter un tag"
                    className="flex-1 p-2 border-2 border-black rounded-md"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-[#f67a45] text-white border-2 border-black rounded-md px-4 py-2 text-sm font-medium"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Objectives Field */}
              <div>
                <label className="block mb-2 font-medium">
                  Objectifs du projet
                </label>
                <div className="space-y-2 mb-4">
                  {formData.objectives.map((objective, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => {
                          const newObjectives = [...formData.objectives];
                          newObjectives[index] = e.target.value;
                          setFormData({ ...formData, objectives: newObjectives });
                        }}
                        className="flex-1 p-2 border-2 border-black rounded-md"
                      />
                      <button 
                        type="button"
                        onClick={() => removeObjective(objective)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                    placeholder="Nouvel objectif"
                    className="flex-1 p-2 border-2 border-black rounded-md"
                  />
                  <button
                    type="button"
                    onClick={addObjective}
                    className="bg-[#f67a45] text-white border-2 border-black rounded-md px-4 py-2 text-sm font-medium"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Skills Field */}
              <div>
                <label className="block mb-2 font-medium">
                  Compétences développées
                </label>
                <div className="space-y-2 mb-4">
                  {formData.skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...formData.skills];
                          newSkills[index] = e.target.value;
                          setFormData({ ...formData, skills: newSkills });
                        }}
                        className="flex-1 p-2 border-2 border-black rounded-md"
                      />
                      <button 
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Nouvelle compétence"
                    className="flex-1 p-2 border-2 border-black rounded-md"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-[#f67a45] text-white border-2 border-black rounded-md px-4 py-2 text-sm font-medium"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block mb-2 font-medium">
                  Couleur du projet
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-12 h-12 border-2 border-black rounded-md cursor-pointer"
                  />
                  <span className="text-sm">
                    Cette couleur sera utilisée pour les accents visuels sur la page du projet
                  </span>
                </div>
              </div>

              {/* Featured Project Toggle */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 border-2 border-black rounded accent-[#f67a45]"
                  />
                  <span className="font-medium">Projet mis en avant</span>
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Les projets mis en avant apparaîtront en premier sur la page des travaux
                </p>
              </div>

              {/* Main project image */}
              <div>
                <label className="block mb-2 font-medium">
                  Image principale
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="relative border-2 border-black rounded-lg overflow-hidden w-full sm:w-64 h-48">
                    {mainImagePreview ? (
                      <Image
                        src={mainImagePreview}
                        alt="Image preview"
                        fill
                        className="object-cover"
                      />
                    ) : formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Project preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-400">Aucune image</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="border-2 border-black rounded-md p-4 bg-[#f8f8f8]">
                      <div className="flex items-center gap-2 mb-3">
                        <Upload size={18} />
                        <span className="font-medium">Télécharger une image</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm mb-3"
                      />
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={handleUploadMainImage}
                          disabled={saving}
                          className="bg-[#f67a45] text-white border-2 border-black rounded-md px-4 py-2 text-sm font-medium inline-flex items-center"
                        >
                          {saving ? 'Chargement...' : 'Télécharger'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Gallery Section avec prévisualisation */}
              <div>
                <label className="block mb-4 font-medium text-xl">
                  Galerie d'images du projet
                </label>
                
                {/* Image uploading section */}
                <div className="border-2 border-black rounded-md p-4 bg-[#f8f8f8] mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Upload size={18} />
                    <span className="font-medium">Ajouter une image à la galerie</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        id="gallery-file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryFileChange}
                        className="block w-full text-sm mb-3"
                      />
                      {galleryImagePreview && (
                        <div className="relative w-full h-[150px] mt-2 border border-gray-300 rounded-md overflow-hidden">
                          <Image 
                            src={galleryImagePreview}
                            alt="Prévisualisation"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={newImageCaption}
                        onChange={(e) => setNewImageCaption(e.target.value)}
                        placeholder="Légende de l'image"
                        className="w-full p-2 border-2 border-black rounded-md"
                      />
                    </div>
                  </div>
                  
                  {galleryFile && (
                    <button
                      type="button"
                      onClick={handleAddProjectImage}
                      disabled={uploadingImage}
                      className="bg-[#f67a45] text-white border-2 border-black rounded-md px-4 py-2 text-sm font-medium inline-flex items-center"
                    >
                      {uploadingImage ? 'Chargement...' : 'Ajouter à la galerie'}
                    </button>
                  )}
                </div>
                
                {/* Gallery images list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectImages.map((image, index) => (
                    <div 
                      key={image.id} 
                      className="border-2 border-black rounded-lg overflow-hidden"
                    >
                      <div className="aspect-video relative">
                        <Image
                          src={image.url}
                          alt={image.caption || `Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{image.caption || `Image ${index + 1}`}</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditCaption(image.id, image.caption || '')}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              Modifier
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(image.id)}
                              className="text-sm text-red-500 hover:text-red-700"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton de sauvegarde */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={saving}
                  className="relative inline-block group"
                >
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                  <div className="relative px-6 py-3 bg-[#f67a45] text-white border-2 border-black rounded-xl font-medium inline-flex items-center space-x-2 transition-transform group-hover:-translate-y-0.5">
                    {saving ? 'Enregistrement...' : 'Enregistrer le projet'}
                  </div>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}