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
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageSlotRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2

      // Calculate overall scroll progress through the section
      const sectionTop = sectionRect.top
      const sectionHeight = sectionRect.height
      const progress = Math.max(0, Math.min(1, (-sectionTop + viewportCenter) / sectionHeight))
      setScrollProgress(progress)

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

      // Position the cube at the active service's image slot - smooth interpolation
      const activeSlot = imageSlotRefs.current[closestIndex]
      if (activeSlot && sectionRef.current) {
        const slotRect = activeSlot.getBoundingClientRect()
        const sectionRect = sectionRef.current.getBoundingClientRect()
        
        const cubeSize = 128 // half of 256px (w-64)
        setCubePosition({
          top: slotRect.top - sectionRect.top + slotRect.height / 2 - cubeSize,
          left: slotRect.left - sectionRect.left + slotRect.width / 2 - cubeSize,
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
    <section ref={sectionRef} className="relative bg-black">
      {/* Line split area - single line comes down from center, turns at left corner with glow */}
      <div className="relative h-40">
        {/* Center line coming from above (connects to About section) */}
        <div className="absolute left-1/2 top-0 w-px h-16 -translate-x-1/2 bg-cyan-500/70" />
        
        {/* Horizontal line from center going to left corner */}
        <div className="absolute top-16 left-[6%] right-1/2 h-px bg-gradient-to-r from-cyan-500/50 to-cyan-500/70" />
        
        {/* Blue circular gradient glow at LEFT corner where line turns */}
        <div className="absolute left-[6%] top-16 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute left-[6%] top-16 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="absolute left-[6%] top-16 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyan-400/30 blur-xl" />
        
        {/* Corner curve at left - line turns down */}
        <svg className="absolute top-16 left-[6%] w-6 h-6 -translate-x-[1px] -translate-y-[1px]" viewBox="0 0 24 24" fill="none">
          <path d="M24 0 Q0 0 0 24" stroke="rgba(34,211,238,0.5)" strokeWidth="1" fill="none" />
        </svg>
        
        {/* Horizontal line from center going to right corner */}
        <div className="absolute top-16 left-1/2 right-[6%] h-px bg-gradient-to-r from-cyan-500/70 to-cyan-500/50" />
        
        {/* Corner curve at right - line turns down */}
        <svg className="absolute top-16 right-[6%] w-6 h-6 translate-x-[1px] -translate-y-[1px]" viewBox="0 0 24 24" fill="none">
          <path d="M0 0 Q24 0 24 24" stroke="rgba(34,211,238,0.5)" strokeWidth="1" fill="none" />
        </svg>
        
        {/* Vertical lines going down from corners */}
        <div className="absolute left-[6%] top-[calc(4rem+24px)] w-px h-24 bg-gradient-to-b from-cyan-500/50 to-cyan-500/40" />
        <div className="absolute right-[6%] top-[calc(4rem+24px)] w-px h-24 bg-gradient-to-b from-cyan-500/50 to-cyan-500/40" />
      </div>

      {/* Header - inside the frame */}
      <div className="relative text-center px-6 pb-16 mx-[6%] border-l border-r border-cyan-500/30">
        <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase mb-6">MY SERVICES</p>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Engineering component-driven, full-stack products that help SaaS teams build faster, and grow smarter with complete sets of skills
        </p>
      </div>

      {/* Services list container - inside the frame */}
      <div className="relative mx-[6%] border-l border-r border-cyan-500/30 px-6 md:px-12">
        {/* Floating 3D Cube that travels down the page */}
        <div 
          className="absolute z-20 w-64 h-64 pointer-events-none hidden md:block"
          style={{
            top: cubePosition.top,
            left: cubePosition.left,
            perspective: '1000px',
            transition: 'top 1s ease-out, left 0.8s ease-out',
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${currentRotation.rotateX}deg) rotateY(${currentRotation.rotateY}deg)`,
              transition: 'transform 1.2s ease-out',
            }}
          >
              {services.map((s, i) => (
              <CubeFace key={s.id} index={i} image={s.image} size={128} />
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
              className={`relative py-20 md:py-28 transition-opacity duration-700 ${
                isActive ? 'opacity-100' : 'opacity-40'
              }`}
            >
              {/* Desktop layout - alternating sides: odd services (1,3,5) = text LEFT/image RIGHT, even services (2,4,6) = image LEFT/text RIGHT */}
              <div className="hidden md:grid grid-cols-2 gap-8 items-center w-full">
                {isEven ? (
                  <>
                    {/* Service 1,3,5: Text on LEFT side */}
                    <div className="text-left">
                      <span className="text-cyan-400 text-sm font-mono mb-3 block">
                        0{service.id}
                      </span>
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-5 tracking-tight uppercase">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    {/* Image slot on RIGHT side */}
                    <div className="flex justify-end">
                      <div 
                        ref={el => { imageSlotRefs.current[index] = el }}
                        className="w-64 h-64"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Service 2,4,6: Image slot on LEFT side */}
                    <div className="flex justify-start">
                      <div 
                        ref={el => { imageSlotRefs.current[index] = el }}
                        className="w-64 h-64"
                      />
                    </div>
                    {/* Text on RIGHT side */}
                    <div className="text-right">
                      <span className="text-cyan-400 text-sm font-mono mb-3 block">
                        0{service.id}
                      </span>
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-5 tracking-tight uppercase">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile layout - stacked with static images */}
              <div className="md:hidden flex flex-col items-center gap-6 text-center">
                <span className="text-cyan-400 text-sm font-mono">
                  0{service.id}
                </span>
                <h3 className="text-white text-xl font-bold tracking-tight">
                  {service.title}
                </h3>
                
                {/* Mobile - show static image */}
                <div className="w-48 h-48 rounded-xl overflow-hidden border border-cyan-500/20">
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

      {/* Bottom of frame - lines continue down then fade */}
      <div className="relative h-20 mx-[6%]">
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-cyan-500/30 to-transparent" />
        <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-cyan-500/30 to-transparent" />
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
      className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
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
