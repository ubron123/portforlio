"use client"

import { useState, useEffect } from "react"

export function SplineRobot() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-10 spline-container overflow-hidden" data-spline-area>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      )}
      
      <iframe
        src="https://my.spline.design/boxeshover-ysch6NWqE2BKidw2x5v2ljUC/"
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={() => setIsLoaded(true)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        loading="eager"
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          border: "none",
          cursor: "none",
        }}
        title="Spline 3D Animation"
      />
      {/* Transparent overlay that keeps the OS cursor hidden while
          pointer-events: none lets clicks/moves pass through to the iframe */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 15,
          pointerEvents: "none",
          cursor: "none",
        }}
      />
      {/* Completely hide Spline watermark — covers the full bottom-right badge area */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: "230px",
          height: "56px",
          background: "black",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
