"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface Service {
  id: number
  title: string
  description: string
  image: string
}

const services: Service[] = [
  {
    id: 1,
    title: "FRONTEND DEVELOPMENT",
    description: "I specialize in crafting elegant, high-performance user interfaces with modern frameworks like React, Next.js, and Vue.js, delivering pixel-perfect responsive designs that captivate users.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "BACKEND DEVELOPMENT",
    description: "I design and implement secure, scalable backend systems and APIs that form the backbone of modern applications, handling complex data flows with ease.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "UI DESIGN",
    description: "I craft visually stunning, modern interfaces that balance aesthetics with usability, creating memorable brand experiences across all digital touchpoints.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    title: "UX DESIGN",
    description: "I focus on user-centric design methodologies to create seamless digital experiences, from wireframes to interactive prototypes that convert users.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    title: "PHOTOGRAPHY",
    description: "I capture compelling visual stories through professional photography, from product shots to lifestyle imagery that elevates brand narratives.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    title: "BRANDING",
    description: "I develop cohesive brand identities that resonate with target audiences, from logo design to comprehensive visual systems that stand out.",
    image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=400&h=400&fit=crop",
  },
]

// Map face index to rotation
const faceRotations = [
  { rotateX: 0, rotateY: 0 },      // Front (1)
  { rotateX: 0, rotateY: -90 },    // Right (2)
  { rotateX: 0, rotateY: -180 },   // Back (3)
  { rotateX: 0, rotateY: -270 },   // Left (4)
  { rotateX: -90, rotateY: 0 },    // Top (5)
  { rotateX: 90, rotateY: 0 },     // Bottom (6)
]

export function ServicesSection() {
  const [activeService, setActiveService] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isLocked = useRef(false)
  const scrollCount = useRef(0)
  const lastScrollTime = useRef(0)
  const isAnimating = useRef(false)
  const hasCompletedSection = useRef(false)

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!sectionRef.current || isAnimating.current) return

    const section = sectionRef.current
    const rect = section.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Check if we're in the sticky zone
    const stickyVisible = rect.top <= 50 && rect.bottom > viewportHeight + 50

    if (!stickyVisible) {
      scrollCount.current = 0
      return
    }

    const now = Date.now()
    if (now - lastScrollTime.current > 400) {
      scrollCount.current = 0
    }
    lastScrollTime.current = now

    // Only count meaningful scroll gestures
    if (Math.abs(e.deltaY) > 10) {
      scrollCount.current++
    }

    // Scrolling DOWN
    if (e.deltaY > 0) {
      if (activeService < services.length - 1) {
        e.preventDefault()
        e.stopPropagation()
        
        if (scrollCount.current >= 2) {
          isAnimating.current = true
          setActiveService(prev => prev + 1)
          scrollCount.current = 0
          setTimeout(() => {
            isAnimating.current = false
          }, 800)
        }
      } else if (activeService === services.length - 1 && !hasCompletedSection.current) {
        e.preventDefault()
        e.stopPropagation()
        
        if (scrollCount.current >= 2) {
          hasCompletedSection.current = true
          scrollCount.current = 0
        }
      }
      // If completed, allow page scroll
      return
    }

    // Scrolling UP
    if (e.deltaY < 0) {
      if (hasCompletedSection.current && activeService === services.length - 1) {
        e.preventDefault()
        e.stopPropagation()
        
        if (scrollCount.current >= 2) {
          hasCompletedSection.current = false
          scrollCount.current = 0
        }
        return
      }
      
      if (activeService > 0) {
        e.preventDefault()
        e.stopPropagation()
        
        if (scrollCount.current >= 2) {
          isAnimating.current = true
          setActiveService(prev => prev - 1)
          scrollCount.current = 0
          hasCompletedSection.current = false
          setTimeout(() => {
            isAnimating.current = false
          }, 800)
        }
      }
    }
  }, [activeService])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    section.addEventListener('wheel', handleWheel, { passive: false })
    return () => section.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const currentRotation = faceRotations[activeService]

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[700vh] bg-black"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="text-center pt-16 pb-8 px-6">
          <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4">MY SERVICES</p>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Engineering component-driven, full-stack products that help SaaS teams build faster, and grow smarter with complete sets of skills
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 md:px-12 h-[calc(100vh-200px)]">
          {/* Left side - Service info (odd) or Cube (even) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            {activeService % 2 === 0 ? (
              <ServiceInfo service={services[activeService]} />
            ) : (
              <div className="w-64 h-64 md:w-80 md:h-80 perspective-[1000px]">
                <div
                  className="w-full h-full relative preserve-3d transition-transform duration-700 ease-out"
                  style={{
                    transform: `rotateX(${currentRotation.rotateX}deg) rotateY(${currentRotation.rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {services.map((service, index) => (
                    <CubeFace key={service.id} index={index} image={service.image} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center line */}
          <div className="hidden lg:block w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

          {/* Right side - Cube (odd) or Service info (even) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            {activeService % 2 === 0 ? (
              <div className="w-64 h-64 md:w-80 md:h-80 perspective-[1000px]">
                <div
                  className="w-full h-full relative preserve-3d transition-transform duration-700 ease-out"
                  style={{
                    transform: `rotateX(${currentRotation.rotateX}deg) rotateY(${currentRotation.rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {services.map((service, index) => (
                    <CubeFace key={service.id} index={index} image={service.image} />
                  ))}
                </div>
              </div>
            ) : (
              <ServiceInfo service={services[activeService]} />
            )}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeService 
                  ? 'bg-cyan-400 w-6' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CSS for 3D transforms */}
      <style jsx>{`
        .perspective-\\[1000px\\] {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  )
}

function ServiceInfo({ service }: { service: Service }) {
  return (
    <div className="max-w-md text-left animate-fadeIn">
      <span className="text-cyan-400 text-sm font-mono mb-2 block">
        0{service.id}
      </span>
      <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 tracking-tight">
        {service.title}
      </h3>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
        {service.description}
      </p>
    </div>
  )
}

function CubeFace({ index, image }: { index: number; image: string }) {
  const size = 160 // Half of the cube width (320/2)
  
  const transforms = [
    `translateZ(${size}px)`,                    // Front
    `rotateY(90deg) translateZ(${size}px)`,     // Right
    `rotateY(180deg) translateZ(${size}px)`,    // Back
    `rotateY(-90deg) translateZ(${size}px)`,    // Left
    `rotateX(90deg) translateZ(${size}px)`,     // Top
    `rotateX(-90deg) translateZ(${size}px)`,    // Bottom
  ]

  return (
    <div
      className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border border-cyan-500/20"
      style={{
        transform: transforms[index],
        backfaceVisibility: 'hidden',
      }}
    >
      <img
        src={image}
        alt={`Service ${index + 1}`}
        className="w-full h-full object-cover"
        crossOrigin="anonymous"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  )
}
