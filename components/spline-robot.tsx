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
        }}
        title="Spline 3D Animation"
      />
      {/* Scale down Spline watermark by covering the bottom-right corner with a black box
          that leaves only a tiny strip visible, making the logo appear very small */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "160px",
          height: "36px",
          background: "black",
          zIndex: 20,
        }}
      />
      {/* Let a tiny sliver of the logo show through at bottom-right corner */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "60px",
          height: "12px",
          zIndex: 21,
        }}
      />
    </div>
  )
}
