"use client"

import GradientBackground from "@/components/ui/background"
import { useState, useEffect, useCallback, Suspense, lazy } from "react"
import dynamic from 'next/dynamic'

// Imports de base pour le premier rendu
// import WorkNav from "@/components/work/WorkNav"
import LoadingSpinner from "@/components/work/LoadingSpinner"
import DecorativeElements from "@/components/work/DecorativeElements"

const ProjectsSection = dynamic(() => import('@/components/work/ProjectsSection'), {
  loading: () => <div className="my-10 h-40 w-full bg-gray-100 animate-pulse rounded-lg"></div>,
  ssr: false
})

export default function WorkPage() {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Ajout d'un délai simulé pour permettre le chargement des composants dynamiques
    // Vous pouvez ajuster ou supprimer ce délai selon vos besoins
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = useCallback((sectionId: string) => {
    window.scrollTo({ 
      top: document.getElementById(sectionId)?.offsetTop! - 100, 
      behavior: "smooth" 
    })
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GradientBackground />
      <DecorativeElements />

      {/* Navigation et en-tête
      <div className="relative z-30 flex flex-col items-center justify-start py-4 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4">
        <WorkNav scrollTo={scrollTo} />
      </div> */}

      {/* Sections de contenu chargées de manière différée */}      
      {mounted && (
        <ProjectsSection />
      )}
    </main>
  )
}