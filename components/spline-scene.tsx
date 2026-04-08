"use client"

import { useState } from "react"

export function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="absolute inset-0 z-10">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}
      <iframe
        src="https://my.spline.design/jD8BWozwPhxDEScS/"
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
        allow="autoplay; fullscreen"
      />
    </div>
  )
}
