"use client"

import { useState, useEffect } from "react"

export function SplineRobot() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if spline-viewer is already defined (prevents HMR errors)
    if (customElements.get('spline-viewer')) {
      setIsLoaded(true)
      return
    }

    // Suppress Spline viewer errors that occur during scene loading
    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.includes("Cannot read properties of undefined (reading 'position')") ||
        event.message?.includes("has already been used with this registry")
      ) {
        event.preventDefault()
        return
      }
    }
    
    window.addEventListener('error', handleError)

    // Load the Spline viewer script dynamically
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js'
    script.onload = () => setIsLoaded(true)
    script.onerror = () => setHasError(true)
    
    // Only append if not already in document
    if (!document.querySelector('script[src*="@splinetool/viewer"]')) {
      document.head.appendChild(script)
    } else {
      setIsLoaded(true)
    }

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-10 pointer-events-auto">
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      )}
      
      {!hasError && (
        <spline-viewer 
          url="https://prod.spline.design/jD8BWozwPhxDEScS/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      )}
    </div>
  )
}
