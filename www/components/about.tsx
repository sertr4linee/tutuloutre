"use client"

import { Instrument_Serif } from "next/font/google"
import { LinkPreview } from "@/components/ui/link-preview"
import Image from "next/image"
import { EditableContent } from "@/components/editable-content"

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
            <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 relative">
              <Image 
                src="/me.jpg" 
                alt="Portrait"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-8">
            <EditableContent
              contentKey="about-description"
              defaultValue={`Au croisement de l&apos;art et de la stratégie, je sculpte des <span class="${instrumentSerif.className} italic text-3xl text-black">univers singuliers</span>. Chaque projet est une opportunité de repousser les limites de la <span class="${instrumentSerif.className} italic text-3xl text-black">créativité</span>.`}
              as="p"
              className="text-xl md:text-2xl leading-relaxed text-black/80"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 pt-12">
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-8">Experience</h3>
                <ul className="space-y-8">
                  <li className="flex flex-col items-start gap-1">
                    <EditableContent
                      contentKey="exp-1-title"
                      defaultValue="Freelance Designer"
                      as="span"
                      className={`${instrumentSerif.className} text-3xl italic text-black`}
                    />
                    <EditableContent
                      contentKey="exp-1-date"
                      defaultValue="(2023-Present)"
                      as="span"
                      className="text-xs font-medium tracking-widest uppercase text-black/40"
                    />
                  </li>
                  <li className="flex flex-col items-start gap-1">
                    <EditableContent
                      contentKey="exp-2-title"
                      defaultValue="Assistante DA"
                      as="span"
                      className={`${instrumentSerif.className} text-3xl italic text-black`}
                    />
                    <div className="flex items-center gap-2 text-base">
                      <LinkPreview 
                        url="https://www.lucangeli.co/en" 
                        className="text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black/100 pb-0.5"
                      >
                        @lucangeli
                      </LinkPreview>
                      <EditableContent
                        contentKey="exp-2-date"
                        defaultValue="(MAI-OCT 2025)"
                        as="span"
                        className="text-xs font-medium tracking-widest uppercase text-black/40"
                      />
                    </div>
                  </li>
                  <li className="flex flex-col items-start gap-1">
                    <EditableContent
                      contentKey="exp-3-title"
                      defaultValue="Photographe de plateau"
                      as="span"
                      className={`${instrumentSerif.className} text-3xl italic text-black`}
                    />
                    <div className="flex items-center gap-2 text-base">
                      <LinkPreview 
                        url="https://www.ciglessfilms.com/" 
                        className="text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black/100 pb-0.5"
                      >
                        @cigless
                      </LinkPreview>
                      <EditableContent
                        contentKey="exp-3-date"
                        defaultValue="(OCT 2024)"
                        as="span"
                        className="text-xs font-medium tracking-widest uppercase text-black/40"
                      />
                    </div>
                  </li>
                  <li className="flex flex-col items-start gap-1">
                    <EditableContent
                      contentKey="exp-4-title"
                      defaultValue="Stage Graphiste/CM"
                      as="span"
                      className={`${instrumentSerif.className} text-3xl italic text-black`}
                    />
                    <div className="flex items-center gap-2 text-base">
                      <LinkPreview 
                        url="https://www.alloverproduction.com/" 
                        className="text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black/100 pb-0.5"
                      >
                        @alloverproductions
                      </LinkPreview>
                      <EditableContent
                        contentKey="exp-4-date"
                        defaultValue="(JUN-AUG 2024)"
                        as="span"
                        className="text-xs font-medium tracking-widest uppercase text-black/40"
                      />
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-8">Education</h3>
                <ul className="space-y-8">
                  <li className="flex flex-col items-start gap-1">
                    <EditableContent
                      contentKey="edu-1-title"
                      defaultValue="Master en Direction Artistique"
                      as="span"
                      className={`${instrumentSerif.className} text-3xl italic text-black`}
                    />
                    <div className="flex items-center gap-2 text-base">
                      <LinkPreview 
                        url="https://www.e-artsup.net/" 
                        className="text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black/100 pb-0.5"
                      >
                        @eartsup
                      </LinkPreview>
                      <EditableContent
                        contentKey="edu-1-date"
                        defaultValue="(2022-2027)"
                        as="span"
                        className="text-xs font-medium tracking-widest uppercase text-black/40"
                      />
                    </div>
                  </li>
                  <li className="flex flex-col items-start gap-1">
                    <EditableContent
                      contentKey="edu-2-title"
                      defaultValue="BAC STD2A"
                      as="span"
                      className={`${instrumentSerif.className} text-3xl italic text-black`}
                    />
                    <EditableContent
                      contentKey="edu-2-date"
                      defaultValue="(2020-2017)"
                      as="span"
                      className="text-xs font-medium tracking-widest uppercase text-black/40"
                    />
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

