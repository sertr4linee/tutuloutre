"use client"

import GradientBackground from "@/components/ui/background"
import { useState } from "react"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      
      {/* Portfolio content with neobrutalism design */}
      <div className="relative z-30 flex items-center justify-center min-h-screen py-8 md:py-12 lg:py-16 px-4">
        <div className="relative w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[6px] sm:border-[8px] md:border-[10px] border-black mx-auto">
          {/* Corner elements - L-shaped design only - hidden on mobile */}
          {/* Top-left corner */}
          <div className="hidden sm:block absolute -top-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute top-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
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
          
          {/* Content container with reduced padding */}
          <div className="p-4 sm:p-5 md:p-6 lg:p-8">
            {/* Navigation with reduced bottom margin */}
            <nav className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-8 lg:mb-10">
              <div className="text-xl sm:text-2xl font-medium text-[#2D2D2D] mb-4 sm:mb-0">Maelle Crescence</div>
              
              {/* Mobile menu button */}
              <button 
                className="sm:hidden absolute top-4 right-4 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              
              {/* Navigation links - responsive */}
              <div className={`${menuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 lg:space-x-12 text-base md:text-lg text-[#3C3C3C] w-full sm:w-auto items-center sm:items-start mt-4 sm:mt-0`}>
                <a href="#about" className="hover:underline">About</a>
                <a href="#work" className="hover:underline">Work</a>
                <a href="#services" className="hover:underline">Services</a>
                <a href="#contact" className="hover:underline">Contact</a>
                <div className="relative inline-block">
                  {/* Shadow box */}
                  <div className="absolute top-[3px] left-[3px] w-full h-full bg-black rounded-md"></div>
                  
                  {/* Main button */}
                  <button className="relative bg-[#222] text-white px-6 py-2 rounded-md flex items-center justify-center text-base font-medium">
                    Resume 
                    <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L12 4M12 15L8 11M12 15L16 11M8 19H16C17.1046 19 18 18.1046 18 17V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </nav>
            
            {/* Main content with reduced gap */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 order-2 md:order-1">
                {/* Hi I am bubble */}
                <div className="relative inline-block mb-2 sm:mb-4">
                  <div className="bg-[#ff6b57] text-black font-bold px-4 sm:px-6 py-1 sm:py-2 rounded-full border-[2px] sm:border-[3px] border-black transform -rotate-3 text-xs sm:text-sm">
                    Hi, I am
                  </div>
                </div>
                
                {/* Name */}
                <h1 className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter">
                  Maelle <br />Crescence
                </h1>
                
                {/* Description */}
                <p className="text-xl sm:text-2xl md:text-3xl mt-4 sm:mt-6 font-normal text-[#3C3C3C] max-w-xl leading-tight">
                  I <span className="text-[#f67a45] font-medium">scribble</span> on paper and help brands to create designs.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mt-6 sm:mt-10">
                  <button className="bg-[#2D2D2D] text-white border-2 border-black px-4 sm:px-6 py-2 sm:py-3 font-semibold flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Hire Me
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="bg-white border-2 border-black px-4 sm:px-6 py-2 sm:py-3 font-semibold flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    My Story
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Character illustration */}
              <div className="md:col-span-5 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
                <img 
                  src="/homme.svg" 
                  alt="Character illustration" 
                  className="w-[60%] sm:w-[50%] md:max-w-[80%] md:w-auto md:h-auto" 
                />
              </div>
            </div>
          </div>
          
          {/* Neobrutalism banner positioned across the bottom border - responsive */}
          <div 
            className="absolute -bottom-[20px] sm:-bottom-[25px] md:-bottom-[30px] left-1/2 -translate-x-1/2 flex items-center justify-center z-40 w-[200px] sm:w-[250px] md:w-[350px] h-[40px] sm:h-[50px] md:h-[65px]"
            style={{
              transform: "rotate(4.65deg)",
              backgroundColor: "#FFD2BF",
              borderRadius: "40px",
              border: "3px solid #000000",
              boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
              padding: "0 10px",
              position: "relative",
            }}
          >
            <span 
              className="text-[16px] sm:text-[20px] md:text-[28px] font-black text-black"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              @ une_mome
            </span>
            
            {/* Mouse cursor SVG */}
            <div 
              className="absolute -right-4 sm:-right-5 md:-right-6 -top-1 w-[60px] sm:w-[80px] md:w-[100px] h-[50px] sm:h-[60px] md:h-[80px]"
              style={{
                transform: "rotate(-5deg)",
              }}
            >
              <img 
                src="/mouse.svg" 
                alt="Mouse cursor" 
                className="w-full h-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

