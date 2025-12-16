"use client"

import { motion } from "framer-motion"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const services = [
  {
    title: "Direction Artistique",
    description: "Définition de l'univers visuel de votre marque pour créer une identité forte et cohérente sur tous les supports.",
    tags: ["Moodboard", "Concept", "Shooting", "Guidelines"]
  },
  {
    title: "UI & UX Design",
    description: "Conception d'interfaces intuitives et esthétiques, centrées sur l'expérience utilisateur pour le web et le mobile.",
    tags: ["Web Design", "Mobile App", "Prototyping", "Design System"]
  },
  {
    title: "Motion Design",
    description: "Animation de contenus pour dynamiser votre communication et raconter votre histoire en mouvement.",
    tags: ["2D/3D", "Logo Reveal", "Social Media", "Showreel"]
  },
  {
    title: "Identité Visuelle",
    description: "Création d'une identité visuelle unique qui reflète les valeurs et la personnalité de votre marque.",
    tags: ["Logo", "Charte Graphique", "Papeterie", "Packaging"]
  },
  {
    title: "Photographie",
    description: "Réalisation de photographies professionnelles pour valoriser vos produits, services ou événements.",
    tags: ["Produit", "Événementiel", "Portrait", "Retouche"]
  },
]

export default function ServicesDetail() {
  return (
    <div className="py-32 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className={`${instrumentSerif.className} text-5xl md:text-6xl text-black sticky top-12`}>
              Expertise<br />& Skills
            </h2>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-12">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border-b border-black/10 pb-12 last:border-0"

              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-6">
                  <h3 className={`${instrumentSerif.className} text-4xl text-black group-hover:translate-x-4 transition-transform duration-300`}>
                    {service.title}
                  </h3>
                  <span className="text-sm font-bold tracking-widest uppercase text-black/30">0{index + 1}</span>
                </div>
                
                <p className="text-lg text-black/60 max-w-xl mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {service.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-4 py-2 rounded-full border border-black/10 text-sm text-black/60 bg-white/50 backdrop-blur-sm group-hover:bg-black group-hover:text-white transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
