"use client"

import { GrainGradient } from "@paper-design/shaders-react"

export function BeigeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(35, 30%, 94%)"
        softness={0.9}
        intensity={0.15}
        noise={0.3}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={0.2}
        colors={["hsl(35, 20%, 90%)", "hsl(35, 20%, 88%)", "hsl(35, 20%, 92%)"]}
      />
    </div>
  )
}
