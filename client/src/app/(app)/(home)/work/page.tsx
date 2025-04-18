"use client"

import GradientBackground from "@/components/ui/background"
import { useState, useEffect, useCallback, Suspense, lazy } from "react"
import dynamic from 'next/dynamic'

// Imports de base pour le premier rendu
import WorkNav from "@/components/work/WorkNav"
import LoadingSpinner from "@/components/work/LoadingSpinner"
import DecorativeElements from "@/components/work/DecorativeElements"

// Import dynamique des sections pour un chargement optimisé
const BlogSection = dynamic(() => import('@/components/work/BlogSection'), {
  loading: () => <div className="my-10 h-40 w-full bg-gray-100 animate-pulse rounded-lg"></div>,
  ssr: false
})

const PhotographySection = dynamic(() => import('@/components/work/PhotographySection'), {
  loading: () => <div className="my-10 h-40 w-full bg-gray-100 animate-pulse rounded-lg"></div>,
  ssr: false
})

const ProjectsSection = dynamic(() => import('@/components/work/ProjectsSection'), {
  loading: () => <div className="my-10 h-40 w-full bg-gray-100 animate-pulse rounded-lg"></div>,
  ssr: false
})

// Types
import { Blog } from "@/components/work/BlogCard"
import { Album } from "@/components/work/PhotographySection"
import { SchoolProject } from "@/components/work/ProjectsSection"

// Fonction pour récupérer les données de l'API
async function getWorkPageData() {
  try {
    const response = await fetch('/api/work', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données')
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur:', error)
    return {
      error: 'Échec de la récupération des données',
      data: {
        blogs: [],
        albums: [],
        projects: []
      }
    }
  }
}

export default function WorkPage() {
  const [data, setData] = useState<{ blogs: Blog[], albums: Album[], projects: SchoolProject[] }>({ 
    blogs: [], 
    albums: [], 
    projects: [] 
  })
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getWorkPageData()
        if (result && result.data) {
          setData({
            blogs: result.data.blogs || [],
            albums: (result.data.albums || []).map((album: Album) => ({
              ...album,
              imageCount: album.imageCount || 0
            })),
            projects: result.data.projects || []
          })
        }
      } catch (error) {
        console.error('Error fetching work page data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const scrollTo = useCallback((sectionId: string) => {
    window.scrollTo({ 
      top: document.getElementById(sectionId)?.offsetTop! - 100, 
      behavior: "smooth" 
    })
  }, [])

  if (!mounted) return null

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GradientBackground />
      <DecorativeElements />

      {/* Navigation et en-tête */}
      <div className="relative z-30 flex flex-col items-center justify-start py-4 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4">
        <WorkNav scrollTo={scrollTo} />
      </div>

      {/* Sections de contenu chargées de manière différée */}
      <BlogSection blogs={data.blogs} />
      
      <PhotographySection albums={data.albums} />

      <ProjectsSection projects={data.projects} />
    </main>
  )
}