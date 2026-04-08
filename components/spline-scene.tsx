"use client"

import { useState, useEffect } from "react"

export function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  // Timeout fallback - if scene doesn't load in 10 seconds, show fallback
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setShowFallback(true)
      }
    }, 10000)

    return () => clearTimeout(timeout)
  }, [isLoaded])

  if (showFallback) {
    return (
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Animated gradient fallback */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      {/* Loading spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}
      
      {/* Spline embed using the viewer URL */}
      <iframe
        src="https://my.spline.design/W9LyRtDWreepDC74/"
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={() => setIsLoaded(true)}
        sandbox="allow-scripts allow-same-origin"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: "auto",
        }}
        allow="autoplay; fullscreen"
        title="Spline 3D Scene"
      />
    </div>
  )
}
