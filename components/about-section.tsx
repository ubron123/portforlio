"use client"

import { useEffect, useRef, useState } from "react"

type AboutSectionProps = {
  sectionGradient: string
}

export function AboutSection({ sectionGradient }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const whoAmIRef = useRef<HTMLDivElement>(null)
  const certificationsRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<"whoami" | "certifications">("whoami")

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === whoAmIRef.current) {
            setActiveSection("whoami")
          } else if (entry.target === certificationsRef.current) {
            setActiveSection("certifications")
          }
        }
      })
    }, observerOptions)

    if (whoAmIRef.current) observer.observe(whoAmIRef.current)
    if (certificationsRef.current) observer.observe(certificationsRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
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

      {/* WHO AM I Section */}
      <div
        ref={whoAmIRef}
        className={`relative z-20 min-h-screen flex items-center transition-opacity duration-500 ${
          activeSection === "whoami" ? "opacity-100" : "opacity-30"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {/* Left Side - About Text */}
            <div className="space-y-6">
              <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase">
                A Snapshot of Me
              </p>
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
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
                  className={`text-sm transition-colors flex items-center gap-2 ${
                    activeSection === "whoami"
                      ? "text-cyan-400 font-bold"
                      : "text-white/70 hover:text-cyan-400"
                  }`}
                >
                  <span className="text-cyan-400">{">"}</span> Who am I
                </a>
                <a
                  href="#certifications"
                  className={`text-sm transition-colors flex items-center gap-2 ${
                    activeSection === "certifications"
                      ? "text-cyan-400 font-bold"
                      : "text-white/70 hover:text-cyan-400"
                  }`}
                >
                  <span className="text-cyan-400">{">"}</span> My Certifications
                </a>
              </div>
            </div>

            {/* Right Side - Stats */}
            <div className="space-y-8 md:pl-12">
              <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase text-right font-bold">
                Who Am I
              </p>
              <div className="space-y-6">
                <div className="flex items-end justify-end gap-4">
                  <span className="text-cyan-400 text-5xl md:text-6xl font-bold text-right">03+</span>
                  <span className="text-white/60 text-sm pb-2 text-right leading-tight">
                    Experience
                  </span>
                </div>
                <div className="flex items-end justify-end gap-4">
                  <span className="text-cyan-400 text-5xl md:text-6xl font-bold text-right">04+</span>
                  <span className="text-white/60 text-sm pb-2 text-right leading-tight">
                    Clients Across
                    <br />
                    Nation
                  </span>
                </div>
                <div className="flex items-end justify-end gap-4">
                  <span className="text-cyan-400 text-5xl md:text-6xl font-bold text-right">06+</span>
                  <span className="text-white/60 text-sm pb-2 text-right leading-tight">
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

      {/* Blue dot marker on timeline between sections */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
      </div>

      {/* CERTIFICATIONS Section */}
      <div
        ref={certificationsRef}
        id="certifications"
        className={`relative z-20 min-h-screen flex items-center transition-opacity duration-500 ${
          activeSection === "certifications" ? "opacity-100" : "opacity-30"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {/* Left Side - Title */}
            <div className="space-y-6">
              <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase">
                A Snapshot of Me
              </p>
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
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
                  className={`text-sm transition-colors flex items-center gap-2 ${
                    activeSection === "whoami"
                      ? "text-cyan-400 font-bold"
                      : "text-white/70 hover:text-cyan-400"
                  }`}
                >
                  <span className="text-cyan-400">{">"}</span> Who am I
                </a>
                <a
                  href="#certifications"
                  className={`text-sm transition-colors flex items-center gap-2 ${
                    activeSection === "certifications"
                      ? "text-cyan-400 font-bold"
                      : "text-white/70 hover:text-cyan-400"
                  }`}
                >
                  <span className="text-cyan-400">{">"}</span> My Certifications
                </a>
              </div>
            </div>

            {/* Right Side - Certificates */}
            <div className="space-y-6 md:pl-12">
              <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase text-right font-bold">
                My Certifications
              </p>
              
              {/* Certificate Cards - stacked on right */}
              <div className="space-y-4">
                {/* Google Certificate */}
                <div className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 p-3 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded flex items-center justify-center shrink-0">
                      <div className="text-amber-700 text-xs font-serif">Certificate</div>
                    </div>
                    <div className="text-right flex-1">
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
                    <div className="text-right flex-1">
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
                    <div className="text-right flex-1">
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
                    <div className="text-right flex-1">
                      <p className="text-white text-sm font-medium">Udemy</p>
                      <p className="text-white/50 text-xs">Web Development Bootcamp</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certification Labels */}
              <div className="flex flex-wrap items-center justify-end gap-2 mt-4 text-xs text-white/40">
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
    </section>
  )
}
