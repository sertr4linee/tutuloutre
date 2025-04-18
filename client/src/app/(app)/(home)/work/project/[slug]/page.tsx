"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Share2,
  ThumbsUp,
  Bookmark,
  ExternalLink,
  X,
} from "lucide-react"
import GradientBackground from "@/components/ui/background"
import { NeoAlert } from "@/components/ui/neo-alert"
import { NeoButton } from "@/components/ui/neo-button"
import { NeoCard } from "@/components/ui/neo-card"
import { NeoTabs } from "@/components/ui/neo-tabs"
import { SCHOOL_PROJECTS } from "@/lib/constants"

export default function ProjectPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const router = useRouter()

  // Trouver le projet correspondant dans SCHOOL_PROJECTS
  const project = SCHOOL_PROJECTS.find((p) => p.slug === slug || p.id === slug)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") previousImage()
    if (e.key === "Escape") setIsImageViewerOpen(false)
  }, [])

  const nextImage = useCallback(() => {
    if (!project) return
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }, [project])

  const previousImage = useCallback(() => {
    if (!project) return
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }, [project])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isImageViewerOpen) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isImageViewerOpen, handleKeyDown])

  if (!mounted) return null

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <GradientBackground />
        <NeoCard className="max-w-md w-full rounded-xl">
          <h1 className="text-3xl font-black mb-4 neo-heading">Projet non trouvé</h1>
          <p className="text-xl mb-6 font-bold">Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
          <NeoButton variant="primary" className="rounded-full">
            <Link href="/work" className="inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux travaux
            </Link>
          </NeoButton>
        </NeoCard>
      </div>
    )
  }

  // Contenu des objectifs du projet
  const objectivesContent = (
    <div className="neo-content">
      <h3 className="text-2xl font-bold mb-4">Objectifs du projet</h3>
      <ul className="list-disc pl-5 space-y-3 text-black">
        {project.objectives &&
          project.objectives.map((objective, index) => (
            <li key={index} className="font-medium">
              {objective}
            </li>
          ))}
      </ul>
    </div>
  )

  // Contenu des compétences développées
  const skillsContent = (
    <div className="neo-content">
      <h3 className="text-2xl font-bold mb-4">Compétences développées</h3>
      <ul className="list-disc pl-5 space-y-3 text-black">
        {project.skills &&
          project.skills.map((skill, index) => (
            <li key={index} className="font-medium">
              {skill}
            </li>
          ))}
      </ul>
    </div>
  )

  // Contenu des projets similaires
  const relatedProjects = (
    <div>
      <h3 className="text-xl font-bold mb-4">Projets similaires</h3>
      <div className="space-y-4">
        {SCHOOL_PROJECTS.filter((p) => p.category === project.category && p.id !== project.id)
          .slice(0, 3)
          .map((relatedProject) => (
            <div
              key={relatedProject.id}
              className="border-3 border-black p-4 bg-white hover:translate-x-1 hover:translate-y-1 transition-transform rounded-xl"
            >
              <h4 className="font-bold mb-2">{relatedProject.title}</h4>
              <p className="text-sm mb-3">{relatedProject.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">{relatedProject.year}</span>
                <NeoButton size="sm" variant="secondary" className="rounded-full">
                  <Link href={`/work/project/${relatedProject.slug || relatedProject.id}`}>Voir</Link>
                </NeoButton>
              </div>
            </div>
          ))}
      </div>
    </div>
  )

  return (
    <>
      <div className="min-h-screen pt-12 pb-20">
        <GradientBackground />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/work">
            <NeoButton variant="secondary" className="mb-8 rounded-full">
              <span className="inline-flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Retour aux travaux
              </span>
            </NeoButton>
          </Link>
          <div className="border-3 border-black bg-white p-6 md:p-10 mb-8 shadow-neo rounded-xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 neo-heading">{project.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Image gallery */}
              <div className="border-3 border-black overflow-hidden rounded-xl">
                <div
                  className="relative aspect-[16/9] overflow-hidden cursor-pointer"
                  onClick={() => setIsImageViewerOpen(true)}
                >
                  <Image
                    src={project.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    fill
                    quality={100}
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover transition-opacity duration-300 hover:opacity-95"
                    style={{ objectFit: "contain", backgroundColor: "rgba(0,0,0,0.03)" }}
                  />

                  {/* Navigation buttons */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          previousImage()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 border-3 border-black hover:bg-gray-100 transition-colors rounded-full"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 border-3 border-black hover:bg-gray-100 transition-colors rounded-full"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Image indicators - Now below the image */}
                {project.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4 pb-2">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(index)
                        }}
                        className={`w-3 h-3 border-2 border-black rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-[#f4a990] scale-110" : "bg-white hover:bg-[#f8d7e6]"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center bg-[#f4a990] border-3 border-black px-4 py-2 font-bold rounded-full">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>Année: {project.year}</span>
                    </div>

                    <div
                      className="flex items-center border-3 border-black px-4 py-2 font-bold rounded-full"
                      style={{ backgroundColor: project.color || "#FFD166" }}
                    >
                      <span>{project.category}</span>
                    </div>
                  </div>

                  <p className="text-lg font-medium mb-6">{project.description}</p>
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white border-3 border-black px-3 py-1 font-bold rounded-full"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <NeoButton variant="primary" size="sm" className="rounded-full bg-[#f4a990] hover:bg-[#e67e56]">
                <ThumbsUp className="h-4 w-4 mr-1" /> J'aime
              </NeoButton>
              <NeoButton variant="secondary" size="sm" className="rounded-full hover:bg-[#f8d7e6]">
                <Share2 className="h-4 w-4 mr-1" /> Partager
              </NeoButton>
              <NeoButton variant="secondary" size="sm" className="rounded-full hover:bg-[#f8d7e6]">
                <Bookmark className="h-4 w-4 mr-1" /> Sauvegarder
              </NeoButton>
              <NeoButton variant="secondary" size="sm" className="rounded-full hover:bg-[#f8d7e6]">
                <ExternalLink className="h-4 w-4 mr-1" /> Voir en ligne
              </NeoButton>
            </div>

            <NeoTabs
              tabs={[
                {
                  id: "objectives",
                  label: "Objectifs",
                  content: objectivesContent,
                },
                {
                  id: "skills",
                  label: "Compétences",
                  content: skillsContent,
                },
                {
                  id: "related",
                  label: "Projets similaires",
                  content: relatedProjects,
                },
              ]}
            />
          </div>

          {/* Auteur du projet */}
          <NeoCard title="À propos du projet" className="mb-8 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                className="w-24 h-24 border-3 border-black flex items-center justify-center rounded-xl"
                style={{ backgroundColor: project.color || "#f4a990" }}
              >
                <span className="text-3xl font-black">{project.title.charAt(0)}</span>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Projet {project.category}</h4>
                <p className="text-lg">
                  Ce projet a été réalisé dans le cadre de mes études en {project.year}. Il représente une étape
                  importante dans mon parcours académique.
                </p>
              </div>
            </div>
          </NeoCard>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {isImageViewerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setIsImageViewerOpen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setIsImageViewerOpen(false)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={project.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                fill
                quality={100}
                priority
                className="object-contain"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full hover:bg-[#f8d7e6] transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full hover:bg-[#f8d7e6] transition-colors"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-4 h-4 border-2 border-white rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
