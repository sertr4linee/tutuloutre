"use client"

import type React from "react"

import GradientBackground from "@/components/ui/background"
import { useState } from "react"
import Link from "next/link"
import { SocialIcons } from "@/components/ui/social-icons"
import Image from "next/image"

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    subject: "Just saying hi!",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSuccess(false)
        setFormState({
          name: "",
          email: "",
          message: "",
          subject: "Just saying hi!",
        })
      }, 3000)
    }, 1500)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const socialLinks = [
    { 
      name: "Instagram", 
      icon: SocialIcons.instagram, 
      color: "#E1306C", 
      username: "@une_mome",
      href: "https://instagram.com/une_mome"
    },
    { 
      name: "Instagram", 
      icon: SocialIcons.instagram, 
      color: "#E1306C", 
      username: "@just_photography_06",
      href: "https://instagram.com/just_photography_06"
    },
    { 
      name: "LinkedIn", 
      icon: SocialIcons.linkedin, 
      color: "#0077B5", 
      username: "maelle-crescence",
      href: "https://www.linkedin.com/in/maelle-crescence-45b19b275/"
    },
    { 
      name: "Behance", 
      icon: SocialIcons.behance, 
      color: "#1769FF", 
      username: "maellecrescence",
      href: "https://behance.net/maellecrescence"
    },
    { 
      name: "Pinterest", 
      icon: SocialIcons.pinterest, 
      color: "#E60023", 
      username: "tutuloutre",
      href: "https://fr.pinterest.com/tutuloutre/"
    },
    { 
      name: "TikTok", 
      icon: SocialIcons.tiktok, 
      color: "#000000", 
      username: "tutuloutre",
      href: "https://tiktok.com/@tutuloutre"
    }
  ]

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <div
        className="fixed z-10 bottom-[10%] left-[8%] w-[60px] h-[60px] md:w-[100px] md:h-[100px] animate-bounce"
        style={{ animationDuration: "6s" }}
      >
        <img
          src="/stars.svg"
          alt=""
          className="w-full h-full"
          style={{ filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))" }}
        />
      </div>

      {/* Portfolio content with neobrutalism design */}
      <div className="relative z-30 flex items-center justify-center min-h-screen py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4">
        <div className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[4px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto">
          {/* Corner elements - L-shaped design - responsive sizes */}
          <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
            <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
          </div>

          {/* Top-right corner */}
          <div className="hidden sm:block absolute -top-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute top-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute top-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Bottom-left corner */}
          <div className="hidden sm:block absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Bottom-right corner */}
          <div className="hidden sm:block absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Content container with better responsive padding */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Navigation - improved mobile layout */}
            <nav className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#2D2D2D] mb-3 sm:mb-0">
                {/* Empty for now */}
              </div>

              {/* Mobile menu button - better positioning */}
              <button
                className="sm:hidden fixed top-4 right-4 p-2 z-50 bg-white/80 backdrop-blur-sm rounded-md border-2 border-black"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Navigation links - improved mobile menu */}
              <div
                className={`
                ${menuOpen ? "flex fixed inset-0 bg-white/95 z-40" : "hidden"} 
                sm:flex sm:relative sm:bg-transparent
                flex-col sm:flex-row 
                items-center justify-center sm:justify-start
                space-y-6 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8
                text-lg sm:text-base md:text-lg
                w-full sm:w-auto
              `}
              >
                <Link href="/about" className="hover:underline">
                  About
                </Link>
                <Link href="/work" className="hover:underline">
                  Work
                </Link>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
                <Link href="/contact" className="hover:underline font-medium">
                  Contact
                </Link>

                {/* Resume button - responsive sizing */}
                <div className="relative inline-block mt-4 sm:mt-0">
                  <div className="absolute top-[3px] left-[3px] w-full h-full bg-black rounded-md"></div>
                  <button className="relative bg-[#222] text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-md flex items-center justify-center text-sm sm:text-base font-medium">
                    Resume
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15L12 4M12 15L8 11M12 15L16 11M8 19H16C17.1046 19 18 18.1046 18 17V15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </nav>

            {/* Contact page content */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10">
              {/* Contact page title with decorative element */}
              <div className="mb-2 sm:mb-4">
                <div className="relative">
                  <div className="absolute -top-6 sm:-top-8 left-1 sm:left-2">
                    <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap">
                      Say hello!
                    </div>
                  </div>
                  <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter font-family-clash">
                    Let's Connect
                  </h1>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 font-normal text-[#3C3C3C] max-w-xl leading-tight">
                  Have a project in mind? I'd love to hear about it!
                </p>
              </div>

              {/* Interactive contact tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`px-4 py-2 border-2 border-black rounded-full text-sm font-medium transition-all ${
                    activeTab === "form"
                      ? "bg-[#f67a45] text-white transform -translate-y-1"
                      : "bg-white hover:bg-[#FFE8DD]"
                  }`}
                >
                  Send a Message
                </button>
                <button
                  onClick={() => setActiveTab("socials")}
                  className={`px-4 py-2 border-2 border-black rounded-full text-sm font-medium transition-all ${
                    activeTab === "socials"
                      ? "bg-[#f67a45] text-white transform -translate-y-1"
                      : "bg-white hover:bg-[#FFE8DD]"
                  }`}
                >
                  Social Media
                </button>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`px-4 py-2 border-2 border-black rounded-full text-sm font-medium transition-all ${
                    activeTab === "info"
                      ? "bg-[#f67a45] text-white transform -translate-y-1"
                      : "bg-white hover:bg-[#FFE8DD]"
                  }`}
                >
                  Contact Info
                </button>
              </div>

              {/* Tab content container */}
              <div className="relative">
                {/* Interactive form tab */}
                {activeTab === "form" && (
                  <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-[80px] h-[80px] opacity-50 hidden md:block">
                      <img
                        src="/stars.svg"
                        alt=""
                        className="w-full h-full animate-spin-slow"
                        style={{
                          filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9))",
                          animationDuration: "15s",
                        }}
                      />
                    </div>

                    {/* Interactive form with neobrutalism style */}
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
                          <p className="text-[#3C3C3C]">Thanks for reaching out. I'll get back to you soon!</p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-[#2D2D2D] mb-1">
                                Your Name
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={formState.name}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#f67a45] focus:outline-none transition-all"
                                  placeholder="Jane Doe"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-[#2D2D2D] mb-1">
                                Your Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#f67a45] focus:outline-none transition-all"
                                placeholder="jane@example.com"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-[#2D2D2D] mb-1">
                              Subject
                            </label>
                            <select
                              id="subject"
                              name="subject"
                              value={formState.subject}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#f67a45] focus:outline-none transition-all appearance-none bg-white"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 1rem center",
                                backgroundSize: "1.5em 1.5em",
                              }}
                            >
                              <option value="Just saying hi!">Just saying hi!</option>
                              <option value="Project inquiry">Project inquiry</option>
                              <option value="Collaboration">Collaboration</option>
                              <option value="Job opportunity">Job opportunity</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-[#2D2D2D] mb-1">
                              Your Message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formState.message}
                              onChange={handleInputChange}
                              required
                              rows={5}
                              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#f67a45] focus:outline-none transition-all resize-none"
                              placeholder="Tell me about your project..."
                            ></textarea>
                          </div>

                          <div className="pt-2">
                            <button type="submit" disabled={isSubmitting} className="relative group">
                              <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 rounded-lg transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                              <div
                                className={`relative px-6 py-3 bg-[#f67a45] text-white font-bold rounded-lg border-2 border-black flex items-center ${isSubmitting ? "opacity-80" : ""}`}
                              >
                                {isSubmitting ? (
                                  <>
                                    <svg
                                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Sending...
                                  </>
                                ) : (
                                  <>
                                    Send Message
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      />
                                    </svg>
                                  </>
                                )}
                              </div>
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                )}

                {/* Social media tab with interactive cards */}
                {activeTab === "socials" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onMouseMove={handleMouseMove as any}
                      >
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                        <div className="relative border-3 border-black rounded-xl p-4 flex flex-col items-center text-center transition-all bg-white overflow-hidden group-hover:-translate-y-1">
                          {/* Hover effect */}
                          <div
                            className="absolute inset-0 transition-opacity group-hover:opacity-10 rounded-xl"
                            style={{
                              background: `radial-gradient(circle at ${hoverPosition.x}px ${hoverPosition.y}px, ${social.color}, transparent 70%)`,
                              opacity: isHovering ? 0.15 : 0,
                            }}
                          ></div>

                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-3 relative overflow-hidden border-2 border-black"
                            style={{ backgroundColor: `${social.color}20` }}
                          >
                            {/* Image de fond */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent z-10"></div>
                            
                            {/* Icône SVG en superposition */}
                            <div className="relative z-20">
                              <social.icon className="w-6 h-6" style={{ color: social.color }} />
                            </div>
                            
                            {/* Pattern en arrière-plan */}
                            <div 
                              className="absolute inset-0 opacity-10" 
                              style={{
                                backgroundImage: `radial-gradient(${social.color} 1px, transparent 1px)`,
                                backgroundSize: '4px 4px'
                              }}
                            ></div>
                          </div>
                          <h3 className="font-bold text-lg">{social.name}</h3>
                          <p className="text-sm text-[#3C3C3C] mt-1">{social.username}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {/* Contact info tab with interactive map */}
                {activeTab === "info" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative">
                        <h3 className="font-bold text-lg text-[#2D2D2D] mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Email
                        </h3>
                        <p className="text-[#3C3C3C]">hello@maellecrescence.com</p>
                      </div>

                      {/* <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative">
                        <h3 className="font-bold text-lg text-[#2D2D2D] mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          Phone
                        </h3>
                        <p className="text-[#3C3C3C]">+33 6 12 34 56 78</p>
                      </div> */}

                      <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative">
                        <h3 className="font-bold text-lg text-[#2D2D2D] mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Location
                        </h3>
                        <p className="text-[#3C3C3C]">Nice, France</p>
                      </div>

                      <div className="bg-[#FFE8DD] border-2 border-black p-4 rounded-lg relative">
                        <h3 className="font-bold text-lg text-[#2D2D2D] mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Working Hours
                        </h3>
                        <p className="text-[#3C3C3C]">Very flexible</p>
                      </div>
                    </div>

                    {/* Interactive map with neobrutalism style */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl"></div>
                      <div className="relative border-4 border-black rounded-xl overflow-hidden h-[300px] md:h-full">
                        {/* Placeholder for map - in a real implementation, you'd use a map component */}
                        <div className="w-full h-full bg-[#FFE8DD] flex items-center justify-center relative">
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.7) 1.5px, transparent 1.5px)`,
                              backgroundSize: "25px 25px",
                              backgroundPosition: "0 0",
                            }}

                          >
                          </div>
                          <Image src="/map.png" alt="Map" fill className="object-cover" />

                          {/* Stylized map pin */}
                          {/* <div className="relative">
                            <div
                              className="w-16 h-16 bg-[#f67a45] rounded-full flex items-center justify-center border-4 border-black animate-bounce"
                              style={{ animationDuration: "2s" }}
                            >
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* FAQ Section */}
              <div className="mt-12 sm:mt-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-6">Frequently Asked Questions</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      question: "What is your typical process?",
                      answer:
                        "My process typically includes discovery, research, ideation, design, and implementation phases. I believe in collaborative work and keeping clients involved throughout.",
                    },
                    {
                      question: "How long does a project take?",
                      answer:
                        "Project timelines vary based on scope and complexity. A simple branding project might take 2-3 weeks, while a comprehensive website could take 1-2 months.",
                    },
                    {
                      question: "Do you work with clients internationally?",
                      answer:
                        "I work with clients worldwide. Modern tools make remote collaboration seamless and effective.",
                    },
                    {
                      question: "What are your payment terms?",
                      answer:
                        "I typically require a 50% deposit to begin work, with the remaining 50% due upon project completion. For larger projects, we can arrange milestone payments.",
                    },
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-black p-4 rounded-lg relative group hover:bg-[#FFE8DD] transition-colors"
                    >
                      <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{faq.question}</h3>
                      <p className="text-sm text-[#3C3C3C]">{faq.answer}</p>
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-black flex items-center justify-center bg-[#f67a45] text-white font-bold">
                        ?
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

