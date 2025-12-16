"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Instrument_Serif } from "next/font/google"
import { BeigeBackground } from "@/components/beige-background"
import { trpc } from "@/lib/trpc/client"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

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
  { value: "developpement", label: "Développement" },
]

export default function AdminPage() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "ui-ux-design",
    imageUrl: "",
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
    },
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const res = await fetch("/api/auth/check")
    const data = await res.json()
    if (!data.authenticated) {
      router.push("/login")
    } else {
      setIsAuthed(true)
    }
  }

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
      link: "",
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.imageUrl) {
      alert("Veuillez uploader une image")
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
      link: project.link || "",
    })
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Supprimer ce projet ?")) {
      deleteProject.mutate({ id })
    }
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <BeigeBackground />
        <p className="text-black/60">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <BeigeBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className={`${instrumentSerif.className} text-5xl text-black`}>
            Admin Panel
          </h1>
          <div className="flex gap-4">
            <a 
              href="/" 
              className="px-4 py-2 text-black/60 hover:text-black transition-colors"
            >
              Voir le site
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-black/10 hover:bg-black/20 rounded-lg transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-colors"
          >
            {showForm ? "Annuler" : "+ Nouveau projet"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white/50 rounded-xl p-8 mb-12 space-y-6">
            <h2 className={`${instrumentSerif.className} text-2xl text-black mb-6`}>
              {editingId ? "Modifier le projet" : "Nouveau projet"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-2">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black/30"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black/30 min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-2">
                Lien (optionnel)
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black/30"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-2">
                Image
              </label>
              {formData.imageUrl ? (
                <div className="flex items-center gap-4">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                    className="text-red-500 hover:text-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              ) : (
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
                    button: "bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80",
                    allowedContent: "text-black/40 text-xs",
                  }}
                />
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={createProject.isPending || updateProject.isPending}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
              >
                {editingId ? "Mettre à jour" : "Créer le projet"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-black/10 rounded-lg hover:bg-black/20 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        <div>
          <h2 className={`${instrumentSerif.className} text-3xl text-black mb-6`}>
            Projets ({projects?.length || 0})
          </h2>

          {isLoading ? (
            <p className="text-black/60">Chargement...</p>
          ) : projects?.length === 0 ? (
            <p className="text-black/60">Aucun projet pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/50 rounded-xl overflow-hidden group"
                >
                  <div className="aspect-video relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-black/40">
                      {categories.find((c) => c.value === project.category)?.label}
                    </span>
                    <h3 className={`${instrumentSerif.className} text-xl text-black mt-1`}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-black/60 text-sm mt-2 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
