"use client"

import GradientBackground from "@/components/ui/background"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface Blog {
  id: string
  title: string
  excerpt: string
  category: string
  publishDate: string
  coverImage: string | null
  slug: string
  status: string
}

export default function Work() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/admin/blogs')
        if (!res.ok) throw new Error('Failed to fetch blogs')
        const data = await res.json()
        // Ne garder que les blogs publiés
        setBlogs(data.filter((blog: Blog) => blog.status === 'published'))
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Sample photography gallery data
  const photoGallery = [
    { id: 1, src: "/placeholder.svg?height=600&width=800", title: "Lumière urbaine", category: "Urban" },
    { id: 2, src: "/placeholder.svg?height=600&width=800", title: "Portrait en studio", category: "Portrait" },
    { id: 3, src: "/placeholder.svg?height=600&width=800", title: "Nature abstraite", category: "Nature" },
    { id: 4, src: "/placeholder.svg?height=600&width=800", title: "Architecture moderne", category: "Architecture" },
    { id: 5, src: "/placeholder.svg?height=600&width=800", title: "Scène de rue", category: "Urban" },
    { id: 6, src: "/placeholder.svg?height=600&width=800", title: "Portrait artistique", category: "Portrait" },
    { id: 7, src: "/placeholder.svg?height=600&width=800", title: "Macro nature", category: "Nature" },
    { id: 8, src: "/placeholder.svg?height=600&width=800", title: "Géométrie urbaine", category: "Architecture" },
  ]

  // Sample school projects data
  const schoolProjects = [
    {
      id: 1,
      title: "Redesign de l'application Météo",
      description: "Projet de refonte UX/UI pour une application météo plus intuitive et visuellement attrayante.",
      year: "2022",
      tags: ["UX/UI", "Mobile App", "Weather"],
      image: "/placeholder.svg?height=500&width=700",
      color: "#FFD2BF",
    },
    {
      id: 2,
      title: "Campagne de sensibilisation écologique",
      description: "Création d'une campagne visuelle complète pour sensibiliser à la protection de l'environnement.",
      year: "2021",
      tags: ["Branding", "Print", "Campaign"],
      image: "/placeholder.svg?height=500&width=700",
      color: "#E9B949",
    },
    {
      id: 3,
      title: "Typographie expérimentale",
      description: "Exploration de formes typographiques innovantes pour créer une police de caractères unique.",
      year: "2021",
      tags: ["Typography", "Experimental", "Print"],
      image: "/placeholder.svg?height=500&width=700",
      color: "#F67A45",
    },
  ]

  // Filter photos by category
  const filteredPhotos =
    activeCategory === "all" ? photoGallery : photoGallery.filter((photo) => photo.category === activeCategory)

  // Open gallery with specific photo
  const openGallery = (index: number) => {
    setCurrentPhotoIndex(index)
    setIsGalleryOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Close gallery
  const closeGallery = () => {
    setIsGalleryOpen(false)
    document.body.style.overflow = "auto"
  }

  // Navigate through gallery
  const navigateGallery = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentPhotoIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1))
    } else {
      setCurrentPhotoIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1))
    }
  }

  // Toggle project details
  const toggleProject = (id: number) => {
    setActiveProject(activeProject === id ? null : id)
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
                    Resume
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
                <div className="absolute -top-6 sm:-top-8 left-1 sm:left-2">
                  <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap">
                    Mon portfolio
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
                {blogs[0] && (
                  <div className="md:col-span-8 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                      <article className="border-3 border-black rounded-lg overflow-hidden bg-white transition-transform group-hover:-translate-y-1">
                        <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
                          <img
                            src={blogs[0].coverImage || "/placeholder.svg"}
                            alt={blogs[0].title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 bg-[#FFD2BF] text-black font-bold px-3 py-1 rounded-full border-2 border-black text-xs">
                            {blogs[0].category}
                          </div>
                        </div>
                        <div className="p-4 sm:p-6">
                          <span className="text-sm text-[#3C3C3C]">{formatDate(blogs[0].publishDate)}</span>
                          <h3 className="text-xl sm:text-2xl font-bold mt-2 mb-3">{blogs[0].title}</h3>
                          <p className="text-[#3C3C3C] mb-4">{blogs[0].excerpt}</p>
                          <Link 
                            href={`/work/blog/${blogs[0].slug}`}
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
                  {blogs.slice(1, 3).map((blog) => (
                    <div key={blog.id} className="group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                        <article className="border-3 border-black rounded-lg overflow-hidden bg-white transition-transform group-hover:-translate-y-1">
                          <div className="relative h-[140px] overflow-hidden">
                            <img
                              src={blog.coverImage || "/placeholder.svg"}
                              alt={blog.title}
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
                <button className="relative inline-block group">
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                  <div className="relative px-6 py-2 bg-white border-2 border-black rounded-full font-medium flex items-center transition-transform group-hover:-translate-y-0.5">
                    Voir tous les articles
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </button>
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

              {/* Category filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-3 py-1 border-2 border-black rounded-full text-xs font-medium transition-all ${
                    activeCategory === "all" ? "bg-[#E9B949] text-black" : "bg-white hover:bg-[#FFE8DD]"
                  }`}
                >
                  Tous
                </button>
                {Array.from(new Set(photoGallery.map((photo) => photo.category))).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 border-2 border-black rounded-full text-xs font-medium transition-all ${
                      activeCategory === category ? "bg-[#E9B949] text-black" : "bg-white hover:bg-[#FFE8DD]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Interactive masonry gallery */}
              <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`relative group cursor-pointer ${index % 5 === 0 ? "sm:col-span-2 md:col-span-2" : ""}`}
                    onClick={() => openGallery(index)}
                  >
                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                    <div className="border-3 border-black rounded-lg overflow-hidden bg-white transition-transform group-hover:-translate-y-1">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white border-2 border-black rounded-full p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium">{photo.title}</h3>
                        <span className="text-xs text-[#3C3C3C]">{photo.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
                {schoolProjects.map((project) => (
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
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
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
                                <li>Développer une solution créative pour un problème réel</li>
                                <li>Appliquer les principes de design appris en cours</li>
                                <li>Créer une expérience utilisateur intuitive et engageante</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Compétences développées</h4>
                              <ul className="list-disc pl-5 space-y-1 text-[#3C3C3C]">
                                <li>Recherche utilisateur et analyse des besoins</li>
                                <li>Prototypage et tests d'utilisabilité</li>
                                <li>Présentation et défense du concept</li>
                              </ul>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <button className="relative inline-block group">
                              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                              <div className="relative px-4 py-2 bg-[#f67a45] text-white border-2 border-black rounded-md font-medium flex items-center transition-transform group-hover:-translate-y-0.5">
                                Voir le projet complet
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </div>
                            </button>
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

      {/* Fullscreen gallery modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 bg-white rounded-full p-2 border-2 border-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={() => navigateGallery("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 border-2 border-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => navigateGallery("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 border-2 border-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="max-w-4xl max-h-[80vh] relative">
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-xl -z-10"></div>
            <div className="border-4 border-black rounded-xl overflow-hidden bg-white">
              <img
                src={filteredPhotos[currentPhotoIndex].src || "/placeholder.svg"}
                alt={filteredPhotos[currentPhotoIndex].title}
                className="max-h-[70vh] object-contain mx-auto"
              />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg">{filteredPhotos[currentPhotoIndex].title}</h3>
                <p className="text-sm text-[#3C3C3C]">{filteredPhotos[currentPhotoIndex].category}</p>
              </div>
            </div>
          </div>

          {/* Thumbnail navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-[90vw] p-2">
            {filteredPhotos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-12 h-12 flex-shrink-0 border-2 ${
                  currentPhotoIndex === index ? "border-white" : "border-gray-500"
                } rounded-md overflow-hidden`}
              >
                <img src={photo.src || "/placeholder.svg"} alt={photo.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
