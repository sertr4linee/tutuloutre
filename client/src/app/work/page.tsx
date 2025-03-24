"use client"

import GradientBackground from "@/components/ui/background"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getWorkPageData } from "@/app/actions"

interface Blog {
  id: string
  title: string
  excerpt: string
  content?: string
  category: string
  publishDate: string | Date
  status?: string
  slug: string
  coverImage: string | null
  featured: boolean
  tags: string[]
}

interface Album {
  id: string
  title: string
  description: string | null
  category: string
  coverImage: string | null
  imageCount: number
  createdAt: string
}

interface SchoolProject {
  id: string
  title: string
  description: string
  year: string
  category: string
  tags: string[]
  image: string | null
  objectives: string[]
  skills: string[]
  color: string
  featured: boolean
}

export default function WorkPage() {
  const [data, setData] = useState<{ blogs: Blog[], albums: Album[], projects: SchoolProject[] }>({ 
    blogs: [], 
    albums: [], 
    projects: [] 
  })
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [filter, setFilter] = useState('Tous')
  const [mounted, setMounted] = useState(false)
  const categories = ['Tous', 'Urban', 'Portrait', 'Nature', 'Architecture']

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
            albums: result.data.albums || [],
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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setScrollY(window.scrollY)
      }, 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const formatDate = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  const filteredAlbums = data?.albums?.filter(album => 
    filter === 'Tous' ? true : album.category === filter
  ) || []

  const toggleProject = (id: string) => {
    setActiveProject(activeProject === id ? null : id)
  }

  if (!mounted) return null

  if (loading) {
    return (
      <main className="relative min-h-screen">
        <GradientBackground />
        <div className="relative z-30 container mx-auto px-4 py-12">
          <div className="animate-pulse">
            {/* Loading skeleton */}
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GradientBackground />

      {/* Floating decorative elements */}
      <div className="fixed z-10 top-[15%] right-[5%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] animate-float">
        <Image
          src="/stars.svg"
          alt="Decorative star"
          width={120}
          height={120}
          className="w-full h-full"
          style={{
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))",
            animationDuration: "8s",
          }}
        />
      </div>

      <div
        className="fixed z-10 bottom-[10%] left-[8%] w-[60px] h-[60px] md:w-[100px] md:h-[100px] animate-bounce"
        style={{ animationDuration: "6s" }}
      >
        <Image
          src="/stars.svg"
          alt="Decorative star"
          width={100}
          height={100}
          className="w-full h-full"
          style={{
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5)) hue-rotate(340deg)",
            opacity: 0.9,
          }}
        />
      </div>

      {/* Portfolio content with neobrutalism design */}
      <div className="relative z-30 flex flex-col items-center justify-start min-h-screen py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4">
        <div className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[4px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto mb-8">
          {/* Corner elements - L-shaped design - responsive sizes */}
          <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
            <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
          </div>

          {/* Top-right corner */}
          <div className="hidden sm:block absolute -top-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute top-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute top-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Bottom-left corner */}
          <div className="hidden sm:block absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Bottom-right corner */}
          <div className="hidden sm:block absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Content container with better responsive padding */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Navigation - improved mobile layout */}
            <nav className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#2D2D2D] mb-3 sm:mb-0">
                {/* Empty for now */}
              </div>

              {/* Mobile menu button - better positioning */}
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

              {/* Navigation links - improved mobile menu */}
              <div
                className={`
                ${menuOpen ? "flex fixed inset-0 bg-white/95 z-40" : "hidden"} 
                sm:flex sm:relative sm:bg-transparent
                flex-col sm:flex-row 
                items-center justify-center sm:justify-start
                space-y-6 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8
                text-lg sm:text-base md:text-lg
                w-full sm:w-auto
              `}
              >
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
                <Link href="/work" className="hover:underline font-medium">
                  Work
                </Link>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>

                {/* Resume button - responsive sizing */}
                <div className="relative inline-block mt-4 sm:mt-0">
                  <div className="absolute top-[3px] left-[3px] w-full h-full bg-black rounded-md"></div>
                  <button className="relative bg-[#222] text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-md flex items-center justify-center text-sm sm:text-base font-medium">
                    CV
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15L12 4M12 15L8 11M12 15L16 11M8 19H16C17.1046 19 18 18.1046 18 17V15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </nav>

            {/* Work page title with decorative element */}
            <div className="mb-8 sm:mb-12">
              <div className="relative">
                <div className="absolute -top-10 sm:-top-12 left-1 sm:left-2">
                  <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap">
                    My work
                  </div>
                </div>
                <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter font-family-clash">
                  Mes Créations
                </h1>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 font-normal text-[#3C3C3C] max-w-xl leading-tight">
                Découvrez mon univers créatif à travers mes différents projets.
              </p>
            </div>

            {/* Work navigation tabs */}
            <div className="flex flex-wrap gap-3 mb-8 sticky top-0 z-10 bg-[#FFFBF5] py-3 border-b-2 border-black">
              <button
                onClick={() =>
                  window.scrollTo({ top: document.getElementById("blog")?.offsetTop! - 100, behavior: "smooth" })
                }
                className="px-4 py-2 border-2 border-black rounded-full text-sm font-medium bg-[#FFD2BF] hover:bg-[#f67a45] hover:text-white transition-all transform hover:-translate-y-1"
              >
                Blog
              </button>
              <button
                onClick={() =>
                  window.scrollTo({ top: document.getElementById("photography")?.offsetTop! - 100, behavior: "smooth" })
                }
                className="px-4 py-2 border-2 border-black rounded-full text-sm font-medium bg-[#E9B949] hover:bg-[#f67a45] hover:text-white transition-all transform hover:-translate-y-1"
              >
                Photographie
              </button>
              <button
                onClick={() =>
                  window.scrollTo({ top: document.getElementById("projects")?.offsetTop! - 100, behavior: "smooth" })
                }
                className="px-4 py-2 border-2 border-black rounded-full text-sm font-medium bg-[#F67A45] hover:bg-[#f67a45] hover:text-white transition-all transform hover:-translate-y-1"
              >
                Projets d'école
              </button>
            </div>
          </div>
        </div>

        {/* Blog Section - Creative Layout */}
        <section id="blog" className="w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl mx-auto mb-16 sm:mb-24">
          <div className="relative">
            <div className="absolute -top-6 left-4 transform rotate-3 z-10">
              <div className="bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm sm:text-base">
                Blog
              </div>
            </div>

            <div className="relative border-4 sm:border-6 border-black bg-white p-4 sm:p-6 md:p-8 rounded-xl">
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 mt-4">Mes articles récents</h2>

              {/* Blog posts in a creative layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                {/* Featured post - larger */}
                {data?.blogs[0] && (
                  <div className="md:col-span-8 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                      <article className="border-3 border-black rounded-lg overflow-hidden bg-white transition-transform group-hover:-translate-y-1">
                        <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
                          <Image
                            src={data.blogs[0].coverImage || "/placeholder.svg"}
                            alt={data.blogs[0].title}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 bg-[#FFD2BF] text-black font-bold px-3 py-1 rounded-full border-2 border-black text-xs">
                            {data.blogs[0].category}
                          </div>
                        </div>
                        <div className="p-4 sm:p-6">
                          <span className="text-sm text-[#3C3C3C]">{formatDate(data.blogs[0].publishDate)}</span>
                          <h3 className="text-xl sm:text-2xl font-bold mt-2 mb-3">{data.blogs[0].title}</h3>
                          <p className="text-[#3C3C3C] mb-4">{data.blogs[0].excerpt}</p>
                          <Link 
                            href={`/work/blog/${data.blogs[0].slug}`}
                            className="flex items-center font-medium text-[#f67a45] group-hover:underline"
                          >
                            Lire l'article
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </article>
                    </div>
                  </div>
                )}

                {/* Smaller posts - stacked */}
                <div className="md:col-span-4 space-y-6">
                  {data?.blogs.slice(1, 3).map((blog) => (
                    <div key={blog.id} className="group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                        <article className="border-3 border-black rounded-lg overflow-hidden bg-white transition-transform group-hover:-translate-y-1">
                          <div className="relative h-[140px] overflow-hidden">
                            <Image
                              src={blog.coverImage || "/placeholder.svg"}
                              alt={blog.title}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 bg-[#FFD2BF] text-black font-bold px-2 py-1 rounded-full border-2 border-black text-xs">
                              {blog.category}
                            </div>
                          </div>
                          <div className="p-4">
                            <span className="text-xs text-[#3C3C3C]">{formatDate(blog.publishDate)}</span>
                            <h3 className="text-lg font-bold mt-1 mb-2">{blog.title}</h3>
                            <Link 
                              href={`/work/blog/${blog.slug}`}
                              className="flex items-center text-sm font-medium text-[#f67a45] group-hover:underline"
                            >
                              Lire l'article
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </div>
                        </article>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View all button */}
              <div className="mt-8 text-center">
                <Link
                  href="/work/blog"
                  className="relative inline-block group"
                >
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                  <div className="relative px-6 py-2 bg-white border-2 border-black rounded-full font-medium flex items-center transition-transform group-hover:-translate-y-0.5">
                    Voir tous les articles
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Photography Gallery Section - Creative Layout */}
        <section id="photography" className="w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl mx-auto mb-16 sm:mb-24">
          <div className="relative">
            <div className="absolute -top-6 left-4 transform -rotate-2 z-10">
              <div className="bg-[#E9B949] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm sm:text-base">
                Photographie
              </div>
            </div>

            <div className="relative border-4 sm:border-6 border-black bg-white p-4 sm:p-6 md:p-8 rounded-xl">
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 mt-4">Ma galerie photo</h2>

              {/* Filtres */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setFilter('Tous')}
                  className={`px-4 py-2 rounded-full border-2 border-black transition-colors ${
                    filter === 'Tous' 
                      ? 'bg-black text-white' 
                      : 'bg-[#E9B949] hover:bg-gray-100'
                  }`}
                >
                  Tous
                </button>
                {Array.from(new Set(data?.albums.map(album => album.category) || [])).map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-full border-2 border-black transition-colors ${
                      filter === category 
                        ? 'bg-black text-white' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Grille de photos */}
              <div className="grid grid-cols-12 gap-6">
                {filteredAlbums.slice(0, 2).map((album, index) => (
                  <Link
                    key={album.id}
                    href={`/work/gallery/${album.id}`}
                    className={`relative border-4 border-black rounded-xl overflow-hidden ${
                      index === 0 ? 'col-span-8 row-span-2' : 'col-span-4'
                    }`}
                  >
                    <div className="relative aspect-[4/3]">
                      {album.coverImage ? (
                        <Image
                          src={album.coverImage}
                          alt={album.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t-4 border-black">
                      <h3 className="text-xl font-bold">{album.title}</h3>
                      <p className="text-gray-600">{album.category}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        {album.imageCount} photos
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Bouton Voir plus */}
              <div className="mt-8 text-center">
                <Link
                  href="/work/gallery"
                  className="relative inline-block group"
                >
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                  <div className="relative px-6 py-2 bg-white border-2 border-black rounded-full font-medium flex items-center transition-transform group-hover:-translate-y-0.5">
                    Voir plus de photos
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* School Projects Section - Creative Layout */}
        <section id="projects" className="w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl mx-auto mb-16 sm:mb-24">
          <div className="relative">
            <div className="absolute -top-6 left-4 transform rotate-2 z-10">
              <div className="bg-[#F67A45] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm sm:text-base">
                Projets d'école
              </div>
            </div>

            <div className="relative border-4 sm:border-6 border-black bg-white p-4 sm:p-6 md:p-8 rounded-xl">
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 mt-4">Mes projets académiques</h2>

              {/* Interactive project cards */}
              <div className="space-y-8">
                {data?.projects.map((project) => (
                  <div key={project.id} className="relative">
                    <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
                    <div
                      className={`border-3 border-black rounded-xl overflow-hidden bg-white transition-all ${
                        activeProject === project.id ? "transform -translate-y-1" : ""
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                        {/* Project image */}
                        <div className="md:col-span-5 relative">
                          <div
                            className="h-[200px] md:h-full overflow-hidden"
                            style={{ backgroundColor: `${project.color}30` }}
                          >
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute top-3 left-3 bg-white text-black font-bold px-2 py-1 rounded-full border-2 border-black text-xs">
                            {project.year}
                          </div>
                        </div>

                        {/* Project info */}
                        <div className="md:col-span-7 p-4 sm:p-6">
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-[#3C3C3C] mb-4">{project.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-[#FFE8DD] px-2 py-1 text-xs rounded-full border border-black"
                                style={{ backgroundColor: `${project.color}30` }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => toggleProject(project.id)}
                            className="flex items-center font-medium text-[#f67a45]"
                          >
                            {activeProject === project.id ? "Voir moins" : "Voir plus"}
                            <svg
                              className={`w-4 h-4 ml-2 transition-transform ${activeProject === project.id ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Expandable project details */}
                      {activeProject === project.id && (
                        <div className="p-4 sm:p-6 border-t-2 border-black bg-[#FFFBF5]">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-bold mb-2">Objectifs du projet</h4>
                              <ul className="list-disc pl-5 space-y-1 text-[#3C3C3C]">
                                {project.objectives.map((objective, index) => (
                                  <li key={index}>{objective}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Compétences développées</h4>
                              <ul className="list-disc pl-5 space-y-1 text-[#3C3C3C]">
                                {project.skills.map((skill, index) => (
                                  <li key={index}>{skill}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
