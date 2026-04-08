"use client"

import { Suspense, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
})

export function SplineRobot() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return null
  }

  return (
    <div className="absolute inset-0 z-10 pointer-events-auto">
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/jD8BWozwPhxDEScS/scene.splinecode"
          className="w-full h-full"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{ 
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out"
          }}
        />
      </Suspense>
    </div>
  )
}
