"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import GradientBackground from "@/components/ui/background"
import Loading from "@/components/ui/loading"
import Image from "next/image"
import { getPublicBlogBySlug } from "@/app/actions"

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

type BlogResponse = {
  data?: BlogPost
  error?: string
}

export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('useEffect triggered with slug:', params.slug)
    if (params.slug) {
      fetchBlogPost(params.slug as string)
    }
  }, [params.slug])

  async function fetchBlogPost(slug: string) {
    try {
      console.log('Starting to fetch blog post with slug:', slug)
      setLoading(true)
      setError(null)
      const result = await getPublicBlogBySlug(slug) as BlogResponse
      
      console.log('Blog post fetch result:', result)
      
      if ('error' in result) {
        console.log('Setting error:', result.error)
        setError(result.error || 'Une erreur est survenue')
        return
      }
      
      if (result.data) {
        console.log('Setting post data')
        setPost(result.data)
      } else {
        setError("Article introuvable")
      }
    } catch (error) {
      console.error("Error fetching blog post:", error)
      setError("Une erreur est survenue lors du chargement de l'article")
    } finally {
      console.log('Setting loading to false')
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
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <GradientBackground />
        <div className="relative z-30">
          <div className="relative">
            <div className="bg-[#FFFBF5] border-4 border-black p-8 rounded-lg shadow-brutal relative">
              <div className="flex items-center space-x-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 bg-[#f67a45] border-2 border-black"
                    style={{
                      animation: `bounce 0.6s ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
              <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-black bg-black -z-10" />
            </div>
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
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <GradientBackground />
        <div className="relative z-30">
          <div className="bg-[#FFFBF5] border-4 border-black p-8 rounded-lg shadow-brutal relative">
            <h2 className="text-xl font-bold mb-4">
              {error || "Article introuvable"}
            </h2>
            <Link href="/work#blog">
              <div className="relative">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md"></div>
                <button className="relative bg-white text-black border-2 border-black px-4 py-2 text-sm font-semibold flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                  ← Retour aux articles
                </button>
              </div>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-[#FFFBF5]">
      <div className="fixed inset-0 z-0">
        <GradientBackground />
      </div>

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
              <div className="relative z-10 w-full h-64 sm:h-96 border-2 border-black rounded-xl overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
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