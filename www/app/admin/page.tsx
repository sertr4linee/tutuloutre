"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Instrument_Serif } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { BeigeBackground } from "@/components/beige-background"
import { trpc } from "@/lib/trpc/client"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { Plus, LogOut, X, Pencil, Trash2, ExternalLink, Loader2, AlertTriangle } from "lucide-react"
import RichTextEditor from "@/components/ui/rich-text-editor"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const categories = [
  { value: "ui-ux-design", label: "UI & UX Design" },
  { value: "direction-artistique", label: "Direction Artistique" },
  { value: "identite-visuelle", label: "Identité Visuelle" },
  { value: "web-design", label: "Web Design" },
  { value: "motion-design", label: "Motion Design" },
]

export default function AdminPage() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "ui-ux-design",
    imageUrl: "",
    coverImage: "",
    content: "",
    link: "",
  })

  const utils = trpc.useUtils()
  const { data: projects, isLoading } = trpc.project.getAll.useQuery()
  const createProject = trpc.project.create.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate()
      resetForm()
    },
  })
  const updateProject = trpc.project.update.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate()
      resetForm()
    },
  })
  const deleteProject = trpc.project.delete.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate()
      setDeleteId(null)
    },
  })

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/check")
      const data = await res.json()
      if (!data.authenticated) {
        router.push("/login")
      } else {
        setIsAuthed(true)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "ui-ux-design",
      imageUrl: "",
      coverImage: "",
      content: "",
      link: "",
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.imageUrl) {
      alert("Veuillez uploader une image principale")
      return
    }

    if (editingId) {
      updateProject.mutate({ id: editingId, ...formData })
    } else {
      createProject.mutate(formData)
    }
  }

  const handleEdit = (project: typeof projects extends (infer T)[] | undefined ? T : never) => {
    if (!project) return
    setFormData({
      title: project.title,
      description: project.description || "",
      category: project.category,
      imageUrl: project.imageUrl,
      coverImage: project.coverImage || "",
      content: project.content || "",
      link: project.link || "",
    })
    setEditingId(project.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      deleteProject.mutate({ id: deleteId })
    }
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-[#FDFCF8]">
        <BeigeBackground />
        <div className="flex flex-col items-center gap-4 z-10">
          <Loader2 className="w-8 h-8 animate-spin text-black/40" />
          <p className={`${instrumentSerif.className} text-xl text-black/60`}>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative bg-[#FDFCF8] text-[#1A1A1A]">
      <BeigeBackground />
      
      {/* Header */}
      <header className="z-10 border-b border-black/5 bg-[#FDFCF8]/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className={`${instrumentSerif.className} text-3xl`}>
              Dashboard
            </h1>
            <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/60">
              {projects?.length || 0} projets
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black/60 hover:text-black transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Voir le site
            </a>
            <div className="h-6 w-px bg-black/10" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600/80 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Form Area */}
          <div className="lg:w-1/2 shrink-0">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                {!showForm ? (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onClick={() => setShowForm(true)}
                    className="w-full aspect-4/3 border-2 border-dashed border-black/10 rounded-2xl flex flex-col items-center justify-center gap-4 text-black/40 hover:text-black hover:border-black/20 hover:bg-black/2 transition-all group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-8 h-8" />
                    </div>
                    <span className={`${instrumentSerif.className} text-2xl`}>Nouveau Projet</span>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-sm border border-black/5 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className={`${instrumentSerif.className} text-2xl`}>
                        {editingId ? "Modifier" : "Nouveau Projet"}
                      </h2>
                      <button 
                        onClick={resetForm}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-black/40" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
                          Titre
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-0 py-2 bg-transparent border-b border-black/10 focus:border-black focus:outline-none transition-colors placeholder:text-black/20"
                          placeholder="Nom du projet..."
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
                          Catégorie
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-0 py-2 bg-transparent border-b border-black/10 focus:border-black focus:outline-none transition-colors cursor-pointer"
                        >
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
                          Description Courte
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-2 bg-black/2 rounded-lg border-none focus:ring-1 focus:ring-black/10 min-h-20 resize-none text-sm"
                          placeholder="Brève description pour la carte..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
                          Contenu Détaillé
                        </label>
                        <RichTextEditor 
                          content={formData.content} 
                          onChange={(html) => setFormData({ ...formData, content: html })} 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
                          Lien Externe
                        </label>
                        <input
                          type="url"
                          value={formData.link}
                          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                          className="w-full px-0 py-2 bg-transparent border-b border-black/10 focus:border-black focus:outline-none transition-colors placeholder:text-black/20 text-sm"
                          placeholder="https://..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3 pt-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 block">
                            Image Principale
                          </label>
                          {formData.imageUrl ? (
                            <div className="relative group rounded-xl overflow-hidden border border-black/10">
                              <img
                                src={formData.imageUrl}
                                alt="Preview"
                                className="w-full aspect-video object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                  className="px-4 py-2 bg-white text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                                >
                                  Supprimer
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-black/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center">
                              <UploadButton<OurFileRouter, "projectImage">
                                endpoint="projectImage"
                                onClientUploadComplete={(res) => {
                                  if (res?.[0]) {
                                    setFormData({ ...formData, imageUrl: res[0].ufsUrl })
                                  }
                                }}
                                onUploadError={(error: Error) => {
                                  alert(`Erreur: ${error.message}`)
                                }}
                                appearance={{
                                  button: "bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 text-xs font-medium",
                                  allowedContent: "hidden",
                                }}
                                content={{
                                  button: "Upload Image"
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-3 pt-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 block">
                            Image de Couverture
                          </label>
                          {formData.coverImage ? (
                            <div className="relative group rounded-xl overflow-hidden border border-black/10">
                              <img
                                src={formData.coverImage}
                                alt="Cover Preview"
                                className="w-full aspect-video object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, coverImage: "" })}
                                  className="px-4 py-2 bg-white text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                                >
                                  Supprimer
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-black/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center">
                              <UploadButton<OurFileRouter, "projectImage">
                                endpoint="projectImage"
                                onClientUploadComplete={(res) => {
                                  if (res?.[0]) {
                                    setFormData({ ...formData, coverImage: res[0].ufsUrl })
                                  }
                                }}
                                onUploadError={(error: Error) => {
                                  alert(`Erreur: ${error.message}`)
                                }}
                                appearance={{
                                  button: "bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 text-xs font-medium",
                                  allowedContent: "hidden",
                                }}
                                content={{
                                  button: "Upload Cover"
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          type="submit"
                          disabled={createProject.isPending || updateProject.isPending}
                          className="flex-1 px-4 py-3 bg-black text-white rounded-xl hover:bg-black/80 transition-colors disabled:opacity-50 font-medium"
                        >
                          {createProject.isPending || updateProject.isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                          ) : (
                            editingId ? "Mettre à jour" : "Publier"
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="flex-1">
            <div className="mb-8 flex items-end justify-between">
              <h2 className={`${instrumentSerif.className} text-4xl`}>
                Tous les projets
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-4/3 bg-black/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : projects?.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-black/10 rounded-3xl">
                <p className="text-black/40">Aucun projet publié pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects?.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-lg hover:shadow-black/5 transition-all"
                  >
                    <div className="aspect-4/3 relative overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      
                      {/* Actions Overlay */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 bg-white text-black rounded-lg hover:bg-black hover:text-white transition-colors shadow-sm"
                          title="Modifier"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(project.id)}
                          className="p-2 bg-white text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-widest uppercase text-black/60 shadow-sm">
                          {categories.find((c) => c.value === project.category)?.label}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className={`${instrumentSerif.className} text-2xl text-black mb-2`}>
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-black/60 text-sm line-clamp-2 mb-4">
                          {project.description}
                        </p>
                      )}
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-black/40 hover:text-black transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {new URL(project.link).hostname}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm overflow-hidden"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`${instrumentSerif.className} text-xl mb-2`}>
                    Supprimer le projet ?
                  </h3>
                  <p className="text-black/60 text-sm">
                    Cette action est irréversible. Le projet sera définitivement supprimé.
                  </p>
                </div>
                <div className="flex gap-3 w-full mt-2">
                  <button
                    onClick={() => setDeleteId(null)}
                    className="flex-1 px-4 py-2 bg-black/5 text-black rounded-xl hover:bg-black/10 transition-colors text-sm font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleteProject.isPending}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    {deleteProject.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Supprimer"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
