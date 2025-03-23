"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GradientBackground from "@/components/ui/background"
import Toast from "@/components/ui/toast"
import BlogBuilder from './blog-builder'
import AboutEditor from './about-editor'
import AlbumManager from './album-manager'
import { fetchApi } from '@/lib/api'

type Tab = 'projects' | 'blog' | 'messages' | 'settings' | 'about' | 'albums'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('blog')
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
        const data = await fetchApi('/api/admin/about')
        setFormData({
          myApproach: data?.myApproach ?? "",
          education: {
            degree: data?.education?.degree ?? "",
            school: data?.education?.school ?? "",
            years: data?.education?.years ?? ""
          },
          skills: data?.skills ?? []
        })
      } catch (error) {
        console.error('Error fetching about data:', error)
        setFormData({
          myApproach: "",
          education: { degree: "", school: "", years: "" },
          skills: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  const handleHome = () => {
    router.push('/')
  }

  const handleLogout = async () => {
    try {
      await fetchApi('/api/admin/auth/logout', { method: 'POST' })
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'blog':
        return <BlogBuilder setToast={setToast} />
      case 'about':
        return <AboutEditor setToast={setToast} />
      case 'albums':
        return <AlbumManager />
      default:
        return <div>Sélectionnez un onglet</div>
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
              onClick={() => setActiveTab('albums')}
              className={`w-full text-left px-4 py-3 mb-2 rounded-lg border-2 transition-colors ${
                activeTab === 'albums' 
                  ? 'bg-black text-white border-black' 
                  : 'border-black hover:bg-gray-100'
              }`}
            >
              Albums
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
          <button onClick={handleHome} className="w-full px-4 py-3 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors">
            Retour à la page d'accueil
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
      <div className="ml-72 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border-4 border-black rounded-xl p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
} 