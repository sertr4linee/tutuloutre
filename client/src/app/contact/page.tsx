"use client"

import { useState } from "react"
import Image from "next/image"
import GradientBackground from "@/components/ui/background"

type ContactTab = 'form' | 'social' | 'info'

export default function Contact() {
  const [activeTab, setActiveTab] = useState<ContactTab>('form')
  const [isHovering, setIsHovering] = useState(false)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })
  const [isSuccess, setIsSuccess] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simuler l'envoi du formulaire
    setIsSuccess(true)
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      
      <div className="relative z-30 flex items-center justify-center min-h-screen py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4">
        <div className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[4px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto">
          {/* Coins décoratifs */}
          <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
            <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
          </div>
          
          {/* Contenu */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Titre de la page */}
            <div className="mb-8 sm:mb-12">
              <div className="relative">
                <div className="absolute -top-6 sm:-top-8 left-1 sm:left-2">
                  <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap">
                    Say hello!
                  </div>
                </div>
                <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter font-family-clash">
                  Let&apos;s Connect
                </h1>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 font-normal text-[#3C3C3C] max-w-xl leading-tight">
                Have a project in mind? I&apos;d love to hear about it!
              </p>
            </div>

            {/* Onglets */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(['form', 'social', 'info'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tab === 'form' && 'Contact Form'}
                  {tab === 'social' && 'Social Media'}
                  {tab === 'info' && 'Contact Info'}
                </button>
              ))}
            </div>

            {/* Contenu des onglets */}
            <div className="mt-6">
              {activeTab === 'form' && (
                <div className="bg-white border-4 border-black rounded-xl p-4 sm:p-6 md:p-8 relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 translate-x-2 translate-y-2 rounded-xl -z-10"></div>

                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="w-20 h-20 bg-[#f67a45] rounded-full flex items-center justify-center mb-4 border-2 border-black">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">Message Sent!</h3>
                      <p className="text-[#3C3C3C]">Thanks for reaching out. I&apos;ll get back to you soon!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input
                            type="text"
                            className="w-full p-3 border-2 border-black rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            className="w-full p-3 border-2 border-black rounded"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Subject</label>
                        <input
                          type="text"
                          className="w-full p-3 border-2 border-black rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                          className="w-full p-3 border-2 border-black rounded h-32"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'social' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: "Instagram", icon: "/icons/instagram.svg", color: "#E1306C", username: "@une_mome" },
                    { name: "Twitter", icon: "/icons/twitter.svg", color: "#1DA1F2", username: "@une_mome" },
                    { name: "Dribbble", icon: "/icons/dribbble.svg", color: "#EA4C89", username: "maelle" },
                    { name: "LinkedIn", icon: "/icons/linkedin.svg", color: "#0077B5", username: "maelle-crescence" },
                    { name: "Behance", icon: "/icons/behance.svg", color: "#1769FF", username: "maellecrescence" },
                    { name: "Pinterest", icon: "/icons/pinterest.svg", color: "#E60023", username: "une_mome" },
                  ].map((social, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      onMouseMove={handleMouseMove}
                    >
                      <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl"></div>
                      <div className="relative border-3 border-black rounded-xl p-4 flex flex-col items-center text-center bg-white">
                        <div
                          className="absolute inset-0 transition-opacity rounded-xl"
                          style={{
                            background: `radial-gradient(circle at ${hoverPosition.x}px ${hoverPosition.y}px, ${social.color}, transparent 70%)`,
                            opacity: isHovering ? 0.15 : 0,
                          }}
                        ></div>
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                          style={{ backgroundColor: `${social.color}20` }}
                        >
                          <Image
                            src={social.icon}
                            alt={social.name}
                            width={24}
                            height={24}
                          />
                        </div>
                        <h3 className="font-bold text-lg">{social.name}</h3>
                        <p className="text-sm text-[#3C3C3C] mt-1">{social.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'info' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <ContactInfoCard
                      icon="mail"
                      title="Email"
                      content="hello@maellecrescence.com"
                    />
                    <ContactInfoCard
                      icon="phone"
                      title="Phone"
                      content="+33 6 12 34 56 78"
                    />
                    <ContactInfoCard
                      icon="location"
                      title="Location"
                      content="Paris, France"
                    />
                    <ContactInfoCard
                      icon="clock"
                      title="Working Hours"
                      content="Monday - Friday: 9am - 6pm"
                    />
                  </div>
                  
                  {/* Carte interactive */}
                  <div className="relative h-[400px]">
                    <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl"></div>
                    <div className="relative border-4 border-black rounded-xl overflow-hidden h-full">
                      <Image
                        src="/map.png"
                        alt="Location map"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function ContactInfoCard({ icon, title, content }: { icon: string; title: string; content: string }) {
  return (
    <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative">
      <h3 className="font-bold text-lg text-[#2D2D2D] mb-2 flex items-center">
        <Image
          src={`/icons/${icon}.svg`}
          alt={title}
          width={20}
          height={20}
          className="mr-2"
        />
        {title}
      </h3>
      <p className="text-[#3C3C3C]">{content}</p>
    </div>
  )
}

