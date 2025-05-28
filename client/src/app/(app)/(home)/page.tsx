"use client"

import GradientBackground from "@/components/ui/background"
import { motion } from "framer-motion";
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);  
  
  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />    
      <div
        className="fixed z-0 bottom-[8%] left-[5%] w-[35px] h-[35px] md:w-[80px] md:h-[80px] animate-bounce hidden sm:block"
        style={{ animationDuration: "6s" }}
      >
        <Image
          src="/stars.svg"
          alt="Étoile décorative"
          width={100}
          height={100}
          className="w-full h-full"
          style={{ filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))" }}
        />
      </div>
      <div className="relative z-30 flex items-center justify-center min-h-screen py-4 px-3 sm:py-6 md:py-8 lg:py-12 sm:px-4">
        <div className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[2px] sm:border-[4px] md:border-[6px] lg:border-[8px] border-black mx-auto">
          <div className="hidden md:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
            <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
          </div>
          <div className="hidden md:block absolute -top-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute top-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute top-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>
          <div className="hidden md:block absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>
          <div className="hidden md:block absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>
          
          <div className="p-4 pt-6 sm:p-6 md:p-8 lg:p-10">
            <nav className="flex justify-between items-center mb-6 sm:mb-8 md:mb-10 w-full">
              <div className="text-lg sm:text-xl md:text-2xl font-medium text-[#2D2D2D]">
              </div>
              <button 
                className="md:hidden fixed top-4 right-4 p-2 z-50 bg-white/90 backdrop-blur-sm rounded-lg border-2 border-black shadow-lg"
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
              <div className={`
                ${menuOpen ? 'flex fixed inset-0 bg-white/95 backdrop-blur-sm z-40' : 'hidden'} 
                md:flex md:relative md:bg-transparent
                flex-col md:flex-row 
                items-center justify-center md:justify-start
                space-y-8 md:space-y-0 md:space-x-6 lg:space-x-8
                text-xl md:text-lg lg:text-xl
                w-full md:w-auto
              `}>
                <a href="/about" className="hover:underline font-medium">À propos</a>
                <a href="/work" className="hover:underline font-medium">Travaux</a>
                <a href="/services" className="hover:underline font-medium">Services</a>
                <a href="/contact" className="hover:underline font-medium">Contact</a>
                <div className="relative inline-block">
                  <div className="absolute top-[3px] left-[3px] w-full h-full bg-black rounded-lg"></div>
                  <button className="relative bg-[#222] text-white px-6 py-3 md:px-5 md:py-2 rounded-lg flex items-center justify-center text-lg md:text-base font-medium">
                    CV 
                    <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L12 4M12 15L8 11M12 15L16 11M8 19H16C17.1046 19 18 18.1046 18 17V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </nav>

            <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8">
              <div className="md:col-span-5 flex items-center justify-center order-1 md:order-2">
                <div className="w-[95%] sm:w-[90%] md:w-[120%] lg:w-[220%] max-w-[650px]">
                  <Image
                    src="/maskote.svg"
                    alt="Illustration du personnage"
                    width={1000}
                    height={1000}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
              
              <div className="md:col-span-7 order-2 md:order-1 text-left flex flex-col items-start px-4 md:px-0">
                <div className="relative w-full max-w-[500px]">
                  <div className="absolute -top-6 sm:-top-8 md:-top-10 left-0 md:left-2">
                    <div className="bg-[#ff6b57] text-black font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-sm sm:text-base whitespace-nowrap">
                      👋 Heyy, je suis
                    </div>
                  </div>
                  <h1 className="text-[45px] sm:text-[55px] md:text-[60px] lg:text-[75px] xl:text-[85px] leading-[0.85] font-black text-[#2D2D2D] tracking-tighter font-family-clash mt-4 md:mt-2">
                    Maelle <br />
                    <div className="flex items-center justify-start">
                      Crescence
                      <Image 
                        src="/effect.svg" 
                        width={120}
                        height={90}
                        alt="Effet d'illustration" 
                        className="w-[100px] sm:w-[130px] md:w-[150px] lg:w-[170px] h-[75px] sm:h-[95px] md:h-[110px] lg:h-[120px] ml-2 sm:ml-3 md:ml-4 opacity-20"
                      />
                    </div>
                  </h1>
                </div>
                <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl mt-6 sm:mt-8 font-normal text-[#3C3C3C] max-w-lg leading-tight text-left">
                  Je <span className="text-[#f67a45] font-medium">griffonne</span> sur papier et aide les marques à créer des designs.
                </p>                
                <div className="flex flex-col sm:flex-row items-start justify-start sm:space-x-4 space-y-4 sm:space-y-0 mt-8 sm:mt-10 md:mt-12 w-full max-w-lg">
                  <Link href="/work" className="w-full sm:w-auto">
                    <button className="bg-[#2D2D2D] text-white border-2 border-black px-8 py-4 sm:px-6 sm:py-3 text-lg sm:text-base font-semibold flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full sm:w-auto rounded-lg">
                      Engagez-moi
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </Link>
                  <Link href="/about" className="w-full sm:w-auto">
                    <button className="bg-white border-2 border-black px-8 py-4 sm:px-6 sm:py-3 text-lg sm:text-base font-semibold flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full sm:w-auto rounded-lg">
                      Mon Histoire
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>          
          
          <div 
            className={`absolute -bottom-[20px] sm:-bottom-[25px] md:-bottom-[30px] left-1/2 -translate-x-1/2 flex items-center justify-center z-40 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-[40px] sm:h-[50px] md:h-[60px] lg:h-[65px] ${menuOpen ? 'hidden md:flex' : 'flex'}`}
            style={{
              transform: "rotate(4.65deg)",
              backgroundColor: "#FFD2BF",
              borderRadius: "40px",
              border: "2px solid black",
              boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
              padding: "0 12px",
            }}
          >
            <span 
              className="text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-black text-black text-center truncate"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              @ une_mome
            </span>
            <motion.div 
              className="absolute -right-3 sm:-right-4 md:-right-5 lg:-right-6 -top-1 w-[50px] sm:w-[70px] md:w-[90px] lg:w-[100px] h-[40px] sm:h-[55px] md:h-[70px] lg:h-[80px]"
              animate={{
                rotate: [-5, 5, -5],
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            >
              <Image 
                src="/mouse.svg" 
                alt="Curseur de souris" 
                width={100}
                height={80}
                className="w-full h-full" 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}