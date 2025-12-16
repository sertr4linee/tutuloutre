"use client"

import { Instrument_Serif } from "next/font/google"
import { LinkPreview } from "@/components/ui/link-preview"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function About() {
  return (
    <div className="py-32 border-t border-black/5">
      <div className="max-w-5xl mx-auto px-8 lg:px-16">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <h2 className={`${instrumentSerif.className} text-5xl md:text-7xl text-black mb-8`}>
              About<br />Me
            </h2>
            <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
              <img 
                src="/maelle.jpg" 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-black/80">
              Passionné par le design et la technologie, je crée des expériences numériques qui marquent les esprits. Mon approche combine esthétique minimaliste et fonctionnalité intuitive.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12">
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-8">Experience</h3>
                <ul className="space-y-6 text-lg text-black/80 leading-relaxed">
                  <li>Freelance Designer (2023-Present)</li>
                  <li>
                    Assistante DA{" "}
                    <LinkPreview url="https://instagram.com/lucangeli" className="font-bold">
                      @lucangeli
                    </LinkPreview>{" "}
                    (MAI-OCT 2025)
                  </li>
                  <li>
                    Photographe de plateau{" "}
                    <LinkPreview url="https://instagram.com/cigless" className="font-bold">
                      @cigless
                    </LinkPreview>{" "}
                    (OCT 2024)
                  </li>
                  <li>
                    Stage Graphiste/CM{" "}
                    <LinkPreview url="https://instagram.com/alloverproductions" className="font-bold">
                      @alloverproductions
                    </LinkPreview>{" "}
                    (JUN-AUG 2024)
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-8">Education</h3>
                <ul className="space-y-6 text-lg text-black/80 leading-relaxed">
                  <li>
                    Master en Direction Artistique{" "}
                    <LinkPreview url="https://instagram.com/eartsup" className="font-bold">
                      @eartsup
                    </LinkPreview>{" "}
                    (2022-2027)
                  </li>
                  <li>BAC STD2A (2020-2017)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
