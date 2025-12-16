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

export default function ServicesWavy() {
  return (
    <div className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <WavyBlock className="flex flex-col justify-start items-start gap-8">
          {services.map((service, index) => (
            <WavyBlockItem key={service} index={index}>
              <h2 className={`${instrumentSerif.className} text-[8vw] md:text-[6vw] leading-none tracking-tight text-black/90 whitespace-nowrap`}>
                {service}
              </h2>
            </WavyBlockItem>
          ))}
        </WavyBlock>
      </div>
    </div>
  )
}
