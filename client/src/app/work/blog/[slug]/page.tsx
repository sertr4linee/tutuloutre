"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import GradientBackground from "@/components/ui/background"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  publishDate: string
  coverImage: string | null
  author: {
    name: string
  }
  readTime: number
  tags: string[]
  status: string
  featured: boolean
}

export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.slug) {
      fetchBlogPost(params.slug as string)
    }
  }, [params.slug])

  async function fetchBlogPost(slug: string) {
    try {
      setLoading(true)
      const res = await fetch(`/api/work/blog/${slug}`)
      if (!res.ok) throw new Error("Failed to fetch blog post")
      const data = await res.json()
      setPost(data)
    } catch (error) {
      console.error("Error fetching blog post:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Article non trouvé</h1>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFBF5]">
      <GradientBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <Link href="/work#blog" className="inline-block mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md"></div>
            <button className="relative bg-white text-black border-2 border-black px-4 py-2 text-sm font-semibold flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
              ← Retour aux articles
            </button>
          </div>
        </Link>

        <article className="bg-white border-4 border-black rounded-xl p-8 shadow-brutal">
          <div className="mb-8">
            <span className={`
              inline-block px-3 py-1 rounded-full text-sm font-bold border-2 border-black mb-4
              ${post.category === 'Branding' ? 'bg-[#FFD2BF]' : ''}
              ${post.category === 'Web Design' ? 'bg-[#E9B949]' : ''}
              ${post.category === 'Illustration' ? 'bg-[#F67A45]' : ''}
            `}>
              {post.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>{post.author.name}</span>
              <span>•</span>
              <span>{formatDate(post.publishDate)}</span>
              <span>•</span>
              <span>{post.readTime} min de lecture</span>
            </div>
          </div>

          {post.coverImage && (
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl"></div>
              <img
                src={post.coverImage}
                alt={post.title}
                className="relative z-10 w-full h-64 sm:h-96 object-cover rounded-xl border-2 border-black"
              />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t-2 border-black">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 border-2 border-black rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  )
} 