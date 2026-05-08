"use client"

import { useState, useEffect } from "react"

export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }

    setIsTouchDevice(checkTouchDevice())

    if (checkTouchDevice()) return

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

  if (isTouchDevice) return null

  return (
    <>
      {/* Simple blue circle blended with background */}
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 99999,
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease, left 0.08s linear, top 0.08s linear",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(34,211,238,0.12) 60%, rgba(34,211,238,0) 100%)",
            boxShadow: "0 0 20px rgba(34,211,238,0.3)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        button, a, [role="button"] {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
