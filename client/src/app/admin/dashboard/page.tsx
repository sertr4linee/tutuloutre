"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import GradientBackground from "@/components/ui/background"

type Tab = 'projects' | 'blog' | 'messages' | 'settings'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <GradientBackground />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r-4 border-black p-6 z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg transition-colors ${
                activeTab === 'projects' 
                  ? 'bg-black text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              Projets
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg transition-colors ${
                activeTab === 'blog' 
                  ? 'bg-black text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg transition-colors ${
                activeTab === 'messages' 
                  ? 'bg-black text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-black text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              Paramètres
            </button>
          </nav>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'projects' && <ProjectsPanel />}
          {activeTab === 'blog' && <BlogPanel />}
          {activeTab === 'messages' && <MessagesPanel />}
          {activeTab === 'settings' && <SettingsPanel />}
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
              <h3 className="font-bold mb-2">Titre de l&apos;article</h3>
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