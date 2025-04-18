"use client"

import GradientBackground from "@/components/ui/background"
import { useState, useCallback } from "react"
import dynamic from 'next/dynamic'
import { PHOTO_ALBUMS } from "@/lib/constants"

// Imports de base pour le premier rendu
import WorkNav from "@/components/work/WorkNav"
import DecorativeElements from "@/components/work/DecorativeElements"

const LoadingComponent = () => (
  <div className="my-10 flex items-center justify-center">
    <div className="relative">
      <div className="bg-[#FFFBF5] border-4 border-black p-8 rounded-lg shadow-brutal relative">
        <div className="flex items-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 bg-[#f67a45] border-2 border-black"
              style={{
                animation: `bounce 0.6s ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-black bg-black -z-10" />
      </div>
    </div>
    <style jsx global>{`
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }
    `}</style>
  </div>
)

const ProjectsSection = dynamic(() => import('@/components/work/ProjectsSection'), {
  loading: () => <LoadingComponent />,
  ssr: false
})

const PhotographySection = dynamic(() => import('@/components/work/PhotographySection'), {
  ssr: false
})

export default function WorkPage() {
  const scrollTo = useCallback((sectionId: string) => {
    window.scrollTo({ 
      top: document.getElementById(sectionId)?.offsetTop! - 100, 
      behavior: "smooth" 
    })
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GradientBackground />
      <DecorativeElements />

      {/* Navigation et en-tête */}
      <div className="relative z-30 flex flex-col items-center justify-start py-4 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4">
        <WorkNav scrollTo={scrollTo} />
      </div>

      {/* Sections de contenu chargées de manière différée */}      
      <ProjectsSection />
      <PhotographySection albums={PHOTO_ALBUMS} />
    </main>
  )
}