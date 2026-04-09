"use client"

import { useState, useEffect, Suspense, Component, ReactNode } from "react"
import dynamic from "next/dynamic"

// Error Boundary to catch Spline rendering errors
class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    // Silently catch Spline-related errors
    console.log("Spline error caught:", error.message)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  ),
})

export function SplineRobot() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Suppress Spline console errors and catch uncaught errors from the library
  useEffect(() => {
    const originalError = console.error
    console.error = (...args) => {
      const errorString = args[0]?.toString?.() || ""
      if (
        errorString.includes("Cannot read properties of undefined") ||
        errorString.includes("position") ||
        errorString.includes("spline")
      ) {
        return // Suppress known Spline internal errors
      }
      originalError.apply(console, args)
    }

    // Global error handler for uncaught Spline errors
    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.includes("Cannot read properties of undefined") &&
        event.filename?.includes("spline")
      ) {
        event.preventDefault()
        return true
      }
    }

    window.addEventListener("error", handleError)

    return () => {
      console.error = originalError
      window.removeEventListener("error", handleError)
    }
  }, [])

  const fallbackContent = (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="text-cyan-500/50 text-sm">3D scene unavailable</div>
    </div>
  )

  if (hasError) {
    return fallbackContent
  }

  return (
    <SplineErrorBoundary fallback={fallbackContent}>
      <div className="absolute inset-0 z-10 pointer-events-auto">
        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        )}
        
        <div 
          style={{
            width: "100%",
            height: "100%",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <Suspense fallback={null}>
            <Spline
              scene="https://prod.spline.design/jD8BWozwPhxDEScS/scene.splinecode"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
          </Suspense>
        </div>
      </div>
    </SplineErrorBoundary>
  )
}
