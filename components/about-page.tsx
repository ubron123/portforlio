"use client"

import { useEffect, useState } from "react"

type AboutPageProps = {
  isOpen: boolean
  onClose: () => void
}

export function AboutPage({ isOpen, onClose }: AboutPageProps) {
  const [currentTime, setCurrentTime] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      const ampm = hours >= 12 ? "PM" : "AM"
      const displayHours = hours % 12 || 12
      setCurrentTime(`${displayHours}:${minutes}:${seconds} ${ampm}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle scroll progress
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Full page background with blue gradient */}
      <div 
        className="min-h-screen w-full relative"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d2847 25%, #1a4a7a 50%, #2d6ba3 75%, #3d7eb8 100%)",
        }}
      >
        {/* Subtle overlay for depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 70% 60%, rgba(58, 194, 255, 0.15) 0%, transparent 60%)",
          }}
        />

        {/* Top Navigation - Fixed */}
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center gap-12 px-6 md:px-12 py-6">
          {/* Contact */}
          <button className="text-white text-xs tracking-[0.2em] uppercase hover:text-white/70 transition-colors">
            CONTACT
          </button>
          
          {/* Time */}
          <span className="text-white/70 text-xs tracking-wider">
            {currentTime}
          </span>
        </header>

        {/* Main Content */}
        <div className="relative min-h-screen flex flex-col">
          {/* Hero Section */}
          <div className="flex-1 relative">
            {/* Large About Title - Top Left */}
            <h1 className="absolute top-16 left-6 md:left-12 text-white text-[15vw] md:text-[12vw] lg:text-[10vw] font-normal leading-none tracking-tight z-20">
              About
            </h1>

            {/* Full height layout */}
            <div className="min-h-screen flex items-end md:items-center">
              {/* Image - Large, positioned left/center */}
              <div className="absolute bottom-0 left-0 md:left-0 w-[100%] md:w-[75%] lg:w-[70%] h-[90vh] md:h-[120vh] z-10">
                <div className="relative w-full h-full">
                  {/* Profile Image */}
                  <img 
                    src="/11.png" 
                    alt="Norbu Tshering"
                    className="w-full h-full object-contain object-bottom"
                  />
                  {/* Subtle glow behind image */}
                  <div 
                    className="absolute inset-0 -z-10 blur-3xl opacity-40"
                    style={{
                      background: "radial-gradient(circle at 50% 70%, rgba(58, 194, 255, 0.5) 0%, transparent 60%)",
                    }}
                  />
                </div>
              </div>

              {/* Bio Text - Right side, vertically centered */}
              <div className="relative z-20 ml-auto w-full md:w-[45%] lg:w-[40%] px-6 md:px-12 pb-32 md:pb-0 pt-[50vh] md:pt-0 flex flex-col justify-center min-h-screen md:min-h-0">
                {/* INTRO Label */}
                <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6">
                  INTRO
                </p>

                {/* Bio Paragraphs */}
                <div className="space-y-6">
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    {"I'm Norbu Tshering, a creative full-stack product engineer focused on the intersection of design and technology. Through my work, I explore how thoughtful aesthetics and solid functionality can come together to shape intuitive, meaningful digital experiences."}
                  </p>
                  <p className="text-white/80 text-base md:text-lg leading-relaxed">
                    Driven by curiosity and a mindset of continuous growth, I craft modern, minimalist, and user-centered solutions that balance visual clarity with technical precision.
                  </p>
                </div>
              </div>
            </div>

            {/* Left side INTRO label - positioned absolutely, scrolls with content */}
            <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-30">
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase"
                 style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                INTRO
              </p>
            </div>

            {/* Right side scroll progress - scrolls with content */}
            <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-30">
              <p className="text-white/40 text-xs tracking-wider">
                {scrollProgress} %
              </p>
            </div>
          </div>

          {/* Bottom Navigation Pill */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10">
              <button 
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Go back"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-white text-xs tracking-[0.2em] uppercase px-4">
                INTRO
              </span>
              <button 
                className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Next section"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Close button - top right */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-50 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors md:hidden"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
