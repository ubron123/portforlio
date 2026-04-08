"use client"

import { useState } from "react"

export function SplineRobot() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="absolute inset-0 z-10 pointer-events-auto">
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      )}
      <iframe
        src="https://my.spline.design/robotfollowcursorforlandingpage-cba18fb1c5979e4467f0c3cdb73ea79d/"
        frameBorder="0"
        width="100%"
        height="100%"
        className="w-full h-full"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          border: "none"
        }}
        onLoad={() => setIsLoaded(true)}
        allow="autoplay; fullscreen"
      />
    </div>
  )
}
