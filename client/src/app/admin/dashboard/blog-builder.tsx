"use client"

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Upload } from 'lucide-react'

interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  publishDate: string
  status: string
  slug: string
  coverImage: string
  featured: boolean
  tags: string[]
}

interface BlogBuilderProps {
  setToast: (toast: { show: boolean; message: string; type: 'success' | 'error' }) => void;
}

export default function BlogBuilder({ setToast }: BlogBuilderProps) {
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  const [formData, setBlog] = useState<Omit<Blog, 'id' | 'publishDate' | 'slug'>>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    coverImage: '',
    status: 'draft',
    featured: false,
    tags: []
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const res = await fetch('/api/admin/blogs')
      if (!res.ok) throw new Error('Failed to fetch blogs')
      const data = await res.json()
      setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const editor = useEditor({
    extensions: [StarterKit, Image, Link],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setBlog(prev => ({ ...prev, content: editor.getHTML() }))
    }
  })

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      if (!res.ok) throw new Error('Failed to delete')

      setToast({
        show: true,
        message: 'Article supprimé avec succès',
        type: 'success'
      })

      fetchBlogs()
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
      // Créer un slug temporaire si nécessaire
      const tempSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('slug', tempSlug)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (!res.ok) throw new Error('Failed to upload image')
      
      const data = await res.json()
      setBlog(prev => ({ ...prev, coverImage: data.url }))
      setToast({
        show: true,
        message: 'Image téléchargée avec succès',
        type: 'success'
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      setToast({
        show: true,
        message: 'Erreur lors du téléchargement',
        type: 'error'
      })
    }
  }

  const handleSave = async (status: 'draft' | 'published') => {
    try {
      const method = selectedBlog ? 'PUT' : 'POST'
      const url = '/api/admin/blogs'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status,
          id: selectedBlog?.id
        })
      })

      if (!response.ok) throw new Error('Erreur lors de la sauvegarde')

      setToast({
        show: true,
        message: status === 'published' ? 'Article publié!' : 'Brouillon sauvegardé',
        type: 'success'
      })

      // Retour à la liste et rafraîchissement
      setMode('list')
      fetchBlogs()
    } catch (error) {
      setToast({
        show: true,
        message: 'Erreur lors de la sauvegarde',
        type: 'error'
      })
    }
  }

  // Réinitialiser le formulaire quand on crée un nouvel article
  useEffect(() => {
    if (mode === 'create') {
      setBlog({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        coverImage: '',
        status: 'draft',
        featured: false,
        tags: []
      })
      editor?.commands.setContent('')
    }
  }, [mode])

  // Charger les données de l'article sélectionné pour l'édition
  useEffect(() => {
    if (mode === 'edit' && selectedBlog) {
      setBlog({
        title: selectedBlog.title,
        excerpt: selectedBlog.excerpt,
        content: selectedBlog.content,
        category: selectedBlog.category,
        coverImage: selectedBlog.coverImage,
        status: selectedBlog.status,
        featured: selectedBlog.featured,
        tags: selectedBlog.tags
      })
      editor?.commands.setContent(selectedBlog.content)
    }
  }, [mode, selectedBlog])

  if (mode === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Articles</h2>
          <button
            onClick={() => setMode('create')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Nouvel article
          </button>
        </div>

        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-4 rounded-lg border-2 border-black">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{blog.excerpt}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(blog.publishDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedBlog(blog)
                      setMode('edit')
                    }}
                    className="px-3 py-1 text-sm border-2 border-black rounded hover:bg-gray-100"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
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
            {mode === 'edit' ? 'Modifier l\'article' : 'Nouvel Article'}
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleSave('draft')}
            className="px-4 py-2 border-2 border-black rounded-lg hover:bg-gray-100"
          >
            Sauvegarder comme brouillon
          </button>
          <button
            onClick={() => handleSave('published')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Publier
          </button>
        </div>
      </div>

      {/* Cover Image Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Image de couverture</label>
        <div className="flex items-center gap-4">
          {formData.coverImage ? (
            <div className="relative w-40 h-24">
              <img
                src={formData.coverImage}
                alt="Cover"
                className="w-full h-full object-cover rounded-lg border-2 border-black"
              />
              <button
                onClick={() => setBlog(prev => ({ ...prev, coverImage: '' }))}
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
            onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 border-2 border-black rounded-lg"
            placeholder="Titre de l'article"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Catégorie</label>
          <select
            value={formData.category}
            onChange={(e) => setBlog(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-3 border-2 border-black rounded-lg"
          >
            <option value="">Sélectionner une catégorie</option>
            {['Branding', 'Web Design', 'Illustration', 'Photographie'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block mb-2 font-medium">Extrait</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setBlog(prev => ({ ...prev, excerpt: e.target.value }))}
          className="w-full p-3 border-2 border-black rounded-lg"
          rows={3}
          placeholder="Bref résumé de l'article"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-2 font-medium">Tags</label>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 border-2 border-black rounded-full flex items-center gap-2"
            >
              {tag}
              <button
                onClick={() => setBlog(prev => ({
                  ...prev,
                  tags: prev.tags.filter((_, i) => i !== index)
                }))}
                className="text-red-500"
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={() => {
              const tag = prompt('Ajouter un tag')
              if (tag) {
                setBlog(prev => ({
                  ...prev,
                  tags: [...prev.tags, tag]
                }))
              }
            }}
            className="px-3 py-1 border-2 border-black rounded-full text-sm"
          >
            + Ajouter un tag
          </button>
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <label className="block mb-2 font-medium">Contenu</label>
        <div className="border-2 border-black rounded-lg overflow-hidden">
          <div className="border-b-2 border-black p-2 flex gap-2 bg-gray-50">
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`px-3 py-1 border-2 border-black rounded ${
                editor?.isActive('bold') ? 'bg-black text-white' : ''
              }`}
            >
              Gras
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`px-3 py-1 border-2 border-black rounded ${
                editor?.isActive('italic') ? 'bg-black text-white' : ''
              }`}
            >
              Italique
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-3 py-1 border-2 border-black rounded ${
                editor?.isActive('heading') ? 'bg-black text-white' : ''
              }`}
            >
              Titre
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`px-3 py-1 border-2 border-black rounded ${
                editor?.isActive('bulletList') ? 'bg-black text-white' : ''
              }`}
            >
              Liste
            </button>
          </div>
          <EditorContent editor={editor} className="prose max-w-none p-4 min-h-[400px]" />
        </div>
      </div>
    </div>
  )
} 