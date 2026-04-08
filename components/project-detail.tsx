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
    }
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
          <div className="bg-black text-white">
            {/* Overview Section */}
            <section className="py-20 md:py-32 border-b border-white/10">
              <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <span className="text-white/40 text-xs tracking-widest">---</span>
                    <span className="text-[#3AC2FF] text-xs tracking-widest uppercase">Overview</span>
                  </div>
                  <span className="text-white/40 text-sm">33%</span>
                </div>

                {/* Overview Content */}
                <div className="max-w-3xl">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8 text-balance">
                    {selectedProject.overview?.headline}
                  </h2>
                  <p className="text-white/60 text-base md:text-lg leading-relaxed">
                    {selectedProject.overview?.description}
                  </p>
                </div>
              </div>
            </section>

            {/* My Role Section */}
            <section className="py-20 md:py-32">
              <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
                {/* Section Header */}
                <div className="flex items-center justify-end mb-12">
                  <div className="flex items-center gap-4">
                    <span className="text-[#3AC2FF] text-xs tracking-widest uppercase">My Role</span>
                    <span className="text-white/40 text-xs tracking-widest">---</span>
                  </div>
                </div>

                {/* Role Title */}
                <div className="max-w-3xl mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
                    {selectedProject.role?.title}
                    <span className="text-white/40 mx-3">{"•"}</span>
                    {selectedProject.role?.subtitle}
                  </h2>
                  <p className="text-white/60 text-base md:text-lg leading-relaxed">
                    {selectedProject.role?.description}
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="space-y-12 mt-16">
                  {selectedProject.role?.responsibilities.map((item, idx) => (
                    <div key={idx} className="grid md:grid-cols-12 gap-6 md:gap-12">
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
                </div>
              </div>
            </section>

            {/* View Project Button Section */}
            <section className="py-16 md:py-24">
              <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 text-center">
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
            </section>
          </div>
        </div>
      )}
    </>
  )
}
