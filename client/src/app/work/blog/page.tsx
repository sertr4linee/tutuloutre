"use client"

import { useState, useEffect } from 'react'
import { getPublicBlogs } from '@/app/actions'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '@/components/ui/background'
import { motion, AnimatePresence } from 'framer-motion'

interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  publishDate: string
  status: string
  slug: string
  coverImage: string | null
  featured: boolean
  tags: string[]
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [loading, setLoading] = useState(true)
  const [featured, setFeatured] = useState<Blog | null>(null)
  const [hoveredBlog, setHoveredBlog] = useState<string | null>(null)

  // Définition des couleurs pour les catégories
  const categoryColors: {[key: string]: string} = {
    'Branding': '#FF5E5B',
    'Web Design': '#4CD964',
    'Illustration': '#5E5CE6', 
    'Photographie': '#FF9500',
    'Design': '#BF5AF2',
    'UI/UX': '#FF2D55'
  }

  const getCategoryColor = (category: string) => {
    return categoryColors[category] || '#f67a45'
  }

  const categories = ['Tous', 'Branding', 'Web Design', 'Illustration', 'Photographie']

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const result = await getPublicBlogs()
        if (result.data) {
          const blogsWithFormattedDate = result.data.map(blog => ({
            ...blog,
            publishDate: new Date(blog.publishDate).toISOString()
          }))
          
          setBlogs(blogsWithFormattedDate)
          
          // Définir l'article en vedette (soit le premier featured, soit le premier de la liste)
          const featuredBlog = blogsWithFormattedDate.find(blog => blog.featured) || blogsWithFormattedDate[0]
          setFeatured(featuredBlog)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const filteredBlogs = selectedCategory === 'Tous'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
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

      {/* Main content */}
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

            {/* Page title with decorative element */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative inline-block mb-8"
              >
                <div className="bg-[#f67a45] text-black font-bold px-6 py-3 rounded-full border-3 border-black transform rotate-[-3deg] text-xl">
                  ✏️ Mon blog
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-black relative inline-block"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Articles
                <div className="absolute -bottom-3 left-0 w-full h-2 bg-[#f67a45]"></div>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Découvrez mes réflexions sur le design, l'art et la créativité
              </motion.p>

              {/* Category filters */}
              <motion.div 
                className="flex flex-wrap justify-center gap-3 mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
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
                      backgroundColor: selectedCategory === category ? 'black' : category === 'Tous' ? 'white' : getCategoryColor(category),
                      color: selectedCategory === category ? 'white' : 'black'
                    }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Featured article */}
            {featured && (
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-8">
                  <h2 className="inline-block text-2xl font-bold border-b-4 border-[#f67a45] pb-1">Article en vedette</h2>
                </div>
                
                <Link href={`/work/blog/${featured.slug}`} className="group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-xl -z-10 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
                    <div className="border-3 border-black rounded-xl overflow-hidden bg-white transition-transform group-hover:-translate-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        <div className="relative h-[300px] md:h-auto">
                          <Image 
                            src={featured.coverImage || "/placeholder.svg"} 
                            alt={featured.title}
                            fill
                            className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-6 left-6 px-4 py-2 rounded-full border-3 border-black text-black text-base font-bold shadow-brutal-sm" style={{ backgroundColor: getCategoryColor(featured.category) }}>
                            {featured.category}
                          </div>
                          <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full border-2 border-black bg-white text-black text-sm font-medium shadow-brutal-xs">
                            {formatDate(featured.publishDate)}
                          </div>
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <h3 className="text-3xl md:text-4xl font-black mb-4 line-clamp-3">{featured.title}</h3>
                          <p className="text-gray-700 mb-6 line-clamp-4">{featured.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {featured.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm border-2 border-black"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="inline-flex items-center font-bold text-[#f67a45] text-lg group-hover:underline">
                            Lire l'article complet
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Blog grid - autres articles */}
            <div>
              <div className="text-center mb-10">
                <h2 className="inline-block text-2xl font-bold border-b-4 border-[#f67a45] pb-1">Tous les articles</h2>
              </div>

              <AnimatePresence>
                {filteredBlogs.length === 0 ? (
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
                    <h3 className="text-2xl font-bold mb-4">Aucun article trouvé</h3>
                    <p className="text-gray-600 mb-8">Essayez une autre catégorie ou revenez plus tard.</p>
                    <button
                      onClick={() => setSelectedCategory('Tous')}
                      className="relative inline-block group"
                    >
                      <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-full transition-transform group-hover:translate-x-3 group-hover:translate-y-3 -z-10"></div>
                      <div className="relative px-6 py-3 bg-[#f67a45] text-white border-2 border-black rounded-full font-medium inline-flex items-center transition-transform group-hover:-translate-y-1">
                        Voir tous les articles
                      </div>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {filteredBlogs.filter(blog => !featured || blog.id !== featured.id).map((blog, index) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onHoverStart={() => setHoveredBlog(blog.id)}
                        onHoverEnd={() => setHoveredBlog(null)}
                        whileHover={{ y: -10 }}
                      >
                        <Link href={`/work/blog/${blog.slug}`}>
                          <div className="relative cursor-pointer">
                            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
                            <div className="relative border-3 border-black rounded-xl overflow-hidden bg-white">
                              <div className="relative aspect-[4/3]">
                                <Image
                                  src={blog.coverImage || "/placeholder.svg"}
                                  alt={blog.title}
                                  fill
                                  className={`object-cover transition-all duration-500 ${
                                    hoveredBlog === blog.id ? 'scale-110' : 'scale-100'
                                  }`}
                                />
                                
                                {/* Overlay avec effet de survol */}
                                <div className={`absolute inset-0 transition-opacity duration-300 ${
                                  hoveredBlog === blog.id ? 'opacity-30' : 'opacity-0'
                                }`} style={{ 
                                  backgroundColor: getCategoryColor(blog.category) 
                                }} />
                                
                                {/* Étiquette de catégorie */}
                                <div 
                                  className="absolute top-4 left-4 px-3 py-1 rounded-full border-2 border-black text-black text-sm font-bold shadow-brutal-xs"
                                  style={{ backgroundColor: getCategoryColor(blog.category) }}
                                >
                                  {blog.category}
                                </div>
                              </div>
                              
                              <div className="p-5">
                                <span className="inline-block text-gray-500 text-sm mb-2">
                                  {formatDate(blog.publishDate)}
                                </span>
                                <h3 className="text-xl font-bold mb-3 line-clamp-2">{blog.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                                
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                  {blog.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-gray-100 rounded-full text-xs border border-black"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                
                                <motion.div 
                                  className="text-[#f67a45] font-bold flex items-center"
                                  animate={{
                                    x: hoveredBlog === blog.id ? 5 : 0
                                  }}
                                >
                                  Lire l'article
                                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                )}
              </AnimatePresence>
            </div>
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