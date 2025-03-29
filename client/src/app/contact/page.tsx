"use client"

import type React from "react"

import GradientBackground from "@/components/ui/background"
import { useState } from "react"
import Link from "next/link"
import { SocialIcons } from "@/components/ui/social-icons"
import Image from "next/image"

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("socials")
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const socialLinks = [
    { 
      name: "Instagram", 
      icon: SocialIcons.instagram, 
      color: "#E1306C", 
      username: "@une_mome",
      href: "https://instagram.com/une_mome"
    },
    { 
      name: "Instagram", 
      icon: SocialIcons.instagram, 
      color: "#E1306C", 
      username: "@just_photography_06",
      href: "https://instagram.com/just_photography_06"
    },
    { 
      name: "LinkedIn", 
      icon: SocialIcons.linkedin, 
      color: "#0077B5", 
      username: "maelle-crescence",
      href: "https://www.linkedin.com/in/maelle-crescence-45b19b275/"
    },
    { 
      name: "Behance", 
      icon: SocialIcons.behance, 
      color: "#1769FF", 
      username: "maellecrescence",
      href: "https://behance.net/maellecrescence"
    },
    { 
      name: "Pinterest", 
      icon: SocialIcons.pinterest, 
      color: "#E60023", 
      username: "tutuloutre",
      href: "https://fr.pinterest.com/tutuloutre/"
    },
    { 
      name: "TikTok", 
      icon: SocialIcons.tiktok, 
      color: "#000000", 
      username: "tutuloutre",
      href: "https://tiktok.com/@tutuloutre"
    }
  ]

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <div
        className="fixed z-10 bottom-[10%] left-[8%] w-[60px] h-[60px] md:w-[100px] md:h-[100px] animate-bounce"
        style={{ animationDuration: "6s" }}
      >
        <Image
          src="/stars.svg"
          alt=""
          width={100}
          height={100}
          className="w-full h-full"
          style={{ filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))" }}
        />
      </div>

      {/* Contenu du portfolio avec design néobrutalist */}
      <div className="relative z-30 flex items-center justify-center min-h-screen py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4">
        <div className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[4px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto">
          {/* Éléments des coins - Design en L - tailles responsives */}
          <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
            <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
          </div>

          {/* Coin supérieur droit */}
          <div className="hidden sm:block absolute -top-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute top-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute top-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Coin inférieur gauche */}
          <div className="hidden sm:block absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Coin inférieur droit */}
          <div className="hidden sm:block absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Conteneur avec meilleur padding responsive */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Navigation - mise en page mobile améliorée */}
            <nav className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#2D2D2D] mb-3 sm:mb-0">
                {/* Vide pour l'instant */}
              </div>

              {/* Bouton menu mobile - meilleur positionnement */}
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

              {/* Liens de navigation - menu mobile amélioré */}
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
                <Link href="/" className="hover:underline">Accueil</Link>
                <Link href="/about" className="hover:underline">
                  À propos
                </Link>
                <Link href="/work" className="hover:underline">
                  Travaux
                </Link>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
                <Link href="/contact" className="hover:underline font-medium">
                  Contact
                </Link>

                {/* Bouton CV - taille responsive */}
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

            {/* Contenu de la page Contact */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10">
              {/* Titre de la page Contact avec élément décoratif */}
              <div className="mb-2 sm:mb-4">
                <div className="relative">
                  <div className="absolute -top-8 sm:-top-10 left-1 sm:left-2">
                    <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap">
                      Dites bonjour !
                    </div>
                  </div>
                  <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter font-family-clash">
                    Prenons Contact
                  </h1>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 font-normal text-[#3C3C3C] max-w-xl leading-tight">
                  Vous avez un projet en tête ? J'aimerais en entendre parler !
                </p>
              </div>

              {/* Onglets interactifs de contact */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setActiveTab("socials")}
                  className={`px-4 py-2 border-2 border-black rounded-full text-sm font-medium transition-all ${
                    activeTab === "socials"
                      ? "bg-[#f67a45] text-white transform -translate-y-1"
                      : "bg-white hover:bg-[#FFE8DD]"
                  }`}
                >
                  Réseaux Sociaux
                </button>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`px-4 py-2 border-2 border-black rounded-full text-sm font-medium transition-all ${
                    activeTab === "info"
                      ? "bg-[#f67a45] text-white transform -translate-y-1"
                      : "bg-white hover:bg-[#FFE8DD]"
                  }`}
                >
                  Informations de Contact
                </button>
              </div>

              {/* Conteneur des onglets */}
              <div className="relative">
                {/* Onglet réseaux sociaux avec cartes interactives */}
                {activeTab === "socials" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onMouseMove={handleMouseMove as any}
                      >
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                        <div className="relative border-3 border-black rounded-xl p-4 flex flex-col items-center text-center transition-all bg-white overflow-hidden group-hover:-translate-y-1">
                          {/* Effet de survol */}
                          <div
                            className="absolute inset-0 transition-opacity group-hover:opacity-10 rounded-xl"
                            style={{
                              background: `radial-gradient(circle at ${hoverPosition.x}px ${hoverPosition.y}px, ${social.color}, transparent 70%)`,
                              opacity: isHovering ? 0.15 : 0,
                            }}
                          ></div>

                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-3 relative overflow-hidden border-2 border-black"
                            style={{ backgroundColor: `${social.color}20` }}
                          >
                            {/* Image de fond */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent z-10"></div>
                            
                            {/* Icône SVG en superposition */}
                            <div className="relative z-20">
                              <social.icon className="w-6 h-6" style={{ color: social.color }} />
                            </div>
                            
                            {/* Pattern en arrière-plan */}
                            <div 
                              className="absolute inset-0 opacity-10" 
                              style={{
                                backgroundImage: `radial-gradient(${social.color} 1px, transparent 1px)`,
                                backgroundSize: '4px 4px'
                              }}
                            ></div>
                          </div>
                          <h3 className="font-bold text-lg">{social.name}</h3>
                          <p className="text-sm text-[#3C3C3C] mt-1">{social.username}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {/* Onglet informations de contact avec carte interactive */}
                {activeTab === "info" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative">
                        <h3 className="font-bold text-lg text-[#2D2D2D] mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Email
                        </h3>
                        <p className="text-[#3C3C3C]">hello@maellecrescence.com</p>
                      </div>

                      <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative">
                        <h3 className="font-bold text-lg text-[#2D2D2D] mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Localisation
                        </h3>
                        <p className="text-[#3C3C3C]">Nice, France</p>
                      </div>

                      <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative">
                        <h3 className="font-bold text-lg text-[#2D2D2D] mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Horaires de Travail
                        </h3>
                        <p className="text-[#3C3C3C]">Très flexible</p>
                      </div>
                    </div>

                    {/* Carte interactive avec style néobrutalist */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl"></div>
                      <div className="relative border-4 border-black rounded-xl overflow-hidden h-[300px] md:h-full">
                        {/* Placeholder for map - in a real implementation, you'd use a map component */}
                        <div className="w-full h-full bg-[#FFE8DD] flex items-center justify-center relative">
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.7) 1.5px, transparent 1.5px)`,
                              backgroundSize: "25px 25px",
                              backgroundPosition: "0 0",
                            }}

                          >
                          </div>
                          <Image src="/map.png" alt="Map" fill className="object-cover" />

                          {/* Stylized map pin */}
                          {/* <div className="relative">
                            <div
                              className="w-16 h-16 bg-[#f67a45] rounded-full flex items-center justify-center border-4 border-black animate-bounce"
                              style={{ animationDuration: "2s" }}
                            >
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* FAQ Section */}
              <div className="mt-12 sm:mt-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-6">Questions Fréquentes</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      question: "Quel est votre processus habituel ?",
                      answer:
                        "Mon processus comprend généralement les phases de découverte, recherche, idéation, conception et mise en œuvre. Je crois au travail collaboratif et à l'implication des clients tout au long du projet.",
                    },
                    {
                      question: "Combien de temps dure un projet ?", 
                      answer:
                        "Les délais des projets varient selon leur portée et leur complexité. Un projet de branding simple peut prendre 2-3 semaines, tandis qu'un site web complet peut prendre 1-2 mois.",
                    },
                    {
                      question: "Travaillez-vous avec des clients internationaux ?",
                      answer:
                        "Je travaille avec des clients du monde entier. Les outils modernes rendent la collaboration à distance fluide et efficace.",
                    },
                    {
                      question: "Quelles sont vos conditions de paiement ?",
                      answer:
                        "Je demande généralement un acompte de 50% pour commencer le travail, les 50% restants étant dus à la fin du projet. Pour les projets plus importants, nous pouvons organiser des paiements échelonnés.",
                    },
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-black p-4 rounded-lg relative group hover:bg-[#FFE8DD] transition-colors"
                    >
                      <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{faq.question}</h3>
                      <p className="text-sm text-[#3C3C3C]">{faq.answer}</p>
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-black flex items-center justify-center bg-[#f67a45] text-white font-bold">
                        ?
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
