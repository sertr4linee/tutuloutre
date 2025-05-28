import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/constants";
import Link from "next/link";
import GradientBackground from "@/components/ui/background";
import BlogPostClient from "./BlogPostClient";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: "Article non trouvé | Maelle Crescence",
      description: "L'article que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${post.title} | Maelle Crescence`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      
      {/* Floating decorative elements */}
      <div className="fixed z-0 top-[15%] right-[5%] w-[60px] h-[60px] md:w-[80px] md:h-[80px] animate-bounce hidden sm:block">
        <Image
          src="/stars.svg"
          alt="Étoile décorative"
          width={80}
          height={80}
          className="w-full h-full"
          style={{ filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))" }}
        />
      </div>

      <div className="relative z-30 py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/work"
              className="inline-flex items-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md"></div>
                <div className="relative bg-white border-2 border-black px-4 py-2 rounded-md flex items-center transition-all group-hover:-translate-y-1">
                  <svg
                    className="w-5 h-5 mr-2 text-[#f67a45]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="font-medium">Retour aux travaux</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Main Article Card */}
          <article className="relative bg-[#FFFBF5] border-[4px] sm:border-[6px] border-black">
            {/* Corner decorations */}
            <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px]">
              <div className="absolute top-0 left-0 w-[25px] md:w-[35px] h-[8px] md:h-[12px] bg-black"></div>
              <div className="absolute top-0 left-0 w-[8px] md:w-[12px] h-[25px] md:h-[35px] bg-black"></div>
            </div>
            <div className="hidden sm:block absolute -top-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
              <div className="absolute top-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
              <div className="absolute top-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
            </div>
            <div className="hidden sm:block absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
              <div className="absolute bottom-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
              <div className="absolute bottom-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
            </div>
            <div className="hidden sm:block absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
              <div className="absolute bottom-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
              <div className="absolute bottom-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              {/* Article Header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="bg-[#f67a45] text-white font-bold px-3 py-1 rounded-full border-2 border-black text-sm transform -rotate-1">
                    {post.category}
                  </div>
                  <div className="bg-[#FFE8DD] text-black font-medium px-3 py-1 rounded-full border-2 border-black text-sm">
                    {post.readTime}
                  </div>
                  <div className="bg-white text-black font-medium px-3 py-1 rounded-full border-2 border-black text-sm">
                    {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter mb-4">
                  {post.title}
                </h1>

                <p className="text-lg sm:text-xl text-[#3C3C3C] font-medium leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Cover Image */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl"></div>
                <div className="relative h-[250px] sm:h-[350px] md:h-[450px] rounded-xl overflow-hidden border-4 border-black">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Image overlay decoration */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm border-2 border-black px-3 py-1 rounded-full">
                      <span className="text-sm font-bold">📸</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-[#FFE8DD] border-2 border-black p-6 rounded-xl mb-8 relative">
                  <div className="absolute -top-3 left-4 bg-[#f67a45] text-white font-bold px-3 py-1 rounded-full border-2 border-black text-sm">
                    Article
                  </div>
                  <div className="mt-2 space-y-4 text-[#3C3C3C] leading-relaxed">
                    {post.content.split("\n").map((paragraph, index) => (
                      <p key={index} className="text-base sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Author & Tags Section */}
                <div className="bg-white border-2 border-black p-6 rounded-xl relative">
                  <div className="absolute -top-3 left-4 bg-[#E9B949] text-black font-bold px-3 py-1 rounded-full border-2 border-black text-sm">
                    À propos
                  </div>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#3C3C3C] mb-1">Écrit par</p>
                      <p className="font-bold text-lg text-[#2D2D2D]">{post.author}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#FFD2BF] text-black px-3 py-1 text-sm rounded-full border border-black font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                  <Link href="/contact" className="inline-block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl"></div>
                      <div className="relative bg-[#f67a45] text-white border-2 border-black px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1">
                        Discutons de votre projet !
                        <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
} 