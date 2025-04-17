"use client"

import { useState, useEffect } from 'react'

export default function DebugPage() {
  const [collections, setCollections] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Add blog test state
  const [blogSlug, setBlogSlug] = useState<string>('')
  const [blogData, setBlogData] = useState<any>(null)
  const [testingBlog, setTestingBlog] = useState(false)
  const [blogError, setBlogError] = useState<string | null>(null)

  useEffect(() => {
    async function checkCollections() {
      try {
        setLoading(true)
        const response = await fetch('/api/debug/collections')
        
        if (!response.ok) {
          throw new Error('Failed to fetch collections')
        }
        
        const data = await response.json()
        setCollections(data.collections || [])
      } catch (err) {
        console.error('Error checking collections:', err)
        setError('Failed to check collections')
      } finally {
        setLoading(false)
      }
    }

    checkCollections()
  }, [])
  
  const testBlogFetch = async () => {
    if (!blogSlug) {
      setBlogError('Please enter a blog slug')
      return
    }
    
    try {
      setTestingBlog(true)
      setBlogError(null)
      setBlogData(null)
      
      const response = await fetch(`/api/blog/${blogSlug}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch blog post')
      }
      
      setBlogData(data)
    } catch (err) {
      console.error('Error testing blog:', err)
      setBlogError(err instanceof Error ? err.message : 'Failed to fetch blog')
    } finally {
      setTestingBlog(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Payload CMS Debug</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Collections</h2>
        
        {loading ? (
          <div>Loading collections...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div>
            <p className="mb-2">Found {collections.length} collections:</p>
            <ul className="list-disc pl-6">
              {collections.map((collection, index) => (
                <li key={index}>{collection}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Blog Fetch</h2>
        
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={blogSlug}
            onChange={(e) => setBlogSlug(e.target.value)}
            placeholder="Enter blog slug to test"
            className="border border-gray-300 rounded-md px-3 py-2 mr-2 flex-grow"
          />
          
          <button
            onClick={testBlogFetch}
            disabled={testingBlog}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {testingBlog ? 'Testing...' : 'Test Fetch'}
          </button>
        </div>
        
        {blogError && (
          <div className="text-red-500 mb-4">{blogError}</div>
        )}
        
        {blogData && (
          <div>
            <h3 className="text-lg font-medium mb-2">Blog Post Data:</h3>
            <div className="bg-gray-100 p-3 rounded overflow-auto">
              <pre>{JSON.stringify(blogData, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 