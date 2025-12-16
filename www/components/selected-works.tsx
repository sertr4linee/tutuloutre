"use client"

import { motion } from "framer-motion"
import { Instrument_Serif } from "next/font/google"
import Image from "next/image"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

interface Project {
  id: number
  title: string
  category: string
  image: string
  color?: string
}

const projects: Project[] = [
  { id: 1, title: "CTS", category: "Branding", image: "/cts.png" },
  { id: 2, title: "Shooting Laverie", category: "Photographie", image: "/laveri.jpg" },
  { id: 3, title: "Harmonia", category: "UI & UX Design", image: "/harm2.jpeg" },
  { id: 4, title: "Sea", category: "Illustration", image: "/mocku.jpg" },
]

export default function SelectedWorks() {
  return (
    <div className="py-32">
      <div className="max-w-5xl mx-auto px-8 lg:px-16">
        <div className="flex items-end justify-between mb-16">
          <h2 className={`${instrumentSerif.className} text-5xl md:text-7xl text-black`}>
            Selected<br />Works
          </h2>
          <span className="text-sm font-bold tracking-widest uppercase text-black/40 mb-2">2023 — 2024</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group cursor-pointer ${index % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <div className={`aspect-[4/5] ${project.color || 'bg-transparent'} mb-6 overflow-hidden relative`}>
                {project.image && (
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                )}
              </div>
              
              <div className="flex justify-between items-start border-t border-black/10 pt-4">
                <h3 className={`${instrumentSerif.className} text-3xl text-black group-hover:translate-x-2 transition-transform duration-300`}>
                  {project.title}
                </h3>
                <span className="text-sm font-medium text-black/40 uppercase tracking-wider mt-1">
                  {project.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-32 text-center">
          <a 
            href="#" 
            className="inline-block text-black text-xl font-medium border-b border-black pb-1 hover:opacity-60 transition-opacity"
          >
            View all projects
          </a>
        </div>
      </div>
    </div>
  )
}
