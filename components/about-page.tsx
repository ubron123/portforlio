"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

type AboutPageProps = {
  isOpen: boolean
  onClose: () => void
}

type Section = "intro" | "education"

const journeyData = [
  {
    location: "THIMPHU (BHUTAN)",
    period: "2016-2022",
    description: "Raised amidst beautiful landscapes, in a country known for its unique culture and Gross National Happiness, this is where my eye for balance and detail took shape. My journey into the digital world began here, where I learned to turn design into interface.",
  },
  {
    location: "BANGKOK (THAILAND)",
    period: "2022-2024",
    description: "In search of a new challenge, I landed in the vibrant city of Bangkok, where I truly grew as a developer. Collaborating with exceptional designers on high-profile projects, I deepened my skills in interaction and front-end craft, bringing digital experiences to life.",
  },
  {
    location: "GLOBAL (REMOTE)",
    period: "2025-TODAY",
    description: "Wanting to expand my horizons, I now work independently with agencies and individuals around the world. I'm learning to navigate projects on my own, collaborate with diverse teams, and continue to grow both my skills and confidence as a creative professional.",
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
    if (educationRef.current) {
      const educationTop = educationRef.current.offsetTop
      if (scrollTop >= educationTop - viewportHeight / 2) {
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
    }
  }

  const handleNavClick = () => {
    if (currentSection === "education") {
      scrollToSection("intro")
    }
  }

  const handleNextSection = () => {
    if (currentSection === "intro") {
      scrollToSection("education")
    }
  }

  const handlePrevSection = () => {
    if (currentSection === "education") {
      scrollToSection("intro")
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
          {/* Journey Timeline */}
          <div className="max-w-6xl mx-auto">
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
                  
                  <h3 className="text-[#c9a962] text-2xl md:text-3xl font-bold mb-4 leading-tight pr-8">
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
                      <div className="pb-8 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="max-w-4xl">
                          {/* Description */}
                          <p className="text-white/70 text-base leading-relaxed mb-8">
                            {skill.description}
                          </p>

                          {/* Subsections for Framework + CMS */}
                          {skill.subsections && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {skill.subsections.map((subsection, subIndex) => (
                                <div key={subIndex}>
                                  <h5 className="text-white/40 text-xs tracking-wider uppercase mb-3 border border-white/20 inline-block px-3 py-1">
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
          {currentSection === "intro" ? "INTRO" : "EDUCATION"}
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
          <div className="relative px-4 min-w-[100px] flex items-center justify-center">
            {/* Section name - hidden on hover */}
            <span 
              className={`text-white text-xs tracking-[0.2em] uppercase transition-opacity duration-200 ${
                isNavHovered ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentSection === "intro" ? "INTRO" : "EDUCATION"}
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
              currentSection === "education" ? "opacity-30 cursor-not-allowed" : ""
            }`}
            disabled={currentSection === "education"}
            aria-label="Next section"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
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
