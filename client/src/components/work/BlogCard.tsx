import Link from "next/link"
import Image from "next/image"

export interface Blog {
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

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, featured = false }) => {
  return (
    <Link href={`/work/blog/${blog.slug}`} className="group block">
      <div className="relative">
        <div className={`absolute inset-0 bg-black ${featured ? 'translate-x-2 translate-y-2' : 'translate-x-1.5 translate-y-1.5'} rounded-lg -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3`}></div>
        <article className={`border-3 border-black rounded-lg overflow-hidden bg-white transition-transform group-hover:-translate-y-1`}>
          <div className={`relative ${featured ? 'h-[300px] sm:h-[400px]' : 'h-[140px]'} overflow-hidden`}>
            <Image
              src={blog.coverImage || "/placeholder.svg"}
              alt={blog.title}
              width={100}
              height={100}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
            <div className={`absolute ${featured ? 'top-4 left-4' : 'top-3 left-3'} bg-[#FFD2BF] text-black font-bold px-3 py-1 rounded-full border-2 border-black text-xs`}>
              {blog.category}
            </div>
          </div>
          <div className="p-4">
            <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold mb-2 line-clamp-2`}>{blog.title}</h3>
            {featured && <p className="text-gray-600 mb-3 line-clamp-3">{blog.excerpt}</p>}
            <div className="flex justify-between items-center">
              <time className="text-xs text-gray-500">
                {new Date(blog.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
              <div className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-full">Read article</div>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
};

export default BlogCard;