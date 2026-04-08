"use client"

import Spline from "@splinetool/react-spline"

export function SplineScene() {
  return (
    <div className="absolute inset-0 z-10">
      <Spline scene="https://prod.spline.design/jD8BWozwPhxDEScS/scene.splinecode" />
    </div>
  )
}
