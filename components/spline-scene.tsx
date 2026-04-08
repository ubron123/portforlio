"use client"

import { useEffect, useRef, useState } from "react"

export function SplineScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let app: any = null
    let mounted = true

    async function loadSpline() {
      if (!canvasRef.current) return

      try {
        const { Application } = await import("@splinetool/runtime")
        
        if (!mounted) return
        
        app = new Application(canvasRef.current)
        await app.load("https://prod.spline.design/jD8BWozwPhxDEScS/scene.splinecode")
        
        if (mounted) {
          setIsLoaded(true)
        }
      } catch (error) {
        console.log("[v0] Spline load error:", error)
        if (mounted) {
          setHasError(true)
          setIsLoaded(true)
        }
      }
    }

    loadSpline()

    return () => {
      mounted = false
      if (app) {
        app.dispose?.()
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 z-10">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-black" />
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity: isLoaded && !hasError ? 1 : 0,
          transition: "opacity 0.3s ease-in-out"
        }}
      />
    </div>
  )
}
