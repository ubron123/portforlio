"use client"

import { useEffect, useRef, useState, useCallback } from "react"

type AboutSectionProps = {
  sectionGradient: string
}

export function AboutSection({ sectionGradient }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState<"whoami" | "certifications">("whoami")
  const [isLocked, setIsLocked] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isTransitioning = useRef(false)
  const lastScrollY = useRef(0)

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isTransitioning.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Check if section is in view
    const sectionTop = rect.top
    const sectionBottom = rect.bottom

    // When section top reaches viewport top, lock scrolling
    if (sectionTop <= 0 && sectionBottom >= viewportHeight) {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY.current
      lastScrollY.current = currentScrollY

      if (!isLocked) {
        setIsLocked(true)
      }

      // Calculate progress based on scroll within the locked section
      const progress = Math.min(1, Math.max(0, -sectionTop / viewportHeight))
      setScrollProgress(progress)

      // Determine which slide should be active based on scroll direction and progress
      if (scrollDelta > 0 && activeSlide === "whoami" && progress > 0.3) {
        // Scrolling down, switch to certifications
        isTransitioning.current = true
        setActiveSlide("certifications")
        setTimeout(() => {
          isTransitioning.current = false
        }, 500)
      } else if (scrollDelta < 0 && activeSlide === "certifications" && progress < 0.7) {
        // Scrolling up, switch back to whoami
        isTransitioning.current = true
        setActiveSlide("whoami")
        setTimeout(() => {
          isTransitioning.current = false
        }, 500)
      }
    } else {
      if (isLocked) {
        setIsLocked(false)
      }
      // Reset to whoami when scrolling back up past the section
      if (sectionTop > 0 && activeSlide === "certifications") {
        setActiveSlide("whoami")
      }
    }
  }, [isLocked, activeSlide])

  useEffect(() => {
    lastScrollY.current = window.scrollY
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <section
      ref={containerRef}
      className="relative bg-black min-h-[200vh]"
    >
      {/* Reflection gradient from projects */}
      <div
        className="absolute inset-x-0 top-0 h-48 opacity-40"
        style={{
          background: `linear-gradient(to bottom, ${sectionGradient.includes("linear-gradient") ? "#6b7a94" : sectionGradient} 0%, transparent 100%)`,
        }}
        aria-hidden
      />
      
      {/* Blurred reflection effect */}
      <div
        className="absolute inset-x-0 top-0 h-64 blur-3xl opacity-30"
        style={{
          background: sectionGradient,
        }}
        aria-hidden
      />

      {/* Sticky container for scroll-within-scroll effect */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Central vertical blue line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10">
          <div className="h-full w-full bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/50" />
        </div>

        {/* Blue dot marker on timeline */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
        </div>

        {/* Content wrapper with slide transitions */}
        <div className="relative h-full w-full">
          {/* WHO AM I Slide */}
          <div
            className={`absolute inset-0 flex items-center transition-all duration-700 ease-out ${
              activeSlide === "whoami"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-20 pointer-events-none"
            }`}
          >
            <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
                {/* Left Side - About Text */}
                <div className="space-y-6">
                  <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase">
                    A Snapshot of Me
                  </p>
                  <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                    Transform Scattered Interfaces,
                    <br />
                    <span className="text-white/90">Into Scalable Product Systems.</span>
                  </h2>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                    Creative, analytical, and driven. I specialize in
                    <br />
                    blending design aesthetics with technical
                    <br />
                    functionality.
                  </p>
                  <div className="flex items-center gap-6 pt-4">
                    <a
                      href="#whoami"
                      className="text-sm transition-colors flex items-center gap-2 text-cyan-400 font-bold"
                    >
                      <span className="text-cyan-400">{">"}</span> Who am I
                    </a>
                    <a
                      href="#certifications"
                      className="text-sm transition-colors flex items-center gap-2 text-white/70 hover:text-cyan-400"
                    >
                      <span className="text-cyan-400">{">"}</span> My Certifications
                    </a>
                  </div>
                </div>

                {/* Right Side - Stats */}
                <div className="space-y-8 md:pl-12">
                  <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-bold">
                    Who Am I
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-end gap-4">
                      <span className="text-cyan-400 text-5xl md:text-6xl font-bold">03+</span>
                      <span className="text-white/60 text-sm pb-2 leading-tight">
                        Experience
                      </span>
                    </div>
                    <div className="flex items-end gap-4">
                      <span className="text-cyan-400 text-5xl md:text-6xl font-bold">04+</span>
                      <span className="text-white/60 text-sm pb-2 leading-tight">
                        Clients Across
                        <br />
                        Nation
                      </span>
                    </div>
                    <div className="flex items-end gap-4">
                      <span className="text-cyan-400 text-5xl md:text-6xl font-bold">06+</span>
                      <span className="text-white/60 text-sm pb-2 leading-tight">
                        SaaS Projects
                        <br />
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CERTIFICATIONS Slide */}
          <div
            className={`absolute inset-0 flex items-center transition-all duration-700 ease-out ${
              activeSlide === "certifications"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20 pointer-events-none"
            }`}
          >
            <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
                {/* Left Side - About Text */}
                <div className="space-y-6">
                  <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase">
                    A Snapshot of Me
                  </p>
                  <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                    Transform Scattered Interfaces,
                    <br />
                    <span className="text-white/90">Into Scalable Product Systems.</span>
                  </h2>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                    Creative, analytical, and driven. I specialize in
                    <br />
                    blending design aesthetics with technical
                    <br />
                    functionality.
                  </p>
                  <div className="flex items-center gap-6 pt-4">
                    <a
                      href="#whoami"
                      className="text-sm transition-colors flex items-center gap-2 text-white/70 hover:text-cyan-400"
                    >
                      <span className="text-cyan-400">{">"}</span> Who am I
                    </a>
                    <a
                      href="#certifications"
                      className="text-sm transition-colors flex items-center gap-2 text-cyan-400 font-bold"
                    >
                      <span className="text-cyan-400">{">"}</span> My Certifications
                    </a>
                  </div>
                </div>

                {/* Right Side - Certificates */}
                <div className="space-y-6 md:pl-12">
                  <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-bold">
                    My Certifications
                  </p>
                  
                  {/* Certificate Cards */}
                  <div className="space-y-4">
                    {/* Google Certificate */}
                    <div className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 p-3 hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded flex items-center justify-center shrink-0">
                          <div className="text-amber-700 text-xs font-serif">Certificate</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">Google Certification</p>
                          <p className="text-white/50 text-xs">UX Design Professional</p>
                        </div>
                      </div>
                    </div>

                    {/* React Certificate */}
                    <div className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 p-3 hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-16 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded flex items-center justify-center shrink-0">
                          <div className="text-cyan-700 text-xs font-serif">Certificate</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">React Development</p>
                          <p className="text-white/50 text-xs">Advanced Frontend</p>
                        </div>
                      </div>
                    </div>

                    {/* Coursera Certificate */}
                    <div className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 p-3 hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded flex items-center justify-center shrink-0">
                          <div className="text-blue-700 text-xs font-serif">Certificate</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">Coursera</p>
                          <p className="text-white/50 text-xs">Full Stack Development</p>
                        </div>
                      </div>
                    </div>

                    {/* Udemy Certificate */}
                    <div className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 p-3 hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded flex items-center justify-center shrink-0">
                          <div className="text-purple-700 text-xs font-serif">Certificate</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">Udemy</p>
                          <p className="text-white/50 text-xs">Web Development Bootcamp</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certification Labels */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-white/40">
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs">
          <span>{activeSlide === "whoami" ? "Scroll to see certifications" : "Scroll to continue"}</span>
          <div className="w-px h-6 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
