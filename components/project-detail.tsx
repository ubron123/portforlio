"use client"

import { useState, useEffect, useRef } from "react"

interface ProjectDetailProps {
  isOpen: boolean
  onClose: () => void
  currentProject: number
}

interface ProjectSection {
  id: string
  label: string
  title: string
  content: string[]
}

interface ProjectData {
  id: number
  number: string
  title: string
  subtitle: string
  year: string
  tags: string[]
  description: string
  mockupImage: string
  role: string
  overview: string
  sections: ProjectSection[]
}

const projects: ProjectData[] = [
  {
    id: 1,
    number: "01",
    title: "VEGO",
    subtitle: "Idle No More",
    year: "2024",
    tags: ["Rental Platform", "#READ", "#ToDriving"],
    description:
      "VeGo, a car rental and peer-to-peer vehicle lending platform focused on optimizing underutilized vehicles, faced challenges stemming from high user interaction and an inconsistent user interface. Additionally, strict time constraints demanded the rapid development of a cohesive and user-friendly design, making the situation both complex and time-sensitive.",
    mockupImage: "/vego.png",
    role: "Frontend Developer + Core Interface Designing",
    overview: "Turning Visual Ideas Into Powerful Interfaces",
    sections: [
      {
        id: "role",
        label: "MY ROLE",
        title: "Frontend Developer + Core Interface Designing",
        content: [
          "I served as a Frontend Developer for Team VeGo. Throughout the development process, I collaborated closely with designers and other developers to ensure a consistent and cohesive user interface. This collaborative effort led to the consolidation of existing systems and ultimately contributed to the formation of a unified core development team.",
        ],
      },
      {
        id: "systems",
        label: "CONSOLIDATING",
        title: "Consolidating fragmented component systems",
        content: [
          "Auditing components across internal tools and customer-facing products, identifying duplicated patterns and inconsistencies, and merging the two existing design systems into a unified foundation.",
        ],
      },
      {
        id: "tokens",
        label: "DESIGN TOKENS",
        title: "Establishing design token architecture",
        content: [
          "Creating a comprehensive token system for colors, typography, spacing, and elevation that scales across products while maintaining visual consistency.",
        ],
      },
      {
        id: "components",
        label: "COMPONENTS",
        title: "Building accessible component library",
        content: [
          "Developing a robust set of reusable React components with full accessibility support, comprehensive documentation, and thorough testing coverage.",
        ],
      },
    ],
  },
  {
    id: 2,
    number: "02",
    title: "SCAN2DINE",
    subtitle: "Digital Dining",
    year: "2024",
    tags: ["Restaurant Tech", "#QRMenu", "#Ordering"],
    description:
      "Scan2Dine is a restaurant digital menu application that allows cafe/Restaurant customers to place orders and track them in real-time, revolutionizing the traditional dining experience.",
    mockupImage: "/scan2dine.png",
    role: "Full Stack Developer + UX Designer",
    overview: "Revolutionizing Restaurant Ordering Experience",
    sections: [
      {
        id: "role",
        label: "MY ROLE",
        title: "Full Stack Developer + UX Designer",
        content: [
          "Led the complete development cycle from concept to deployment, designing intuitive user flows for both customers and restaurant staff while building a scalable backend infrastructure.",
        ],
      },
      {
        id: "challenge",
        label: "CHALLENGE",
        title: "Creating seamless ordering flow",
        content: [
          "Developed a frictionless QR-based ordering system that reduces wait times and improves order accuracy while maintaining the personal touch of traditional dining.",
        ],
      },
      {
        id: "realtime",
        label: "REAL-TIME",
        title: "Live order tracking system",
        content: [
          "Implemented WebSocket-based real-time updates for order status, kitchen management, and customer notifications.",
        ],
      },
      {
        id: "analytics",
        label: "ANALYTICS",
        title: "Restaurant analytics dashboard",
        content: [
          "Built comprehensive analytics tools for restaurant owners to track sales, popular items, and customer behavior patterns.",
        ],
      },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "NDP",
    subtitle: "Book Sharing",
    year: "2025",
    tags: ["Education", "#Mobile", "#Sharing"],
    description:
      "NDP is a mobile application specifically developed for GGT College to streamline the book-sharing process, eliminating the need for students to handle paperwork manually.",
    mockupImage: "/ndp.png",
    role: "Mobile Developer + Backend Engineer",
    overview: "Simplifying Campus Book Exchange",
    sections: [
      {
        id: "role",
        label: "MY ROLE",
        title: "Mobile Developer + Backend Engineer",
        content: [
          "Designed and developed the complete mobile application using React Native, along with building a robust backend API to handle book listings, user authentication, and transaction management.",
        ],
      },
      {
        id: "ux",
        label: "USER EXPERIENCE",
        title: "Student-first mobile design",
        content: [
          "Created an intuitive mobile experience optimized for quick book searches, listings, and peer-to-peer communication between students.",
        ],
      },
      {
        id: "matching",
        label: "MATCHING",
        title: "Smart book matching algorithm",
        content: [
          "Developed an intelligent system that matches book seekers with available listings based on course requirements, location, and pricing preferences.",
        ],
      },
      {
        id: "trust",
        label: "TRUST & SAFETY",
        title: "Building campus trust",
        content: [
          "Implemented verification systems using college credentials and a rating system to ensure safe transactions between students.",
        ],
      },
    ],
  },
]

export function ProjectDetail({ isOpen, onClose, currentProject }: ProjectDetailProps) {
  const [activeSection, setActiveSection] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [linePositions, setLinePositions] = useState<{ progress: number; direction: "ltr" | "rtl" }[]>([])

  const projectData = projects.find((p) => p.id === currentProject) || projects[0]

  useEffect(() => {
    if (!isOpen) return

    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const windowHeight = container.clientHeight

      // Calculate line positions for each section
      const newPositions = sectionRefs.current.map((ref, index) => {
        if (!ref) return { progress: 0, direction: (index % 2 === 0 ? "ltr" : "rtl") as "ltr" | "rtl" }

        const rect = ref.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const relativeTop = rect.top - containerRect.top
        const sectionMiddle = relativeTop + rect.height / 2
        const viewportMiddle = windowHeight / 2

        // Calculate progress based on section position relative to viewport
        let progress = 0
        if (sectionMiddle < viewportMiddle + 200) {
          progress = Math.min(1, Math.max(0, 1 - (sectionMiddle - viewportMiddle + 200) / 400))
        }
        if (relativeTop < windowHeight * 0.3) {
          progress = 1
        }

        return {
          progress,
          direction: (index % 2 === 0 ? "ltr" : "rtl") as "ltr" | "rtl",
        }
      })

      setLinePositions(newPositions)

      // Update active section
      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        if (rect.top - containerRect.top < windowHeight * 0.5) {
          setActiveSection(index)
        }
      })
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen, projectData])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Reset scroll position when opening
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
      }
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-black"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[60] w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20"
        aria-label="Close project details"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Hero Section with Laptop Mockup */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-black" />

        {/* Laptop Mockup Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-16 pb-8">
          {/* Laptop Frame */}
          <div className="relative mx-auto" style={{ maxWidth: "900px" }}>
            {/* Screen */}
            <div className="relative bg-black rounded-t-xl overflow-hidden border-[8px] border-neutral-800 shadow-2xl">
              <div className="aspect-[16/10] relative overflow-hidden">
                {/* Screen Content */}
                <img
                  src={projectData.mockupImage}
                  alt={`${projectData.title} interface`}
                  className="w-full h-full object-cover object-top"
                  crossOrigin="anonymous"
                />
                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Webcam Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-700 rounded-full" />
            </div>

            {/* Laptop Base */}
            <div className="relative h-4 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-b-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-neutral-600 rounded-b-lg" />
            </div>

            {/* Laptop Stand/Shadow */}
            <div className="relative h-2 mx-auto w-[60%] bg-gradient-to-b from-neutral-800 to-transparent rounded-b-xl" />
          </div>

          {/* Project Label Badge */}
          <div className="absolute bottom-12 right-8 md:right-16 flex items-center gap-3 bg-neutral-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
              <span className="text-white/60 text-xs font-mono">{projectData.number}</span>
            </div>
            <span className="text-white font-medium tracking-wide">{projectData.title}</span>
            <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Project Title Overlay */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white/90 italic tracking-tight">
            {projectData.subtitle}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-white/40 text-sm">Thursday</span>
            <span className="text-white/20">|</span>
            <span className="text-white/40 text-sm">Eifajar</span>
            {projectData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Gradient Fade to Black */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </section>

      {/* Overview Section */}
      <section className="relative bg-black py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Overview</span>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">33%</span>
          </div>

          {/* Overview Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight">
            {projectData.overview}
          </h2>

          {/* Overview Description */}
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl">{projectData.description}</p>
        </div>
      </section>

      {/* Content Sections with Animated Line */}
      <section className="relative bg-black pb-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {projectData.sections.map((section, index) => {
            const linePos = linePositions[index] || { progress: 0, direction: "ltr" }
            const isLTR = linePos.direction === "ltr"

            return (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[index] = el
                }}
                className="relative py-16 md:py-24"
              >
                {/* Animated Horizontal Line */}
                <div className="relative h-px w-full mb-12 overflow-hidden">
                  {/* Background Line */}
                  <div className="absolute inset-0 bg-white/10" />

                  {/* Animated Progress Line */}
                  <div
                    className="absolute top-0 h-full bg-white/60 transition-all duration-300 ease-out"
                    style={{
                      width: `${linePos.progress * 100}%`,
                      left: isLTR ? 0 : "auto",
                      right: isLTR ? "auto" : 0,
                    }}
                  />

                  {/* Line Endpoint Indicator */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full transition-all duration-300 ease-out"
                    style={{
                      left: isLTR ? `calc(${linePos.progress * 100}% - 4px)` : "auto",
                      right: isLTR ? "auto" : `calc(${linePos.progress * 100}% - 4px)`,
                      opacity: linePos.progress > 0.1 ? 1 : 0,
                    }}
                  />
                </div>

                {/* Section Label */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-white/30 text-xs tracking-[0.3em] uppercase">{section.label}</span>
                </div>

                {/* Section Title */}
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-6">{section.title}</h3>

                {/* Section Content */}
                <div className="space-y-4">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-white/50 text-base leading-relaxed max-w-3xl">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Vertical Connector Line */}
                {index < projectData.sections.length - 1 && (
                  <div
                    className="absolute w-px h-16 bg-gradient-to-b from-white/20 to-transparent transition-all duration-500"
                    style={{
                      bottom: 0,
                      left: isLTR ? "100%" : 0,
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <h2 className="text-2xl md:text-4xl font-light text-black">Have a project in mind?</h2>
                <span className="text-2xl md:text-4xl font-bold text-black">REACH</span>
              </div>
              <div className="flex items-baseline gap-3">
                <div className="w-48 md:w-64" />
                <span className="text-2xl md:text-4xl font-bold text-black">OUT</span>
              </div>
            </div>

            {/* Contact Button */}
            <a
              href="https://wa.me/97577682154"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              {/* Curved Arrow */}
              <svg
                className="absolute -left-24 md:-left-32 top-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 text-black rotate-12"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M 20 50 Q 50 80, 85 50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path d="M 80 45 L 85 50 L 78 53" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div
                className="w-24 h-24 md:w-32 md:h-32 bg-cyan-400 rounded-full flex items-center justify-center text-black font-medium text-sm transition-transform duration-300 group-hover:scale-105 shadow-lg"
                style={{
                  animation: "squeeze 6s ease-in-out infinite",
                }}
              >
                <span className="text-xs md:text-sm opacity-70">click me</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes squeeze {
          0%, 100% {
            transform: scale(1);
            border-radius: 50%;
          }
          25% {
            transform: scaleX(0.95) scaleY(1.05);
            border-radius: 45% 55% 55% 45%;
          }
          50% {
            transform: scaleX(1.05) scaleY(0.95);
            border-radius: 55% 45% 45% 55%;
          }
          75% {
            transform: scaleX(0.97) scaleY(1.03);
            border-radius: 48% 52% 52% 48%;
          }
        }
      `}</style>
    </div>
  )
}
