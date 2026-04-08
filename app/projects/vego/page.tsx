"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"

// VeGo Project Data
const projectData = {
  id: 1,
  title: "VEGO",
  subtitle: "Idle No More",
  location: "Thimphu, Bhutan",
  tags: ["#Rental Platform", "#MERN", "#Fullstack"],
  heroImage: "/vego.png",
  overview: {
    title: "Turning Visual Ideas Into Powerful Interfaces",
    description: "VeGo, a car rental and peer-to-peer vehicle lending platform focused on optimizing underutilized vehicles, faced challenges stemming from high user interaction and an inconsistent user interface. Additionally, strict time constraints demanded the rapid development of a cohesive and user-friendly design, making the situation both complex and time-sensitive.",
  },
  role: {
    title: "Frontend Developer",
    subtitle: "Core Interface Designing",
    description: "I served as a Frontend Developer for Team VeGo. Throughout the development process, I collaborated closely with designers and other developers to ensure a consistent and cohesive user interface. This collaboration led to the consolidation of existing systems and ultimately contributed to the formation of a unified core development team.",
    responsibilities: [
      {
        number: "01",
        title: "Consolidating fragmented component systems",
        description: "Auditing components across internal tools and customer-facing products, identifying duplicated patterns and inconsistencies, and merging the two existing design systems into a unified foundation."
      },
      {
        number: "02",
        title: "Supporting cross-team adoption",
        description: "Running internal training sessions, workshops on component usage and accessibility standards, improved documentation and examples, and close collaboration with developers on implementation details."
      },
      {
        number: "03",
        title: "Aligning the architecture",
        description: "Aligning naming conventions with engineering implementation, making it easier for developers to map design decisions directly to code. Introducing a contribution process allowing designers across squads to propose improvements while maintaining accessibility and consistency standards."
      }
    ]
  }
}

export default function VeGoProjectPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentSectionRef = useRef<HTMLElement>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  
  // Line animation states
  const [overviewLineProgress, setOverviewLineProgress] = useState(0)
  const [diagonalLineProgress, setDiagonalLineProgress] = useState(0)
  const [roleLineProgress, setRoleLineProgress] = useState(0)
  const [roleItemsVisible, setRoleItemsVisible] = useState<boolean[]>([false, false, false])

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1) * 100
    setScrollProgress(progress)

    const windowHeight = window.innerHeight

    // Overview line animation
    const overviewEl = overviewRef.current
    if (overviewEl) {
      const rect = overviewEl.getBoundingClientRect()
      const startTrigger = windowHeight * 0.85
      const endTrigger = windowHeight * 0.2
      
      if (rect.top < startTrigger) {
        const progressRange = startTrigger - endTrigger
        const currentProgress = startTrigger - rect.top
        const overviewProg = Math.min(Math.max(currentProgress / progressRange, 0), 1) * 100
        setOverviewLineProgress(overviewProg)
        
        // Start diagonal line after overview line is 80% complete
        if (overviewProg > 80) {
          const diagonalProg = ((overviewProg - 80) / 20) * 100
          setDiagonalLineProgress(Math.min(diagonalProg, 100))
        }
      }
    }
    
    // Role line animation
    const roleEl = roleRef.current
    if (roleEl) {
      const rect = roleEl.getBoundingClientRect()
      const startTrigger = windowHeight * 0.8
      const endTrigger = windowHeight * 0.1
      
      if (rect.top < startTrigger) {
        const progressRange = startTrigger - endTrigger
        const currentProgress = startTrigger - rect.top
        const roleProg = Math.min(Math.max(currentProgress / progressRange, 0), 1) * 100
        setRoleLineProgress(roleProg)
        
        // Show role items progressively
        const newVisibility = [...roleItemsVisible]
        if (roleProg > 20) newVisibility[0] = true
        if (roleProg > 45) newVisibility[1] = true
        if (roleProg > 70) newVisibility[2] = true
        setRoleItemsVisible(newVisibility)
      }
    }
  }, [roleItemsVisible])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-gradient-to-b from-black/80 to-transparent">
        <Link 
          href="/"
          className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <span className="text-white/40 text-sm">{Math.round(scrollProgress)}%</span>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Hero Image with Laptop Mockup */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: `url(${projectData.heroImage})`,
              filter: "brightness(0.6)"
            }}
          />
          {/* Multiple Gradient Overlays for smooth fade to black */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black via-black/95 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              {projectData.subtitle}
            </h1>
            <p className="text-white/60 text-sm md:text-base mb-6">
              {projectData.location}
            </p>
            <div className="flex flex-wrap gap-3">
              {projectData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm text-white/80 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project Card */}
          <div className="absolute bottom-16 md:bottom-24 right-6 md:right-12 lg:right-20">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-800">
                <img 
                  src={projectData.heroImage} 
                  alt={projectData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white/50 text-xs">01/03</p>
                <p className="text-white font-semibold">{projectData.title}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#3AC2FF] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Animated Zig-Zag Line */}
      <section ref={contentSectionRef} className="relative py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 relative">
          
          {/* Overview Section - Left Aligned */}
          <div ref={overviewRef} className="relative mb-40 md:mb-56">
            {/* Animated Blue Line - Left side */}
            <div className="absolute left-0 top-0 w-0.5 overflow-hidden" style={{ height: '100%' }}>
              <div 
                className="w-full bg-[#3AC2FF] transition-all duration-100 ease-out"
                style={{ 
                  height: `${overviewLineProgress}%`,
                }}
              />
            </div>
            
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-8 pl-8">
              <div 
                className="h-px bg-[#3AC2FF] transition-all duration-500"
                style={{ width: overviewLineProgress > 5 ? '32px' : '0px' }}
              />
              <span 
                className="text-white/40 text-xs tracking-widest transition-opacity duration-500"
                style={{ opacity: overviewLineProgress > 10 ? 1 : 0 }}
              >
                OVERVIEW
              </span>
            </div>

            {/* Overview Content */}
            <div className="pl-8 max-w-3xl">
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight italic transition-all duration-700"
                style={{ 
                  opacity: overviewLineProgress > 15 ? 1 : 0,
                  transform: `translateY(${overviewLineProgress > 15 ? 0 : 20}px)`
                }}
              >
                {projectData.overview.title}
              </h2>
              <p 
                className="text-white/60 text-base md:text-lg leading-relaxed transition-all duration-700 delay-100"
                style={{ 
                  opacity: overviewLineProgress > 30 ? 1 : 0,
                  transform: `translateY(${overviewLineProgress > 30 ? 0 : 20}px)`
                }}
              >
                {projectData.overview.description}
              </p>
            </div>

            {/* Diagonal Connecting Line */}
            <svg 
              className="absolute -bottom-24 md:-bottom-32 left-0 w-full h-32 md:h-40 pointer-events-none overflow-visible"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <path
                d={`M 0 0 Q 25 20, 50 20 T 100 20`}
                stroke="#3AC2FF"
                strokeWidth="0.3"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset={200 - (diagonalLineProgress * 2)}
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* My Role Section - Right Aligned */}
          <div ref={roleRef} className="relative">
            {/* Animated Blue Line - Right side */}
            <div className="absolute right-0 top-0 w-0.5 overflow-hidden" style={{ height: '100%' }}>
              <div 
                className="w-full bg-[#3AC2FF] transition-all duration-100 ease-out"
                style={{ 
                  height: `${roleLineProgress}%`,
                }}
              />
            </div>
            
            {/* Section Label - Right aligned */}
            <div className="flex items-center justify-end gap-4 mb-8 pr-8">
              <span 
                className="text-white/40 text-xs tracking-widest transition-opacity duration-500"
                style={{ opacity: roleLineProgress > 5 ? 1 : 0 }}
              >
                MY ROLE
              </span>
              <div 
                className="h-px bg-[#3AC2FF] transition-all duration-500"
                style={{ width: roleLineProgress > 5 ? '32px' : '0px' }}
              />
            </div>

            {/* Role Content - Right aligned */}
            <div className="pr-8 ml-auto max-w-3xl">
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2 text-right transition-all duration-700"
                style={{ 
                  opacity: roleLineProgress > 10 ? 1 : 0,
                  transform: `translateY(${roleLineProgress > 10 ? 0 : 20}px)`
                }}
              >
                {projectData.role.title} <span className="text-white/60">•</span> {projectData.role.subtitle}
              </h2>
              <p 
                className="text-white/60 text-base md:text-lg leading-relaxed mb-12 text-right transition-all duration-700 delay-100"
                style={{ 
                  opacity: roleLineProgress > 15 ? 1 : 0,
                  transform: `translateY(${roleLineProgress > 15 ? 0 : 20}px)`
                }}
              >
                {projectData.role.description}
              </p>

              {/* Responsibilities */}
              <div className="space-y-12">
                {projectData.role.responsibilities.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-8 items-start transition-all duration-600"
                    style={{
                      opacity: roleItemsVisible[idx] ? 1 : 0,
                      transform: `translateY(${roleItemsVisible[idx] ? 0 : 30}px)`,
                      transitionDelay: `${idx * 100}ms`
                    }}
                  >
                    <span className="text-white/30 text-sm font-mono flex-shrink-0 pt-1">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white text-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-2">
              Have a project in mind?
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold">
              REACH OUT
            </p>
          </div>
          <a
            href="https://wa.me/97577682154"
            target="_blank"
            rel="noopener noreferrer"
            className="w-24 h-24 md:w-32 md:h-32 bg-[#3AC2FF] rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  )
}
