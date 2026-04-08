"use client"

import { useState, Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
})

export function SplineRobot() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="absolute inset-0 z-10 pointer-events-auto">
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Spline 3D Scene using React component */}
      {!hasError && (
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/jD8BWozwPhxDEScS/scene.splinecode"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            style={{
              width: "100%",
              height: "100%",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </Suspense>
      )}
    </div>
  )
}
