"use client"

import { GradientBackground } from "@/components/gradient-background"
import { useEffect, useState } from "react"
import Features from "@/components/features"
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
        className="fixed inset-0 bg-white rounded-t-[40px] shadow-2xl overflow-y-auto"
        style={{
          transform: `translateY(${nextSectionY}%)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="bg-[#f5f5f5] px-8 lg:px-16 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Sitemap Section */}
            <div>
              <h3 className="text-sm font-bold tracking-wider mb-6 flex items-center gap-3">
                <span className="text-gray-400">01/</span>
                <span>SITEMAP</span>
              </h3>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-lg">
                  Home
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-lg">
                  Works
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-lg">
                  About
                </a>
              </nav>
            </div>

            {/* Social Section */}
            <div>
              <h3 className="text-sm font-bold tracking-wider mb-6 flex items-center gap-3">
                <span className="text-gray-400">02/</span>
                <span>SOCIAL</span>
              </h3>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-lg">
                  Github
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-lg">
                  Linkedin
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-lg">
                  Twitter
                </a>
              </nav>
            </div>

            {/* CTA Section */}
            <div className="md:text-right">
              <a
                href="#"
                className="inline-block text-2xl lg:text-3xl font-bold tracking-tight hover:underline decoration-2 underline-offset-4"
              >
                LET'S WORK TOGETHER
              </a>
            </div>
          </div>
        </div>

        {/* Features Component */}
        <Features />
      </section>
    </>
  )
}
