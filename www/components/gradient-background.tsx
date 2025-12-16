"use client"

import { GrainGradient } from "@paper-design/shaders-react"

export function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10">
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
