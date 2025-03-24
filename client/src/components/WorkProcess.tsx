import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const steps = [
  {
    number: 1,
    title: "Découverte", 
    description: "Comprendre vos besoins et objectifs",
    color: "#ff6b57",
    icon: "/icons/discovery.svg"
  },
  {
    number: 2,
    title: "Recherche",
    description: "Analyse du marché et des tendances",
    color: "#E9B949", 
    icon: "/icons/research.svg"
  },
  {
    number: 3,
    title: "Conception",
    description: "Création de concepts et d'ébauches",
    color: "#f67a45",
    icon: "/icons/design.svg"
  },
  {
    number: 4,
    title: "Affinage",
    description: "Itérations et perfectionnement du design",
    color: "#4CAF50",
    icon: "/icons/refine.svg"
  },
  {
    number: 5,
    title: "Livraison",
    description: "Finalisation et remise des livrables",
    color: "#2196F3",
    icon: "/icons/delivery.svg"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { x: -20, opacity: 0 }, // Modifié y en x pour animation vers la gauche
  visible: {
    x: 0, // Modifié y en x pour animation vers la gauche
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: "ease"
    }
  }
}

export default function WorkProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('work-process')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="work-process" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 relative"
          >
            <span className="relative inline-block">
              Découvrez mon processus de travail
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-[#f67a45]"
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h2>

          <div className="relative">
            {/* Ligne verticale connectant les étapes */}
            <motion.div
              className="absolute left-[45px] md:left-[150px] top-0 w-1 h-full bg-black"
              variants={lineVariants}
              style={{ originY: 0 }}
            />

            {/* Étapes */}
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative mb-12 last:mb-0"
                onHoverStart={() => setActiveStep(step.number)}
                onHoverEnd={() => setActiveStep(null)}
              >
                <div className="flex items-start gap-8 md:gap-16">
                  {/* Numéro et icône */}
                  <motion.div
                    className="relative z-10 w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full border-4 border-black bg-white flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    style={{
                      backgroundColor: activeStep === step.number ? step.color : 'white'
                    }}
                  >
                    <span className="text-3xl md:text-4xl font-bold">{step.number}</span>
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#f67a45] border-2 border-black"
                      animate={{
                        scale: activeStep === step.number ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 0.5, repeat: activeStep === step.number ? Infinity : 0 }}
                    />
                  </motion.div>

                  {/* Contenu */}
                  <div className="flex-1">
                    <motion.h3
                      className="text-xl md:text-2xl font-bold mb-2"
                      animate={{
                        color: activeStep === step.number ? step.color : '#000'
                      }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-600"
                      initial={{ opacity: 0.8 }}
                      animate={{
                        opacity: activeStep === step.number ? 1 : 0.8
                      }}
                    >
                      {step.description}
                    </motion.p>
                  </div>
                </div>

                {/* Éléments décoratifs */}
                <motion.div
                  className="absolute -z-10 top-0 left-0 w-full h-full"
                  animate={{
                    opacity: activeStep === step.number ? 1 : 0
                  }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <Image
                      src="/stars.svg"
                      alt=""
                      width={80}
                      height={80}
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bouton d'action */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <motion.button
              className="relative inline-block group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-full transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
              <div className="relative px-8 py-3 bg-[#f67a45] text-white rounded-full border-2 border-black font-bold">
                Commencer un projet
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}