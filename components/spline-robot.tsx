"use client"

import { useState } from "react"

export function SplineRobot() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="absolute inset-0 z-10 pointer-events-auto">
      <iframe
        src="https://prod.spline.design/jD8BWozwPhxDEScS/scene.splinecode"
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
        allow="autoplay"
        sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-top-navigation"
      />
    </div>
  )
}
