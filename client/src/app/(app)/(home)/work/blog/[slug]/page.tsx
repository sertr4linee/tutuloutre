"use client"

import React, { useState, useEffect, useCallback, ReactNode } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag, User, MessageSquare, Share2, ThumbsUp, Bookmark } from "lucide-react"
import GradientBackground from "@/components/ui/background"
import { NeoAlert } from "@/components/ui/neo-alert"
import { NeoButton } from "@/components/ui/neo-button"
import { NeoCard } from "@/components/ui/neo-card"
import { NeoTabs } from "@/components/ui/neo-tabs"
import { NeoInput } from "@/components/ui/neo-input"

// Define RichText node types for Lexical editor
interface RichTextNode {
  root?: any
  children?: RichTextNode[]
  format?: number
  type?: string
  version?: number
  [key: string]: any
}

// Add proper Lexical rich text rendering with fallback
function renderRichText(content: any): ReactNode {
  if (!content) return null

  try {
    // For Lexical format - this is what Payload CMS uses as configured in payload.config.ts
    if (content.root && typeof content.root === "object") {
      return (
        <div className="rich-text">
          {/* Basic renderer for common elements */}
          {extractTextContent(content.root)}
        </div>
      )
    }

    // Fallback for string content
    if (typeof content === "string") {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }

    // Default fallback
    return <p>Content could not be rendered</p>
  } catch (err) {
    console.error("Error rendering rich text:", err)
    return <p>Error rendering content</p>
  }
}

// Helper function to extract text from Lexical nodes
function extractTextContent(node: any): ReactNode {
  if (!node) return null

  // Handle leaf text nodes
  if (node.type === "text" && typeof node.text === "string") {
    let element = <>{node.text}</>

    // Apply basic formatting if present
    if (node.format & 1) element = <strong>{element}</strong> // Bold
    if (node.format & 2) element = <em>{element}</em> // Italic
    if (node.format & 4) element = <u>{element}</u> // Underline
    if (node.format & 8) element = <del>{element}</del> // Strikethrough

    return element
  }

  // Handle headings
  if (node.type === "heading") {
    const children = node.children?.map((child: any, i: number) => (
      <React.Fragment key={i}>{extractTextContent(child)}</React.Fragment>
    ))

    switch (node.tag) {
      case "h1":
        return <h1 className="neo-heading">{children}</h1>
      case "h2":
        return <h2 className="neo-heading">{children}</h2>
      case "h3":
        return <h3 className="neo-heading">{children}</h3>
      case "h4":
        return <h4 className="neo-heading">{children}</h4>
      case "h5":
        return <h5 className="neo-heading">{children}</h5>
      case "h6":
        return <h6 className="neo-heading">{children}</h6>
      default:
        return <h3 className="neo-heading">{children}</h3>
    }
  }

  // Handle paragraphs
  if (node.type === "paragraph") {
    return (
      <p className="neo-paragraph">
        {node.children?.map((child: any, i: number) => (
          <React.Fragment key={i}>{extractTextContent(child)}</React.Fragment>
        ))}
      </p>
    )
  }

  // Handle lists
  if (node.type === "list") {
    const listItems = node.children?.map((child: any, i: number) => (
      <li key={i} className="neo-list-item">
        {child.children?.map((c: any, j: number) => (
          <React.Fragment key={j}>{extractTextContent(c)}</React.Fragment>
        ))}
      </li>
    ))

    return node.listType === "number" ? (
      <ol className="neo-list">{listItems}</ol>
    ) : (
      <ul className="neo-list">{listItems}</ul>
    )
  }

  // Handle links
  if (node.type === "link") {
    return (
      <a href={node.url} target={node.newTab ? "_blank" : "_self"} rel="noreferrer" className="neo-link">
        {node.children?.map((child: any, i: number) => (
          <React.Fragment key={i}>{extractTextContent(child)}</React.Fragment>
        ))}
      </a>
    )
  }

  // Recursively process children for container nodes
  if (node.children) {
    return (
      <>
        {node.children.map((child: any, i: number) => (
          <React.Fragment key={i}>{extractTextContent(child)}</React.Fragment>
        ))}
      </>
    )
  }

  // Fallback
  return null
}

interface BlogPost {
  id: string
  title: string
  content: any
  excerpt: string
  publishDate: string
  image: any
  category: string
  tags: string[]
  author: any
  color: string
  slug: string
  readingTime: string
}

// Function to get a random neo-brutalism color
const getRandomColor = () => {
  const colors = ['#FFD166', '#EF476F', '#06D6A0', '#118AB2', '#073B4C']
  return colors[Math.floor(Math.random() * colors.length)]
}

export default function BlogPostPage() {
  // Get params using the useParams hook instead
  const params = useParams()
  const slug = params?.slug as string
  
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("content")
  
  // Utiliser useCallback pour créer la fonction fetchBlogPost
  const fetchBlogPost = useCallback(async (slugValue: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/blog/${slugValue}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog post')
      }
      
      const data = await response.json()
      setBlog(data)
    } catch (err) {
      console.error('Error fetching blog post:', err)
      setError('Failed to load blog post')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Effet pour charger les données au montage du composant
  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug)
    }
  }, [slug, fetchBlogPost])

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
              <GradientBackground />
              <div className="border-3 border-black bg-white p-8 shadow-neo animate-bounce">
                <div className="flex items-center space-x-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-[#f67a45] border-2 border-black"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
                <h2 className="text-2xl font-black mt-4">CHARGEMENT...</h2>
              </div>
      </main>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-gray-600 mb-6">{error || 'Blog post not found'}</p>
        <Link href="/work" className="flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to work
        </Link>
      </div>
    )
  }

  const commentSection = (
    <div>
      <h3 className="text-xl font-bold mb-4">Comments (3)</h3>

      <div className="space-y-6 mb-8">
        <div className="border-3 border-black p-4 bg-white">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-12 h-12 border-2 border-black bg-blue-300 flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold">Jean Dupont</h4>
              <p className="text-sm text-gray-600">Il y a 2 jours</p>
            </div>
          </div>
          <p>Super article ! J'ai beaucoup appris sur ce sujet. Merci pour le partage.</p>
        </div>

        <div className="border-3 border-black p-4 bg-white">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-12 h-12 border-2 border-black bg-green-300 flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold">Marie Leroy</h4>
              <p className="text-sm text-gray-600">Il y a 3 jours</p>
            </div>
          </div>
          <p>Est-ce que vous pourriez faire un article sur les tendances à venir dans ce domaine ?</p>
        </div>

        <div className="border-3 border-black p-4 bg-white">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-12 h-12 border-2 border-black bg-yellow-300 flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold">Thomas Martin</h4>
              <p className="text-sm text-gray-600">Il y a 5 jours</p>
            </div>
          </div>
          <p>
            J'ai une question concernant la partie technique. Comment avez-vous résolu le problème mentionné dans la
            section 3 ?
          </p>
        </div>
      </div>

      <h4 className="font-bold mb-3">Ajouter un commentaire</h4>
      <NeoInput placeholder="Votre nom" className="mb-3" />
      <textarea
        className="w-full p-3 border-3 border-black mb-4 min-h-[120px]"
        placeholder="Votre commentaire..."
      ></textarea>
      <NeoButton>Publier le commentaire</NeoButton>
    </div>
  )

  const relatedPosts = (
    <div>
      <h3 className="text-xl font-bold mb-4">Articles similaires</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-3 border-black p-4 bg-white hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            <h4 className="font-bold mb-2">Article similaire #{i}</h4>
            <p className="text-sm mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Il y a {i * 2} jours</span>
              <NeoButton size="sm" variant="secondary">
                Lire
              </NeoButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <main className="relative min-h-screen">
      <GradientBackground />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <Link href="/work">
          <NeoButton variant="secondary" className="mb-8">
            <span className="inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to work
            </span>
          </NeoButton>
        </Link>
        <div className="border-3 border-black bg-white p-6 md:p-10 mb-8 shadow-neo rounded-xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6 neo-heading">{blog.title}</h1>
          
          <div className="md:flex gap-8 mb-8">
            {/* Featured Image */}
            {blog.image && (
              <div className="relative border-3 border-black w-full md:w-1/2 mb-6 md:mb-0 rounded-lg">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={blog.image.url || '/placeholder.jpg'}
                    alt={blog.title}
                    className="object-cover w-full h-full rounded-[5px]"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>
              </div>
            )}
            
            {/* Blog Details */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center bg-orange-300 border-3 border-black px-4 py-2 font-bold rounded-lg">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>
                      {new Date(blog.publishDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center bg-rose-400 border-3 border-black px-4 py-2 font-bold rounded-lg">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{blog.readingTime}</span>
                  </div>
                </div>

                {blog.category && (
                  <div
                    className="inline-block px-6 py-3 border-3 border-black font-black text-xl mb-4 rounded-lg"
                    style={{ backgroundColor: blog.color || getRandomColor() }}
                  >
                    {blog.category}
                  </div>
                )}

                {blog.excerpt && <p className="text-lg font-medium mb-6">{blog.excerpt}</p>}
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-white border-3 border-black px-3 py-1 font-bold rounded-lg">
                      <Tag className="h-4 w-4 mr-1" />
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Tabs */}
          <div className="border-t-3 border-b-3 border-black py-4 mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 border-3 border-black font-bold rounded-lg ${
                  activeTab === "content"
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Article
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`px-4 py-2 border-3 border-black font-bold rounded-lg ${
                  activeTab === "comments"
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Comments
              </button>
              <button
                onClick={() => setActiveTab("related")}
                className={`px-4 py-2 border-3 border-black font-bold rounded-lg ${
                  activeTab === "related"
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Related
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === "content" && (
              <div className="prose prose-lg max-w-none">
                {/* Rich Text Content */}
                {renderRichText(blog.content) || <p>{blog.excerpt}</p>}
              </div>
            )}

            {activeTab === "comments" && (
              <div>
                <NeoAlert type="info" className="mb-6">
                  <p className="font-bold">Comments are not yet implemented</p>
                  <p>This is a placeholder for the comments feature.</p>
                </NeoAlert>
                <div className="flex items-center gap-4 mb-6">
                  <MessageSquare className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Comments (0)</h3>
                </div>
                <div className="border-3 border-black p-6 bg-gray-50">
                  <p className="font-medium text-center my-8">Be the first to leave a comment!</p>
                </div>
              </div>
            )}

            {activeTab === "related" && (
              <div>
                <NeoAlert type="info">
                  <p className="font-bold">Related content is not yet implemented</p>
                  <p>This is a placeholder for related articles.</p>
                </NeoAlert>
              </div>
            )}
          </div>

        </div>

        {/* Author section */}
        {blog.author && (
          <div className="border-3 border-black bg-white p-6 md:p-8 mb-8 shadow-neo rounded-xl">
            <h2 className="text-2xl font-black mb-6">About the Author</h2>
            <div className="flex items-center gap-6">
              <div className="relative border-3 border-black w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                {blog.author.image ? (
                  <Image 
                    src={blog.author.image.url || '/placeholder-avatar.jpg'} 
                    alt={blog.author.name || 'Author'} 
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <User className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">{blog.author.name || 'Anonymous'}</h3>
                {blog.author.bio && <p className="text-gray-600">{blog.author.bio}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
