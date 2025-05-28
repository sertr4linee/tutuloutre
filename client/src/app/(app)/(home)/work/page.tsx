"use client"

import GradientBackground from "@/components/ui/background"
import { useCallback } from "react"
import dynamic from 'next/dynamic'
import { PHOTO_ALBUMS } from "@/lib/constants"
import { Metadata } from "next"
import WorkNav from "@/components/work/WorkNav"
import DecorativeElements from "@/components/work/DecorativeElements"

const ProjectsSection = dynamic(() => import('@/components/work/ProjectsSection'), {
  ssr: false
})

const PhotographySection = dynamic(() => import('@/components/work/PhotographySection'), {
  ssr: false
})

const BlogSection = dynamic(() => import('@/components/work/BlogSection'), {
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
    <main className="relative min-h-screen overflow-x-hidden pb-8 sm:pb-12 md:pb-16 lg:pb-20">
      <GradientBackground />
      <DecorativeElements />

      <div className="relative z-30 flex flex-col items-center justify-start w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="w-full max-w-7xl">
          <WorkNav scrollTo={scrollTo} />
        </div>
      </div>

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
    </main>
  )
}