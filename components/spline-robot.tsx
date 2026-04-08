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
      
      {/* R4X Bot from Spline */}
      <iframe 
        key="r4xbot-spline"
        src="https://my.spline.design/r4xbot-NRCEXUNr8zrkpjdETf9z83hR/"
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={() => setIsLoaded(true)}
        className="border-0"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
        title="R4X Bot 3D Model"
        allow="autoplay"
      />
    </div>
  )
}
