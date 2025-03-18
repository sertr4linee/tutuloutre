'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function AdminAbout() {
  const [data, setData] = useState({
    myApproach: '',
    degree: '',
    school: '',
    years: '',
    skills: [] as string[]
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        if (!token) {
          setError('Non authentifié')
          router.push('/admin/login')
          return
        }
        const aboutData = await api.admin.about.get(token)
        if (aboutData) {
          setData(aboutData)
        }
      } catch (error) {
        console.error('Error loading about data:', error)
        setError('Erreur lors du chargement des données')
      } finally {
        setLoading(false)
      }
    }

    loadAboutData()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      if (!token) {
        setError('Non authentifié')
        router.push('/admin/login')
        return
      }
      await api.admin.about.update(data, token)
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error updating about:', error)
      setError('Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Chargement...</div>

  return (
    <div className="min-h-screen p-8 bg-[#FFFBF5]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Éditer À Propos</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Mon Approche</label>
            <textarea
              value={data.myApproach}
              onChange={(e) => setData({...data, myApproach: e.target.value})}
              className="w-full p-3 border-2 border-black rounded-lg"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-2">Diplôme</label>
            <input
              type="text"
              value={data.degree}
              onChange={(e) => setData({...data, degree: e.target.value})}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2">École</label>
            <input
              type="text"
              value={data.school}
              onChange={(e) => setData({...data, school: e.target.value})}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2">Années d'expérience</label>
            <input
              type="text"
              value={data.years}
              onChange={(e) => setData({...data, years: e.target.value})}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2">Compétences (séparées par des virgules)</label>
            <input
              type="text"
              value={data.skills.join(', ')}
              onChange={(e) => setData({...data, skills: e.target.value.split(',').map(s => s.trim())})}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>

          {error && (
            <div className="text-red-500">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  )
} 