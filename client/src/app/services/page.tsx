"use client"

import GradientBackground from "@/components/ui/background"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"

export default function Services() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [currentGameStep, setCurrentGameStep] = useState(0)
  const [easterEggFound, setEasterEggFound] = useState(false)
  const intersectionRef = useRef(null)
  const isInView = useInView(intersectionRef, { once: true })
  const mainControls = useAnimation()
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.5 },
    )

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current)
    }

    return () => {
      if (intersectionRef.current) {
        observer.unobserve(intersectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener("mousemove", moveCursor)
    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [])

  const services = [
    {
      id: 1,
      title: "Design d'identité visuelle",
      description: "Création d'une identité de marque cohérente et mémorable, du logo aux supports marketing.",
      icon: "🎨",
      color: "#FFD2BF",
    },
    {
      id: 2,
      title: "Design UX/UI",
      description: "Conception d'interfaces utilisateur intuitives et esthétiques pour sites web et applications.",
      icon: "💻",
      color: "#E9B949",
    },
    {
      id: 3,
      title: "Illustration",
      description: "Création d'illustrations personnalisées pour divers supports : livres, affiches, packaging...",
      icon: "✏️",
      color: "#F67A45",
    },
    {
      id: 4,
      title: "Photographie",
      description: "Services de photographie professionnelle pour événements, portraits, et produits.",
      icon: "📸",
      color: "#AC9362",
    },
  ]

  const workProcess = [
    { id: 1, title: "Découverte", description: "Comprendre vos besoins et objectifs" },
    { id: 2, title: "Recherche", description: "Analyse du marché et des tendances" },
    { id: 3, title: "Conception", description: "Création de concepts et d'ébauches" },
    { id: 4, title: "Affinage", description: "Itérations et perfectionnement du design" },
    { id: 5, title: "Livraison", description: "Finalisation et remise des livrables" },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sophie Martin",
      company: "TechStart",
      quote: "Maelle a complètement transformé notre image de marque. Son travail est exceptionnel !",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      company: "GreenLeaf",
      quote: "La créativité et le professionnalisme de Maelle ont dépassé toutes nos attentes.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Emma Leroy",
      company: "FashionForward",
      quote:
        "Travailler avec Maelle a été une expérience incroyable. Elle a vraiment capturé l'essence de notre marque.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const toggleService = (id: number) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((serviceId) => serviceId !== id) : [...prev, id]))
  }

  const startGame = () => {
    setIsGameStarted(true)
    setCurrentGameStep(0)
  }

  const nextGameStep = () => {
    if (currentGameStep < workProcess.length - 1) {
      setCurrentGameStep((prev) => prev + 1)
    } else {
      setIsGameStarted(false)
      setCurrentGameStep(0)
    }
  }

  const revealEasterEgg = () => {
    setEasterEggFound(true)
    setTimeout(() => setEasterEggFound(false), 3000)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GradientBackground />

      {/* Custom cursor */}
      <div 
        ref={cursorRef} 
        className="fixed w-8 h-8 rounded-full border-2 border-black bg-white mix-blend-difference pointer-events-none z-50"
        style={{ transition: 'left 0.1s, top 0.1s' }}
      ></div>

      {/* Floating decorative elements */}
      <motion.div 
        className="fixed z-10 top-[15%] right-[5%] w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      >
        <img 
          src="/stars.svg" 
          alt="" 
          className="w-full h-full"
          style={{ filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))" }}
        />
      </motion.div>

      <motion.div 
        className="fixed z-10 bottom-[10%] left-[8%] w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      >
        <img 
          src="/stars.svg" 
          alt="" 
          className="w-full h-full"
          style={{ 
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5)) hue-rotate(90deg)",
            opacity: 0.9
          }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-30 flex flex-col items-center justify-start min-h-screen py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4">
        <motion.div 
          className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[4px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Corner elements - L-shaped design - responsive sizes */}
          <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
            <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
          </div>

          {/* Top-right corner */}
          <div className="hidden sm:block absolute -top-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute top-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute top-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Bottom-left corner */}
          <div className="hidden sm:block absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Bottom-right corner */}
          <div className="hidden sm:block absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Content container with better responsive padding */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Navigation - improved mobile layout */}
            <nav className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#2D2D2D] mb-3 sm:mb-0">
                {/* Empty for now */}
              </div>

              {/* Mobile menu button - better positioning */}
              <button
                className="sm:hidden fixed top-4 right-4 p-2 z-50 bg-white/80 backdrop-blur-sm rounded-md border-2 border-black"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Navigation links - improved mobile menu */}
              <div
                className={`
                ${menuOpen ? "flex fixed inset-0 bg-white/95 z-40" : "hidden"} 
                sm:flex sm:relative sm:bg-transparent
                flex-col sm:flex-row 
                items-center justify-center sm:justify-start
                space-y-6 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8
                text-lg sm:text-base md:text-lg
                w-full sm:w-auto
              `}
              >
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
                <Link href="/work" className="hover:underline">
                  Work
                </Link>
                <Link href="/services" className="hover:underline font-medium">
                  Services
                </Link>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>

                {/* Resume button - responsive sizing */}
                <div className="relative inline-block mt-4 sm:mt-0">
                  <div className="absolute top-[3px] left-[3px] w-full h-full bg-black rounded-md"></div>
                  <button className="relative bg-[#222] text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-md flex items-center justify-center text-sm sm:text-base font-medium">
                    Resume
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15L12 4M12 15L8 11M12 15L16 11M8 19H16C17.1046 19 18 18.1046 18 17V15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </nav>

            {/* Services page title with decorative element */}
            <div className="mb-8 sm:mb-12">
              <div className="relative">
                <motion.div 
                  className="absolute -top-6 sm:-top-8 left-1 sm:left-2"
                  animate={{
                    rotate: [0, -3, 3, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                >
                  <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black text-xs sm:text-sm whitespace-nowrap">
                    Ce que je fais
                  </div>
                </motion.div>
                <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter font-family-clash">
                  Mes Services
                </h1>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 font-normal text-[#3C3C3C] max-w-xl leading-tight">
                Des solutions créatives sur mesure pour donner vie à vos projets.
              </p>
            </div>

            {/* Interactive Service Configurator */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Configurez votre pack de services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <motion.div 
                    key={service.id} 
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                    <div 
                      className={`relative border-3 border-black rounded-xl p-6 transition-all ${
                        selectedServices.includes(service.id) ? 'bg-opacity-30' : 'bg-white'
                      }`}
                      style={{ backgroundColor: selectedServices.includes(service.id) ? service.color : 'white' }}
                    >
                      <div className="flex items-start mb-4">
                        <div className="text-4xl mr-4">{service.icon}</div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                      </div>
                      <p className="text-[#3C3C3C] mb-4">{service.description}</p>
                      <div className={`w-6 h-6 border-2 border-black rounded-full ${selectedServices.includes(service.id) ? 'bg-[#f67a45]' : 'bg-white'}`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/contact" className="inline-block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md"></div>
                    <button className="relative bg-[#f67a45] text-white border-2 border-black px-6 py-3 text-lg font-semibold flex items-center justify-center rounded-md">
                      Obtenir un devis personnalisé
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Gamified Work Process */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Découvrez mon processus de travail</h2>
              {!isGameStarted ? (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <button 
                    onClick={startGame}
                    className="bg-[#E9B949] text-black font-bold px-6 py-3 rounded-full border-3 border-black text-lg hover:bg-[#f67a45] hover:text-white transition-colors"
                  >
                    Commencer l'aventure créative
                  </button>
                </motion.div>
              ) : (
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-black"></div>
                  {workProcess.map((step, index) => (
                    <motion.div 
                      key={step.id} 
                      className={`relative flex items-center mb-8 ${index > currentGameStep ? 'opacity-50' : ''}`}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div 
                        className={`w-16 h-16 rounded-full border-3 border-black flex items-center justify-center text-xl font-bold z-10 transition-all ${
                          index === currentGameStep ? 'bg-[#f67a45] text-white scale-110' : 'bg-white'
                        }`}
                      >
                        {step.id}
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-bold">{step.title}</h3>
                        <p className="text-[#3C3C3C]">{step.description}</p>
                      </div>
                      {index < workProcess.length - 1 && (
                        <div className="absolute left-8 top-16 bottom-0 w-1 bg-black"></div>
                      )}
                    </motion.div>
                  ))}
                  {currentGameStep < workProcess.length - 1 ? (
                    <motion.button 
                      onClick={nextGameStep}
                      className="ml-24 bg-[#E9B949] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm hover:bg-[#f67a45] hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Étape suivante
                    </motion.button>
                  ) : (
                    <motion.div 
                      className="ml-24 text-lg font-bold text-[#f67a45]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Félicitations ! Vous avez terminé le processus créatif !
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Dynamic Testimonials Carousel */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Ce que disent mes clients</h2>
              <div className="relative overflow-hidden">
                <motion.div 
                  className="flex"
                  animate={{ x: [0, -100, 0] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <div key={`${testimonial.id}-${index}`} className="flex-none w-80 mx-4">
                      <motion.div 
                        className="relative group"
                        whileHover={{ y: -10 }}
                      >
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                        <div className="relative border-3 border-black rounded-xl p-6 bg-white">
                          <div className="flex items-center mb-4">
                            <img 
                              src={testimonial.avatar || "/placeholder.svg"} 
                              alt={testimonial.name} 
                              className="w-12 h-12 rounded-full border-2 border-black mr-4" 
                            />
                            <div>
                              <h3 className="font-bold">{testimonial.name}</h3>
                              <p className="text-sm text-[#3C3C3C]">{testimonial.company}</p>
                            </div>
                          </div>
                          <p className="text-[#3C3C3C] italic">"{testimonial.quote}"</p>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Interactive Call to Action */}
            <motion.div 
              ref={intersectionRef}
              className="relative"
              variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
              <div className="border-3 border-black rounded-xl p-8 bg-[#FFE8DD]">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Prêt à donner vie à votre projet ?</h2>
                <p className="text-lg mb-6">Contactez-moi dès aujourd'hui pour discuter de vos idées et obtenir un devis personnalisé.</p>
                <Link href="/contact" className="inline-block">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md"></div>
                    <button className="relative bg-[#f67a45] text-white border-2 border-black px-6 py-3 text-lg font-semibold flex items-center justify-center rounded-md">
                      Commencer un projet
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Easter Egg */}
            <div className="mt-16 text-center">
              <motion.button
                className="text-sm text-[#3C3C3C] hover:text-[#f67a45]"
                onClick={revealEasterEgg}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Psst... cliquez ici pour une surprise !
              </motion.button>
              {easterEggFound && (
                <motion.div
                  className="mt-4 p-4 bg-[#FFE8DD] border-2 border-black rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  🎉 Bravo ! Vous avez trouvé l'easter egg ! Utilisez le code "CREATIVESURPRISE" pour obtenir 10% de réduction sur votre prochain projet !
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

