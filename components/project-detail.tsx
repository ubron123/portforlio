"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface ProjectDetailProps {
  isOpen: boolean
  onClose: () => void
  currentProject: number
}

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

// Custom hook for scroll progress tracking
function useScrollProgress(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const currentProgress = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0
      setProgress(currentProgress)
    }

    container.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => container.removeEventListener("scroll", handleScroll)
  }, [containerRef])

  return progress
}

const projects = [
  {
    id: 1,
    number: "01",
    title: "VEGO",
    detailTitle: "Idle No More",
    year: "2024",
    location: "Thimphu, Bhutan",
    tags: ["DESIGNING", "FRONTEND DEV", "BACKEND DEV"],
    description:
      "VEGO is an innovative car rental platform that optimizes the use of idle vehicles, with a focus especially on the Moroccan market.",
    backgroundImage: "/vego.png",
    mockupType: "laptop" as const,
    mockupImage: "/vego.png",
    overview: {
      headline: "Turning Visual Ideas Into Powerful Interfaces",
      description: "Idle No More, a car rental and peer-to-peer vehicle lending platform focused on optimizing underutilized vehicles, faced challenges stemming from high user interaction and an inconsistent user interface. Additionally, strict time constraints demanded the rapid development of a cohesive and user-friendly design, making the situation both complex and time-sensitive",
    },
    role: {
      title: "Frontend Developer",
      subtitle: "Core Interface Designing",
      description: "I served as a Frontend Developer for Team Idle No More. Throughout the development process, I collaborated closely with designers and other developers to ensure a consistent and cohesive user interface. This collaboration led to the consolidation of existing systems and ultimately contributed to the formation of a unified core development team.",
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
          description: "aligning naming conventions with engineering implementation, making it easier for developers to map design decisions directly to code. Introducing a contribution process allowing designers across squads to propose improvements while maintaining accessibility and consistency standards."
        }
      ]
    },
    result: {
      headline: "Clarity and Components That Scale",
      description: "There was an approximate 20% reduction in design-to-development clarification cycles following the introduction of clear component documentation. The interface achieved consistency across all devices, while development and prototyping became three times faster through the use of reusable components and modular code blocks.",
      stats: [
        { value: "04+", label: "Product teams aligned around a shared design system structure" },
        { value: "~20%", label: "Estimated reduction in design-to-development clarification cycles after clearer component documentation" },
        { value: "03x", label: "Faster development and prototyping cycles enabled through reusable code blocks and components" }
      ]
    }
  },
  {
    id: 2,
    number: "02",
    title: "SCAN2DINE",
    detailTitle: "From Scan to Serve",
    year: "2024",
    location: "Thimphu, Bhutan",
    tags: ["DESIGNING", "FRONTEND DEV", "BACKEND DEV"],
    description:
      "Scan2Dine is a restaurant digital menu application that allows cafe/Restaurant to customers to place orders and track them in real-time.",
    backgroundImage: "/scan2dine.png",
    mockupType: "laptop" as const,
    mockupImage: "/scan2dine.png",
    overview: {
      headline: "Speed Meets Smart Design Here",
      description: "Scan2Dine, a web-based digital menu using a QR code system, allows users to place orders and track them in real time. Due to the platform's large scale, it required a complex database design and highly responsive interfaces to retrieve and update data from the server quickly, making real-time performance and system efficiency critical challenges.",
    },
    role: {
      title: "Frontend Developer. Database Developer",
      subtitle: "",
      description: "I served as a Frontend Developer and Database Designer for Team SCAN2DINE. Throughout the project, I collaborated closely with designers, backend developers, and stakeholders to ensure a seamless user interface while designing a robust, scalable database. This dual responsibility led to the creation of a consistent UI across devices and an efficient data structure, enabling faster data retrieval, real-time updates, and a more maintainable system.",
      responsibilities: [
        {
          number: "01",
          title: "Optimizing Database Architecture",
          description: "Designed and implemented a scalable database schema, ensuring efficient data storage, retrieval, and relationships for high-volume user interactions."
        },
        {
          number: "02",
          title: "Enhancing Frontend Performance",
          description: "Developed reusable UI components and modular code blocks, improving interface consistency and speeding up development and prototyping."
        },
        {
          number: "03",
          title: "Ensuring Real-Time Data Accuracy",
          description: "Integrated asynchronous data fetching and real-time updates to synchronize frontend displays with backend operations seamlessly."
        },
        {
          number: "04",
          title: "Standardizing Components and Documentation",
          description: "Audited existing frontend and database patterns, documented best practices, and created clear guidelines to support cross-team adoption and reduce future errors."
        }
      ]
    },
    result: {
      headline: "Clarity and Components That Scale",
      description: "The database efficiently captured all necessary details while eliminating redundant data entry. The system operated approximately 20% faster compared to the previous setup, provided real-time updates for users and customers, and was completed in a short span of time thanks to the use of reusable component codes.",
      stats: [
        { value: "~20%", label: "Faster system operation compared to the previous setup" },
        { value: "100%", label: "Real-time updates for users and customers" },
        { value: "4x", label: "Reusable components accelerating development time" }
      ]
    }
  },
  {
    id: 3,
    number: "03",
    title: "NDP",
    detailTitle: "Dues, Done Fast",
    year: "2025",
    location: "Thimphu, Bhutan",
    tags: ["DESIGNING", "FRONTEND DEV", "BACKEND DEV"],
    description:
      "NDP is a mobile application specifically developed for GGT College to streamline the book-sharing process, eliminating the need for students to handle paperwork manually.",
    backgroundImage: "/ndp.png",
    mockupType: "phone" as const,
    mockupImage: "/ndp.png",
    overview: {
      headline: "Simplifying Chaos Into A Clean Digital Flow",
      description: "NDP is a mobile application developed for GCIT College to streamline the due-clearing process. With a large student population, there was a need for a secure, efficient, and reliable solution with clear navigation and a clean user interface to replace traditional manual paper-based procedures.",
    },
    role: {
      title: "Frontend Developer. Interface Designer",
      subtitle: "",
      description: "I served as the Interface Designer and Developer for the NDP mobile application. I collaborated closely with stakeholders and developers to create a secure, intuitive, and visually clean interface that simplified the due-clearing process. My work ensured clear navigation, consistent design patterns, and seamless interaction, ultimately improving usability and reducing errors in the manual process.",
      responsibilities: [
        {
          number: "01",
          title: "Ensuring Consistency and Efficiency",
          description: "Standardized UI elements, reusable components, and workflows to speed up development and maintain consistency across the app."
        },
        {
          number: "02",
          title: "Enhancing Frontend Performance",
          description: "Developed reusable UI components and modular code blocks, improving interface consistency and speeding up development and prototyping."
        },
        {
          number: "03",
          title: "Designing a Clean and Intuitive Interface",
          description: "Created a visually clear, user-friendly UI that prioritized ease of navigation and accessibility for all students."
        }
      ]
    },
    result: {
      headline: "Simple Navigation, and Efficiency at Every Step",
      description: "As a result, the NDP mobile application increased efficiency by over 30% compared to the traditional paper-based process, significantly reducing the time and effort required for due clearance. The app's clean, user-friendly interface and intuitive navigation allowed students to complete their tasks quickly and accurately, while real-time updates and interactive features ensured a seamless and reliable experience for both students and administrators.",
      stats: [
        { value: "30%+", label: "Increased efficiency compared to traditional paper-based process" },
        { value: "100%", label: "Real-time updates for students and administrators" },
        { value: "3x", label: "Faster due clearance completion time" }
      ]
    }
  },
]

export function ProjectDetail({ isOpen, onClose, currentProject }: ProjectDetailProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [projectNumber, setProjectNumber] = useState(1)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [detailScrollProgress, setDetailScrollProgress] = useState(0)
  const [activeResponsibilityIndex, setActiveResponsibilityIndex] = useState(0)
  const [linePhase, setLinePhase] = useState<'overview' | 'transition-to-role' | 'role' | 'transition-to-result' | 'result' | 'transition-to-bottom' | 'bottom'>('overview')
  const [lineProgress, setLineProgress] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const detailScrollRef = useRef<HTMLDivElement>(null)
  const myRoleSectionRef = useRef<HTMLDivElement>(null)
  const responsibilitiesContainerRef = useRef<HTMLDivElement>(null)
  const overviewSectionRef = useRef<HTMLDivElement>(null)
  const resultSectionRef = useRef<HTMLDivElement>(null)
  const bottomSectionRef = useRef<HTMLDivElement>(null)

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

  // Removed auto-scroll - let user scroll manually
  useEffect(() => {
    if (!isOpen) return
    // Reset scroll position to top when opening
    const container = scrollContainerRef.current
    if (container) {
      container.scrollTop = 0
    }
  }, [isOpen])

  // Scroll progress and sticky responsibility handling for detail modal
  useEffect(() => {
    if (!selectedProject) {
      setDetailScrollProgress(0)
      setActiveResponsibilityIndex(0)
      setLinePhase('overview')
      setLineProgress(0)
      return
    }

    const container = detailScrollRef.current
    if (!container) return

    const handleDetailScroll = () => {
      // Calculate overall scroll progress
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const progress = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0
      setDetailScrollProgress(Math.min(Math.max(progress, 0), 100))

      // Get section positions for line animation
      const overviewSection = overviewSectionRef.current
      const myRoleSection = myRoleSectionRef.current
      const resultSection = resultSectionRef.current
      const bottomSection = bottomSectionRef.current
      const containerRect = container.getBoundingClientRect()

      if (overviewSection && myRoleSection && resultSection && bottomSection) {
        const overviewRect = overviewSection.getBoundingClientRect()
        const myRoleRect = myRoleSection.getBoundingClientRect()
        const resultRect = resultSection.getBoundingClientRect()
        const bottomRect = bottomSection.getBoundingClientRect()
        
        const viewportCenter = containerRect.top + containerRect.height / 2
        
        // Calculate transition zones
        const overviewBottom = overviewRect.bottom
        const myRoleTop = myRoleRect.top
        const myRoleBottom = myRoleRect.bottom
        const resultTop = resultRect.top
        const resultBottom = resultRect.bottom
        const bottomTop = bottomRect.top

        // Determine line phase based on scroll position
        if (overviewRect.top > containerRect.top - 100) {
          // Still in overview
          setLinePhase('overview')
          setLineProgress(0)
        } else if (myRoleTop > viewportCenter) {
          // Transitioning from overview to my role
          const transitionStart = overviewBottom - containerRect.height
          const transitionEnd = myRoleTop - containerRect.height / 2
          const transitionProgress = Math.min(1, Math.max(0, (viewportCenter - overviewBottom) / (myRoleTop - overviewBottom)))
          setLinePhase('transition-to-role')
          setLineProgress(transitionProgress)
        } else if (myRoleBottom > viewportCenter + 200) {
          // In my role section
          setLinePhase('role')
          setLineProgress(1)
        } else if (resultTop > viewportCenter) {
          // Transitioning from my role to result
          const transitionProgress = Math.min(1, Math.max(0, (viewportCenter - myRoleBottom + 200) / (resultTop - myRoleBottom + 200)))
          setLinePhase('transition-to-result')
          setLineProgress(transitionProgress)
        } else if (bottomTop > viewportCenter) {
          // In result section
          setLinePhase('result')
          setLineProgress(1)
        } else if (bottomRect.bottom > containerRect.bottom) {
          // Transitioning from result to bottom
          const transitionProgress = Math.min(1, Math.max(0, (viewportCenter - resultBottom) / (bottomTop - resultBottom)))
          setLinePhase('transition-to-bottom')
          setLineProgress(transitionProgress)
        } else {
          // At bottom
          setLinePhase('bottom')
          setLineProgress(1)
        }
      }

      // Handle responsibility highlighting based on scroll position
      const responsibilitiesContainer = responsibilitiesContainerRef.current
      if (responsibilitiesContainer && myRoleSection) {
        const containerTop = myRoleSection.getBoundingClientRect().top
        const viewportHeight = container.clientHeight
        const responsibilityCount = selectedProject.role?.responsibilities.length || 3
        
        // Calculate which responsibility should be highlighted based on section scroll
        if (containerTop < viewportHeight * 0.5 && containerTop > -myRoleSection.offsetHeight + viewportHeight * 0.5) {
          const scrollProgress = (viewportHeight * 0.5 - containerTop) / myRoleSection.offsetHeight
          const newIndex = Math.min(
            Math.max(0, Math.floor(scrollProgress * responsibilityCount)),
            responsibilityCount - 1
          )
          setActiveResponsibilityIndex(newIndex)
        }
      }
    }

    container.addEventListener("scroll", handleDetailScroll, { passive: true })
    handleDetailScroll()

    return () => container.removeEventListener("scroll", handleDetailScroll)
  }, [selectedProject])

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
        <div ref={detailScrollRef} className="fixed inset-0 bg-white z-50 overflow-y-auto">
          {/* Header Section */}
          <div className="relative h-screen">
            <img 
              src={selectedProject.mockupImage} 
              alt={selectedProject.detailTitle || selectedProject.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient fade to black at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 via-30% to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="fixed top-6 right-6 z-10 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Project Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{selectedProject.detailTitle || selectedProject.title}</h1>
                <p className="text-base md:text-lg text-white/60 mb-4">{selectedProject.location}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-xs"
                  >
                    {tag}
                  </span>
                ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-black text-white relative">
            {/* Interactive Particle Background */}
            <ParticleBackground />
            
            {/* Fixed Scroll Progress Indicator - Middle right */}
            <div className="fixed top-1/2 right-6 md:right-12 lg:right-16 z-50 -translate-y-1/2">
              <span className="text-white/40 text-sm font-mono">{detailScrollProgress}%</span>
            </div>
            
            {/* Animated Line - Single continuous line that travels across the screen */}
            <div className="sticky top-0 pointer-events-none z-40 h-0">
              <div className="relative h-screen overflow-hidden">
                {/* Single moving line element */}
                <div 
                  className="absolute w-0.5 bg-[#3AC2FF] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    // Vertical line height
                    height: linePhase === 'transition-to-bottom' || linePhase === 'bottom' 
                      ? '0%' 
                      : '50%',
                    // Position based on phase
                    left: linePhase === 'overview' 
                      ? '1.5rem'
                      : linePhase === 'transition-to-role'
                        ? `calc(1.5rem + ${lineProgress * (100 - 3)}%)`
                        : linePhase === 'role'
                          ? 'calc(100% - 1.5rem)'
                          : linePhase === 'transition-to-result'
                            ? `calc(${(1 - lineProgress) * (100 - 3)}% + 1.5rem)`
                            : linePhase === 'result' || linePhase === 'transition-to-bottom'
                              ? '1.5rem'
                              : '1.5rem',
                    top: '25%',
                    transform: (linePhase === 'role' || linePhase === 'transition-to-role') 
                      ? 'translateX(-100%)' 
                      : 'translateX(0)',
                  }}
                />
                
                {/* Horizontal line at bottom - grows from center */}
                <div 
                  className={`absolute h-0.5 bg-[#3AC2FF] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    linePhase === 'transition-to-bottom' || linePhase === 'bottom' 
                      ? 'opacity-100' 
                      : 'opacity-0'
                  }`}
                  style={{
                    bottom: '15%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: linePhase === 'transition-to-bottom' 
                      ? `${lineProgress * 400}px` 
                      : linePhase === 'bottom' 
                        ? '400px'
                        : '0px',
                  }}
                />
              </div>
            </div>

            {/* Overview Section - Left aligned */}
            <section ref={overviewSectionRef} className="py-20 md:py-32">
              <div className="px-6 md:px-12 lg:px-16">
                {/* Section Header - Left aligned */}
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-[#3AC2FF] text-xs tracking-widest">---</span>
                  <span className="text-[#3AC2FF] text-xs tracking-widest uppercase">Overview</span>
                </div>

                {/* Overview Content - line handled by SVG now */}
                <div className="relative pl-8 md:pl-12">
                  <div className="max-w-3xl">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight mb-8 whitespace-nowrap">
                      {selectedProject.overview?.headline}
                    </h2>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed">
                      {selectedProject.overview?.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* My Role Section - Right aligned */}
            <section 
              ref={myRoleSectionRef}
              className="py-20 md:py-32 relative"
            >
              {/* Glowing blue circle - left side for project 2 */}
              {selectedProject.id === 2 && (
                <div 
                  className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[40rem] h-[40rem] md:w-[56rem] md:h-[56rem] rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(58, 194, 255, 0.6) 0%, rgba(58, 194, 255, 0.4) 25%, rgba(58, 194, 255, 0.2) 45%, rgba(58, 194, 255, 0.05) 65%, transparent 85%)',
                    filter: 'blur(30px)',
                  }}
                />
              )}
              <div className="px-6 md:px-12 lg:px-16 relative z-10">
                {/* Section Header - Right aligned */}
                <div className="flex items-center justify-end gap-4 mb-12">
                  <span className="text-[#3AC2FF] text-xs tracking-widest uppercase">My Role</span>
                  <span className="text-[#3AC2FF] text-xs tracking-widest">---</span>
                </div>

                {/* Role Content */}
                <div className="flex justify-end">
                  <div className="relative pr-8 md:pr-12 max-w-4xl">
                    {/* Role Title */}
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight whitespace-nowrap">
                        {selectedProject.role?.title}
                        <span className="text-white/40 mx-3">{"•"}</span>
                        {selectedProject.role?.subtitle}
                      </h2>
                    </div>
                    
                    {/* Role Description */}
                    <div className="max-w-3xl mb-12">
                      <p className="text-white/60 text-base md:text-lg leading-relaxed">
                        {selectedProject.role?.description}
                      </p>
                    </div>

                    {/* All Responsibilities - Smooth scroll reveal */}
                    <div ref={responsibilitiesContainerRef} className="mt-12 space-y-16">
                      {selectedProject.role?.responsibilities.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="grid md:grid-cols-12 gap-6 md:gap-12 transition-all duration-700 ease-out"
                          style={{
                            opacity: Math.max(0.3, 1 - Math.abs(idx - activeResponsibilityIndex) * 0.35),
                            transform: `translateY(${Math.abs(idx - activeResponsibilityIndex) * 5}px)`,
                          }}
                        >
                          {/* Number */}
                          <div className="md:col-span-1">
                            <span className={`text-sm font-mono transition-colors duration-500 ${
                              idx === activeResponsibilityIndex ? 'text-[#3AC2FF]' : 'text-white/30'
                            }`}>{item.number}</span>
                          </div>
                          
                          {/* Content */}
                          <div className="md:col-span-11 max-w-2xl">
                            <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors duration-500 ${
                              idx === activeResponsibilityIndex ? 'text-white' : 'text-white/60'
                            }`}>
                              {item.title}
                            </h3>
                            <p className={`text-base leading-relaxed transition-colors duration-500 ${
                              idx === activeResponsibilityIndex ? 'text-white/70' : 'text-white/40'
                            }`}>
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

            {/* Result Section - Left aligned */}
            <section ref={resultSectionRef} className="py-20 md:py-32 relative">
              {/* Glowing blue circle - right side for projects 1 and 3 */}
              {(selectedProject.id === 1 || selectedProject.id === 3) && (
                <div 
                  className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] md:w-[56rem] md:h-[56rem] rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(58, 194, 255, 0.6) 0%, rgba(58, 194, 255, 0.4) 25%, rgba(58, 194, 255, 0.2) 45%, rgba(58, 194, 255, 0.05) 65%, transparent 85%)',
                    filter: 'blur(30px)',
                  }}
                />
              )}
              <div className="px-6 md:px-12 lg:px-16 relative z-10">
                {/* Section Header - Left aligned */}
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-[#3AC2FF] text-xs tracking-widest">---</span>
                  <span className="text-[#3AC2FF] text-xs tracking-widest uppercase">Result</span>
                </div>

                {/* Result Content - line handled by SVG now */}
                <div className="relative pl-8 md:pl-12">
                  <div className="max-w-3xl mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight mb-8 whitespace-nowrap">
                      {selectedProject.result?.headline}
                    </h2>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed">
                      {selectedProject.result?.description}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {selectedProject.result?.stats.map((stat, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white/5 border border-white/10 rounded-lg p-6"
                      >
                        <span className="text-[#3AC2FF] text-4xl md:text-5xl font-light block mb-4">
                          {stat.value}
                        </span>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Next Project Section */}
            <section ref={bottomSectionRef} className="py-16 md:py-24 relative z-10">
              <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 text-center">
                <span className="text-white/40 text-xs tracking-widest uppercase block mb-4">Next Project</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  {projects[(projects.findIndex(p => p.id === selectedProject.id) + 1) % projects.length].title}
                </h3>
                <button
                  onClick={() => {
                    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
                    const nextIndex = (currentIndex + 1) % projects.length
                    const nextProject = projects[nextIndex]
                    
                    // Reset scroll position first
                    if (detailScrollRef.current) {
                      detailScrollRef.current.scrollTop = 0
                    }
                    
                    // Reset line state
                    setActiveResponsibilityIndex(0)
                    setLinePhase('overview')
                    setLineProgress(0)
                    
                    // Then set the new project
                    setSelectedProject(nextProject)
                  }}
                  className="relative z-50 inline-flex items-center px-8 py-3 border border-white/30 text-white text-sm tracking-widest uppercase bg-transparent hover:bg-gray-500/30 transition-all duration-300 cursor-pointer"
                >
                  View Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                {/* Horizontal Line - now handled by SVG animation */}
                <div className="mt-16 h-8" />
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  )
}
