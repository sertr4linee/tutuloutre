"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GradientBackground from "@/components/ui/background"
import Toast from "@/components/ui/toast"
import BlogBuilder from './blog-builder'
import AboutEditor from './about-editor'
import AlbumManager from './album-manager'
import { logout, getAbout } from '@/app/actions'

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
        const result = await getAbout();
        
        if (result.error) {
          throw new Error(result.error);
        }

        const data = result.data;
        if (data) {
          setFormData({
            myApproach: data.myApproach,
            education: data.education,
            skills: data.skills
          });
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
        setFormData({
          myApproach: "",
          education: { degree: "", school: "", years: "" },
          skills: []
        });
      } finally {
        setLoading(false);
      }
    }

    fetchAboutData();
  }, []);

  const handleHome = () => {
    router.push('/')
  }

  const handleLogout = async () => {
    try {
      const result = await logout();
      
      if (result.error) {
        throw new Error(result.error);
      }

      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      setToast({
        show: true,
        message: 'Erreur lors de la déconnexion',
        type: 'error'
      });
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'blog':
        return <BlogBuilder setToast={setToast} />
      case 'about':
        return <AboutEditor setToast={setToast} />
      case 'albums':
        return <AlbumManager setToast={setToast} />
      default:
        return <div>Sélectionnez un onglet</div>
    }
  }

  return (
    <div className="min-h-screen relative">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
      <GradientBackground />
      
      {/* Sidebar with enhanced neo-brutalist design */}
      <div className="fixed left-6 top-6 bottom-6 w-72 bg-white border-4 border-black rounded-xl overflow-hidden z-40">
        <div className="absolute inset-t translate-x-2 translate-y-2 rounded-xl -z-10"></div>
        <div className="flex flex-col h-full p-6">
          {/* Logo area with decorative badge */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute -top-4 -left-2">
                <div className="bg-[#FFD2BF] text-black font-bold px-3 py-1 rounded-full border-2 border-amber-50 transform -rotate-3 text-sm">
                  Admin
                </div>
              </div>
              <h1 className="text-3xl font-black tracking-tight mt-2">Dashboard</h1>
            </div>
          </div>

          {/* Navigation with improved visual hierarchy */}
          <nav className="flex-1 space-y-3">
            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all transform hover:-translate-y-0.5 ${
                activeTab === 'blog' 
                  ? ' text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                  : 'border-black hover:bg-gray-50 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📝</span>
                <div>
                  <div className="font-medium">Blog</div>
                  <div className="text-xs opacity-75">Gérer vos articles</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('albums')}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all transform hover:-translate-y-0.5 ${
                activeTab === 'albums' 
                  ? ' text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                  : 'border-black hover:bg-gray-50 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🖼️</span>
                <div>
                  <div className="font-medium">Albums</div>
                  <div className="text-xs opacity-75">Gérer vos photos</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all transform hover:-translate-y-0.5 ${
                activeTab === 'about' 
                  ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                  : 'border-black hover:bg-gray-50 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">👋</span>
                <div>
                  <div className="font-medium">About</div>
                  <div className="text-xs opacity-75">Votre présentation</div>
                </div>
              </div>
            </button>
          </nav>

          {/* Bottom buttons with enhanced styling */}
          <div className="space-y-3 pt-6 border-t-2 border-black">
            <button 
              onClick={handleHome}
              className="w-full px-4 py-3 border-2 border-black rounded-lg bg-[#E9B949] hover:bg-[#d4a73d] transition-all transform hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-medium group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl group-hover:rotate-12 transition-transform">🏠</span>
                <div>
                  <div className="font-medium">Retour au site</div>
                  <div className="text-xs opacity-75">Voir le site public</div>
                </div>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] font-medium group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl group-hover:rotate-12 transition-transform">🚪</span>
                <div>
                  <div className="font-medium">Déconnexion</div>
                  <div className="text-xs opacity-75">Quitter l'interface admin</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main content with enhanced styling */}
      <div className="ml-[21rem] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
            <div className="bg-white border-4 border-black rounded-xl p-8">
              {/* Section badge */}
              <div className="absolute -top-4 right-8">
                <div className="bg-[#F67A45] text-black font-bold px-4 py-2 rounded-full border-2 border-black transform rotate-3">
                  {activeTab === 'blog' ? '📝 Blog Manager' : 
                   activeTab === 'albums' ? '🖼️ Album Manager' : 
                   '👋 About Editor'}
                </div>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#FFD2BF] border-2 border-black rounded-full"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#E9B949] border-2 border-black rounded-full"></div>
              
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 