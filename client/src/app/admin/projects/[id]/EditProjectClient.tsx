"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Upload } from 'lucide-react'
import { getSchoolProject, createSchoolProject, updateSchoolProject, uploadProjectImage } from '@/app/actions'
import GradientBackground from '@/components/ui/background'
import type { SchoolProject } from '@/app/actions'

interface Props {
  id: string
}

export default function EditProjectClient({ id }: Props) {
  const router = useRouter()
  const isNew = id === 'new'

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [project, setProject] = useState<SchoolProject | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear().toString(),
    category: '',
    tags: [] as string[],
    image: '',
    objectives: [] as string[],
    skills: [] as string[],
    color: '#FFD2BF',
    featured: false
  })

  const [newTag, setNewTag] = useState('')
  const [newObjective, setNewObjective] = useState('')
  const [newSkill, setNewSkill] = useState('')

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      if (!isNew) {
        const response = await getSchoolProject(id)
        if (response.data) {
          setProject(response.data)
          setFormData({
            title: response.data.title,
            description: response.data.description,
            year: response.data.year,
            category: response.data.category,
            tags: response.data.tags,
            image: response.data.image || '',
            objectives: response.data.objectives,
            skills: response.data.skills,
            color: response.data.color,
            featured: response.data.featured
          })
        }
      }
      setLoading(false)
    }

    fetchProject()
  }, [isNew, id])

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // Générer un ID temporaire si c'est un nouveau projet
      const projectId = isNew ? `temp-${Date.now()}` : id

      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('projectId', projectId)

      const result = await uploadProjectImage(formDataUpload)

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.data) {
        setFormData(prev => ({ ...prev, image: result.data.url }))
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm transform -rotate-2 mb-2">
              Administration
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">
                {isNew ? 'Nouveau projet' : 'Modifier le projet'}
              </h1>
              <Link
                href="/admin/projects"
                className="relative inline-block group"
              >
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                <div className="relative px-4 py-2 bg-white border-2 border-black rounded-xl font-medium inline-flex items-center space-x-2 transition-transform group-hover:-translate-y-0.5">
                  <span className="text-xl">←</span>
                  <span>Retour</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
            <form onSubmit={handleSubmit} className="relative border-4 border-black bg-white p-6 rounded-xl space-y-6">
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

                <div>
                  <label className="block text-sm font-medium mb-1">Image du projet</label>
                  <div className="flex items-center gap-4">
                    {formData.image ? (
                      <div className="relative w-40 h-24">
                        <Image
                          src={formData.image}
                          alt="Project image"
                          width={160}
                          height={90}
                          className="w-full h-full object-cover rounded-lg border-2 border-black"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-40 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-black">
                        {uploading ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 mb-1" />
                            <span className="text-sm">Upload image</span>
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-xl font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full border-2 border-black bg-[#FFE8DD]"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-black hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Ajouter un tag"
                    className="flex-1 px-3 py-2 border-2 border-black rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-2 bg-white border-2 border-black rounded-lg hover:shadow-none transition-shadow"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Objectives */}
              <div>
                <h2 className="text-xl font-bold mb-4">Objectifs</h2>
                <div className="space-y-2 mb-3">
                  {formData.objectives.map((objective, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border-2 border-black rounded-lg bg-white"
                    >
                      {objective}
                      <button
                        type="button"
                        onClick={() => removeObjective(objective)}
                        className="text-black hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                    placeholder="Ajouter un objectif"
                    className="flex-1 px-3 py-2 border-2 border-black rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addObjective}
                    className="px-3 py-2 bg-white border-2 border-black rounded-lg hover:shadow-none transition-shadow"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-xl font-bold mb-4">Compétences</h2>
                <div className="space-y-2 mb-3">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border-2 border-black rounded-lg bg-white"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-black hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Ajouter une compétence"
                    className="flex-1 px-3 py-2 border-2 border-black rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-3 py-2 bg-white border-2 border-black rounded-lg hover:shadow-none transition-shadow"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Style */}
              <div>
                <h2 className="text-xl font-bold mb-4">Style</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Couleur</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="h-10 w-20 border-2 border-black rounded"
                      />
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="flex-1 px-3 py-2 border-2 border-black rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Mise en avant</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f67a45]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="relative inline-block group"
                >
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                  <div className="relative px-6 py-3 bg-[#f67a45] text-white border-2 border-black rounded-xl font-medium inline-flex items-center space-x-2 transition-transform group-hover:-translate-y-0.5">
                    {saving ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <>
                        <span>Enregistrer</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
} 