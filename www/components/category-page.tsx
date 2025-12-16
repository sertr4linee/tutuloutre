"use client"

import { BeigeBackground } from "@/components/beige-background"
import { Instrument_Serif } from "next/font/google"
import Link from "next/link"
import { trpc } from "@/lib/trpc/client"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

interface CategoryPageProps {
  category: string
  title: string
}

export function CategoryPage({ category, title }: CategoryPageProps) {
  const { data: projects, isLoading } = trpc.project.getByCategory.useQuery({ category })

  return (
    <div className="min-h-screen relative p-8 lg:p-16">
      <BeigeBackground />
      
      <Link href="/" className="fixed top-8 left-8 z-50 text-black/60 hover:text-black transition-colors">
        ← Back
      </Link>

      <div className="max-w-7xl mx-auto pt-24">
        <h1 className={`${instrumentSerif.className} text-6xl md:text-8xl text-black mb-12`}>
          {title}
        </h1>
        
        {isLoading ? (
          <p className="text-black/60">Chargement...</p>
        ) : projects?.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-black/40 text-xl">Aucun projet dans cette catégorie pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects?.map((project) => (
              <div key={project.id} className="group relative">
                <div className="aspect-video overflow-hidden rounded-lg bg-black/5">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-4">
                  <h3 className={`${instrumentSerif.className} text-2xl text-black`}>
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-black/60 mt-2">{project.description}</p>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-black/60 hover:text-black border-b border-black/20 hover:border-black pb-0.5 transition-colors"
                    >
                      Voir le projet →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
