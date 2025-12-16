"use client"

import { BeigeBackground } from "@/components/beige-background"
import { Instrument_Serif } from "next/font/google"
import Link from "next/link"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Page() {
  return (
    <div className="min-h-screen relative p-8 lg:p-16">
      <BeigeBackground />
      
      <Link href="/" className="fixed top-8 left-8 z-50 text-black/60 hover:text-black transition-colors">
        ← Back
      </Link>

      <div className="max-w-7xl mx-auto pt-24">
        <h1 className={`${instrumentSerif.className} text-6xl md:text-8xl text-black mb-12`}>
          Identité Visuelle
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center text-black/20">
            Project Placeholder 1
          </div>
          <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center text-black/20">
            Project Placeholder 2
          </div>
          <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center text-black/20">
            Project Placeholder 3
          </div>
          <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center text-black/20">
            Project Placeholder 4
          </div>
        </div>
      </div>
    </div>
  )
}
