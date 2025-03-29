"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import GradientBackground from '@/components/ui/background'
import { getSchoolProject } from '@/app/actions'
import type { SchoolProject } from '@/app/actions'

// Temporary type for project images
interface ProjectImage {
  id: string
  url: string
  caption: string
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [project, setProject] = useState<SchoolProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Mock images for now (these would come from the database)
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([
    {
      id: '1',
      url: '/placeholder.svg',
      caption: 'Image de couverture du projet'
    },
    {
      id: '2',
      url: '/placeholder.svg',
      caption: 'Esquisse préliminaire'
    },
    {
      id: '3',
      url: '/placeholder.svg',
      caption: 'Recherche de couleurs'
    },
    {
      id: '4',
      url: '/placeholder.svg',
      caption: 'Détail du design final'
    }
  ])

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return
      
      console.log('Fetching project with slug:', slug)
      
      try {
        const response = await getSchoolProject(slug as string)
        console.log('Project response:', response)
        
        if (response.error) {
          setError(response.error)
          console.error('Error fetching project:', response.error)
        } else if (response.data) {
          setProject(response.data)
          console.log('Project loaded:', response.data)
          console.log('Project images:', response.data.images)
          console.log('Project main image:', response.data.image)
          
          // Utiliser les images du projet si elles existent
          if (response.data && response.data.images && response.data.images.length > 0) {
            console.log('Found project images, formatting them')
            // Transformer les images de la base de données au format attendu
            const formattedImages = response.data.images.map(img => ({
              id: img.id,
              url: img.url,
              caption: img.caption || 'Image du projet'
            }));
            console.log('Formatted images:', formattedImages)
            
            // Ajouter l'image principale en premier si elle existe et n'est pas déjà dans les images
            if (response.data.image) {
              const imageUrl = response.data.image;
              console.log('Adding main image if not present:', imageUrl)
              const mainImageExists = formattedImages.some(img => img.url === imageUrl);
              
              if (!mainImageExists) {
                formattedImages.unshift({
                  id: 'main',
                  url: imageUrl,
                  caption: 'Image principale'
                });
                console.log('Main image added to formatted images')
              } else {
                console.log('Main image already in gallery, skipping')
              }
            }
            
            console.log('Setting project images:', formattedImages)
            setProjectImages(formattedImages);
            
            // Mettre l'image active sur la première image
            if (formattedImages.length > 0) {
              console.log('Setting active image to:', formattedImages[0].id)
              setActiveImage(formattedImages[0].id);
            }
          } else if (response.data.image) {
            console.log('No gallery images, but found main image')
            // Si pas d'images de galerie mais une image principale
            const newImages = [
              {
                id: 'main',
                url: response.data.image,
                caption: 'Image principale'
              }
            ];
            console.log('Setting project images with main image only:', newImages)
            setProjectImages(newImages);
            setActiveImage('main');
          } else {
            console.log('No images found for project, keeping mock images')
          }
        }
      } catch (err) {
        console.error('Exception caught when loading project:', err)
        setError('Une erreur est survenue lors du chargement du projet')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  if (loading) {
    return (
      <main className="relative min-h-screen">
        <GradientBackground />
        <div className="relative z-30 container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="relative min-h-screen">
        <GradientBackground />
        <div className="relative z-30 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
            <p className="mb-8">{error || "Le projet que vous recherchez n'existe pas."}</p>
            <Link
              href="/work"
              className="relative inline-block group"
            >
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
              <div className="relative px-6 py-2 bg-white border-2 border-black rounded-full font-medium flex items-center transition-transform group-hover:-translate-y-0.5">
                Retour aux travaux
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen">
      <GradientBackground />
      
      {/* Menu mobile */}
      <button 
        className="sm:hidden fixed top-4 right-4 p-2 z-50 bg-white/80 backdrop-blur-sm rounded-md border-2 border-black"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Navigation */}
      <div className={`
        ${menuOpen ? 'flex fixed inset-0 bg-white/95 z-40' : 'hidden'} 
        sm:flex sm:relative sm:bg-transparent
        fixed top-0 left-0 right-0 
        sm:absolute sm:top-4 sm:left-4
        flex-col sm:flex-row 
        items-center justify-center sm:justify-start
        space-y-6 sm:space-y-0 sm:space-x-4
        p-4 z-40
      `}>
        <Link href="/work" className="inline-flex items-center">
          <div className="bg-[#FFD2BF] text-black font-bold px-3 py-1 rounded-full border-2 border-black transform -rotate-3 text-sm whitespace-nowrap">
            ← Retour
          </div>
        </Link>
      </div>
      
      <div className="relative z-30 container mx-auto px-4 py-12 mt-8 sm:mt-0">
        <motion.div 
          className="relative w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute -top-8 left-4 transform rotate-2 z-10">
              <div 
                className="text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm"
                style={{ backgroundColor: project.color + '60' }}
              >
                {project.category}
              </div>
            </div>
            
            <div className="relative border-4 sm:border-6 border-black bg-white p-6 sm:p-8 rounded-xl">
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{project.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full border border-black"
                        style={{ backgroundColor: `${project.color}30` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#FFE8DD] px-4 py-2 rounded-xl border-2 border-black text-center">
                  <div className="text-sm font-medium">Année</div>
                  <div className="text-xl font-bold">{project.year}</div>
                </div>
              </div>
              
              <p className="text-lg text-[#3C3C3C] mb-8 max-w-3xl">{project.description}</p>
              
              {/* Photos gallery */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 relative inline-block">
                  Photos du projet
                  <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: project.color }}></div>
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Main image display */}
                  <div className="relative border-3 border-black rounded-xl overflow-hidden">
                    <div className="aspect-video relative">
                      {activeImage && (
                        <>
                          <Image 
                            src={projectImages.find(img => img.id === activeImage)?.url || '/placeholder.svg'} 
                            alt={project.title}
                            fill
                            className="object-contain bg-gray-100"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t-2 border-black">
                            <p className="font-medium">
                              {projectImages.find(img => img.id === activeImage)?.caption || ''}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {projectImages.map((image) => (
                      <div 
                        key={image.id}
                        className={`
                          relative border-2 border-black rounded-lg overflow-hidden cursor-pointer
                          transition-all duration-200
                          ${activeImage === image.id ? 'ring-2 ring-offset-2 ring-[#f67a45]' : 'opacity-80 hover:opacity-100'}
                        `}
                        style={{ 
                          transform: activeImage === image.id ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onClick={() => setActiveImage(image.id)}
                      >
                        <div className="aspect-square relative">
                          <Image 
                            src={image.url} 
                            alt={image.caption}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Project details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl -z-10"></div>
                  <div 
                    className="relative border-2 border-black rounded-xl p-6"
                    style={{ backgroundColor: `${project.color}15` }}
                  >
                    <h3 className="text-xl font-bold mb-4">Objectifs du projet</h3>
                    <ul className="list-disc pl-5 space-y-2 text-[#3C3C3C]">
                      {project.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl -z-10"></div>
                  <div 
                    className="relative border-2 border-black rounded-xl p-6"
                    style={{ backgroundColor: `${project.color}15` }}
                  >
                    <h3 className="text-xl font-bold mb-4">Compétences développées</h3>
                    <ul className="list-disc pl-5 space-y-2 text-[#3C3C3C]">
                      {project.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Back to all projects button */}
              <div className="text-center">
                <Link href="/work" className="relative inline-block group">
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                  <div 
                    className="relative px-6 py-3 border-2 border-black rounded-full font-medium flex items-center justify-center transition-transform group-hover:-translate-y-0.5 text-white"
                    style={{ backgroundColor: project.color }}
                  >
                    Retour à tous les projets
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 