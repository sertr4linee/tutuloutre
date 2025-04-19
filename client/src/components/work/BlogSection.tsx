import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/constants";

export default function BlogSection() {
  return (
    <section id="blog" className="relative">
      <div className="absolute -top-6 left-4 transform rotate-3 z-10">
        <div className="bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm sm:text-base">
          Blog
        </div>
      </div>

      <div className="relative border-4 border-black bg-white p-6 sm:p-8 rounded-xl">
        <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>

        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.id}
                href={`/work/blog/${post.slug}`}
                className="group relative block"
              >
                <div className="relative border-4 border-black bg-white rounded-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl -z-10"></div>
                  
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0transition-colors duration-300" />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 text-sm bg-[#FFD2BF] border-2 border-black rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm">{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-2 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span>{post.author}</span>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}