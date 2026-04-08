"use client"

import { useEffect, useRef, useState, useCallback } from "react"

type AboutSectionProps = {
  sectionGradient: string
}

export function AboutSection({ sectionGradient }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState<"whoami" | "certifications">("whoami")
  const [wormProgress, setWormProgress] = useState(0) // 0 = top, 100 = bottom
  const isAnimating = useRef(false)
  const scrollCount = useRef(0)
  const lastScrollTime = useRef(0)
  const scrollsNeeded = 2 // Number of scroll gestures needed to change slide

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

    // Scrolling DOWN while on "whoami" slide
    if (e.deltaY > 0 && activeSlide === "whoami") {
      e.preventDefault()
      e.stopPropagation()
      
      scrollCount.current += 1
      
      if (scrollCount.current >= scrollsNeeded) {
        isAnimating.current = true
        setActiveSlide("certifications")
        setWormProgress(100) // Move worm to bottom
        scrollCount.current = 0
        setTimeout(() => {
          isAnimating.current = false
        }, 700)
      }
      return
    }

    // Scrolling UP while on "certifications" slide
    if (e.deltaY < 0 && activeSlide === "certifications") {
      e.preventDefault()
      e.stopPropagation()
      
      scrollCount.current += 1
      
      if (scrollCount.current >= scrollsNeeded) {
        isAnimating.current = true
        setActiveSlide("whoami")
        setWormProgress(0) // Move worm to top
        scrollCount.current = 0
        setTimeout(() => {
          isAnimating.current = false
        }, 700)
      }
      return
    }

    // On whoami scrolling up OR on certifications scrolling down - allow page scroll
  }, [activeSlide])

  // Reset slide when scrolling back above section
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // If we've scrolled past the section going up, reset to whoami
    if (rect.top > viewportHeight * 0.3 && activeSlide === "certifications") {
      setActiveSlide("whoami")
      setWormProgress(0)
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
      className="relative bg-black min-h-[200vh]"
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
      <div className="sticky top-0 h-screen overflow-hidden pt-32 md:pt-40">
        {/* Central vertical blue line - continuous from top to bottom */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10">
          <div className="h-full w-full bg-cyan-500/70" />
        </div>

        {/* Animated worm/capsule that moves along the line */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 z-30 transition-all duration-700 ease-out"
          style={{
            top: `${20 + (wormProgress * 0.5)}%`, // Moves from 20% to 70%
          }}
        >
          {/* Worm shape - elongated capsule with glow */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-cyan-400/30 blur-lg rounded-full" />
            {/* Main worm body */}
            <div className="w-2 h-12 rounded-full bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
            {/* Inner highlight */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-4 rounded-full bg-white/60" />
          </div>
        </div>

        {/* Main content grid - left side is STATIC */}
        <div className="relative h-full w-full flex items-start">
          <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
              
              {/* LEFT SIDE - Always visible, static content */}
              <div className="space-y-6 md:pr-8">
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

              {/* RIGHT SIDE - Sliding content area */}
              <div className="relative md:pl-8 h-[400px] overflow-hidden">
                {/* WHO AM I Content */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeSlide === "whoami"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-full pointer-events-none"
                  }`}
                >
                  <div className="space-y-8">
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
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeSlide === "certifications"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-full pointer-events-none"
                  }`}
                >
                  <div className="space-y-6">
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
