"use client"

import { useEffect, useRef, useState, useCallback } from "react"

type AboutSectionProps = {
  sectionGradient: string
}

export function AboutSection({ sectionGradient }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState<"whoami" | "certifications">("whoami")
  const [shootingStarActive, setShootingStarActive] = useState(false)
  const [canScrollPage, setCanScrollPage] = useState(false)
  const isAnimating = useRef(false)
  const scrollCount = useRef(0)
  const lastScrollTime = useRef(0)
  const scrollsNeeded = 2

  // Shooting star animation - runs after 4 seconds, then loops every 30 seconds
  useEffect(() => {
    const runShootingStar = () => {
      setShootingStarActive(true)
      // Animation takes about 4 seconds
      setTimeout(() => {
        setShootingStarActive(false)
      }, 4500)
    }

    // First run after 4 seconds
    const initialTimeout = setTimeout(runShootingStar, 4000)
    
    // Then loop every 30 seconds
    const interval = setInterval(runShootingStar, 30000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!sectionRef.current || isAnimating.current) return

    const section = sectionRef.current
    const rect = section.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Check if the sticky inner content is visible
    const stickyVisible = rect.top <= 50 && rect.bottom > viewportHeight + 50

    if (!stickyVisible) {
      scrollCount.current = 0
      return
    }

    const now = Date.now()
    // Reset scroll count if more than 500ms since last scroll
    if (now - lastScrollTime.current > 500) {
      scrollCount.current = 0
    }
    lastScrollTime.current = now

    // Only count significant scroll gestures
    if (Math.abs(e.deltaY) < 10) return

    // Scrolling DOWN while on "whoami" slide - MUST go to certifications first
    if (e.deltaY > 0 && activeSlide === "whoami") {
      e.preventDefault()
      e.stopPropagation()
      
      scrollCount.current += 1
      
      if (scrollCount.current >= scrollsNeeded) {
        isAnimating.current = true
        setActiveSlide("certifications")
        setCanScrollPage(false)
        scrollCount.current = 0
        setTimeout(() => {
          isAnimating.current = false
        }, 700)
      }
      return
    }

    // Scrolling DOWN while on "certifications" slide - need 2 more scrolls to allow page scroll
    if (e.deltaY > 0 && activeSlide === "certifications") {
      if (!canScrollPage) {
        e.preventDefault()
        e.stopPropagation()
        
        scrollCount.current += 1
        
        if (scrollCount.current >= scrollsNeeded) {
          setCanScrollPage(true)
          scrollCount.current = 0
        }
        return
      }
      // canScrollPage is true, allow natural page scroll
      return
    }

    // Scrolling UP while on "certifications" slide
    if (e.deltaY < 0 && activeSlide === "certifications") {
      // If we had enabled page scroll, first disable it
      if (canScrollPage) {
        e.preventDefault()
        e.stopPropagation()
        setCanScrollPage(false)
        scrollCount.current = 0
        return
      }
      
      e.preventDefault()
      e.stopPropagation()
      
      scrollCount.current += 1
      
      if (scrollCount.current >= scrollsNeeded) {
        isAnimating.current = true
        setActiveSlide("whoami")
        scrollCount.current = 0
        setTimeout(() => {
          isAnimating.current = false
        }, 700)
      }
      return
    }

    // Scrolling UP while on "whoami" slide - allow page scroll (to go back up)
    if (e.deltaY < 0 && activeSlide === "whoami") {
      // Allow natural page scroll
      return
    }
  }, [activeSlide, canScrollPage])

  // Reset slide when scrolling back above section
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // If we've scrolled past the section going up, reset to whoami
    if (rect.top > viewportHeight * 0.3 && activeSlide === "certifications") {
      setActiveSlide("whoami")
      setCanScrollPage(false)
      scrollCount.current = 0
    }
  }, [activeSlide])

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleWheel, handleScroll])

  return (
    <section
      ref={sectionRef}
      className="relative bg-black min-h-[200vh] pt-32"
    >
      {/* Reflection gradient from projects */}
      <div
        className="absolute inset-x-0 top-0 h-64 opacity-40"
        style={{
          background: `linear-gradient(to bottom, ${sectionGradient.includes("linear-gradient") ? "#6b7a94" : sectionGradient} 0%, transparent 100%)`,
        }}
        aria-hidden
      />
      
      {/* Blurred reflection effect */}
      <div
        className="absolute inset-x-0 top-0 h-80 blur-3xl opacity-30"
        style={{
          background: sectionGradient,
        }}
        aria-hidden
      />

      {/* Sticky container - fills viewport when in view */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Central vertical blue line - continuous from top to bottom */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10">
          <div className="h-full w-full bg-cyan-500/70" />
        </div>

        {/* Shooting star animation - head first (at top), sharp tail trailing behind */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-500 ${
            shootingStarActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            animation: shootingStarActive ? 'shootingStar 4s ease-in-out forwards' : 'none',
          }}
        >
          {/* Shooting star - flipped: sharp tail on TOP, large head at BOTTOM (head leads when moving down) */}
          <div className="relative flex flex-col items-center">
            {/* Sharp triangular tail pointing UP (trails behind the head) */}
            <svg 
              width="12" 
              height="50" 
              viewBox="0 0 12 50"
              fill="none"
            >
              <defs>
                <linearGradient id="tailGradient" x1="6" y1="0" x2="6" y2="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                  <stop offset="60%" stopColor="rgba(34,211,238,0.5)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0.9)" />
                </linearGradient>
                <linearGradient id="innerTailGradient" x1="6" y1="0" x2="6" y2="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                  <stop offset="50%" stopColor="rgba(34,211,238,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
                </linearGradient>
              </defs>
              {/* Outer tail - sharp point at top, wider at bottom connecting to head */}
              <path d="M6 0 L11 50 L1 50 Z" fill="url(#tailGradient)" />
              {/* Inner bright core */}
              <path d="M6 15 L8 50 L4 50 Z" fill="url(#innerTailGradient)" />
            </svg>
            
            {/* Outer glow around head */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-cyan-400/30 blur-lg rounded-full" />
            
            {/* Bright head - glowing orb at bottom (leads the movement) */}
            <div className="relative z-10 mt-[-4px]">
              <div className="absolute -inset-1.5 bg-white/50 blur-md rounded-full" />
              <div className="absolute -inset-1 bg-cyan-300/70 blur-sm rounded-full" />
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_white,0_0_24px_rgba(34,211,238,1),0_0_36px_rgba(34,211,238,0.6)]" />
            </div>
          </div>
        </div>

        {/* CSS Animation for shooting star - slow graceful movement */}
        <style jsx>{`
          @keyframes shootingStar {
            0% {
              top: -10%;
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }
        `}</style>

        {/* Main content grid - left side is STATIC, stays vertically centered */}
        <div className="relative h-full w-full flex items-center">
          <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
              
              {/* LEFT SIDE - Always visible, static content, vertically centered */}
              <div className="space-y-6 md:pr-8 flex flex-col justify-center">
                <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase">
                  A Snapshot of Me
                </p>
                <h2 className="text-white text-lg md:text-xl lg:text-2xl font-bold leading-tight">
                  Transform Scattered Interfaces,
                  <br />
                  <span className="text-white/90">Into Scalable Product Systems.</span>
                </h2>
                <p className="text-white/60 text-sm leading-relaxed max-w-md">
                  Creative, analytical, and driven. I specialize in
                  blending design aesthetics with technical
                  functionality.
                </p>
                <div className="flex items-center gap-6 pt-4">
                  <a
                    href="#whoami"
                    className={`text-sm transition-colors duration-300 flex items-center gap-2 ${
                      activeSlide === "whoami" 
                        ? "text-cyan-400 font-bold" 
                        : "text-white/50 hover:text-white/70"
                    }`}
                  >
                    <span className={activeSlide === "whoami" ? "text-cyan-400" : "text-white/30"}>{">"}</span> Who am I
                  </a>
                  <a
                    href="#certifications"
                    className={`text-sm transition-colors duration-300 flex items-center gap-2 ${
                      activeSlide === "certifications" 
                        ? "text-cyan-400 font-bold" 
                        : "text-white/50 hover:text-white/70"
                    }`}
                  >
                    <span className={activeSlide === "certifications" ? "text-cyan-400" : "text-white/30"}>{">"}</span> My Certifications
                  </a>
                </div>
              </div>

              {/* RIGHT SIDE - Sliding content area, also vertically centered */}
              <div className="relative md:pl-8 h-[400px] overflow-hidden flex items-center">
                {/* WHO AM I Content */}
                <div
                  className={`absolute inset-0 flex items-center transition-all duration-700 ease-out ${
                    activeSlide === "whoami"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-full pointer-events-none"
                  }`}
                >
                  <div className="space-y-8 w-full">
                    <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-bold">
                      Who Am I
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-baseline gap-4">
                        <span className="text-cyan-400 text-5xl md:text-6xl font-bold">03+</span>
                        <span className="text-white/60 text-sm leading-tight">
                          Experience
                        </span>
                      </div>
                      <div className="flex items-baseline gap-4">
                        <span className="text-cyan-400 text-5xl md:text-6xl font-bold">04+</span>
                        <span className="text-white/60 text-sm leading-tight">
                          Clients Across
                          <br />
                          Nation
                        </span>
                      </div>
                      <div className="flex items-baseline gap-4">
                        <span className="text-cyan-400 text-5xl md:text-6xl font-bold">06+</span>
                        <span className="text-white/60 text-sm leading-tight">
                          SaaS Projects
                          <br />
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CERTIFICATIONS Content */}
                <div
                  className={`absolute inset-0 flex items-center transition-all duration-700 ease-out ${
                    activeSlide === "certifications"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-full pointer-events-none"
                  }`}
                >
                  <div className="space-y-6 w-full">
                    <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-bold">
                      My Certifications
                    </p>
                    
                    {/* Certificate Cards */}
                    <div className="space-y-3">
                      {/* Google Certificate */}
                      <div className="group flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                        <div className="w-16 h-12 bg-gradient-to-br from-amber-100 to-amber-50 rounded flex items-center justify-center shrink-0">
                          <span className="text-amber-700 text-[10px] font-serif">Certificate</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Google Certification</p>
                          <p className="text-white/50 text-xs">UX Design Professional</p>
                        </div>
                      </div>

                      {/* React Certificate */}
                      <div className="group flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                        <div className="w-16 h-12 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded flex items-center justify-center shrink-0">
                          <span className="text-cyan-700 text-[10px] font-serif">Certificate</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">React Development</p>
                          <p className="text-white/50 text-xs">Advanced Frontend</p>
                        </div>
                      </div>

                      {/* Coursera Certificate */}
                      <div className="group flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                        <div className="w-16 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded flex items-center justify-center shrink-0">
                          <span className="text-blue-700 text-[10px] font-serif">Certificate</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Coursera</p>
                          <p className="text-white/50 text-xs">Full Stack Development</p>
                        </div>
                      </div>

                      {/* Udemy Certificate */}
                      <div className="group flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                        <div className="w-16 h-12 bg-gradient-to-br from-violet-100 to-violet-50 rounded flex items-center justify-center shrink-0">
                          <span className="text-violet-700 text-[10px] font-serif">Certificate</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Udemy</p>
                          <p className="text-white/50 text-xs">Web Development Bootcamp</p>
                        </div>
                      </div>
                    </div>

                    {/* Certification Labels */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/40">
                      <span>GOOGLE</span>
                      <span className="text-cyan-500">|</span>
                      <span>REACT</span>
                      <span className="text-cyan-500">|</span>
                      <span>COURSERA</span>
                      <span className="text-cyan-500">|</span>
                      <span>UDEMY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
