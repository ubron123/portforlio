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

// Cube face rotations for each service
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
  const [cubePosition, setCubePosition] = useState({ top: 0, left: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageSlotRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2

      // Find which service is most visible
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

      // Position the cube at the active service's image slot
      const activeSlot = imageSlotRefs.current[closestIndex]
      if (activeSlot && sectionRef.current) {
        const slotRect = activeSlot.getBoundingClientRect()
        const sectionRect = sectionRef.current.getBoundingClientRect()
        
        setCubePosition({
          top: slotRect.top - sectionRect.top + slotRect.height / 2 - 80, // center the cube
          left: slotRect.left - sectionRect.left + slotRect.width / 2 - 80,
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    // Initial position
    setTimeout(handleScroll, 100)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const currentRotation = cubeRotations[activeService]

  return (
    <section ref={sectionRef} className="relative bg-black py-20">
      {/* Header */}
      <div className="text-center px-6 mb-8">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4">MY SERVICES</p>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Engineering component-driven, full-stack products that help SaaS teams build faster, and grow smarter with complete sets of skills
        </p>
      </div>

      {/* Line split - center line splits into rectangle shape (no bottom stroke) */}
      <div className="relative h-16 mb-8 max-w-5xl mx-auto px-6">
        {/* Center line coming from above */}
        <div className="absolute left-1/2 top-0 w-px h-4 -translate-x-1/2 bg-cyan-500/70" />
        
        {/* Horizontal line at top of rectangle */}
        <div className="absolute top-4 left-[15%] right-[15%] h-px bg-cyan-500/50" />
        
        {/* Left vertical line going down (near corner, not middle) */}
        <div className="absolute left-[15%] top-4 w-px h-12 bg-cyan-500/50" />
        
        {/* Right vertical line going down (near corner, not middle) */}
        <div className="absolute right-[15%] top-4 w-px h-12 bg-cyan-500/50" />
      </div>

      {/* Services list container */}
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Left vertical line running down the side */}
        <div className="absolute left-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/30 to-cyan-500/10" />
        
        {/* Right vertical line running down the side */}
        <div className="absolute right-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/30 to-cyan-500/10" />

        {/* Floating 3D Cube that travels down the page */}
        <div 
          className="absolute z-20 w-40 h-40 pointer-events-none transition-all duration-700 ease-out hidden md:block"
          style={{
            top: cubePosition.top,
            left: cubePosition.left,
            perspective: '800px',
          }}
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

        {/* Services */}
        {services.map((service, index) => {
          const isEven = index % 2 === 0
          const isActive = index === activeService

          return (
            <div
              key={service.id}
              ref={el => { serviceRefs.current[index] = el }}
              className={`relative py-16 md:py-20 transition-opacity duration-500 ${
                isActive ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {/* Desktop layout - alternating sides */}
              <div className={`hidden md:flex items-center gap-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Text side */}
                <div className={`flex-1 ${isEven ? 'text-left pr-8' : 'text-right pl-8'}`}>
                  <span className="text-cyan-400 text-sm font-mono mb-2 block">
                    0{service.id}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>

                {/* Image slot - where the cube lands */}
                <div 
                  ref={el => { imageSlotRefs.current[index] = el }}
                  className="w-40 h-40 flex-shrink-0"
                >
                  {/* Empty slot - cube fills this space */}
                </div>
              </div>

              {/* Mobile layout - stacked with static images */}
              <div className="md:hidden flex flex-col items-center gap-6 text-center px-4">
                <span className="text-cyan-400 text-sm font-mono">
                  0{service.id}
                </span>
                <h3 className="text-white text-xl font-bold tracking-tight">
                  {service.title}
                </h3>
                
                {/* Mobile - show static image */}
                <div className="w-32 h-32 rounded-xl overflow-hidden border border-cyan-500/20">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  {service.description}
                </p>
              </div>
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
      className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}
