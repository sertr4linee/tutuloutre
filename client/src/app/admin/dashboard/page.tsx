"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GradientBackground from "@/components/ui/background"
import Toast from "@/components/ui/toast"

type Tab = 'projects' | 'blog' | 'messages' | 'settings' | 'about'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const router = useRouter()
  const [formData, setFormData] = useState({
    myApproach: "",
    education: {
      degree: "",
      school: "",
      years: ""
    },
    skills: [] as string[]
  })
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  })

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const res = await fetch('/api/admin/about')
        if (!res.ok) throw new Error('Failed to fetch data')
        const data = await res.json()
        setFormData({
          myApproach: data.myApproach || "",
          education: {
            degree: data.education?.degree || "",
            school: data.education?.school || "",
            years: data.education?.years || ""
          },
          skills: data.skills || []
        })
      } catch (error) {
        console.error('Error fetching about data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] relative">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
      <GradientBackground />
      
      {/* Sidebar */}
      <div className="fixed left-4 top-4 bottom-4 w-64 bg-white border-4 border-black rounded-xl p-6 z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg border-2 transition-colors ${
                activeTab === 'projects' 
                  ? 'bg-black text-white border-black' 
                  : 'border-black hover:bg-gray-100'
              }`}
            >
              Projets
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg border-2 transition-colors ${
                activeTab === 'blog' 
                  ? 'bg-black text-white border-black' 
                  : 'border-black hover:bg-gray-100'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg border-2 transition-colors ${
                activeTab === 'messages' 
                  ? 'bg-black text-white border-black' 
                  : 'border-black hover:bg-gray-100'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg border-2 transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-black text-white border-black' 
                  : 'border-black hover:bg-gray-100'
              }`}
            >
              Paramètres
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg border-2 transition-colors ${
                activeTab === 'about' 
                  ? 'bg-black text-white border-black' 
                  : 'border-black hover:bg-gray-100'
              }`}
            >
              About
            </button>
          </nav>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-72 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border-4 border-black rounded-xl p-8">
            {activeTab === 'projects' && <ProjectsPanel />}
            {activeTab === 'blog' && <BlogPanel />}
            {activeTab === 'messages' && <MessagesPanel />}
            {activeTab === 'settings' && <SettingsPanel />}
            {activeTab === 'about' && <AboutPanel formData={formData} setFormData={setFormData} setToast={setToast} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsPanel() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projets</h2>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Nouveau Projet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project cards */}
        <div className="border-4 border-black rounded-xl p-4 bg-white">
          <div className="aspect-video bg-gray-100 rounded-lg mb-4"></div>
          <h3 className="font-bold mb-2">Nom du projet</h3>
          <p className="text-gray-600 text-sm mb-4">Description courte du projet...</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Éditer
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BlogPanel() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Articles</h2>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Nouvel Article
        </button>
      </div>

      <div className="space-y-4">
        {/* Blog post items */}
        <div className="border-4 border-black rounded-xl p-4 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold mb-2">Titre de l&apos;arti   cle</h3>
              <p className="text-gray-600 text-sm mb-2">Publié le 01/03/2024</p>
              <p className="text-gray-600">Début du contenu de l&apos;article...</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Éditer
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MessagesPanel() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      <div className="space-y-4">
        {/* Message items */}
        <div className="border-4 border-black rounded-xl p-4 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold mb-1">John Doe</h3>
              <p className="text-gray-600 text-sm mb-2">john@example.com</p>
              <p className="text-gray-800">Contenu du message...</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                Répondre
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsPanel() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Paramètres</h2>
      <div className="max-w-md">
        <div className="border-4 border-black rounded-xl p-6 bg-white">
          <h3 className="font-bold mb-4">Informations du compte</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border-2 border-black rounded"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                className="w-full p-2 border-2 border-black rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Sauvegarder
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

interface AboutPanelProps {
  formData: {
    myApproach: string;
    education: {
      degree: string;
      school: string;
      years: string;
    };
    skills: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    myApproach: string;
    education: {
      degree: string;
      school: string;
      years: string;
    };
    skills: string[];
  }>>;
  setToast: React.Dispatch<React.SetStateAction<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>>;
}

function AboutPanel({ formData, setFormData, setToast }: AboutPanelProps) {
  const handleSave = async () => {
    try {
      const res = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Failed to save data')
      setToast({
        show: true,
        message: 'Changements sauvegardés avec succès !',
        type: 'success'
      })
    } catch (error) {
      console.error('Error saving data:', error)
      setToast({
        show: true,
        message: 'Erreur lors de la sauvegarde',
        type: 'error'
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Éditer la page About</h2>
      
      <form className="space-y-8">
        {/* My Approach Section */}
        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h2 className="text-xl font-bold mb-4">My Approach</h2>
          <textarea
            className="w-full p-3 border-2 border-black rounded-lg"
            rows={4}
            placeholder="Décrivez votre approche..."
            value={formData.myApproach}
            onChange={(e) => setFormData(prev => ({ ...prev, myApproach: e.target.value }))}
          />
        </div>

        {/* Education Section */}
        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h2 className="text-xl font-bold mb-4">Education</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Diplôme</label>
              <input
                type="text"
                className="w-full p-3 border-2 border-black rounded-lg"
                value={formData.education.degree}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  education: { ...prev.education, degree: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block mb-2">École</label>
              <input
                type="text"
                className="w-full p-3 border-2 border-black rounded-lg"
                value={formData.education.school}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  education: { ...prev.education, school: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block mb-2">Années</label>
              <input
                type="text"
                className="w-full p-3 border-2 border-black rounded-lg"
                placeholder="ex: 2015-2019"
                value={formData.education.years}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  education: { ...prev.education, years: e.target.value }
                }))}
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <span>{skill}</span>
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    skills: prev.skills.filter((_, i) => i !== index)
                  }))}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="px-3 py-1 border-2 border-black rounded-full text-sm"
              onClick={() => {
                const skill = prompt('Ajouter une compétence')
                if (skill) {
                  setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills, skill]
                  }))
                }
              }}
            >
              + Ajouter une compétence
            </button>
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
          onClick={handleSave}
        >
          Sauvegarder
        </button>
      </form>
    </div>
  )
} 