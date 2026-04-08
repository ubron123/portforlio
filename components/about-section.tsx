"use client"

import { useEffect, useRef, useState } from "react"

type AboutSectionProps = {
  sectionGradient: string
}

export function AboutSection({ sectionGradient }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Reflection gradient from projects - fades from project color to black */}
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

      {/* Central vertical blue line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10">
        <div className="h-full w-full bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
        {/* Top Section - Snapshot & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-24">
          {/* Left Side - About Text */}
          <div
            className={`space-y-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase">
              A Snapshot of Me
            </p>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
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
                href="#why"
                className="text-white/70 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span className="text-cyan-400">{">"}</span> Why am I
              </a>
              <a
                href="#certifications"
                className="text-white/70 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span className="text-cyan-400">{">"}</span> My Certifications
              </a>
            </div>
          </div>

          {/* Right Side - Stats */}
          <div
            className={`space-y-8 md:pl-12 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase text-right">
              Who Am I
            </p>
            <div className="space-y-6">
              <div className="flex items-end justify-end gap-4">
                <span className="text-cyan-400 text-5xl md:text-6xl font-light">03+</span>
                <span className="text-white/60 text-sm pb-2 text-right leading-tight">
                  Experience
                </span>
              </div>
              <div className="flex items-end justify-end gap-4">
                <span className="text-cyan-400 text-5xl md:text-6xl font-light">04+</span>
                <span className="text-white/60 text-sm pb-2 text-right leading-tight">
                  Clients Across
                  <br />
                  Nation
                </span>
              </div>
              <div className="flex items-end justify-end gap-4">
                <span className="text-cyan-400 text-5xl md:text-6xl font-light">06+</span>
                <span className="text-white/60 text-sm pb-2 text-right leading-tight">
                  SaaS Projects
                  <br />
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Blue dot marker on timeline */}
        <div className="absolute left-1/2 -translate-x-1/2 z-30" style={{ top: "calc(100% - 45vh)" }}>
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
        </div>

        {/* Certifications Section */}
        <div
          id="certifications"
          className={`pt-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
            <h3 className="text-cyan-400 text-2xl md:text-3xl font-semibold tracking-wide">
              MY Certifications
            </h3>
          </div>

          {/* Certification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 p-4 hover:border-cyan-500/30 transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-amber-50 rounded flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-amber-800 font-serif text-lg mb-2">Certificate</div>
                  <div className="w-16 h-px bg-amber-600 mx-auto mb-2" />
                  <div className="text-amber-700 text-xs">of Achievement</div>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 p-4 hover:border-cyan-500/30 transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-50 rounded flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-blue-800 font-serif text-lg mb-2">Certificate</div>
                  <div className="w-16 h-px bg-blue-600 mx-auto mb-2" />
                  <div className="text-blue-700 text-xs">Professional</div>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 p-4 hover:border-cyan-500/30 transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-emerald-100 to-emerald-50 rounded flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-emerald-800 font-serif text-lg mb-2">Certificate</div>
                  <div className="w-16 h-px bg-emerald-600 mx-auto mb-2" />
                  <div className="text-emerald-700 text-xs">Completion</div>
                </div>
              </div>
            </div>
          </div>

          {/* Certification Labels */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs text-white/40">
            <span>GOOGLE CERTIFICATION</span>
            <span className="text-cyan-500">|</span>
            <span>COURSERA</span>
            <span className="text-cyan-500">|</span>
            <span>REACT</span>
            <span className="text-cyan-500">|</span>
            <span>DEVELOPMENT CERTIFICATION</span>
            <span className="text-cyan-500">|</span>
            <span>UDEMY</span>
          </div>
        </div>
      </div>
    </section>
  )
}
