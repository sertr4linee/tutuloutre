"use client"

import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Contact() {
  return (
    <div className="py-32 border-t border-black/5">
      <div className="max-w-5xl mx-auto px-8 lg:px-16 text-center">
        <h2 className={`${instrumentSerif.className} text-5xl md:text-8xl text-black mb-12`}>
          Let's work<br />together
        </h2>
        
        <div className="mb-16">
          <a 
            href="mailto:hello@tutuloutre.com" 
            className="inline-block text-2xl md:text-4xl border-b border-black pb-2 hover:opacity-60 transition-opacity text-black"
          >
            hello@tutuloutre.com
          </a>
        </div>

        <form className="max-w-xl mx-auto mb-24 text-left space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-black/40">Name</label>
              <input 
                type="text" 
                id="name"
                className="w-full bg-transparent border-b border-black/20 py-2 text-black placeholder:text-black/30 focus:border-black outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-black/40">Email</label>
              <input 
                type="email" 
                id="email"
                className="w-full bg-transparent border-b border-black/20 py-2 text-black placeholder:text-black/30 focus:border-black outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-black/40">Message</label>
            <textarea 
              id="message"
              rows={4}
              className="w-full bg-transparent border-b border-black/20 py-2 text-black placeholder:text-black/30 focus:border-black outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <div className="text-center pt-4">
            <button 
              type="submit"
              className="px-8 py-3 bg-black text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black/80 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-8">
           {["Instagram", "LinkedIn", "Behance"].map((social) => (
             <a key={social} href="#" className="text-sm font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">
               {social}
             </a>
           ))}
        </div>
        
        <div className="mt-32 text-xs text-black/20 uppercase tracking-widest">
          © 2024 Tutuloutre. All rights reserved.
        </div>
      </div>
    </div>
  )
}
