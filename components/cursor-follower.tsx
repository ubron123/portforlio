"use client"

import { useState, useEffect } from "react"

export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check if device is touch-based
    const checkTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
    
    setIsTouchDevice(checkTouchDevice())
    
    if (checkTouchDevice()) return // Don't set up cursor on touch devices

    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isVisible])

  // Don't render on touch devices
  if (isTouchDevice) return null

  return (
    <>
      {/* Water wave ripples - multiple layers */}
      <div
        className="fixed pointer-events-none z-40 transition-all duration-800 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 0.8 : 0,
        }}
      >
        <div
          className="absolute border-2 border-cyan-400"
          style={{
            width: "60px",
            height: "60px",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            borderRadius: "40% 60% 50% 50% / 60% 40% 60% 40%",
            animation: "ripple-expand 2s ease-out infinite, wave-shape 3s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="fixed pointer-events-none z-39 transition-all duration-900 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 0.6 : 0,
        }}
      >
        <div
          className="absolute border border-blue-400"
          style={{
            width: "80px",
            height: "80px",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            borderRadius: "45% 55% 55% 45% / 55% 45% 55% 45%",
            animation: "ripple-expand 2.5s ease-out infinite 0.3s, wave-shape 3.5s ease-in-out infinite 0.5s",
          }}
        />
      </div>

      <div
        className="fixed pointer-events-none z-38 transition-all duration-1000 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 0.4 : 0,
        }}
      >
        <div
          className="absolute border border-teal-400"
          style={{
            width: "100px",
            height: "100px",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            borderRadius: "50% 40% 60% 40% / 40% 60% 40% 60%",
            animation: "ripple-expand 3s ease-out infinite 0.6s, wave-shape 4s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* Main cursor point */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-150 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="relative">
          {/* Inner dot with water drop shape */}
          <div
            className="absolute w-2 h-2 bg-cyan-400 shadow-lg"
            style={{
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              boxShadow: "0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)",
            }}
          />
          {/* Small water drop effect */}
          <div
            className="absolute w-4 h-4 bg-cyan-300/20 blur-sm"
            style={{
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
              borderRadius: "40% 60% 50% 50% / 60% 40% 60% 40%",
              animation: "water-pulse 1.5s ease-in-out infinite, wave-shape 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Water drop trail */}
      <div
        className="fixed pointer-events-none z-35 transition-all duration-800 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 0.5 : 0,
        }}
      >
        <div
          className="w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-lg"
          style={{
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            borderRadius: "45% 55% 55% 45% / 55% 45% 55% 45%",
            animation: "water-float 2s ease-in-out infinite, wave-shape 2.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Hide default cursor on the whole page */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        button, a, [role="button"] {
          cursor: none !important;
        }

        @keyframes wave-shape {
          0%, 100% {
            border-radius: 40% 60% 50% 50% / 60% 40% 60% 40%;
          }
          25% {
            border-radius: 50% 40% 60% 40% / 40% 60% 40% 60%;
          }
          50% {
            border-radius: 45% 55% 55% 45% / 55% 45% 55% 45%;
          }
          75% {
            border-radius: 60% 40% 50% 50% / 40% 60% 40% 60%;
          }
        }

        @keyframes ripple-expand {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        @keyframes water-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.1;
          }
        }

        @keyframes water-float {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1) translateY(-2px);
          }
        }

        /* Responsive cursor adjustments */
        @media (max-width: 640px) {
          .cursor-follower-mobile {
            transform: scale(0.8);
          }
        }
      `}</style>
    </>
  )
}
