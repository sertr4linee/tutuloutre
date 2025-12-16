"use client"

import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export function Footer() {
  return (
    <footer className="pt-12 pb-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5">
            <h3 className={`${instrumentSerif.className} text-4xl md:text-5xl text-black mb-6`}>
              Tutuloutre
            </h3>
            <p className="text-black/60 text-lg max-w-sm leading-relaxed">
              Créer l'inattendu. Transformer des concepts abstraits en expériences tangibles et mémorables.
            </p>
          </div>
          
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-6">Sitemap</h4>
            <ul className="space-y-4">
              {["Home", "Works", "Services", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-black hover:text-black/60 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-6">Socials</h4>
            <ul className="space-y-4">
              {["Instagram", "LinkedIn", "Behance", "Twitter"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-black hover:text-black/60 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-6">Legal</h4>
            <ul className="space-y-4">
              {["Mentions Légales", "CGV"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-black hover:text-black/60 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end pt-12 border-t border-black/10">
          <div className="w-full">
            <span className={`${instrumentSerif.className} block text-[13vw] leading-[0.8] text-black/5 select-none text-center md:text-left -ml-[0.5vw]`}>
              TUTULOUTRE
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 text-xs font-medium uppercase tracking-widest text-black/40">
            <span>Paris, France</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
