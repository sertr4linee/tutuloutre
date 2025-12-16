"use client"

import { GrainGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

export function GradientBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate depth transformations based on scroll
  const scrollProgress = Math.min(scrollY / 800, 1)
  const scale = 1 + scrollProgress * 0.3 // Zoom in effect
  const opacity = 1 - scrollProgress * 0.5 // Fade out effect
  const blur = scrollProgress * 8 // Blur effect for depth

  return (
    <div
      className="absolute inset-0 -z-10 transition-all duration-100"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
      }}
    >
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(0, 0%, 98%)"
        softness={0.9}
        intensity={0.45}
        noise={0.2}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={0.5}
        colors={["hsl(18, 100%, 88%)", "hsl(18, 89%, 62%)", "hsl(330, 100%, 85%)"]}
      />
    </div>
  )
}
