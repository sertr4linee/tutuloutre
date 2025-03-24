"use client"

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Highlight from '@tiptap/extension-highlight'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { getBlogs, createBlog, updateBlog, deleteBlog, uploadImage } from '@/app/actions'

interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  publishDate: string
  status: "draft" | "published"
  slug: string
  coverImage: string | null
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

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Strike,
      Highlight.configure({
        multicolor: true,
      }),
      Color,
      TextStyle,
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setBlog(prev => ({ ...prev, content: editor.getHTML() }))
    }
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const result = await getBlogs()
      
      if (result.error) {
        throw new Error(result.error)
      }
      
      if (result.data) {
        setBlogs(result.data)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const result = await deleteBlog(id)
      
      if (result.error) {
        throw new Error(result.error)
      }

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
      // Générer un slug à partir du titre ou utiliser un slug temporaire si pas de titre
      const slug = formData.title 
        ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        : `temp-${Date.now()}`

      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('type', 'blog')
      formDataUpload.append('id', slug)

      const result = await uploadImage(formDataUpload)

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.data) {
        setBlog(prev => ({ ...prev, coverImage: result.data.url }))
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

  const handleSave = async (status: 'draft' | 'published') => {
    try {
      const blogData = {
        ...formData,
        status,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }

      const result = selectedBlog 
        ? await updateBlog(selectedBlog.id, blogData)
        : await createBlog(blogData)
      
      if (result.error) {
        throw new Error(result.error)
      }

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
      if (editor) {
        editor.commands.setContent('')
      }
    }
  }, [mode, editor])

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
      if (editor) {
        editor.commands.setContent(selectedBlog.content)
      }
    }
  }, [mode, selectedBlog, editor])

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
              <Image
                src={formData.coverImage}
                alt="Cover"
                width={160}
                height={90}
                className="w-full h-full object-cover rounded-lg border-2 border-black"
              />
              <button
                onClick={() => setBlog(prev => ({ ...prev, coverImage: null }))}
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
          <div className="border-b-2 border-black p-2 flex flex-wrap gap-2 bg-gray-50">
            {/* Texte basique */}
            <div className="flex gap-2 border-r-2 border-black pr-2">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive('bold') ? 'bg-black text-white' : ''
                }`}
                title="Gras"
              >
                <strong>B</strong>
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive('italic') ? 'bg-black text-white' : ''
                }`}
                title="Italique"
              >
                <em>I</em>
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive('underline') ? 'bg-black text-white' : ''
                }`}
                title="Souligné"
              >
                <u>U</u>
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive('strike') ? 'bg-black text-white' : ''
                }`}
                title="Barré"
              >
                <s>S</s>
              </button>
            </div>

            {/* Alignement */}
            <div className="flex gap-2 border-r-2 border-black pr-2">
              <button
                onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive({ textAlign: 'left' }) ? 'bg-black text-white' : ''
                }`}
                title="Aligner à gauche"
              >
                ←
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive({ textAlign: 'center' }) ? 'bg-black text-white' : ''
                }`}
                title="Centrer"
              >
                ↔
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive({ textAlign: 'right' }) ? 'bg-black text-white' : ''
                }`}
                title="Aligner à droite"
              >
                →
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive({ textAlign: 'justify' }) ? 'bg-black text-white' : ''
                }`}
                title="Justifier"
              >
                ⇔
              </button>
            </div>

            {/* Titres et listes */}
            <div className="flex gap-2 border-r-2 border-black pr-2">
              <select
                onChange={(e) => {
                  if (e.target.value === 'paragraph') {
                    editor?.chain().focus().setParagraph().run()
                  } else {
                    editor?.chain().focus().toggleHeading({ level: parseInt(e.target.value) as 1 | 2 | 3 }).run()
                  }
                }}
                className="px-3 py-1 border-2 border-black rounded"
                value={
                  editor?.isActive('heading', { level: 1 })
                    ? '1'
                    : editor?.isActive('heading', { level: 2 })
                    ? '2'
                    : editor?.isActive('heading', { level: 3 })
                    ? '3'
                    : 'paragraph'
                }
              >
                <option value="paragraph">Paragraphe</option>
                <option value="1">Titre 1</option>
                <option value="2">Titre 2</option>
                <option value="3">Titre 3</option>
              </select>
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive('bulletList') ? 'bg-black text-white' : ''
                }`}
                title="Liste à puces"
              >
                •
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive('orderedList') ? 'bg-black text-white' : ''
                }`}
                title="Liste numérotée"
              >
                1.
              </button>
            </div>

            {/* Couleurs et surlignage */}
            <div className="flex gap-2 border-r-2 border-black pr-2">
              <input
                type="color"
                onInput={(e) => {
                  editor?.chain().focus().setColor(e.currentTarget.value).run()
                }}
                className="w-8 h-8 border-2 border-black rounded cursor-pointer"
                title="Couleur du texte"
              />
              <button
                onClick={() => editor?.chain().focus().toggleHighlight().run()}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive('highlight') ? 'bg-black text-white' : ''
                }`}
                title="Surligner"
              >
                <span className="bg-yellow-200 px-1">H</span>
              </button>
            </div>

            {/* Liens et autres */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const url = window.prompt('URL du lien:')
                  if (url) {
                    editor?.chain().focus().setLink({ href: url }).run()
                  }
                }}
                className={`px-3 py-1 border-2 border-black rounded ${
                  editor?.isActive('link') ? 'bg-black text-white' : ''
                }`}
                title="Ajouter un lien"
              >
                🔗
              </button>
              <button
                onClick={() => editor?.chain().focus().unsetLink().run()}
                className="px-3 py-1 border-2 border-black rounded"
                title="Supprimer le lien"
              >
                🔗❌
              </button>
              <button
                onClick={() => editor?.chain().focus().undo().run()}
                className="px-3 py-1 border-2 border-black rounded"
                title="Annuler"
              >
                ↩
              </button>
              <button
                onClick={() => editor?.chain().focus().redo().run()}
                className="px-3 py-1 border-2 border-black rounded"
                title="Rétablir"
              >
                ↪
              </button>
            </div>
          </div>
          <EditorContent 
            editor={editor} 
            className="prose max-w-none p-4 min-h-[400px]"
          />
        </div>
      </div>
    </div>
  )
} 