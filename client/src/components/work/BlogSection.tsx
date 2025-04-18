import BlogCard, { Blog } from './BlogCard';
import { memo } from 'react';
import Link from 'next/link';

interface BlogSectionProps {
  blogs: Blog[];
}

const BlogSection = memo(({ blogs }: BlogSectionProps) => {
  return (
    <section id="blog" className="w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl mx-auto mb-10 sm:mb-16 mt-4">
      <div className="relative">
        <div className="absolute -top-6 left-4 transform rotate-3 z-10">
          <div className="bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm sm:text-base">
            Blog
          </div>
        </div>

        <div className="relative border-4 sm:border-6 border-black bg-white p-4 sm:p-6 md:p-8 rounded-xl">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 mt-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Mes articles récents</h2>
            
            <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
              
              <Link href="/gallery-view">
                <div className="relative inline-block group">
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                  <button className="relative px-4 py-2 bg-white border-2 border-black rounded-full text-sm font-medium transition-transform group-hover:-translate-y-0.5 inline-flex items-center">
                    Portfolio complet
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </button>
                </div>
              </Link>
            </div>
          </div>

          {/* Blog section content */}
          <div className="mt-6">
            {/* If there's no blog data yet, show placeholder */}
            {(!blogs || blogs.length === 0) ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-2">No blog posts yet</h3>
                <p className="text-gray-600">Blog posts will appear here once they are added.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                {/* Featured post - larger */}
                {blogs[0] && (
                  <div className="md:col-span-8">
                    <BlogCard blog={blogs[0]} featured={true} />
                  </div>
                )}

                {/* Smaller posts - stacked */}
                <div className="md:col-span-4 space-y-6">
                  {blogs.slice(1, 3).map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Show more blogs if available */}
            {blogs && blogs.length > 3 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.slice(3).map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

BlogSection.displayName = 'BlogSection';

export default BlogSection;