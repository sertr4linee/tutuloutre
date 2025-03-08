"use client"

import GradientBackground from "@/components/ui/background"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />

      {/* Portfolio content with neobrutalism design */}
      <div className="relative z-30 flex items-center justify-center min-h-screen py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4">
        <div className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[4px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto">
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
                <Link href="/" className="hover:underline font-medium">Home</Link>
                <Link href="/about" className="hover:underline font-medium">
                  About
                </Link>
                <Link href="/work" className="hover:underline">
                  Work
                </Link>
                <Link href="/services" className="hover:underline">
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

            {/* About page content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10">
              {/* About page title with decorative element */}
              <div className="md:col-span-12 mb-2 sm:mb-4">
                <div className="relative">
                  <div className="absolute -top-6 sm:-top-8 left-1 sm:left-2">
                    <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap">
                      About me
                    </div>
                  </div>
                  <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter font-family-clash">
                    My Story
                  </h1>
                </div>
              </div>

              {/* Profile image with neobrutalism style */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl"></div>
                  <div className="relative border-4 border-black rounded-xl overflow-hidden w-[280px] h-[350px] sm:w-[320px] sm:h-[400px]">
                    <Image
                      src="/moi.png"
                      alt="Maelle Crescence"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 280px, 320px"
                      priority
                    />

                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -right-4 w-[80px] h-[80px]">
                      <Image
                        src="/effect3.svg"
                        alt=""
                        width={80}
                        height={80}
                        className="animate-pulse"
                        style={{
                          filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9))",
                          animationDuration: "4s",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* About text content */}
              <div className="md:col-span-7">
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <p className="text-lg sm:text-xl font-medium text-[#3C3C3C]">
                    Hi there! I&apos;m <span className="text-[#f67a45] font-bold">Maelle Crescence</span>, a passionate
                    designer with a love for creating meaningful visual experiences.
                  </p>

                  <p className="text-base sm:text-lg text-[#3C3C3C]">
                    With over 5 years of experience in the design industry, I&apos;ve had the pleasure of working with brands
                    across various sectors, helping them communicate their vision through thoughtful and impactful
                    design.
                  </p>

                  <div className="bg-[#FFE8DD] border-2 border-black p-4 sm:p-5 rounded-lg relative">
                    <div className="absolute -top-3 -left-3 bg-[#FFD2BF] text-black font-bold px-3 py-1 rounded-full border-2 border-black text-xs sm:text-sm">
                      My approach
                    </div>
                    <p className="text-base sm:text-lg text-[#3C3C3C] mt-2">
                      I believe in design that tells stories and creates connections. My process combines strategic
                      thinking with creative exploration to deliver solutions that are both beautiful and functional.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="border-2 border-black p-3 sm:p-4 rounded-lg bg-white">
                      <h3 className="font-bold text-lg sm:text-xl text-[#2D2D2D] mb-2">Education</h3>
                      <p className="text-sm sm:text-base text-[#3C3C3C]">
                        Bachelor of Design
                        <br />
                        Eart sup Nice
                        <br />
                        2015-2019
                      </p>
                    </div>

                    <div className="border-2 border-black p-3 sm:p-4 rounded-lg bg-white">
                      <h3 className="font-bold text-lg sm:text-xl text-[#2D2D2D] mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-[#FFD2BF] px-2 py-1 text-xs sm:text-sm rounded-full border border-black">
                          Illustration
                        </span>
                        <span className="bg-[#FFD2BF] px-2 py-1 text-xs sm:text-sm rounded-full border border-black">
                          UI/UX
                        </span>
                        <span className="bg-[#FFD2BF] px-2 py-1 text-xs sm:text-sm rounded-full border border-black">
                          Branding
                        </span>
                        <span className="bg-[#FFD2BF] px-2 py-1 text-xs sm:text-sm rounded-full border border-black">
                          Typography
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to action */}
                <div className="mt-8 sm:mt-10">
                  <Link href="/contact" className="inline-block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md"></div>
                      <button className="relative bg-[#f67a45] text-white border-2 border-black px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold flex items-center justify-center rounded-md">
                        Let&apos;s work together
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Fun facts section */}
              <div className="md:col-span-12 mt-8 sm:mt-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-4 sm:mb-6">Fun Facts</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative overflow-hidden">
                    <div className="absolute -top-1 -right-1 w-[40px] h-[40px] opacity-20">
                      <Image
                        src="/stars.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="w-full h-full"
                      />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">Coffee Enthusiast</h3>
                    <p className="text-sm sm:text-base text-[#3C3C3C]">
                      I&apos;ve tried over 100 different coffee beans from around the world.
                    </p>
                  </div>

                  <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative overflow-hidden">
                    <div className="absolute -top-1 -right-1 w-[40px] h-[40px] opacity-20">
                      <Image
                        src="/stars.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="w-full h-full"
                      />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">Amateur Botanist</h3>
                    <p className="text-sm sm:text-base text-[#3C3C3C]">
                      My apartment is home to more than 30 different plant species.
                    </p>
                  </div>

                  <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative overflow-hidden">
                    <div className="absolute -top-1 -right-1 w-[40px] h-[40px] opacity-20">
                      <Image
                        src="/stars.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="w-full h-full"
                      />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">Weekend Hiker</h3>
                    <p className="text-sm sm:text-base text-[#3C3C3C]">
                      I find inspiration in nature and try to hike a new trail every month.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>    
        </div>
      </div>
    </main>
  )
}

