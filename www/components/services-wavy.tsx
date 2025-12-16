"use client"

import { WavyBlock, WavyBlockItem } from "@/components/ui/wavy-text-block"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const services = [
  'UI & UX Design',
  'Direction Artistique',
  'Identité Visuelle',
  'Web Design',
  'Motion Design',
  'Développement',
]

export default function ServicesWavy({ containerRef }: { containerRef?: React.RefObject<HTMLElement | null> }) {
  return (
    <div className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <WavyBlock container={containerRef} className="flex flex-col justify-center items-center gap-8">
          {services.map((service, index) => (
            <WavyBlockItem key={service} index={index}>
              <a href="#" className="group flex items-center gap-6 text-black hover:opacity-80 transition-opacity">
                <h2 className={`${instrumentSerif.className} text-[8vw] md:text-[7vw] leading-none tracking-tight text-black/90 whitespace-nowrap`}>
                  {service}
                </h2>
                <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </a>
            </WavyBlockItem>
          ))}
        </WavyBlock>
      </div>
    </div>
  )
}
