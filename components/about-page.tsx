"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

// Interactive Particle Background Component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Array<{
    x: number
    y: number
    baseX: number
    baseY: number
    size: number
    speedX: number
    speedY: number
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const particleCount = 80
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      size: Math.random() * 2 + 1, // Size between 1-3px
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    }))

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Always apply continuous floating motion
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Add some randomness to movement for more organic feel
        particle.speedX += (Math.random() - 0.5) * 0.02
        particle.speedY += (Math.random() - 0.5) * 0.02
        
        // Limit max speed
        particle.speedX = Math.max(-0.8, Math.min(0.8, particle.speedX))
        particle.speedY = Math.max(-0.8, Math.min(0.8, particle.speedY))

        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        // Move towards cursor if within range (additive to floating motion)
        if (distance < maxDistance && mouseRef.current.x !== 0 && mouseRef.current.y !== 0) {
          const force = (maxDistance - distance) / maxDistance
          particle.x += dx * force * 0.03
          particle.y += dy * force * 0.03
        }

        // Wrap particles around screen edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + (particle.size / 3) * 0.4})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

type AboutPageProps = {
  isOpen: boolean
  onClose: () => void
}

type Section = "intro" | "education" | "achievements"

const achievementsData = {
  awards: [
    { number: "01", title: "WINNER OF PRJ202 (2025)" },
    { number: "02", title: "FIVE TIMES RECIPIENT OF HM's CERTIFICATE (2017 - 2022)" },
  ],
  certifications: [
    { number: "01", title: "CISCO NETWORK ACADEMY (2024)" },
    { number: "02", title: "JOTA-JOTI (2020)" },
    { number: "03", title: "LEADERSHIP AND ACTIVE COMMUNITY (2020)" },
  ],
  participation: [
    { number: "01", title: "SPEAKER, GYALYONG KHERIG DRENDUR (2025)" },
    { number: "02", title: "BHUTAN CHILDREN's PARLIAMENT (2016 - 2017)" },
  ],
}

const journeyData = [
  {
    location: "HAA (BHUTAN)",
    period: "2003-2020",
    description: "Raised amidst beautiful landscapes, in a country known for its unique culture and Gross National Happiness, this is where my eye for balance and detail took shape. My journey into the digital world began here, where I learned to turn design into interface.",
  },
  {
    location: "THIMPHU (BHUTAN)",
    period: "2023-PRESENT",
    description: "In search of a new challenge, I landed in the vibrant campus of GCIT college, Thimphu, where I truly grew as a developer. Collaborating with exceptional designers on high-profile projects, I deepened my skills in interaction and front-end craft, bringing digital experiences to life.",
  },
  {
    location: "FREELANCE",
    period: "2025-TODAY",
    description: "Wanting to expand my horizons, I now work independently with agencies and individuals around the country. I'm learning to navigate projects on my own, collaborate with diverse teams, and continue to grow both my skills and confidence as a creative professional.",
  },
]

const skillsData = [
  { 
    name: "DESIGN", 
    category: "DESIGN",
    description: "I create modern, clean, and user-focused designs that bring your brand and ideas to life. From wireframes to fully polished visuals, I focus on aesthetics, usability, and scalability; ensuring that every design decision enhances the user experience and aligns with your brand identity."
  },
  { 
    name: "FRAMEWORK + CMS", 
    category: "DEVELOPMENT",
    description: "Fast, scalable websites with Nuxt.js or Next.js and tailored to your needs. Whether I handle the CMS configuration with Sanity or integrate the front-end with your existing systems (Craft, WordPress, Prismic, Dato, or similar), I handle everything from dynamic content, complex filters API connections and performance optimization, delivering a seamless digital experience.",
    subsections: [
      {
        title: "FRAMEWORKS",
        items: ["Nuxt.js (Vue ecosystem, advanced)", "Next.js (React ecosystem)"]
      },
      {
        title: "TOOLS",
        items: ["JavaScript / TypeScript, SCSS Webpack, Node.js"]
      },
      {
        title: "MOTION & INTERACTIONS",
        items: ["GSAP, Locomotive Scroll, Lenis Scroll, Swiper.js, Lottie"]
      },
      {
        title: "CMS / HEADLESS",
        items: ["Sanity and experience integrating with multiple systems (WordPress, Craft, Strati, etc.)"]
      },
      {
        title: "APIS",
        items: ["REST & GraphQL, Open Graph, API integration"]
      },
      {
        title: "SOFTWARES",
        items: ["Figma, VS Code, Fork, Atlassian Suite"]
      }
    ]
  },
  { 
    name: "WEBFLOW", 
    category: "DEVELOPMENT",
    description: "Smooth, interactive Webflow websites with modern animations and CMS-driven content. Designed for clients who want speed, flexibility, and simple content management, while still benefiting from advanced front-end customization."
  },
]

export function AboutPage({ isOpen, onClose }: AboutPageProps) {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState<Section>("intro")
  const [aboutTextOffset, setAboutTextOffset] = useState(0)
  const [isNavHovered, setIsNavHovered] = useState(false)
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)

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

  // Handle scroll progress and section detection
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current
    const scrollTop = container.scrollTop
    const viewportHeight = window.innerHeight
    const docHeight = container.scrollHeight - viewportHeight
    const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
    setScrollProgress(progress)

    // Calculate About text offset - moves down as user scrolls through first section
    // The text should move from top to bottom of first viewport
    const maxOffset = viewportHeight - 200 // Leave some padding from bottom
    const scrollRatio = Math.min(scrollTop / viewportHeight, 1)
    setAboutTextOffset(scrollRatio * maxOffset)

    // Determine current section
    if (achievementsRef.current && educationRef.current) {
      const educationTop = educationRef.current.offsetTop
      const achievementsTop = achievementsRef.current.offsetTop
      
      if (scrollTop >= achievementsTop - viewportHeight / 2) {
        setCurrentSection("achievements")
      } else if (scrollTop >= educationTop - viewportHeight / 2) {
        setCurrentSection("education")
      } else {
        setCurrentSection("intro")
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen || !containerRef.current) return

    const container = containerRef.current
    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [isOpen, handleScroll])

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

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentSection("intro")
      setAboutTextOffset(0)
      setScrollProgress(0)
      if (containerRef.current) {
        containerRef.current.scrollTop = 0
      }
    }
  }, [isOpen])

  const scrollToSection = (section: Section) => {
    if (!containerRef.current) return
    
    if (section === "intro" && introRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" })
    } else if (section === "education" && educationRef.current) {
      containerRef.current.scrollTo({ 
        top: educationRef.current.offsetTop, 
        behavior: "smooth" 
      })
    } else if (section === "achievements" && achievementsRef.current) {
      containerRef.current.scrollTo({ 
        top: achievementsRef.current.offsetTop, 
        behavior: "smooth" 
      })
    }
  }

  const handleNavClick = () => {
    if (currentSection === "education") {
      scrollToSection("intro")
    } else if (currentSection === "achievements") {
      scrollToSection("education")
    }
  }

  const handleNextSection = () => {
    if (currentSection === "intro") {
      scrollToSection("education")
    } else if (currentSection === "education") {
      scrollToSection("achievements")
    }
  }

  const handlePrevSection = () => {
    if (currentSection === "education") {
      scrollToSection("intro")
    } else if (currentSection === "achievements") {
      scrollToSection("education")
    }
  }

  const handleHomeClick = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* INTRO SECTION - Full viewport height with image */}
        <section 
          ref={introRef}
          className="relative h-screen w-full"
          style={{
            background: "linear-gradient(135deg, #0a1628 0%, #0d2847 25%, #1a4a7a 50%, #2d6ba3 75%, #3d7eb8 100%)",
          }}
        >
          {/* Profile Image - Full screen cover */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/profile-about.png" 
              alt="Norbu Tshering"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 20%" }}
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          </div>

          {/* About Title - Animates down on scroll */}
          <h1 
            className="absolute left-6 md:left-12 text-white text-[15vw] md:text-[12vw] lg:text-[10vw] font-normal leading-none tracking-tight z-20 transition-transform duration-100 ease-out"
            style={{ 
              top: `${80 + aboutTextOffset}px`,
            }}
          >
            About
          </h1>

          {/* Bio Text - Right side */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 w-full md:w-[40%] lg:w-[35%]">
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
        </section>

        {/* EDUCATION/JOURNEY SECTION */}
        <section 
          ref={educationRef}
          className="relative min-h-screen w-full bg-[#0d0d0d] py-24 px-6 md:px-12"
        >
          {/* Particle Background Animation */}
          <ParticleBackground />

          {/* Journey Timeline */}
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Journey Header with locations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {journeyData.map((item, index) => (
                <div key={index} className="relative">
                  {/* Arrow between items (hidden on last) */}
                  {index < journeyData.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-8 text-white/30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Location dot indicator */}
                  {index === journeyData.length - 1 && (
                    <div className="absolute right-0 top-2 w-2 h-2 rounded-full bg-white/50" />
                  )}
                  
                  <h3 className="text-cyan-400 text-2xl md:text-3xl font-bold mb-4 leading-tight pr-8">
                    {item.location}
                  </h3>
                  
                  <span className="inline-block border border-white/30 text-white/70 text-xs px-3 py-1 mb-4">
                    {item.period}
                  </span>
                  
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div className="mt-32 space-y-4">
              {skillsData.map((skill, index) => {
                const isExpanded = expandedSkill === skill.name
                
                return (
                  <div 
                    key={index}
                    className="border-t border-white/10"
                  >
                    {/* Skill Header - Clickable */}
                    <div 
                      className="flex items-center justify-between py-6 group cursor-pointer hover:border-white/20 transition-colors"
                      onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                    >
                      <h4 className="text-white/50 text-2xl md:text-4xl font-light group-hover:text-white/80 transition-colors">
                        {skill.name}
                      </h4>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-white/40 text-xs tracking-wider uppercase">
                          {skill.category}
                        </span>
                        <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all">
                          {isExpanded ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    {isExpanded && (
                      <div className="pb-8 pt-2 animate-in fade-in slide-in-from-top-2 duration-300 mx-auto">
                        <div className="max-w-2xl mx-auto px-6 md:px-12">
                          {/* Description */}
                          <p className="text-white/70 text-base leading-relaxed mb-8">
                            {skill.description}
                          </p>

                          {/* Subsections for Framework + CMS */}
                          {skill.subsections && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {skill.subsections.map((subsection, subIndex) => (
                                <div key={subIndex}>
                                  <h5 className="text-black text-xs tracking-wider uppercase mb-3 bg-white inline-block px-3 py-1">
                                    {subsection.title}
                                  </h5>
                                  <p className="text-white/60 text-sm leading-relaxed">
                                    {subsection.items.join(", ")}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section 
          ref={achievementsRef}
          className="relative min-h-screen w-full bg-[#0d0d0d] py-24 px-6 md:px-12"
        >
          <div className="max-w-6xl mx-auto">
            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {/* AWARDS Column */}
              <div>
                <h3 className="text-white/40 text-xs tracking-[0.2em] uppercase mb-8">
                  AWARDS
                </h3>
                <div className="space-y-4">
                  {achievementsData.awards.map((award, index) => (
                    <div key={index} className="flex gap-4">
                      <span className="text-white/30 text-sm">{award.number}</span>
                      <span className="text-white/80 text-sm uppercase">{award.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATIONS Column */}
              <div>
                <h3 className="text-white/40 text-xs tracking-[0.2em] uppercase mb-8">
                  CERTIFICATIONS
                </h3>
                <div className="space-y-4">
                  {achievementsData.certifications.map((cert, index) => (
                    <div key={index} className="flex gap-4">
                      <span className="text-white/30 text-sm">{cert.number}</span>
                      <span className="text-white/80 text-sm uppercase">{cert.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PARTICIPATION Column */}
              <div>
                <h3 className="text-white/40 text-xs tracking-[0.2em] uppercase mb-8">
                  PARTICIPATION
                </h3>
                <div className="space-y-4">
                  {achievementsData.participation.map((part, index) => (
                    <div key={index} className="flex gap-4">
                      <span className="text-white/30 text-sm">{part.number}</span>
                      <span className="text-white/80 text-sm uppercase">{part.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Fixed UI Elements */}
      
      {/* Top Navigation - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center gap-12 px-6 md:px-12 py-6">
        <button className="text-white text-xs tracking-[0.2em] uppercase hover:text-white/70 transition-colors">
          CONTACT
        </button>
        <span className="text-white/70 text-xs tracking-wider">
          {currentTime}
        </span>
      </header>

      {/* Left side section label */}
      <div className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <p 
          className="text-white/40 text-xs tracking-[0.3em] uppercase transition-all duration-300"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {currentSection === "intro" ? "INTRO" : currentSection === "education" ? "EDUCATION" : "ACHIEVEMENTS"}
        </p>
      </div>

      {/* Right side scroll progress */}
      <div className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <p className="text-white/40 text-xs tracking-wider">
          {scrollProgress} %
        </p>
      </div>

      {/* Bottom Navigation Pill */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div 
          className="relative flex items-center gap-2 bg-black/50 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10"
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => setIsNavHovered(false)}
        >
          {/* Left Arrow - goes to previous section */}
          <button 
            onClick={handlePrevSection}
            className={`p-2 text-white/70 hover:text-white transition-all rounded-full hover:bg-white/10 ${
              currentSection === "intro" ? "opacity-30 cursor-not-allowed" : ""
            }`}
            disabled={currentSection === "intro"}
            aria-label="Previous section"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Section Name / Close Button on Hover */}
          <div className="relative px-4 min-w-[120px] flex items-center justify-center">
            {/* Section name - hidden on hover */}
            <span 
              className={`text-white text-xs tracking-[0.2em] uppercase transition-opacity duration-200 ${
                isNavHovered ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentSection === "intro" ? "INTRO" : currentSection === "education" ? "EDUCATION" : "ACHIEVEMENTS"}
            </span>
            
            {/* Close button - shown on hover */}
            <button 
              onClick={handleHomeClick}
              className={`absolute inset-0 flex items-center justify-center text-white hover:text-white/80 transition-opacity duration-200 ${
                isNavHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Go to homepage"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Right Arrow - goes to next section */}
          <button 
            onClick={handleNextSection}
            className={`p-2 text-white/70 hover:text-white transition-all rounded-full hover:bg-white/10 ${
              currentSection === "achievements" ? "opacity-30 cursor-not-allowed" : ""
            }`}
            disabled={currentSection === "achievements"}
            aria-label="Next section"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Social Icons - shown on hover */}
          <div 
            className={`flex items-center gap-2 ml-2 border-l border-white/10 pl-2 transition-all duration-200 ${
              isNavHovered ? "opacity-100 max-w-[100px]" : "opacity-0 max-w-0 overflow-hidden"
            }`}
          >
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/norbutshering" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-white/70 hover:text-white transition-all rounded-full hover:bg-white/10"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            {/* Gmail */}
            <a 
              href="mailto:norbudev7@gmail.com" 
              className="p-2 text-white/70 hover:text-white transition-all rounded-full hover:bg-white/10"
              aria-label="Email"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Close button - mobile only, top right */}
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
  )
}
