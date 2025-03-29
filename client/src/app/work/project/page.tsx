"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '@/components/ui/background'
import { getSchoolProjects } from '@/app/actions'
import { motion, AnimatePresence } from 'framer-motion'
import type { SchoolProject } from '@/app/actions'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<SchoolProject[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' ou 'list'

  // Récupérer les données des projets
  useEffect(() => {
    async function fetchProjects() {
      try {
        const result = await getSchoolProjects()
        if (result.data) {
          setProjects(result.data)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Extraire les catégories uniques des projets
  const categories = Array.from(new Set(projects.map(project => project.category)))
  
  // Filtrer les projets par catégorie
  const filteredProjects = selectedCategory 
    ? projects.filter(project => project.category === selectedCategory)
    : projects

  // Couleurs pour les différentes catégories
  const categoryColors: {[key: string]: string} = {
    'Branding': '#FF5E5B',
    'Web Design': '#4CD964',
    'Illustration': '#5E5CE6',
    'UX/UI': '#FF9500', 
    'Design': '#BF5AF2',
    'Graphisme': '#FF2D55'
  }

  // Obtenir la couleur d'une catégorie
  const getCategoryColor = (category: string) => {
    return categoryColors[category] || '#f67a45'
  }

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <GradientBackground />
        <motion.div 
          className="relative z-30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-lg -z-10"></div>
            <div className="bg-[#FFFBF5] border-[6px] border-black p-12 rounded-lg relative">
              <div className="flex items-center space-x-8">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 bg-[#f67a45] border-3 border-black"
                    animate={{
                      y: ["0%", "-100%", "0%"],
                      rotate: [0, 180, 360],
                      borderRadius: ["0%", "50%", "0%"]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <div className="absolute -top-3 -left-3 w-6 h-6">
                <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
                <div className="absolute top-0 left-0 w-2 h-full bg-black"></div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6">
                <div className="absolute bottom-0 right-0 w-full h-2 bg-black"></div>
                <div className="absolute bottom-0 right-0 w-2 h-full bg-black"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GradientBackground />
      
      {/* Éléments décoratifs flottants */}
      <div className="fixed z-10 top-[15%] right-[8%] w-[100px] h-[100px] md:w-[150px] md:h-[150px] animate-float">
        <Image
          src="/stars.svg"
          alt="Étoile décorative"
          width={150}
          height={150}
          className="w-full h-full"
          style={{ filter: "drop-shadow(4px 8px 0px rgba(0,0,0,0.6))" }}
        />
      </div>
      
      <div className="fixed z-10 bottom-[20%] left-[10%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] animate-bounce">
        <Image
          src="/stars.svg"
          alt="Étoile décorative"
          width={120}
          height={120}
          className="w-full h-full"
          style={{ 
            filter: "drop-shadow(3px 6px 0px rgba(0,0,0,0.6)) hue-rotate(200deg)",
            animationDuration: "7s"
          }}
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-30 pt-6 sm:pt-12 pb-12 sm:pb-24">
        <div className="relative w-[95%] max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute -top-4 -left-4 transform rotate-[-5deg] z-10"
          >
            <Link
              href="/work"
              className="bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-3 border-black text-base inline-flex items-center shadow-brutal-sm hover:shadow-brutal-sm-hover transition-all duration-200 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </Link>
          </motion.div>

          <div className="relative border-[8px] border-black bg-white rounded-2xl p-8 md:p-12 mt-16 sm:mt-10">
            <div className="absolute inset-0 bg-black translate-x-5 translate-y-5 rounded-2xl -z-10"></div>
            
            {/* Éléments de coin */}
            <div className="absolute -top-5 -left-5 w-10 h-10">
              <div className="absolute top-0 left-0 w-full h-3 bg-black"></div>
              <div className="absolute top-0 left-0 w-3 h-full bg-black"></div>
            </div>
            <div className="absolute -top-5 -right-5 w-10 h-10">
              <div className="absolute top-0 right-0 w-full h-3 bg-black"></div>
              <div className="absolute top-0 right-0 w-3 h-full bg-black"></div>
            </div>
            <div className="absolute -bottom-5 -left-5 w-10 h-10">
              <div className="absolute bottom-0 left-0 w-full h-3 bg-black"></div>
              <div className="absolute bottom-0 left-0 w-3 h-full bg-black"></div>
            </div>
            <div className="absolute -bottom-5 -right-5 w-10 h-10">
              <div className="absolute bottom-0 right-0 w-full h-3 bg-black"></div>
              <div className="absolute bottom-0 right-0 w-3 h-full bg-black"></div>
            </div>
            
            {/* En-tête de la page */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative inline-block mb-8"
              >
                <div className="bg-[#f67a45] text-black font-bold px-6 py-3 rounded-full border-3 border-black transform rotate-[-3deg] text-xl">
                  🎨 Mes créations
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-black relative inline-block"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Projets
                <div className="absolute -bottom-3 left-0 w-full h-2 bg-[#f67a45]"></div>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Découvrez mes projets d'école et travaux personnels
              </motion.p>

              {/* Options d'affichage */}
              <motion.div 
                className="flex justify-center items-center gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`relative ${viewMode === 'grid' ? 'opacity-100' : 'opacity-60'} transition-opacity`}
                >
                  <div className={`absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md -z-10 ${viewMode === 'grid' ? 'opacity-100' : 'opacity-0'} transition-opacity`}></div>
                  <div className={`p-2 border-2 border-black rounded-md ${viewMode === 'grid' ? 'bg-[#FFD2BF]' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`relative ${viewMode === 'list' ? 'opacity-100' : 'opacity-60'} transition-opacity`}
                >
                  <div className={`absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md -z-10 ${viewMode === 'list' ? 'opacity-100' : 'opacity-0'} transition-opacity`}></div>
                  <div className={`p-2 border-2 border-black rounded-md ${viewMode === 'list' ? 'bg-[#FFD2BF]' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="18" x2="3" y2="18"></line>
                    </svg>
                  </div>
                </button>
              </motion.div>

              {/* Filtres par catégorie */}
              <motion.div 
                className="flex flex-wrap justify-center gap-3 mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ 
                    y: -5,
                    boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)"
                  }}
                  whileTap={{ y: 0, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
                  onClick={() => setSelectedCategory(null)}
                  className={`relative px-5 py-3 rounded-full border-3 border-black transition-all ${
                    !selectedCategory ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
                  } shadow-brutal-sm text-base font-bold`}
                >
                  Tous
                </motion.button>
                
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)"
                    }}
                    whileTap={{ y: 0, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-5 py-3 rounded-full border-3 border-black transition-all shadow-brutal-sm text-base font-bold`}
                    style={{ 
                      backgroundColor: selectedCategory === category ? 'black' : getCategoryColor(category),
                      color: selectedCategory === category ? 'white' : 'black'
                    }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Liste des projets */}
            <AnimatePresence mode="wait">
              {filteredProjects.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-12"
                >
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-full -z-10"></div>
                    <div className="bg-[#FFD2BF] text-black font-bold px-8 py-4 rounded-full border-3 border-black">
                      <span className="text-2xl">🔍</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Aucun projet trouvé</h3>
                  <p className="text-gray-600 mb-8">Essayez une autre catégorie ou revenez plus tard.</p>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="relative inline-block group"
                  >
                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-full transition-transform group-hover:translate-x-3 group-hover:translate-y-3 -z-10"></div>
                    <div className="relative px-6 py-3 bg-[#f67a45] text-white border-2 border-black rounded-full font-medium inline-flex items-center transition-transform group-hover:-translate-y-1">
                      Voir tous les projets
                    </div>
                  </button>
                </motion.div>
              ) : viewMode === 'grid' ? (
                // Vue en grille
                <motion.div 
                  key="grid"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onHoverStart={() => setHoveredProject(project.id)}
                      onHoverEnd={() => setHoveredProject(null)}
                      whileHover={{ y: -10 }}
                    >
                      <Link href={`/work/project/${project.slug || project.id}`}>
                        <div className="relative cursor-pointer">
                          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
                          <div className="relative border-3 border-black rounded-xl overflow-hidden bg-white">
                            <div className="relative aspect-[4/3]">
                              {project.image ? (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  className={`object-cover transition-all duration-500 ${
                                    hoveredProject === project.id ? 'scale-110' : 'scale-100'
                                  }`}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-gray-400 text-sm">Pas d'image</span>
                                </div>
                              )}
                              
                              {/* Overlay avec effet de survol */}
                              <div className={`absolute inset-0 transition-opacity duration-300 ${
                                hoveredProject === project.id ? 'opacity-50' : 'opacity-0'
                              }`} style={{ backgroundColor: project.color }} />
                              
                              {/* Année du projet */}
                              <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full border-2 border-black text-black text-sm font-bold shadow-brutal-xs">
                                {project.year}
                              </div>
                            </div>
                            
                            <div className="p-5">
                              <div className="mb-2">
                                <span 
                                  className="inline-block px-4 py-1 text-black text-sm font-bold rounded-full border-2 border-black transform -translate-y-8 shadow-brutal-xs"
                                  style={{ backgroundColor: project.color }}
                                >
                                  {project.category}
                                </span>
                              </div>
                              <h3 className="text-2xl font-bold mb-3 line-clamp-1">{project.title}</h3>
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                              
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.tags.slice(0, 3).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 text-xs rounded-full border border-black"
                                    style={{ backgroundColor: `${project.color}30` }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {project.tags.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs border border-black">
                                    +{project.tags.length - 3}
                                  </span>
                                )}
                              </div>
                              
                              <motion.div 
                                className="text-[#f67a45] font-bold flex items-center"
                                animate={{
                                  x: hoveredProject === project.id ? 5 : 0
                                }}
                              >
                                Voir le projet
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                // Vue en liste
                <motion.div 
                  key="list"
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.07 }}
                      onHoverStart={() => setHoveredProject(project.id)}
                      onHoverEnd={() => setHoveredProject(null)}
                      whileHover={{ x: 10 }}
                    >
                      <Link href={`/work/project/${project.slug || project.id}`}>
                        <div className="relative cursor-pointer">
                          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
                          <div className="relative border-3 border-black rounded-xl overflow-hidden bg-white">
                            <div className="flex flex-col md:flex-row">
                              <div className="relative w-full md:w-1/3 aspect-[3/2] md:aspect-square">
                                {project.image ? (
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400">Pas d'image</span>
                                  </div>
                                )}
                                <div 
                                  className="absolute left-4 top-4 px-4 py-1 rounded-full border-2 border-black text-black text-sm font-bold shadow-brutal-xs"
                                  style={{ backgroundColor: project.color }}
                                >
                                  {project.category}
                                </div>
                                <div className="absolute right-4 top-4 px-3 py-1 bg-white rounded-full border-2 border-black text-black text-sm font-bold shadow-brutal-xs">
                                  {project.year}
                                </div>
                              </div>
                              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                <div>
                                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                                  <p className="text-gray-600 line-clamp-2 mb-4 md:mb-0">{project.description}</p>
                                </div>
                                <div className="pt-4">
                                  <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.tags.slice(0, 4).map((tag, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 text-xs rounded-full border border-black"
                                        style={{ backgroundColor: `${project.color}30` }}
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {project.tags.length > 4 && (
                                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs border border-black">
                                        +{project.tags.length - 4}
                                      </span>
                                    )}
                                  </div>
                                  <motion.div 
                                    className="flex items-center font-bold text-[#f67a45]"
                                    animate={{
                                      x: hoveredProject === project.id ? 5 : 0
                                    }}
                                  >
                                    Voir le projet
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Style global pour les animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .shadow-brutal-sm {
          box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
        }
        
        .shadow-brutal-sm-hover {
          box-shadow: 5px 5px 0px 0px rgba(0,0,0,1);
        }
        
        .shadow-brutal-xs {
          box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        }
      `}</style>
    </main>
  )
} 