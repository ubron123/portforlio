"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

interface ProjectDetailProps {
  isOpen: boolean
  onClose: () => void
  currentProject: number
}

interface Project {
  id: number
  number: string
  title: string
  description: string
  fullDescription: string
  tech: string[]
  role: string
  duration: string
  link?: string
  github?: string
  images: string[]
  challenges: string[]
  solutions: string[]
}

const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "VEGO",
    description: "VeGo car rental & peer-to-peer vehicle lending platform focused on optimizing underutilized vehicles.",
    fullDescription:
      "VeGo is a comprehensive car rental and peer-to-peer vehicle lending platform designed to revolutionize how people access and share vehicles. The platform connects vehicle owners with renters, creating a seamless experience for both parties while maximizing the utilization of underused vehicles.",
    tech: ["React Native", "Node.js", "MongoDB", "Stripe", "Google Maps API"],
    role: "Lead Frontend Developer",
    duration: "6 months",
    link: "https://vego.app",
    github: "https://github.com/vego",
    images: ["/vego.png", "/vego.png", "/vego.png"],
    challenges: [
      "Complex booking system with real-time availability",
      "Secure payment processing with multiple currencies",
      "Real-time vehicle tracking and geofencing",
    ],
    solutions: [
      "Implemented WebSocket-based real-time updates",
      "Integrated Stripe Connect for marketplace payments",
      "Built custom geofencing solution with Google Maps API",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "SCAN2DINE",
    description:
      "Scan2Dine is a restaurant digital menu application that allows customers to place orders and track them in real-time.",
    fullDescription:
      "Scan2Dine transforms the traditional dining experience by enabling customers to scan QR codes at their tables, browse digital menus, place orders, and track their order status in real-time. The platform also provides restaurant owners with powerful analytics and management tools.",
    tech: ["Next.js", "Firebase", "Tailwind CSS", "Stripe", "Socket.io"],
    role: "Full Stack Developer",
    duration: "4 months",
    link: "https://scan2dine.com",
    images: ["/scan2dine.png", "/scan2dine.png", "/scan2dine.png"],
    challenges: [
      "Real-time order synchronization across devices",
      "Offline-first functionality for unreliable connections",
      "Dynamic menu management with instant updates",
    ],
    solutions: [
      "Firebase Realtime Database for instant sync",
      "Service workers for offline capabilities",
      "Custom CMS for menu management",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "NDP",
    description:
      "NDP is a mobile application specifically developed for GGT College to streamline the book-sharing process.",
    fullDescription:
      "NDP (Notes, Documents, Papers) is a mobile application built specifically for GGT College students to share and access academic resources. The platform eliminates the need for physical document handling and creates a sustainable, digital-first approach to sharing educational materials.",
    tech: ["React Native", "Express.js", "PostgreSQL", "AWS S3", "Push Notifications"],
    role: "Mobile Developer",
    duration: "3 months",
    github: "https://github.com/ndp-app",
    images: ["/ndp.png", "/ndp.png", "/ndp.png"],
    challenges: [
      "Large file uploads with progress tracking",
      "Document preview for multiple formats",
      "Efficient search across thousands of documents",
    ],
    solutions: [
      "Chunked uploads with resumable capabilities",
      "Integrated document viewers for PDF, DOC, PPT",
      "Elasticsearch for fast full-text search",
    ],
  },
]

export function ProjectDetail({ isOpen, onClose, currentProject }: ProjectDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"overview" | "challenges" | "solutions">("overview")
  const modalRef = useRef<HTMLDivElement>(null)

  const project = projects.find((p) => p.id === currentProject) || projects[0]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setActiveImageIndex(0)
      setActiveTab("overview")
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
          aria-label="Close project details"
        >
          <X className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
        </button>

        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Image Gallery */}
          <div className="relative aspect-video bg-black">
            <img
              src={project.images[activeImageIndex] || "/placeholder.svg"}
              alt={`${project.title} screenshot ${activeImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Image Navigation */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-cyan-400 font-mono text-sm">{project.number}</span>
                  <h2 id="project-title" className="text-2xl md:text-3xl font-bold text-white">
                    {project.title}
                  </h2>
                </div>
                <p className="text-white/60 text-sm md:text-base max-w-2xl">{project.description}</p>
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                )}
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider">Role</span>
                <p className="text-white mt-1">{project.role}</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider">Duration</span>
                <p className="text-white mt-1">{project.duration}</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider">Tech Stack</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 p-1 bg-white/5 rounded-lg w-fit">
              {(["overview", "challenges", "solutions"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === "overview" && (
                <div className="animate-in fade-in duration-300">
                  <p className="text-white/70 leading-relaxed">{project.fullDescription}</p>
                </div>
              )}

              {activeTab === "challenges" && (
                <div className="animate-in fade-in duration-300">
                  <ul className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-mono">
                          {index + 1}
                        </span>
                        <span className="text-white/70">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "solutions" && (
                <div className="animate-in fade-in duration-300">
                  <ul className="space-y-4">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-mono">
                          {index + 1}
                        </span>
                        <span className="text-white/70">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
