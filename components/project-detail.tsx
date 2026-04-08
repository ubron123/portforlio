"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface ProjectDetailProps {
  isOpen: boolean
  onClose: () => void
  currentProject: number
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
    year: "2024",
    tags: ["DESIGNING", "FRONTEND DEV", "BACKEND DEV"],
    description:
      "VEGO is an innovative car rental platform that optimizes the use of idle vehicles, with a focus especially on the Moroccan market.",
    backgroundImage: "/vego.png",
    mockupType: "laptop" as const,
    mockupImage: "/vego.png",
    overview: {
      headline: "Turning Visual Ideas Into Powerful Interfaces",
      description: "VeGo, a car rental and peer-to-peer vehicle lending platform focused on optimizing underutilized vehicles, faced challenges stemming from high user interaction and an inconsistent user interface. Additionally, strict time constraints demanded the rapid development of a cohesive and user-friendly design, making the situation both complex and time-sensitive",
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
    year: "2024",
    tags: ["DESIGNING", "FRONTEND DEV", "BACKEND DEV"],
    description:
      "Scan2Dine is a restaurant digital menu application that allows cafe/Restaurant to customers to place orders and track them in real-time.",
    backgroundImage: "/scan2dine.png",
    mockupType: "laptop" as const,
    mockupImage: "/scan2dine.png",
    overview: {
      headline: "Streamlining Restaurant Operations Through Digital Innovation",
      description: "Scan2Dine aimed to revolutionize the traditional restaurant ordering experience by eliminating paper menus and manual order-taking. The challenge was creating an intuitive interface that both customers and restaurant staff could adopt quickly while ensuring real-time synchronization between orders and kitchen operations.",
    },
    role: {
      title: "Full Stack Developer",
      subtitle: "End-to-End System Design",
      description: "I led the full stack development of Scan2Dine, from conceptualizing the user experience to implementing the backend infrastructure. My focus was on creating a seamless flow between customer ordering and kitchen management systems.",
      responsibilities: [
        {
          number: "01",
          title: "Building the digital menu system",
          description: "Designing and implementing a flexible menu management system that allows restaurants to easily update items, prices, and availability in real-time across all customer-facing interfaces."
        },
        {
          number: "02",
          title: "Real-time order tracking",
          description: "Implementing WebSocket-based communication for instant order updates, ensuring customers and staff have synchronized information about order status and preparation times."
        },
        {
          number: "03",
          title: "QR code integration",
          description: "Developing the QR code generation and scanning system that enables customers to access menus and place orders directly from their smartphones without downloading any application."
        }
      ]
    },
    result: {
      headline: "Seamless Ordering Experience Delivered",
      description: "The implementation resulted in significant improvements in restaurant operational efficiency. Order accuracy increased while wait times decreased, creating a better experience for both customers and staff.",
      stats: [
        { value: "40%", label: "Reduction in order processing time from table to kitchen" },
        { value: "95%", label: "Order accuracy rate achieved through digital menu system" },
        { value: "2x", label: "Increase in table turnover during peak hours" }
      ]
    }
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
    overview: {
      headline: "Digitizing Academic Resource Sharing",
      description: "GGT College needed a modern solution to replace their outdated paper-based book lending system. The existing process was time-consuming, prone to errors, and created unnecessary administrative burden on both students and staff.",
    },
    role: {
      title: "Mobile Developer",
      subtitle: "Native App Development",
      description: "I spearheaded the mobile application development for NDP, focusing on creating an intuitive and efficient user experience for students to browse, request, and manage book loans entirely through their mobile devices.",
      responsibilities: [
        {
          number: "01",
          title: "Designing the mobile experience",
          description: "Creating a clean, student-friendly interface that simplifies the book discovery and borrowing process, with features like search, filtering, and personalized recommendations."
        },
        {
          number: "02",
          title: "Implementing the lending system",
          description: "Building the core functionality for book requests, approvals, due date tracking, and return processing, all synchronized with the college library database."
        },
        {
          number: "03",
          title: "Notification and reminder system",
          description: "Developing push notification capabilities to keep students informed about loan approvals, upcoming due dates, and new book availability based on their interests."
        }
      ]
    },
    result: {
      headline: "Paperless Library Management Achieved",
      description: "The NDP application successfully transformed the college library operations, eliminating paper-based processes entirely while improving student satisfaction with the book borrowing experience.",
      stats: [
        { value: "100%", label: "Paperless book lending process achieved for the college" },
        { value: "60%", label: "Reduction in administrative workload for library staff" },
        { value: "85%", label: "Student adoption rate within the first semester" }
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

    let isInStickyMode = false
    let stickyStartScroll = 0
    const responsibilityCount = selectedProject.role?.responsibilities.length || 3
    const scrollPerResponsibility = 150 // pixels of scroll per responsibility change

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

      // Handle sticky responsibility scrolling
      if (!myRoleSection) return

      const sectionRect = myRoleSection.getBoundingClientRect()
      
      // Check if My Role section is in the viewport center area
      const sectionTopInView = sectionRect.top - containerRect.top
      const viewportHeight = container.clientHeight
      const sectionCenterTrigger = viewportHeight * 0.3 // Trigger when section is 30% from top

      if (sectionTopInView <= sectionCenterTrigger && sectionTopInView > -myRoleSection.offsetHeight + viewportHeight) {
        if (!isInStickyMode) {
          isInStickyMode = true
          stickyStartScroll = scrollTop
        }

        // Calculate which responsibility should be active based on scroll within sticky mode
        const scrollInStickyMode = scrollTop - stickyStartScroll
        const newIndex = Math.min(
          Math.max(0, Math.floor(scrollInStickyMode / scrollPerResponsibility)),
          responsibilityCount - 1
        )
        setActiveResponsibilityIndex(newIndex)
      } else {
        isInStickyMode = false
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
          <div className="bg-black text-white relative">
            {/* Animated Line - CSS-based approach */}
            <div className="fixed pointer-events-none z-50 inset-0">
              {/* Overview line - left side vertical */}
              <div 
                className={`absolute left-6 md:left-12 lg:left-16 top-1/4 w-0.5 h-1/2 bg-[#3AC2FF] transition-all duration-700 ease-out ${
                  linePhase === 'overview' 
                    ? 'opacity-100 scale-y-100' 
                    : linePhase === 'transition-to-role'
                      ? 'opacity-100 scale-y-100'
                      : 'opacity-0 scale-y-0'
                }`}
                style={{
                  transformOrigin: linePhase === 'transition-to-role' ? 'bottom' : 'top',
                  transform: linePhase === 'transition-to-role' 
                    ? `scaleY(${1 - lineProgress}) translateY(0)` 
                    : undefined,
                }}
              />
              
              {/* Connecting diagonal line - overview to role */}
              <div 
                className={`absolute bg-[#3AC2FF] transition-all duration-300 ${
                  linePhase === 'transition-to-role' ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  left: `calc(1.5rem + ${lineProgress * 80}%)`,
                  top: '50%',
                  width: '2px',
                  height: linePhase === 'transition-to-role' ? `${lineProgress * 30}%` : '0%',
                  transformOrigin: 'top',
                }}
              />
              
              {/* My Role line - right side vertical */}
              <div 
                className={`absolute right-6 md:right-12 lg:right-16 top-1/4 w-0.5 h-1/2 bg-[#3AC2FF] transition-all duration-700 ease-out ${
                  linePhase === 'role' 
                    ? 'opacity-100 scale-y-100' 
                    : linePhase === 'transition-to-role'
                      ? 'opacity-100'
                      : linePhase === 'transition-to-result'
                        ? 'opacity-100'
                        : 'opacity-0 scale-y-0'
                }`}
                style={{
                  transformOrigin: 'top',
                  transform: linePhase === 'transition-to-role' 
                    ? `scaleY(${lineProgress})` 
                    : linePhase === 'transition-to-result'
                      ? `scaleY(${1 - lineProgress})`
                      : undefined,
                }}
              />
              
              {/* Connecting diagonal line - role to result */}
              <div 
                className={`absolute bg-[#3AC2FF] transition-all duration-300 ${
                  linePhase === 'transition-to-result' ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  right: `calc(1.5rem + ${lineProgress * 80}%)`,
                  top: '50%',
                  width: '2px',
                  height: linePhase === 'transition-to-result' ? `${lineProgress * 30}%` : '0%',
                  transformOrigin: 'top',
                }}
              />
              
              {/* Result line - left side vertical */}
              <div 
                className={`absolute left-6 md:left-12 lg:left-16 top-1/4 w-0.5 h-1/2 bg-[#3AC2FF] transition-all duration-700 ease-out ${
                  linePhase === 'result' 
                    ? 'opacity-100 scale-y-100' 
                    : linePhase === 'transition-to-result'
                      ? 'opacity-100'
                      : linePhase === 'transition-to-bottom'
                        ? 'opacity-100'
                        : 'opacity-0 scale-y-0'
                }`}
                style={{
                  transformOrigin: 'top',
                  transform: linePhase === 'transition-to-result' 
                    ? `scaleY(${lineProgress})` 
                    : linePhase === 'transition-to-bottom'
                      ? `scaleY(${1 - lineProgress})`
                      : undefined,
                }}
              />
              
              {/* Bottom horizontal line */}
              <div 
                className={`absolute left-6 md:left-12 lg:left-16 bottom-[15%] h-0.5 bg-[#3AC2FF] transition-all duration-700 ease-out ${
                  linePhase === 'bottom' 
                    ? 'opacity-100' 
                    : linePhase === 'transition-to-bottom'
                      ? 'opacity-100'
                      : 'opacity-0'
                }`}
                style={{
                  width: linePhase === 'transition-to-bottom' 
                    ? `calc(${lineProgress * 100}% - 3rem)` 
                    : linePhase === 'bottom' 
                      ? 'calc(100% - 3rem)'
                      : '0%',
                  transformOrigin: 'left',
                }}
              />
            </div>

            {/* Overview Section - Left aligned */}
            <section ref={overviewSectionRef} className="py-20 md:py-32">
              <div className="px-6 md:px-12 lg:px-16">
                {/* Section Header - Left aligned */}
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-[#3AC2FF] text-xs tracking-widest">---</span>
                  <span className="text-[#3AC2FF] text-xs tracking-widest uppercase">Overview</span>
                  <span className="text-white/40 text-sm ml-auto">{detailScrollProgress}%</span>
                </div>

                {/* Overview Content - line handled by SVG now */}
                <div className="relative pl-8 md:pl-12">
                  <div className="max-w-3xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8 text-balance">
                      {selectedProject.overview?.headline}
                    </h2>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed">
                      {selectedProject.overview?.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* My Role Section - Right aligned with vertical line on right */}
            {/* This section has sticky scroll behavior for responsibilities */}
            <section 
              ref={myRoleSectionRef}
              className="min-h-[300vh] relative"
            >
              {/* Sticky container that stays in view while scrolling through responsibilities */}
              <div className="sticky top-0 h-screen flex items-center">
                <div className="w-full px-6 md:px-12 lg:px-16 py-20">
                  {/* Section Header - Right aligned */}
                  <div className="flex items-center justify-end gap-4 mb-12">
                    <span className="text-[#3AC2FF] text-xs tracking-widest uppercase">My Role</span>
                    <span className="text-[#3AC2FF] text-xs tracking-widest">---</span>
                  </div>

                  {/* Role Content - line handled by SVG now */}
                  <div className="flex justify-end">
                    <div className="relative pr-8 md:pr-12 max-w-4xl">
                      {/* Role Title */}
                      <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
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

                      {/* Single Responsibility - Only shows active one with transition */}
                      <div ref={responsibilitiesContainerRef} className="mt-12 relative min-h-[180px]">
                        {selectedProject.role?.responsibilities.map((item, idx) => (
                          <div 
                            key={idx} 
                            className={`grid md:grid-cols-12 gap-6 md:gap-12 transition-all duration-500 ease-out ${
                              idx === activeResponsibilityIndex 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 absolute inset-0 translate-y-8 pointer-events-none'
                            }`}
                          >
                            {/* Number */}
                            <div className="md:col-span-1">
                              <span className="text-white/30 text-sm font-mono">{item.number}</span>
                            </div>
                            
                            {/* Content */}
                            <div className="md:col-span-11 max-w-2xl">
                              <h3 className="text-white text-lg md:text-xl font-semibold mb-3">
                                {item.title}
                              </h3>
                              <p className="text-white/50 text-base leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        {/* Progress indicators */}
                        <div className="flex gap-2 mt-8">
                          {selectedProject.role?.responsibilities.map((_, idx) => (
                            <div 
                              key={idx}
                              className={`h-1 w-8 rounded-full transition-all duration-300 ${
                                idx === activeResponsibilityIndex 
                                  ? 'bg-[#3AC2FF]' 
                                  : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Result Section - Left aligned */}
            <section ref={resultSectionRef} className="py-20 md:py-32">
              <div className="px-6 md:px-12 lg:px-16">
                {/* Section Header - Left aligned */}
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-[#3AC2FF] text-xs tracking-widest">---</span>
                  <span className="text-[#3AC2FF] text-xs tracking-widest uppercase">Result</span>
                </div>

                {/* Result Content - line handled by SVG now */}
                <div className="relative pl-8 md:pl-12">
                  <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8 text-balance">
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
            <section ref={bottomSectionRef} className="py-16 md:py-24">
              <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 text-center">
                <span className="text-white/40 text-xs tracking-widest uppercase block mb-4">Next Project</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  {projects[(projects.findIndex(p => p.id === selectedProject.id) + 1) % projects.length].title}
                </h3>
                <button
                  onClick={() => {
                    const nextIndex = (projects.findIndex(p => p.id === selectedProject.id) + 1) % projects.length
                    setSelectedProject(projects[nextIndex])
                    // Reset scroll position and line state
                    if (detailScrollRef.current) {
                      detailScrollRef.current.scrollTop = 0
                    }
                    setActiveResponsibilityIndex(0)
                    setLinePhase('overview')
                    setLineProgress(0)
                  }}
                  className="inline-flex items-center px-8 py-3 border border-white/30 text-white text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
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
