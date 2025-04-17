import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Import types
import type { Blog } from '../../../interfaces'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Make sure slug exists before proceeding
    const slug = params?.slug;
    if (!slug) {
      console.error('No slug provided');
      return NextResponse.json(
        { error: 'Blog post slug is required' },
        { status: 400 }
      );
    }
    
    console.log('Fetching blog post with slug:', slug);
    
    // Initialize payload with config
    const payload = await getPayload({
      config: await configPromise,
    });
    
    // Log available collections for debugging
    console.log('Available collections:', Object.keys(payload.collections));
    
    // Check if the blog-posts collection exists
    if (!Object.keys(payload.collections).includes('blog-posts')) {
      console.error('Collection blog-posts not found');
      return NextResponse.json(
        { error: 'Blog collection not configured properly' },
        { status: 500 }
      );
    }
    
    // Query the blog post by slug
    const blogResult = await payload.find({
      collection: 'blog-posts' as any, // Type cast to avoid TS error
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 1, // To retrieve associated media
      limit: 1,
    });

    console.log('Blog query result:', blogResult.docs ? `Found ${blogResult.docs.length} docs` : 'No docs found');

    if (!blogResult.docs || blogResult.docs.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const blog = blogResult.docs[0] as any; // Type cast the blog post
    
    // Log the retrieved blog for debugging
    console.log('Retrieved blog:', {
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt?.substring(0, 50) + '...',
      slug: blog.slug
    });
    
    // Transform the blog post data to match the expected interface
    const transformedBlog = {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      publishDate: blog.publishDate, // Correct field name
      image: blog.coverImage, // Map coverImage to image
      category: blog.category,
      tags: blog.tags?.map((tag: any) => tag.tag) || [], // Extract tag values from objects
      author: blog.author,
      color: blog.category === 'Design' ? '#FF5A5F' : 
             blog.category === 'Photographie' ? '#00A699' :
             blog.category === 'Illustration' ? '#FC642D' :
             blog.category === 'UI/UX' ? '#4F46E5' : '#767676', // Generate color based on category
      slug: blog.slug,
      readingTime: calculateReadingTime(blog.content) || '5 min', // Generate reading time
    };

    return NextResponse.json(transformedBlog);
    
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Helper function to calculate reading time
function calculateReadingTime(content: any) {
  if (!content) return '1 min';
  
  let textContent = '';
  
  // For Lexical rich text format (structure with root node)
  if (content && typeof content === 'object' && content.root) {
    textContent = extractTextFromLexical(content.root);
  } 
  // For array format (old Slate format)
  else if (typeof content === 'object' && Array.isArray(content)) {
    textContent = extractTextFromSlate(content);
  } 
  // For simple string content
  else if (typeof content === 'string') {
    textContent = content;
  }
  
  // Calculate reading time (avg reading speed: 200 words per minute)
  const wordCount = textContent.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200)); // Minimum 1 minute
  
  return `${minutes} min`;
}

// Extract text from Lexical format
function extractTextFromLexical(node: any): string {
  if (!node) return '';
  
  let text = '';
  
  // Text node
  if (node.type === 'text' && typeof node.text === 'string') {
    text += node.text + ' ';
  }
  
  // Process children recursively
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child: any) => {
      text += extractTextFromLexical(child);
    });
  }
  
  return text;
}

// Extract text from Slate format (legacy)
function extractTextFromSlate(nodes: any[]): string {
  let text = '';
  if (!nodes) return text;
  
  nodes.forEach(node => {
    if (node.text) {
      text += node.text + ' ';
    }
    if (node.children) {
      text += extractTextFromSlate(node.children);
    }
  });
  
  return text;
}