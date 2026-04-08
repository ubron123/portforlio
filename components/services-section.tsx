"use client"

import { useEffect, useRef, useState } from "react"

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

// Map service index to cube rotation (6 faces of cube)
const cubeRotations = [
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
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      // Find which service is most visible
      const viewportCenter = window.innerHeight / 2

      let closestIndex = 0
      let closestDistance = Infinity

      serviceRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const elementCenter = rect.top + rect.height / 2
          const distance = Math.abs(elementCenter - viewportCenter)
          
          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        }
      })

      setActiveService(closestIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentRotation = cubeRotations[activeService]

  return (
    <section ref={sectionRef} className="relative bg-black py-20">
      {/* Header */}
      <div className="text-center px-6 mb-16">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4">MY SERVICES</p>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Engineering component-driven, full-stack products that help SaaS teams build faster, and grow smarter with complete sets of skills
        </p>
      </div>

      {/* Line split visual - single line dividing into two */}
      <div className="relative h-24 mb-8">
        {/* Center line coming from above */}
        <div className="absolute left-1/2 top-0 w-px h-8 -translate-x-1/2 bg-cyan-500/70" />
        
        {/* Split point */}
        <div className="absolute left-1/2 top-8 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        
        {/* Left branch curving outward */}
        <svg className="absolute left-1/2 top-8 -translate-x-full" width="120" height="64" viewBox="0 0 120 64" fill="none">
          <path 
            d="M120 0 Q120 32, 60 48 Q0 64, 0 64" 
            stroke="rgba(34,211,238,0.5)" 
            strokeWidth="1" 
            fill="none"
          />
        </svg>
        
        {/* Right branch curving outward */}
        <svg className="absolute left-1/2 top-8" width="120" height="64" viewBox="0 0 120 64" fill="none">
          <path 
            d="M0 0 Q0 32, 60 48 Q120 64, 120 64" 
            stroke="rgba(34,211,238,0.5)" 
            strokeWidth="1" 
            fill="none"
          />
        </svg>
      </div>

      {/* Services list - scrollable */}
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Left vertical line */}
        <div className="absolute left-6 md:left-[calc(25%-60px)] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/30 to-cyan-500/50" />
        
        {/* Right vertical line */}
        <div className="absolute right-6 md:right-[calc(25%-60px)] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/30 to-cyan-500/50" />

        {services.map((service, index) => {
          const isEven = index % 2 === 0
          const isActive = index === activeService

          return (
            <div
              key={service.id}
              ref={el => { serviceRefs.current[index] = el }}
              className={`relative py-16 md:py-24 transition-opacity duration-500 ${
                isActive ? 'opacity-100' : 'opacity-40'
              }`}
            >
              {/* Desktop layout - alternating sides */}
              <div className={`hidden md:flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Text side */}
                <div className={`w-1/2 ${isEven ? 'text-left pr-12' : 'text-right pl-12'}`}>
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

                {/* Image side - 3D cube that rotates based on scroll */}
                <div className="w-1/2 flex justify-center">
                  <div 
                    className="w-48 h-48 md:w-64 md:h-64"
                    style={{ perspective: '1000px' }}
                  >
                    <div
                      className="w-full h-full relative transition-transform duration-700 ease-out"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${currentRotation.rotateX}deg) rotateY(${currentRotation.rotateY}deg)`,
                      }}
                    >
                      {services.map((s, i) => (
                        <CubeFace key={s.id} index={i} image={s.image} size={128} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile layout - stacked */}
              <div className="md:hidden flex flex-col items-center gap-6 text-center px-4">
                <span className="text-cyan-400 text-sm font-mono">
                  0{service.id}
                </span>
                <h3 className="text-white text-xl font-bold tracking-tight">
                  {service.title}
                </h3>
                
                {/* Mobile cube */}
                <div 
                  className="w-40 h-40"
                  style={{ perspective: '800px' }}
                >
                  <div
                    className="w-full h-full relative transition-transform duration-700 ease-out"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateX(${currentRotation.rotateX}deg) rotateY(${currentRotation.rotateY}deg)`,
                    }}
                  >
                    {services.map((s, i) => (
                      <CubeFace key={s.id} index={i} image={s.image} size={80} />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  {service.description}
                </p>
              </div>

              {/* Horizontal connector line to vertical rails */}
              <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px bg-cyan-500/20 ${
                isEven 
                  ? 'left-6 md:left-[calc(25%-60px)] w-[calc(25%-60px)]' 
                  : 'right-6 md:right-[calc(25%-60px)] w-[calc(25%-60px)]'
              }`} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

function CubeFace({ index, image, size }: { index: number; image: string; size: number }) {
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
