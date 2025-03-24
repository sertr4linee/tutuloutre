"use client"

import { useState, useEffect } from 'react'
import { getPublicBlogs } from '@/app/actions'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '@/components/ui/background'

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

  const categories = ['Tous', 'Branding', 'Web Design', 'Illustration', 'Photographie']

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const result = await getPublicBlogs()
        if (result.data) {
          setBlogs(result.data.map(blog => ({
            ...blog,
            publishDate: new Date(blog.publishDate).toISOString()
          })))
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

      {/* Main content */}
      <div className="relative z-30 container mx-auto px-4 py-12">
        <div className="relative border-4 sm:border-6 border-black bg-white p-4 sm:p-6 md:p-8 rounded-xl mb-12">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>

          {/* Page title with decorative element */}
          <div className="relative mb-8">
            <div className="absolute -top-8 left-4 transform rotate-3 z-10">
              <div className="bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm">
                Blog
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#2D2D2D] tracking-tighter font-family-clash mt-4">
              Articles
            </h1>
            <p className="text-lg sm:text-xl text-[#3C3C3C] mt-4 max-w-2xl">
              Découvrez mes derniers articles sur le design, le développement web et mes projets créatifs.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border-2 border-black transition-colors ${
                  selectedCategory === category 
                    ? 'bg-black text-white' 
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link 
                key={blog.id}
                href={`/work/blog/${blog.slug}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <article className="border-3 border-black rounded-xl overflow-hidden bg-white transition-transform group-hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.coverImage || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#FFD2BF] text-black font-bold px-3 py-1 rounded-full border-2 border-black text-xs">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-sm text-[#3C3C3C]">{formatDate(blog.publishDate)}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{blog.title}</h3>
                    <p className="text-[#3C3C3C] text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs border border-black"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-[#f67a45] group-hover:underline">
                      Lire l'article
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-[#3C3C3C]">
                Aucun article trouvé dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 