"use client"

import { BeigeBackground } from "@/components/beige-background"
import { GradientBackground } from "@/components/gradient-background"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ServicesWavy from "@/components/services-wavy"
import SelectedWorks from "@/components/selected-works"
import ServicesDetail from "@/components/services-detail"
import About from "@/components/about"
import Contact from "@/components/contact"
import { EditProvider } from "@/components/edit-context"
import { EditableContent } from "@/components/editable-content"
import { EditModeUI } from "@/components/edit-mode-ui"
import { EditSelectionOverlay } from "@/components/edit-selection-overlay"
import { Footer } from "@/components/footer"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { Instrument_Serif } from "next/font/google"
import { HeroIcon } from "@/components/hero-icon"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Page() {
  const { scrollY } = useScroll()
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    setViewportHeight(window.innerHeight)
    const handleResize = () => setViewportHeight(window.innerHeight)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const height = viewportHeight || 1000
  
  // Parallax effects for the hero section
  const y = useTransform(scrollY, [0, height], [0, height * 0.5])
  const opacity = useTransform(scrollY, [0, height * 0.6], [1, 0])
  const scale = useTransform(scrollY, [0, height], [1, 0.9])
  const blur = useTransform(scrollY, [0, height * 0.6], [0, 10])
  
  // Scroll indicator fades out quickly
  const indicatorOpacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <EditProvider>
      <EditModeUI />
      <EditSelectionOverlay />
      <main className="relative min-h-screen">
        {/* Hero Section - Sticky & Animated */}
        <div className="sticky top-0 h-screen overflow-hidden -z-10">
          <div className="absolute inset-0">
            <GradientBackground />
          </div>
          
          <motion.div 
            style={{ y, opacity, scale, filter: blur.get() ? `blur(${blur.get()}px)` : undefined }} 
            className="relative h-full flex flex-col items-center justify-center"
          >
            <section className="px-6 flex flex-col items-center z-10">
              <HeroIcon />
              <EditableContent
                contentKey="hero-title"
                defaultValue="imagination is limit"
                as="h1"
                className={`${instrumentSerif.className} text-black text-center text-balance font-normal tracking-tight text-5xl md:text-7xl`}
              />
            </section>

            <motion.div 
              style={{ opacity: indicatorOpacity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <ScrollIndicator />
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section - Slides over */}
        <div className="relative z-10">
          <div className="min-h-screen rounded-t-[40px] md:rounded-t-[60px] overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.05)] bg-[#FDFCF8]">
            <BeigeBackground />
            
            <div className="relative">
              <div className="px-6 md:px-16 py-16 md:py-24">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xs font-bold tracking-[0.2em] mb-6 text-black/40 uppercase">Navigation</h3>
                        <nav className="flex flex-col gap-2">
                          {[
                            { name: "Home", href: "#" },
                            { name: "Works", href: "#works" },
                            { name: "Services", href: "#services" },
                            { name: "About", href: "#about" },
                            { name: "Contact", href: "#contact" },
                          ].map((item) => (
                            <a 
                              key={item.name} 
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault()
                                if (item.href === "#") {
                                  window.scrollTo({ top: 0, behavior: "smooth" })
                                } else {
                                  const element = document.querySelector(item.href)
                                  if (element) {
                                    element.scrollIntoView({ behavior: "smooth" })
                                  }
                                }
                              }}
                              className={`${instrumentSerif.className} text-4xl md:text-5xl text-black/80 hover:text-black hover:translate-x-4 transition-all duration-300`}
                            >
                              {item.name}
                            </a>
                          ))}
                        </nav>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold tracking-[0.2em] mb-6 text-black/40 uppercase">Socials</h3>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                          {["LinkedIn", "Tiktok", "Instagram"].map((item) => (
                            <a 
                              key={item} 
                              href="#" 
                              className="text-base text-black/60 hover:text-black underline decoration-1 underline-offset-4 transition-colors"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-start pt-8">
                      <div className="space-y-6">
                        <EditableContent
                          contentKey="main-heading"
                          defaultValue={`Créer<br /><span class="italic text-black/50">l'inattendu.</span>`}
                          as="h2"
                          className={`${instrumentSerif.className} text-4xl md:text-7xl leading-[0.9] text-black`}
                        />
                        <EditableContent
                          contentKey="main-description"
                          defaultValue="Transformer des concepts abstraits en expériences tangibles et mémorables."
                          as="p"
                          className="text-lg text-black/70 max-w-md leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Component */}
                <div id="services">
                  <ServicesWavy />
                </div>
                
                <div id="works">
                  <SelectedWorks />
                </div>
                
                <ServicesDetail />

                <div id="about">
                  <About />
                </div>

                <div id="contact">
                  <Contact />
                </div>
                
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </main>
    </EditProvider>
  )
}

