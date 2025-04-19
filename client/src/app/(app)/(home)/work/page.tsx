"use client"

import GradientBackground from "@/components/ui/background"
import { useState, useCallback, useEffect } from "react"
import dynamic from 'next/dynamic'
import { PHOTO_ALBUMS } from "@/lib/constants"
import { Metadata } from "next"
import WorkNav from "@/components/work/WorkNav"
import DecorativeElements from "@/components/work/DecorativeElements"

const LoadingComponent = () => (
  <div className="my-4 sm:my-6 md:my-8 lg:my-10 flex items-center justify-center px-4">
    <div className="relative w-full max-w-sm">
      <div className="bg-[#FFFBF5] border-4 border-black p-6 sm:p-8 rounded-lg shadow-brutal relative">
        <div className="flex items-center justify-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 sm:w-5 sm:h-5 bg-[#f67a45] border-2 border-black"
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
  loading: () => <LoadingComponent />,
  ssr: false
})

const BlogSection = dynamic(() => import('@/components/work/BlogSection'), {
  loading: () => <LoadingComponent />,
  ssr: false
})
export default function WorkPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = useCallback((sectionId: string) => {
    window.scrollTo({ 
      top: document.getElementById(sectionId)?.offsetTop! - 100, 
      behavior: "smooth" 
    })
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-8 sm:pb-12 md:pb-16 lg:pb-20">
      <GradientBackground />
      <DecorativeElements />

      <div className="relative z-30 flex flex-col items-center justify-start w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="w-full max-w-7xl">
          <WorkNav scrollTo={scrollTo} />
        </div>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
          <div id="projects" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <BlogSection />
          </div>
          <div id="photography" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <PhotographySection albums={PHOTO_ALBUMS} />
          </div>
          <div id="blog" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <ProjectsSection />
          </div>
        </div>
      )}
    </main>
  )
}