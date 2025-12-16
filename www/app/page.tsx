"use client"

import { BeigeBackground } from "@/components/beige-background"
import { GradientBackground } from "@/components/gradient-background"
import { useEffect, useState, useRef } from "react"
import ServicesWavy from "@/components/services-wavy"
import SelectedWorks from "@/components/selected-works"
import ServicesDetail from "@/components/services-detail"
import About from "@/components/about"
import Contact from "@/components/contact"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { Instrument_Serif } from "next/font/google"
import { HeroIcon } from "@/components/hero-icon"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Page() {
  const [scrollY, setScrollY] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const pullProgress = Math.min(scrollY / 800, 1)
  const nextSectionY = 100 - pullProgress * 100
  const textY = scrollY * 0.3

  return (
    <>
      <main className="fixed inset-0 flex items-center justify-center overflow-hidden pb-32">
        <GradientBackground />
        
        <section
          className="px-6 flex flex-col items-center"
          style={{
            transform: `translateY(-${textY}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
        
          <HeroIcon />

          <h1
            className={`${instrumentSerif.className} text-black text-center text-balance font-normal tracking-tight text-7xl`}
          >
            imagination is limit
          </h1>
        </section>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <ScrollIndicator />
        </div>
      </main>

      <div className="h-[200vh] relative" />

      <section
        className="fixed inset-0 rounded-t-[40px] shadow-2xl overflow-hidden"
        style={{
          transform: `translateY(${nextSectionY}%)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <BeigeBackground />
        
        <div ref={scrollContainerRef} className="relative h-full overflow-y-auto">
          <div className="px-8 lg:px-16 py-12">
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
                              scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
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
                    <h2 className={`${instrumentSerif.className} text-5xl md:text-7xl leading-[0.9] text-black`}>
                      Créer<br />
                      <span className="italic text-black/50">l&apos;inattendu.</span>
                    </h2>
                    <p className="text-lg text-black/70 max-w-md leading-relaxed">
                      Transformer des concepts abstraits en expériences tangibles et mémorables.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Component */}
            <div id="services">
              <ServicesWavy containerRef={scrollContainerRef} />
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
          </div>
        </div>
      </section>
    </>
  )
}
