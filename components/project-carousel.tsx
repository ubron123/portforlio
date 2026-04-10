"use client"

import { useState, useEffect, useCallback } from "react"

export type ProjectSlide = {
  id: number
  title: string
  image: string
  /** Full-bleed section background — gradient matched to project imagery */
  sectionGradient: string
}

const projects: ProjectSlide[] = [
  {
    id: 1,
    title: "VEGO",
    image: "/vego.png",
    sectionGradient:
      "linear-gradient(155deg, #6b7a94 0%, #9aa8c4 38%, #c5d0e3 100%)",
  },
  {
    id: 2,
    title: "SCAN2DIEN",
    image: "/scan2dine.png",
    sectionGradient:
      "linear-gradient(145deg, #4a3d55 0%, #7d6b8a 45%, #a898b5 100%)",
  },
  {
    id: 3,
    title: "NDP",
    image: "/ndp.png",
    sectionGradient: "#847777",
  },
]

const SLIDE_DURATION = 5000

/**
 * Horizontal slide swap — ~4px gap between card edges (see calc on left/right).
 * Based on center at 50% with width ~38%; side cards ~26% so edges align with 4px gutters.
 */
// Responsive slot styles - adjusted for mobile
const SLOT_STYLE: Record<
  "left" | "center" | "right",
  { left: string; width: string; height: string; zIndex: number; opacity: number }
> = {
  left: {
    left: "calc(15% - 2px)",
    width: "min(24%, 200px)",
    height: "70%",
    zIndex: 10,
    opacity: 0.85,
  },
  center: {
    left: "50%",
    width: "min(42%, 380px)",
    height: "85%",
    zIndex: 20,
    opacity: 1,
  },
  right: {
    left: "calc(85% + 2px)",
    width: "min(24%, 200px)",
    height: "70%",
    zIndex: 10,
    opacity: 0.85,
  },
}

type ProjectCarouselProps = {
  onActiveProjectChange?: (projectId: number) => void
  onProjectClick?: (projectId: number) => void
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

export function ProjectCarousel({ onActiveProjectChange, onProjectClick }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const len = projects.length

  const goTo = useCallback(
    (index: number) => {
      const i = ((index % len) + len) % len
      setActiveIndex(i)
      setProgress(0)
    },
    [len]
  )

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % len)
    setProgress(0)
  }, [len])

  useEffect(() => {
    onActiveProjectChange?.(projects[activeIndex].id)
  }, [activeIndex, onActiveProjectChange])

  useEffect(() => {
    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 100 / (SLIDE_DURATION / 50)
      })
    }, 50)

    const slideInterval = window.setInterval(nextSlide, SLIDE_DURATION)

    return () => {
      clearInterval(progressInterval)
      clearInterval(slideInterval)
    }
  }, [nextSlide])

  const active = projects[activeIndex]

  return (
    <>
      <div
        className="absolute inset-0 transition-[background] duration-700 ease-out"
        style={{ background: active.sectionGradient }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-black/35 to-transparent"
        aria-hidden
      />

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
                      transitionDuration: "900ms",
                      transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                    onClick={() => {
                      if (isCenter) {
                        onProjectClick?.(project.id)
                      } else {
                        goTo(index)
                        onProjectClick?.(project.id)
                      }
                    }}
                    aria-label={`Open ${project.title}`}
                  >
                    {isCenter && (
                      <div
                        className="absolute left-0 top-0 z-30 h-0.5 bg-white/25"
                        style={{ width: "100%" }}
                      >
                        <div
                          className="h-full bg-white/90 transition-[width] duration-75 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}

                    <div className="absolute inset-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        style={{ opacity: isCenter ? 1 : 0.82 }}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
