"use client"

import { cn } from "@/lib/utils"

interface FloatingCubeProps {
  className?: string
  size?: number
}

export function FloatingCube({ className, size = 60 }: FloatingCubeProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{
        width: size,
        height: size,
        perspective: "200px",
      }}
    >
      {/* 3D Cube */}
      <div
        className="relative w-full h-full animate-float"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(-20deg) rotateY(30deg)",
        }}
      >
        {/* Cube faces */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"
          style={{
            transform: `translateZ(${size / 2}px)`,
            width: size,
            height: size,
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950"
          style={{
            transform: `rotateY(90deg) translateZ(${size / 2}px)`,
            width: size,
            height: size,
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800"
          style={{
            transform: `rotateX(90deg) translateZ(${size / 2}px)`,
            width: size,
            height: size,
          }}
        />
      </div>

      {/* Shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-black/30 rounded-full blur-md"
        style={{
          width: size * 1.2,
          height: size * 0.3,
          bottom: -size * 0.4,
        }}
      />
    </div>
  )
}
