"use client"

import { useState, useEffect, useRef } from "react"

interface ProjectDetailProps {
  isOpen: boolean
  onClose: () => void
  currentProject: number
}

const projects = [
  {
    id: 1,
    number: "01",
    title: "VEGO",
    year: "2024",
    tags: ["DESIGNING", "FRONTEND DEV", "BACKEND DEV"],
    description:
      "VEGO is an innovative car rental platform that optimizes the use of idle vehicles, with a focus especially on the Moroccan market.",
    backgroundImage: "/vego.png",
    mockupType: "laptop" as const,
    mockupImage: "/vego.png",
  },
  {
    id: 2,
    number: "02",
    title: "SCAN2DINE",
    year: "2024",
    tags: ["DESIGNING", "FRONTEND DEV", "BACKEND DEV"],
    description:
      "Scan2Dine is a restaurant digital menu application that allows cafe/Restaurant to customers to place orders and track them in real-time.",
    backgroundImage: "/scan2dine.png",
    mockupType: "laptop" as const,
    mockupImage: "/scan2dine.png",
  },
  {
    id: 3,
    number: "03",
    title: "NDP",
    year: "2025",
    tags: ["DESIGNING", "FRONTEND DEV", "BACKEND DEV"],
    description:
      "NDP is a mobile application specifically developed for GGT College to streamline the book-sharing process, eliminating the need for students to handle paperwork manually.",
    backgroundImage: "/ndp.png",
    mockupType: "phone" as const,
    mockupImage: "/ndp.png",
  },
]

export function ProjectDetail({ isOpen, onClose, currentProject }: ProjectDetailProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [projectNumber, setProjectNumber] = useState(1)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    setProjectNumber(currentProject)
    setScrollPercent(0)
    window.scrollTo(0, 0)

    // Setup Intersection Observer for project sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.getAttribute('data-project-id') || '1')
            setProjectNumber(projectId)
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
        rootMargin: '0px'
      }
    )

    // Observe all project sections
    sectionRefs.current.forEach((section: HTMLDivElement | null) => {
      if (section) {
        observer.observe(section)
      }
    })

    // Setup scroll percentage tracking
    const handleScroll = () => {
      const container = scrollContainerRef.current
      if (!container) return
      
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const currentScroll = Math.max(0, scrollTop)
      
      const percent = scrollHeight > 0 ? Math.round((currentScroll / scrollHeight) * 100) : 0
      const clampedPercent = Math.min(Math.max(percent, 0), 100)
      
      setScrollPercent(clampedPercent)
    }

    // Add scroll listener to the container
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
      handleScroll() // Initial call
    }

    return () => {
      observer.disconnect()
      const container = scrollContainerRef.current
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isOpen, currentProject])

  useEffect(() => {
    if (!isOpen) return
    const id = Math.min(Math.max(currentProject, 1), projects.length)
    const t = window.setTimeout(() => {
      const container = scrollContainerRef.current
      const section = sectionRefs.current[id - 1]
      if (container && section) {
        container.scrollTop = section.offsetTop
      }
    }, 0)
    return () => clearTimeout(t)
  }, [isOpen, currentProject])

  if (!isOpen) return null

  const currentData = projects[projectNumber - 1]

  return (
    <>
      <style>{`
        @keyframes squeeze {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
            border-radius: 50%;
          }
          25% {
            transform: scaleX(0.9) scaleY(1.1) skewX(5deg);
            border-radius: 45% 55% 55% 45%;
          }
          50% {
            transform: scaleX(1.1) scaleY(0.9) skewX(-5deg);
            border-radius: 55% 45% 45% 55%;
          }
          75% {
            transform: scaleX(0.95) scaleY(1.05) skewY(5deg);
            border-radius: 40% 60% 60% 40%;
          }
        }
      `}</style>
      <div ref={scrollContainerRef} className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Fixed UI Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Top Left - Project Number */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 lg:top-16 lg:left-16">
          <div className="relative w-[120px] h-[80px] md:w-[160px] md:h-[100px] lg:w-[200px] lg:h-[120px] flex items-center justify-center">
            {/* Fixed "0" - Completely static */}
            <span
              className="absolute font-bold text-transparent leading-none"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.3)",
                fontSize: "clamp(100px, 12vw, 140px)",
                left: "50%",
                transform: "translateX(-90%)",
              }}
            >
              0
            </span>
            
            {/* Animated changing digit */}
            {projects.map((project, index) => (
              <span
                key={project.id}
                className={`absolute font-bold text-transparent leading-none transition-all duration-500 ease-out ${
                  projectNumber === index + 1
                    ? 'opacity-100 translate-y-0'
                    : projectNumber > index + 1
                    ? 'opacity-0 -translate-y-6'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.3)",
                  fontSize: "clamp(100px, 12vw, 140px)",
                  left: "50%",
                  transform: "translateX(10%)",
                }}
              >
                {project.number.charAt(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Top Right - Project Details */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 lg:top-16 lg:right-16 max-w-md text-right">
          {/* Title and Year Row */}
          <div className="flex items-baseline justify-end gap-6 mb-4">
            <h2 className="text-[22px] md:text-[33px] lg:text-[44px] font-bold text-white tracking-wider transition-all duration-500">
              {currentData.title}
            </h2>
            <span className="text-white/40 text-[11px] md:text-[14px] transition-all duration-500">
              {currentData.year}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-end gap-2 mb-4">
            {currentData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[9px] md:text-[10px] font-medium text-white/70 border border-white/20 transition-all duration-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/50 text-[11px] md:text-[14px] leading-relaxed transition-all duration-500 max-w-sm ml-auto">
            {currentData.description}
          </p>
        </div>

        {/* Bottom Right - Scroll Percentage */}
        <div className={`absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16`}>
          <span className={`font-medium ${
            scrollPercent > 66 ? 'text-black' : 'text-white/60'
          } text-xs md:text-sm transition-colors duration-300`}>
            {scrollPercent}%
          </span>
        </div>
      </div>

      {/* Project Sections with Full Screen Background Images */}
      {projects.map((project, index) => (
        <section
          key={project.id}
          ref={(el) => {
            sectionRefs.current[index] = el as HTMLDivElement
          }}
          data-project-id={project.id}
          className="h-screen relative overflow-hidden cursor-pointer"
          style={{
            backgroundImage: `url(${project.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
          onClick={() => setSelectedProject(project)}
        >
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Purple/Gradient Tint for cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-indigo-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </section>
      ))}
      {/* Extended Page Section */}
      <section className="h-[50vh] bg-white flex items-start justify-center pt-12 md:pt-16 lg:pt-20">
        <div className="flex items-center justify-between mb-8 w-full max-w-6xl px-8">
            <div className="text-left ml-12 md:ml-20 lg:ml-32">
              <div className="flex items-baseline gap-4 mb-2">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-black">
                  Have a project in mind?
                </h2>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                  REACH
                </p>
              </div>
              <div className="flex items-baseline gap-4 mb-0">
                <div style={{width: '380px'}}></div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                  OUT
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto relative">
              {/* Curved Arrow */}
              <svg 
                className="absolute -left-32 md:-left-40 lg:-left-48 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transform rotate-12"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="4"
                    markerHeight="4"
                    refX="3"
                    refY="2"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 4 2, 0 4"
                      fill="black"
                    />
                  </marker>
                </defs>
                <path 
                  d="M 25 45 Q 50 75, 85 45" 
                  stroke="black" 
                  strokeWidth="3" 
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
              <a
                href="https://wa.me/97577682154"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#3AC2FF] hover:bg-[#2BA3E6] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{
                  animation: 'squeeze 8s ease-in-out infinite'
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-300 whitespace-nowrap">
                  click me
                </span>
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-.464-.297-.636-.075-.438-.172-.612-.187-.467-.229-.717-.229-.313 0-.615.09-.955.263l.35 2.432c.043.281.18.525.373.696.064.565.142.964.286.418.474l1.34 1.53c.218.379.465.717.465 1.393 0 .626-.116 1.13-.299 1.636-.517.398.198.815.488 1.512-.488.345 0 .684-.072.965-.206l2.999 3.948c.11.651.655 1.168 1.595 1.168.94 0 1.602-.298 2.157-.918 2.157-1.864 0-.345-.069-.636-.206-.955-.299l-1.531-1.997c-.5-.453-1.156-.754-1.972-.754-.823 0-1.538.521-1.878 1.514-.845-.015-1.539-.015-2.384 0-.123-.41-.299-.809-.299-1.723 0-.626.116-1.13.299-1.636.517.398.198.815.488 1.512-.488.345 0 .684-.072.965-.206l2.999 3.948c.11.651.655 1.168 1.595 1.168.94 0 1.602-.298 2.157-.918 2.157-1.864 0-.345-.069-.636-.206-.955-.299l-1.531-1.997c-.5-.453-1.156-.754-1.972-.754-.823 0-1.538.521-1.878 1.514-.845-.015-1.539-.015-2.384 0-.123-.41-.299-.809-.299-1.723 0-.626.116-1.13.299-1.636.517.398.198.815.488 1.512-.488.345 0 .684-.072.965-.206l2.999 3.948.11.651.655 1.168 1.595 1.168.94 0 1.602-.298 2.157-.918 2.157-1.864 0-.345-.069-.636-.206-.955-.299l-1.531-1.997c-.5-.453-1.156-.754-1.972-.754-.823 0-1.538.521-1.878 1.514-.845-.015-1.539-.015-2.384 0-.123-.41-.299-.809-.299-1.723 0-.626.116-1.13.299-1.636.517.398.198.815.488 1.512-.488.345 0 .684-.072.965-.206l2.999 3.948z"/>
                </svg>
              </a>
            </div>
          </div>
      </section>
    </div>

      {/* Project Details Full Page */}
      {selectedProject && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          {/* Header Section */}
          <div className="relative h-screen">
            <img 
              src={selectedProject.mockupImage} 
              alt={selectedProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="fixed top-6 right-6 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Project Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">{selectedProject.title}</h1>
                <p className="text-xl md:text-2xl text-white/80 mb-6">{selectedProject.year}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-black text-white py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-8 md:px-16">
              {/* Project Details Layout */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Left Column - Title */}
                <div className="md:col-span-2">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">{selectedProject.title}</h2>
                  <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                </div>
                
                {/* Right Column - Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">YEAR</h3>
                    <p className="text-2xl font-bold">{selectedProject.year}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">TYPE</h3>
                    <p className="text-2xl font-bold capitalize">{selectedProject.mockupType}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">TECHNOLOGIES</h3>
                    <div className="space-y-1">
                      {selectedProject.tags.map((tag, idx) => (
                        <p key={idx} className="text-lg">{tag}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Role and Duration */}
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">ROLE</h3>
                  <p className="text-lg text-gray-300">Frontend Developer, UI/UX Designer, Backend Developer</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">DURATION</h3>
                  <p className="text-lg text-gray-300">3 Months</p>
                </div>
              </div>

              {/* View Project Button */}
              <div className="text-center">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center px-16 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors text-lg tracking-wide"
                >
                  VIEW PROJECT
                  <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
