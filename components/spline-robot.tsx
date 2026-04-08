"use client"

import { useState } from "react"
import Script from "next/script"

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
      
      {/* Spline Viewer using the official embed script */}
      <Script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js"
        onLoad={() => setIsLoaded(true)}
      />
      
      <spline-viewer 
        url="https://prod.spline.design/W9LyRtDWreepDC74/scene.splinecode"
        style={{
          width: "100%",
          height: "100%",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </div>
  )
}
