"use client"

import GradientBackground from "@/components/ui/background"
import Link from "next/link";
import { useState } from "react"
import Image from "next/image"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      
      {/* Étoile décorative */}
      <div
        className="fixed z-10 bottom-[10%] left-[8%] w-[60px] h-[60px] md:w-[100px] md:h-[100px] animate-bounce"
        style={{ animationDuration: "6s" }}
      >
        <Image
          src="/stars.svg"
          alt="Decorative star"
          width={100}
          height={100}
          className="w-full h-full"
          style={{ filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))" }}
        />
      </div>
      
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
              <div className={`
                ${menuOpen ? 'flex fixed inset-0 bg-white/95 z-40' : 'hidden'} 
                sm:flex sm:relative sm:bg-transparent
                flex-col sm:flex-row 
                items-center justify-center sm:justify-start
                space-y-6 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8
                text-lg sm:text-base md:text-lg
                w-full sm:w-auto
              `}>
                <a href="/about" className="hover:underline">About</a>
                <a href="/work" className="hover:underline">Work</a>
                <a href="/services" className="hover:underline">Services</a>
                <a href="/contact" className="hover:underline">Contact</a>
                
                {/* Resume button - responsive sizing */}
                <div className="relative inline-block mt-4 sm:mt-0">
                  <div className="absolute top-[3px] left-[3px] w-full h-full bg-black rounded-md"></div>
                  <button className="relative bg-[#222] text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-md flex items-center justify-center text-sm sm:text-base font-medium">
                    Resume 
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L12 4M12 15L8 11M12 15L16 11M8 19H16C17.1046 19 18 18.1046 18 17V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </nav>
            
            {/* Main content grid - improved responsive layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
              <div className="md:col-span-7 order-2 md:order-1">
                <div className="relative">
                  {/* Hi I am bubble - responsive positioning and sizing */}
                  <div className="absolute -top-6 sm:-top-8 left-1 sm:left-2">
                    <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap">
                      Hi, I am
                    </div>
                  </div>

                  {/* Name with responsive typography */}
                  <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[70px] xl:text-[80px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter font-family-clash">
                    Maelle <br />
                    <div className="flex items-center">
                      Crescence
                      <Image 
                        src="/effect.svg" 
                        width={120}
                        height={90}
                        alt="Effect illustration" 
                        className="sm:w-[140px] md:w-[160px] lg:w-[170px] sm:h-[100px] md:h-[110px] lg:h-[120px] ml-3 sm:ml-4 opacity-20"
                      />
                    </div>
                  </h1>
                </div>
                
                {/* Description - responsive text */}
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 sm:mt-6 font-normal text-[#3C3C3C] max-w-xl leading-tight">
                  I <span className="text-[#f67a45] font-medium">scribble</span> on paper and help brands to create designs.
                </p>
                
                {/* Buttons - responsive sizing and spacing */}
                <div className="flex flex-col sm:flex-row sm:space-x-3 md:space-x-4 space-y-3 sm:space-y-0 mt-6 sm:mt-8 md:mt-10">
                  <Link href="/work">
                  <button className="bg-[#2D2D2D] text-white border-2 border-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    Hire Me
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  </Link>
                  <Link href="/about">
                  <button className="bg-white border-2 border-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    My Story
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  </Link>
                </div>
              </div>
              
              {/* Character illustration - responsive sizing */}
              <div className="md:col-span-5 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
                <Image
                  src="/portrai.svg"
                  alt="Character illustration"
                  width={500}
                  height={500}
                  className="w-[55%] sm:w-[45%] md:w-[75%] lg:w-[80%] max-w-[400px]"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Bottom banner - responsive sizing and positioning */}
          <div 
            className="absolute -bottom-[15px] sm:-bottom-[20px] md:-bottom-[25px] left-1/2 -translate-x-1/2 flex items-center justify-center z-40 w-[180px] sm:w-[220px] md:w-[280px] lg:w-[350px] h-[35px] sm:h-[45px] md:h-[55px] lg:h-[65px]"
            style={{
              transform: "rotate(4.65deg)",
              backgroundColor: "#FFD2BF",
              borderRadius: "40px",
              border: "2px sm:border-3px border-black",
              boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
              padding: "0 8px sm:0 10px",
            }}
          >
            <span 
              className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-black text-black"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              @ une_mome
            </span>
            
            {/* Mouse cursor - responsive sizing */}
            <div 
              className="absolute -right-3 sm:-right-4 md:-right-5 lg:-right-6 -top-1 w-[50px] sm:w-[65px] md:w-[85px] lg:w-[100px] h-[40px] sm:h-[50px] md:h-[65px] lg:h-[80px]"
            >
              <Image
                src="/mouse.svg"
                alt="Mouse cursor"
                width={100}
                height={80}
                className="w-full h-full"
                style={{ transform: "rotate(-5deg)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

