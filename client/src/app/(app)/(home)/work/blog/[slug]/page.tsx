import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/constants";
import Link from "next/link";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: "Article non trouvé | Emma Dupont",
      description: "L'article que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${post.title} | Emma Dupont`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link
        href="/work"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <svg
          className="w-5 h-5 mr-2"
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
        Retour aux travaux
      </Link>

      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
          {post.category}
        </span>
        <span className="text-sm text-gray-500">{post.readTime}</span>
        <span className="text-sm text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">{post.description}</p>

        <div className="mt-8">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Écrit par</p>
              <p className="font-medium">{post.author}</p>
            </div>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 