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
                src="/me.jpg" 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-black/80">
              Au croisement de l'art et de la stratégie, je sculpte des <span className={`${instrumentSerif.className} italic text-3xl text-black`}>univers singuliers</span>. Chaque projet est une opportunité de repousser les limites de la <span className={`${instrumentSerif.className} italic text-3xl text-black`}>créativité</span>.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 pt-12">
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-8">Experience</h3>
                <ul className="space-y-8">
                  <li className="flex flex-col items-start gap-1">
                    <span className={`${instrumentSerif.className} text-3xl italic text-black`}>Freelance Designer</span>
                    <span className="text-xs font-medium tracking-widest uppercase text-black/40">(2023-Present)</span>
                  </li>
                  <li className="flex flex-col items-start gap-1">
                    <span className={`${instrumentSerif.className} text-3xl italic text-black`}>Assistante DA</span>
                    <div className="flex items-center gap-2 text-base">
                      <LinkPreview 
                        url="https://instagram.com/lucangeli" 
                        className="text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black/100 pb-0.5"
                      >
                        @lucangeli
                      </LinkPreview>
                      <span className="text-xs font-medium tracking-widest uppercase text-black/40">(MAI-OCT 2025)</span>
                    </div>
                  </li>
                  <li className="flex flex-col items-start gap-1">
                    <span className={`${instrumentSerif.className} text-3xl italic text-black`}>Photographe de plateau</span>
                    <div className="flex items-center gap-2 text-base">
                      <LinkPreview 
                        url="https://instagram.com/cigless" 
                        className="text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black/100 pb-0.5"
                      >
                        @cigless
                      </LinkPreview>
                      <span className="text-xs font-medium tracking-widest uppercase text-black/40">(OCT 2024)</span>
                    </div>
                  </li>
                  <li className="flex flex-col items-start gap-1">
                    <span className={`${instrumentSerif.className} text-3xl italic text-black`}>Stage Graphiste/CM</span>
                    <div className="flex items-center gap-2 text-base">
                      <LinkPreview 
                        url="https://instagram.com/alloverproductions" 
                        className="text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black/100 pb-0.5"
                      >
                        @alloverproductions
                      </LinkPreview>
                      <span className="text-xs font-medium tracking-widest uppercase text-black/40">(JUN-AUG 2024)</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-8">Education</h3>
                <ul className="space-y-8">
                  <li className="flex flex-col items-start gap-1">
                    <span className={`${instrumentSerif.className} text-3xl italic text-black`}>Master en Direction Artistique</span>
                    <div className="flex items-center gap-2 text-base">
                      <LinkPreview 
                        url="https://instagram.com/eartsup" 
                        className="text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black/100 pb-0.5"
                      >
                        @eartsup
                      </LinkPreview>
                      <span className="text-xs font-medium tracking-widest uppercase text-black/40">(2022-2027)</span>
                    </div>
                  </li>
                  <li className="flex flex-col items-start gap-1">
                    <span className={`${instrumentSerif.className} text-3xl italic text-black`}>BAC STD2A</span>
                    <span className="text-xs font-medium tracking-widest uppercase text-black/40">(2020-2017)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
