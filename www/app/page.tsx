"use client"

import { BeigeBackground } from "@/components/beige-background"
import { GradientBackground } from "@/components/gradient-background"
import { useEffect, useState } from "react"
import ServicesWavy from "@/components/services-wavy"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Page() {
  const [scrollY, setScrollY] = useState(0)

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
      <main className="fixed inset-0 flex items-center justify-center overflow-hidden">
        <GradientBackground />
        
        <section
          className="px-6 flex flex-col items-center"
          style={{
            transform: `translateY(-${textY}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="mb-4">
            <img src="/icon.svg" alt="Logo" className="w-32 h-32 opacity-90" />
          </div>

          <h1
            className={`${instrumentSerif.className} text-black text-center text-balance font-normal tracking-tight text-7xl`}
          >
            imagination is limit
          </h1>

          <div className="mt-12">
            <ScrollIndicator />
          </div>
        </section>
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
        
        <div className="relative h-full overflow-y-auto">
          <div className="px-8 lg:px-16 py-24">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
                <div className="space-y-16">
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.2em] mb-8 text-black/40 uppercase">Navigation</h3>
                    <nav className="flex flex-col gap-4">
                      {["Home", "Works", "Services", "About", "Contact"].map((item) => (
                        <a 
                          key={item} 
                          href="#" 
                          className={`${instrumentSerif.className} text-5xl md:text-6xl text-black/80 hover:text-black hover:translate-x-4 transition-all duration-300`}
                        >
                          {item}
                        </a>
                      ))}
                    </nav>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold tracking-[0.2em] mb-8 text-black/40 uppercase">Socials</h3>
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {["Github", "LinkedIn", "Twitter", "Instagram"].map((item) => (
                        <a 
                          key={item} 
                          href="#" 
                          className="text-lg text-black/60 hover:text-black underline decoration-1 underline-offset-4 transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="space-y-6">
                    <h2 className={`${instrumentSerif.className} text-6xl md:text-8xl leading-[0.9] text-black`}>
                      Je griffonne<br />sur papier<br />& design.
                    </h2>
                    <p className="text-xl text-black/60 max-w-md leading-relaxed">
                      J'aide les marques à créer des designs uniques et mémorables. Disponible pour de nouveaux projets.
                    </p>
                  </div>
                  
                  <a 
                    href="mailto:hello@unemome.fr" 
                    className="inline-flex items-center gap-4 text-xl font-medium mt-12 group"
                  >
                    <span className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      →
                    </span>
                    <span>Get in touch</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Features Component */}
            <ServicesWavy />
          </div>
        </div>
      </section>
    </>
  )
}
