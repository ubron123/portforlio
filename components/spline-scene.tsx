"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
    </div>
  ),
})

export function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="absolute inset-0 z-10">
      {hasError ? (
        <div className="absolute inset-0 bg-black" />
      ) : (
        <Spline
          scene="https://prod.spline.design/jD8BWozwPhxDEScS/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            width: "100%",
            height: "100%",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      )}
    </div>
  )
}
