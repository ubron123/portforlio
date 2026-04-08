"use client"

import { useState, useRef, useEffect } from "react"

export function CTAFooter() {
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const maxDrag = 280

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
  }

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const containerRect = containerRef.current.getBoundingClientRect()
    const newX = Math.min(Math.max(0, clientX - containerRect.left - 24), maxDrag)
    setDragX(newX)
  }

  const handleDragEnd = () => {
    if (dragX > maxDrag * 0.7) {
      // Open WhatsApp
      window.open('https://wa.me/97577682154', '_blank')
    }
    setDragX(0)
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchmove', handleDragMove)
      window.addEventListener('touchend', handleDragEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove)
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchmove', handleDragMove)
      window.removeEventListener('touchend', handleDragEnd)
    }
  }, [isDragging, dragX])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2">
          <span className="font-bold">Ready to scale</span>
          <span className="font-light"> your product with </span>
          <span className="font-bold">precision?</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-white text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12">
          <span className="font-bold">I&apos;m</span>
          <span className="font-light"> here to help</span>
        </p>

        {/* Draggable WhatsApp button */}
        <div 
          ref={containerRef}
          className="relative inline-flex items-center bg-transparent border border-white/30 rounded-full px-2 py-2 w-full max-w-xs sm:max-w-md mx-auto"
        >
          {/* Draggable button */}
          <button
            ref={buttonRef}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black transition-transform cursor-grab active:cursor-grabbing"
            style={{ transform: `translateX(${dragX}px)` }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Text */}
          <span 
            className="flex-1 text-white text-xs sm:text-sm md:text-base ml-2 sm:ml-4 transition-opacity"
            style={{ opacity: Math.max(0.3, 1 - dragX / maxDrag) }}
          >
            Whatsapp me: +975- 77682154
          </span>

          {/* Progress fill */}
          <div 
            className="absolute left-0 top-0 bottom-0 rounded-full bg-white/10 transition-all pointer-events-none"
            style={{ width: `${(dragX / maxDrag) * 100}%` }}
          />
        </div>
      </div>

      {/* Back to top */}
      <div className="absolute right-6 md:right-12 bottom-8 flex flex-col items-center gap-2">
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
        <span className="text-white/60 text-xs tracking-wider writing-vertical">
          Back to Top
        </span>
      </div>

      {/* CSS for vertical text */}
      <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </footer>
  )
}
