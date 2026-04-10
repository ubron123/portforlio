"use client"

import { useState } from "react"

export function SplineRobot() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="absolute inset-0 z-10 pointer-events-none spline-container" data-spline-area>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      )}
      
      <iframe
        src="https://my.spline.design/boxeshover-ysch6NWqE2BKidw2x5v2ljUC/"
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={() => setIsLoaded(true)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        className="pointer-events-auto"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
        title="Spline 3D Animation"
      />
    </div>
  )
}
