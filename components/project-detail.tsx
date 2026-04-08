"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

interface ProjectDetailProps {
  isOpen: boolean
  onClose: () => void
  currentProject: number
}

export type ProjectSlide = {
  id: number
  title: string
  image: string
  /** Full-bleed section background — gradient matched to project imagery */
  sectionGradient: string
  detailPage: string | null
}

const projects: ProjectSlide[] = [
  {
    id: 1,
    title: "VEGO",
    image: "/vego.png",
    sectionGradient:
      "linear-gradient(155deg, #6b7a94 0%, #9aa8c4 38%, #c5d0e3 100%)",
    detailPage: "/projects/vego",
  },
  {
    id: 2,
    title: "SCAN2DINE",
    image: "/scan2dine.png",
    sectionGradient:
      "linear-gradient(145deg, #4a3d55 0%, #7d6b8a 45%, #a898b5 100%)",
    detailPage: null, // Coming soon
  },
  {
    id: 3,
    title: "NDP",
    image: "/ndp.png",
    sectionGradient: "#847777",
    detailPage: null, // Coming soon
  },
]

/**
 * Horizontal slide swap — ~4px gap between card edges (see calc on left/right).
 * Based on center at 50% with width ~38%; side cards ~26% so edges align with 4px gutters.
 */
const SLOT_STYLE: Record<
  "left" | "center" | "right",
  { left: string; width: string; height: string; zIndex: number; opacity: number }
> = {
  left: {
    left: "calc(18% - 4px)",
    width: "min(26%, 248px)",
    height: "76%",
    zIndex: 10,
    opacity: 0.92,
  },
  center: {
    left: "50%",
    width: "min(38%, 420px)",
    height: "88%",
    zIndex: 20,
    opacity: 1,
  },
  right: {
    left: "calc(82% + 4px)",
    width: "min(26%, 248px)",
    height: "76%",
    zIndex: 10,
    opacity: 0.92,
  },
}

function getSlot(
  index: number,
  activeIndex: number,
  len: number
): "left" | "center" | "right" {
  const leftIndex = (activeIndex - 1 + len) % len
  const rightIndex = (activeIndex + 1) % len
  if (index === activeIndex) return "center"
  if (index === leftIndex) return "left"
  if (index === rightIndex) return "right"
  return "center"
}

export function ProjectDetail({ isOpen, onClose, currentProject }: ProjectDetailProps) {
  const [activeIndex, setActiveIndex] = useState(currentProject - 1)
  const [scrollPercent, setScrollPercent] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const len = projects.length

  const goTo = useCallback(
    (index: number) => {
      const i = ((index % len) + len) % len
      setActiveIndex(i)
    },
    [len]
  )

  // No auto-scrolling - removed the interval timer

  useEffect(() => {
    if (!isOpen) return

    setScrollPercent(0)
    setActiveIndex(currentProject - 1)

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
      const container = scrollContainerRef.current
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isOpen, currentProject])

  // Navigate to project detail page when center card is clicked
  const handleCenterCardClick = (project: ProjectSlide) => {
    if (project.detailPage) {
      onClose()
      router.push(project.detailPage)
    }
  }

  if (!isOpen) return null

  const active = projects[activeIndex]

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
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 pointer-events-none">
          <button
            onClick={onClose}
            className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2 pointer-events-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <span className="text-white/40 text-sm">{scrollPercent}%</span>
        </div>

        {/* Project Carousel Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background gradient */}
          <div
            className="absolute inset-0 transition-[background] duration-700 ease-out"
            style={{ background: active.sectionGradient }}
            aria-hidden
          />

          {/* Top fade */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-black/35 to-transparent"
            aria-hidden
          />

          {/* Carousel */}
          <div className="absolute inset-0 z-[2] flex items-center justify-center px-3 sm:px-6 md:px-10">
            <div
              className="relative w-full max-w-[920px] aspect-[16/9] max-h-[min(52vh,440px)] sm:max-h-[min(50vh,480px)] rounded-2xl border border-white/25 bg-white/[0.07] p-[2px] shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              role="region"
              aria-label="Featured projects"
            >
              <div className="relative h-full min-h-0 w-full overflow-hidden rounded-[14px] bg-black/15">
                <div className="relative h-full w-full">
                  {projects.map((project, index) => {
                    const slot = getSlot(index, activeIndex, len)
                    const s = SLOT_STYLE[slot]
                    const isCenter = slot === "center"

                    return (
                      <button
                        key={project.id}
                        type="button"
                        className={`absolute top-1/2 cursor-pointer overflow-hidden rounded-xl border border-white/25 bg-neutral-900/40 shadow-xl ${
                          isCenter ? "ring-1 ring-white/10" : ""
                        }`}
                        style={{
                          left: s.left,
                          width: s.width,
                          height: s.height,
                          zIndex: s.zIndex,
                          opacity: s.opacity,
                          transform: "translate(-50%, -50%)",
                          transitionProperty: "left, width, height, opacity, transform, box-shadow",
                          transitionDuration: "650ms",
                          transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
                        }}
                        onClick={() => {
                          if (isCenter) {
                            handleCenterCardClick(project)
                          } else {
                            goTo(index)
                          }
                        }}
                        aria-label={
                          isCenter 
                            ? project.detailPage 
                              ? `View ${project.title} project` 
                              : `${project.title} - Coming soon`
                            : `Show ${project.title}`
                        }
                      >
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800/30 p-1.5 sm:p-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt=""
                            className="max-h-full max-w-full object-contain"
                            style={{ opacity: isCenter ? 1 : 0.78 }}
                          />
                        </div>

                        {/* Click indicator for center card */}
                        {isCenter && (
                          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent">
                            <span className="text-white text-sm font-medium flex items-center gap-2">
                              {project.detailPage ? (
                                <>
                                  View Project
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </>
                              ) : (
                                "Coming Soon"
                              )}
                            </span>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Project info below carousel */}
          <div className="absolute bottom-16 left-0 right-0 z-10 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {active.title}
            </h2>
            <p className="text-white/60 text-sm">
              {active.detailPage ? "Click to view details" : "Coming soon"}
            </p>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="py-16 md:py-24 bg-white flex items-start justify-center pt-12 md:pt-16 lg:pt-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-6xl px-8">
            <div className="text-left">
              <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mb-2">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-black">
                  Have a project in mind?
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
                  REACH OUT
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/97577682154"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#3AC2FF] hover:bg-[#2BA3E6] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                animation: 'squeeze 8s ease-in-out infinite'
              }}
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
