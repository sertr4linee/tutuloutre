"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function GradientBackground() {
  return (
    <div className="fixed inset-0 w-full min-h-screen -z-10">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "linear-gradient(to bottom, #f8d7e6 0%, #f4a990 50%, #e67e56 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          }}
        />
        
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.7) 1.5px, transparent 1.5px)`,
            backgroundSize: '25px 25px',
            backgroundPosition: '0 0',
            opacity: 0.4,
          }}
        />
      </div>

      <div className="fixed inset-0 overflow-hidden">
        {/* Top left flower */}
        <div className="absolute -left-12 -top-12 hidden sm:block" style={{ width: "150px", height: "150px" }}>
          <div className="relative w-full h-full">
            <Image
              src="/stars.svg"
              alt=""
              fill
              className="drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] animate-[spin_8s_ease-in-out_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(340deg) saturate(1.2)",
                opacity: 0.9
              }}
            />
          </div>
        </div>

        {/* Center top flower */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4" style={{ width: "120px", height: "120px" }}>
          <div className="relative w-full h-full">
            <Image
              src="/stars.svg"
              alt=""
              fill
              className="animate-pulse"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9))",
                animationDuration: "4s"
              }}
            />
          </div>
        </div>

        {/* Bottom left flower */}
        <div className="absolute -left-8 -bottom-8 hidden sm:block" style={{ width: "120px", height: "120px" }}>
          <div className="relative w-full h-full">
            <Image
              src="/stars.svg"
              alt=""
              fill
              className="animate-[spin_10s_linear_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(15deg) saturate(1.3)",
                opacity: 0.9
              }}
            />
          </div>
        </div>

        {/* Bottom center flower */}
        <div className="absolute left-1/3 bottom-8" style={{ width: "90px", height: "90px" }}>
          <div className="relative w-full h-full">
            <Image
              src="/stars.svg"
              alt=""
              fill
              className="animate-bounce"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(340deg) saturate(1.1)",
                opacity: 0.85,
                animationDuration: "5s"
              }}
            />
          </div>
        </div>

        {/* Bottom right medium flower */}
        <div className="absolute right-10 bottom-12" style={{ width: "100px", height: "100px" }}>
          <div className="relative w-full h-full">
            <Image
              src="/stars.svg"
              alt=""
              fill
              className="animate-[ping_10s_ease-in-out_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(5deg) saturate(1.4)",
                opacity: 0.9
              }}
            />
          </div>
        </div>

        {/* Bottom right corner flower */}
        <div className="absolute -right-12 -bottom-12 hidden sm:block" style={{ width: "150px", height: "150px" }}>
          <div className="relative w-full h-full">
            <Image
              src="/stars.svg"
              alt=""
              fill
              className="animate-pulse"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9))",
                animationDuration: "6s"
              }}
            />
          </div>
        </div>

        {/* Large flower on right side extremity */}
        <div className="absolute right-0 top-1/3 hidden sm:block" style={{ width: "180px", height: "180px" }}>
          <div className="relative w-full h-full">
            <Image
              src="/stars.svg"
              alt=""
              fill
              className="animate-[spin_15s_linear_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(345deg) saturate(1.2)",
                opacity: 0.85
              }}
            />
          </div>
        </div>

        <div className="absolute -left-4 top-1/2 hidden sm:block" style={{ width: "110px", height: "110px" }}>
          <div className="relative w-full h-full">
            <Image
              src="/stars.svg"
              alt=""
              fill
              className="animate-[float_7s_ease-in-out_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(10deg) saturate(1.3)",
                opacity: 0.9
              }}
            />
          </div>
        </div>

        {/* New star for mobile - top right */}
        <div className="absolute right-8 top-12" style={{ width: "80px", height: "80px" }}>
          <div className="relative w-full h-full">
            <Image
              src="/stars.svg"
              alt=""
              fill
              className="animate-pulse"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(15deg) saturate(1.2)",
                opacity: 0.9,
                animationDuration: "3s"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

