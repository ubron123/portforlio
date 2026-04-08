"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

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

  return (
    <div className="absolute inset-0 z-10">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}
      <Spline
        scene="https://prod.spline.design/jD8BWozwPhxDEScS/scene.splinecode"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
