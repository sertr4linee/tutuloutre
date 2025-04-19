"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import GradientBackground from "@/components/ui/background"
import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import Image from "next/image"
import Link from "next/link"

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
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [isProcessVisible, setIsProcessVisible] = useState(false)
  const router = useRouter()
  const [animatingStep, setAnimatingStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [servicesData, setServicesData] = useState({
    testimonials: [
      {
        id: 1,
        name: "Sophie Martin",
        company: "TechStart",
        quote: "Maelle a complètement transformé notre image de marque. Son travail est exceptionnel !",
        avatar: "/sophie.svg",
      },
      {
        id: 2,
        name: "Thomas Dubois",
        company: "GreenLeaf",
        quote: "La créativité et le professionnalisme de Maelle ont dépassé toutes nos attentes.",
        avatar: "/thomas.svg",
      },
      {
        id: 3,
        name: "Emma Leroy",
        company: "FashionForward",
        quote:
          "Travailler avec Maelle a été une expérience incroyable. Elle a vraiment capturé l'essence de notre marque.",
        avatar: "/emma.svg",
      },
    ],
    projects: [
      {
        id: 1,
        title: "Refonte de logo pour BioGreen",
        description: "Nouvelle identité visuelle pour une marque de produits biologiques",
        image: "/project-biogreen.jpg",
        category: "Branding"
      },
      {
        id: 2,
        title: "Campagne publicitaire Lumina",
        description: "Série de visuels pour une campagne de parfums haut de gamme",
        image: "/project-lumina.jpg",
        category: "Advertising"
      },
      {
        id: 3,
        title: "Magazine Urban Stories",
        description: "Direction artistique et mise en page d'un magazine trimestriel",
        image: "/project-magazine.jpg",
        category: "Editorial"
      }
    ],
    packages: [
      {
        id: 1,
        title: "Essentiel",
        price: "800€",
        description: "Solution idéale pour les startups et petites entreprises",
        features: [
          "Logo + Charte graphique basique",
          "Jusqu'à 2 révisions",
          "Livraison sous 10 jours",
          "Fichiers source inclus"
        ],
        popular: false
      },
      {
        id: 2,
        title: "Business",
        price: "1500€",
        description: "Package complet pour une identité professionnelle",
        features: [
          "Logo + Charte graphique complète",
          "Papeterie d'entreprise",
          "Jusqu'à 5 révisions",
          "Livraison sous 15 jours",
          "Fichiers source inclus",
          "Support 30 jours"
        ],
        popular: true
      },
      {
        id: 3,
        title: "Premium",
        price: "3000€",
        description: "Solution complète pour une identité de marque distinctive",
        features: [
          "Logo + Charte graphique complète",
          "Papeterie + Supports marketing",
          "Site web one-page",
          "Révisions illimitées",
          "Livraison prioritaire",
          "Fichiers source inclus",
          "Support 90 jours"
        ],
        popular: false
      }
    ]
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProcessVisible(true)
        }
      },
      { threshold: 0.1 }
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
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])
  useEffect(() => {
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
             (navigator.maxTouchPoints > 0));
    };
      if (isTouchDevice()) {
      document.body.classList.add('touch-device');
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.position = 'relative';
    }
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (isTouchDevice()) {
        document.body.classList.remove('touch-device');
        document.documentElement.style.height = '';
        document.body.style.height = '';
        document.body.style.position = '';
      }
    };
  }, []);

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

  const toggleService = (id: number) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((serviceId) => serviceId !== id) : [...prev, id]))
  }

  const startGame = () => {
    setIsGameStarted(true)
    setCurrentGameStep(0)
  }

  const nextGameStep = () => {
    if (currentGameStep < steps.length - 1) {
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

  const handleStartProject = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f67a45', '#E9B949', '#4CAF50', '#2196F3', '#ff6b57']
    });

    setTimeout(() => {
      router.push('/contact');
    }, 800);
  };

  const animateProcess = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const delay = isMobile ? 500 : 1000;
    
    for (let i = 1; i <= steps.length; i++) {
      setAnimatingStep(i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    confetti({
      particleCount: isMobile ? 50 : 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f67a45', '#E9B949', '#4CAF50', '#2196F3', '#ff6b57']
    });
    
    setAnimatingStep(null);
    setIsAnimating(false);
  };

  function launchConfetti() {
    const isMobile = window.innerWidth < 768;
    const options = {
      particleCount: isMobile ? 30 : 100,
      spread: 70,
      origin: { y: 0.6 }
    };
    confetti(options);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden overflow-y-auto -mt-1" 
      style={{ 
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'none'
      }}>
      <div 
        className="absolute inset-0 -z-10" 
        onTouchStart={() => {}} 
        style={{ overscrollBehavior: 'none' }}
      />
      <GradientBackground />
      <motion.div 
        className="fixed z-10 top-[15%] right-[5%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] hidden sm:block"
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
        <Image 
          src="/stars.svg" 
          alt="" 
          width={100}
          height={100}
          className="w-full h-full"
          style={{ filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))" }}
        />
      </motion.div>
      <motion.div 
        className="fixed z-10 bottom-[10%] left-[8%] w-[60px] h-[60px] md:w-[100px] md:h-[100px] hidden sm:block"
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
        <Image 
          src="/stars.svg" 
          alt="" 
          className="w-full h-full"
          style={{ 
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5)) hue-rotate(90deg)",
            opacity: 0.9
          }}
          width={100}
          height={100}
        />
      </motion.div>
      <div 
        className="relative z-30 flex flex-col items-center justify-start py-4 pb-16 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <motion.div 
          className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[3px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: isMobile ? 0.1 : 0.3 }}
          style={{ touchAction: 'pan-y' }}
        >
          <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
            <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
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
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <nav className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#2D2D2D] mb-3 sm:mb-0">
              </div>
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

                <div className="relative inline-block mt-4 sm:mt-0">
                  <div className="absolute top-[3px] left-[3px] w-full h-full bg-black rounded-md"></div>
                  <button className="relative bg-[#222] text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-md flex items-center justify-center text-sm sm:text-base font-medium">
                    CV
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

            <div className="mb-6 sm:mb-12">
              <div className="relative">
                <motion.div 
                  className="absolute -top-8 sm:-top-10 left-1 sm:left-2"
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
            <div className="mb-10 sm:mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {services.map((service) => (
                  <motion.div 
                    key={service.id} 
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                    <button className="relative bg-[#f67a45] text-white border-2 border-black px-6 py-3 text-lg font-semibold flex items-center justify-center rounded-md transition-all transform hover:-translate-y-1">
                      Obtenir un devis personnalisé
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </Link>
              </motion.div>
            </div>
            <section 
              id="work-process" 
              className="w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl mx-auto mb-10 sm:mb-16"
              style={{ touchAction: 'pan-y' }}
            >
              <div className="relative">
                <div className="absolute -top-6 left-4 transform rotate-2 z-10">
                  <div className="bg-[#f67a45] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm sm:text-base">
                    Mon processus
                  </div>
                </div>
                <div className="relative border-4 sm:border-6 border-black bg-white p-4 sm:p-6 md:p-8 rounded-xl">
                  <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
                  <motion.div
                    initial="hidden"
                    animate={isProcessVisible ? "visible" : "hidden"}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2
                        }
                      }
                    }}
                    className="max-w-4xl mx-auto"
                    style={{ touchAction: 'pan-y' }}
                  >
                    <motion.h2
                      variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                            ease: "easeOut"
                          }
                        }
                      }}
                      className="text-2xl md:text-3xl font-bold text-center mb-8 relative"
                    >
                      <span className="relative inline-block">
                        Découvrez mon processus de travail
                        <motion.div
                          className="absolute -bottom-2 left-0 w-full h-1 bg-[#f67a45]"
                          initial={{ scaleX: 0 }}
                          animate={isProcessVisible ? { scaleX: 1 } : { scaleX: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        />
                      </span>
                    </motion.h2>
                    <div className="relative">
                      <motion.div
                        className="absolute left-[35px] md:left-[100px] top-0 w-1 h-full bg-black"
                        variants={{
                          hidden: { scaleY: 0 },
                          visible: {
                            scaleY: 1,
                            transition: {
                              duration: 0.8,
                              ease: "easeInOut"
                            }
                          }
                        }}
                        style={{ originY: 0 }}
                      />
                      {steps.map((step, index) => (
                        <motion.div
                          key={step.number}
                          variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: {
                              y: 0,
                              opacity: 1,
                              transition: {
                                duration: 0.5,
                                ease: "easeOut"
                              }
                            }
                          }}
                          className="relative mb-6 last:mb-0"
                          onHoverStart={() => setActiveStep(step.number)}
                          onHoverEnd={() => setActiveStep(null)}
                        >
                          <div className="flex items-start gap-4 md:gap-8">
                            <motion.div
                              className="relative z-10 w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full border-4 border-black bg-white flex items-center justify-center"
                              animate={{
                                scale: animatingStep === step.number ? [1, 1.2, 1] : 1,
                                backgroundColor: animatingStep === step.number || activeStep === step.number ? step.color : 'white'
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <span className="text-2xl md:text-3xl font-bold">{step.number}</span>
                              <motion.div
                                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#f67a45] border-2 border-black"
                                animate={{
                                  scale: animatingStep === step.number || activeStep === step.number ? [1, 1.2, 1] : 1
                                }}
                                transition={{ duration: 0.5, repeat: animatingStep === step.number ? Infinity : 0 }}
                              />
                            </motion.div>
                            <div className="flex-1">
                              <motion.h3
                                className="text-lg md:text-xl font-bold mb-1"
                                animate={{
                                  color: animatingStep === step.number || activeStep === step.number ? step.color : '#000',
                                  x: animatingStep === step.number ? [0, 20, 0] : 0,
                                  scale: animatingStep === step.number ? [1, 1.05, 1] : 1
                                }}
                                transition={{
                                  duration: 0.8,
                                  ease: "easeInOut"
                                }}
                              >
                                {step.title}
                              </motion.h3>
                              <motion.p
                                className="text-gray-600 text-sm md:text-base"
                                animate={{
                                  opacity: animatingStep === step.number || activeStep === step.number ? 1 : 0.8,
                                  x: animatingStep === step.number ? [0, 15, 0] : 0
                                }}
                                transition={{
                                  duration: 0.8,
                                  ease: "easeInOut"
                                }}
                              >
                                {step.description}
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                            ease: "easeOut"
                          }
                        }
                      }}
                      className="mt-8 text-center"
                    >
                      <motion.button
                        className="relative inline-block group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={animateProcess}
                        disabled={isAnimating}
                      >
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-full transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
                        <motion.div 
                          className="relative px-8 py-3 bg-[#f67a45] text-white rounded-full border-2 border-black font-bold"
                          whileHover={{
                            backgroundColor: "#ff8562",
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{
                            scale: 0.95,
                            backgroundColor: "#e56940"
                          }}
                        >
                          <span className="relative z-10 flex items-center">
                            {isAnimating ? "En cours..." : "Processus"}
                            <motion.svg 
                              className="w-5 h-5 ml-2" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              initial={{ rotate: 0 }}
                              animate={{ 
                                rotate: isAnimating ? 360 : 0,
                                x: isAnimating ? [0, 5, 0] : 0
                              }}
                              transition={{ 
                                duration: isAnimating ? 2 : 1,
                                repeat: isAnimating ? Infinity : 0,
                                ease: "linear"
                              }}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                              />
                            </motion.svg>
                          </span>
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </section>

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
              style={{ touchAction: "auto" }}
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
          </div>
        </motion.div>
      </div>
    </main>
  )
}
