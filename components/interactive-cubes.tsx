"use client"

import { useState, useEffect, useRef } from "react"

function Cube({ size = 60 }: { size?: number }) {
  const half = size / 2

  return (
    <div
      className="absolute"
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Front face */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          transform: `translateZ(${half}px)`,
          background: "linear-gradient(145deg, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)",
          boxShadow: "inset 2px 2px 8px rgba(255,255,255,0.15), inset -2px -2px 8px rgba(0,0,0,0.4)",
          border: "1px solid rgba(80, 80, 80, 0.5)",
        }}
      >
        {/* Highlight reflection */}
        <div 
          className="absolute inset-0" 
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, transparent 100%)",
            borderRadius: "1px"
          }}
        />
      </div>
      
      {/* Back face */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          transform: `translateZ(${-half}px) rotateY(180deg)`,
          background: "linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)",
          boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.05), inset -2px -2px 8px rgba(0,0,0,0.6)",
          border: "1px solid rgba(40, 40, 40, 0.5)",
        }}
      />
      
      {/* Right face */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          transform: `rotateY(90deg) translateZ(${half}px)`,
          background: "linear-gradient(145deg, #3a3a3a 0%, #1e1e1e 50%, #0f0f0f 100%)",
          boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.1), inset -2px -2px 8px rgba(0,0,0,0.5)",
          border: "1px solid rgba(60, 60, 60, 0.5)",
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%)",
          }}
        />
      </div>
      
      {/* Left face */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          transform: `rotateY(-90deg) translateZ(${half}px)`,
          background: "linear-gradient(145deg, #5a5a5a 0%, #3a3a3a 50%, #2a2a2a 100%)",
          boxShadow: "inset 2px 2px 10px rgba(255,255,255,0.2), inset -2px -2px 8px rgba(0,0,0,0.3)",
          border: "1px solid rgba(90, 90, 90, 0.5)",
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)",
          }}
        />
      </div>
      
      {/* Top face */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          transform: `rotateX(90deg) translateZ(${half}px)`,
          background: "linear-gradient(145deg, #6a6a6a 0%, #4a4a4a 30%, #3a3a3a 100%)",
          boxShadow: "inset 2px 2px 12px rgba(255,255,255,0.25), inset -2px -2px 8px rgba(0,0,0,0.2)",
          border: "1px solid rgba(100, 100, 100, 0.5)",
        }}
      >
        {/* Top glossy highlight */}
        <div 
          className="absolute inset-0" 
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)",
          }}
        />
        {/* Edge highlight */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />
      </div>
      
      {/* Bottom face */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          transform: `rotateX(-90deg) translateZ(${half}px)`,
          background: "linear-gradient(145deg, #0a0a0a 0%, #050505 100%)",
          boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.02), inset -2px -2px 8px rgba(0,0,0,0.8)",
          border: "1px solid rgba(20, 20, 20, 0.5)",
        }}
      />
    </div>
  )
}

const corners = [
  { x: -400, y: -300 },
  { x: 400, y: -300 },
  { x: -400, y: 300 },
  { x: 400, y: 300 },
]

interface CubeData {
  id: number
  x: number
  y: number
  z: number
  fromX: number
  fromY: number
  isNew: boolean
}

export function InteractiveCubes() {
  const [cubes, setCubes] = useState<CubeData[]>([
    { id: 0, x: -120, y: 20, z: 0, fromX: -120, fromY: 20, isNew: false },
    { id: 1, x: 120, y: -30, z: 0, fromX: 120, fromY: -30, isNew: false },
  ])
  const [merged, setMerged] = useState(false)
  const [exploding, setExploding] = useState(false)
  const [rotY, setRotY] = useState(30)
  const cornerIdx = useRef(0)
  const cubeId = useRef(2)

  useEffect(() => {
    const interval = setInterval(() => setRotY(r => r + 0.3), 30)
    return () => clearInterval(interval)
  }, [])

  const getGridPositions = (count: number) => {
    const positions: { x: number; y: number; z: number }[] = []
    const step = 45

    if (count <= 2) {
      positions.push({ x: -step / 2, y: 0, z: 0 }, { x: step / 2, y: 0, z: 0 })
    } else if (count <= 4) {
      positions.push(
        { x: -step / 2, y: -step / 2, z: 0 },
        { x: step / 2, y: -step / 2, z: 0 },
        { x: -step / 2, y: step / 2, z: 0 },
        { x: step / 2, y: step / 2, z: 0 }
      )
    } else if (count <= 8) {
      for (let z = 0; z < 2; z++) {
        for (let y = 0; y < 2; y++) {
          for (let x = 0; x < 2; x++) {
            positions.push({ x: (x - 0.5) * step, y: (y - 0.5) * step, z: (z - 0.5) * step })
          }
        }
      }
    } else {
      const layers = Math.ceil(count / 4)
      for (let z = 0; z < layers; z++) {
        for (let y = 0; y < 2; y++) {
          for (let x = 0; x < 2; x++) {
            if (positions.length < count) {
              positions.push({ x: (x - 0.5) * step, y: (y - 0.5) * step, z: (z - (layers - 1) / 2) * step })
            }
          }
        }
      }
    }
    return positions.slice(0, count)
  }

  const handleClick = () => {
    if (exploding) return

    if (!merged) {
      const positions = getGridPositions(2)
      setCubes([
        { id: 0, x: positions[0].x, y: positions[0].y, z: positions[0].z, fromX: positions[0].x, fromY: positions[0].y, isNew: false },
        { id: 1, x: positions[1].x, y: positions[1].y, z: positions[1].z, fromX: positions[1].x, fromY: positions[1].y, isNew: false },
      ])
      setMerged(true)
      return
    }

    if (cubes.length >= 16) {
      setExploding(true)
      setTimeout(() => {
        setExploding(false)
        setMerged(false)
        cubeId.current = 2
        setCubes([
          { id: 0, x: -120, y: 20, z: 0, fromX: -120, fromY: 20, isNew: false },
          { id: 1, x: 120, y: -30, z: 0, fromX: 120, fromY: -30, isNew: false },
        ])
      }, 1200)
      return
    }

    const newCount = Math.min(cubes.length + 2, 16)
    const positions = getGridPositions(newCount)
    
    const c1 = corners[cornerIdx.current % corners.length]
    const c2 = corners[(cornerIdx.current + 1) % corners.length]
    cornerIdx.current += 2

    const newCubes: CubeData[] = positions.map((pos, i) => {
      if (i < cubes.length) {
        return { ...cubes[i], x: pos.x, y: pos.y, z: pos.z, isNew: false }
      } else {
        const corner = i === cubes.length ? c1 : c2
        return {
          id: cubeId.current++,
          x: pos.x,
          y: pos.y,
          z: pos.z,
          fromX: corner.x,
          fromY: corner.y,
          isNew: true,
        }
      }
    })

    setCubes(newCubes)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCubes(prev => prev.map(c => ({ ...c, isNew: false })))
      })
    })
  }

  // Responsive cube sizes
  const getCubeSize = () => {
    // Use a default size that works for both server and client
    if (typeof window === 'undefined') {
      return merged ? 40 : 60 // Server-side default
    }
    
    const width = window.innerWidth
    if (width < 640) return 30   // mobile
    if (width < 1024) return 45  // tablet
    return merged ? 40 : 60      // desktop
  }

  const [cubeSize, setCubeSize] = useState(() => {
    // Initialize with server-safe default
    return merged ? 40 : 60
  })

  // Update cube size on client side only
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      let newSize = merged ? 40 : 60
      if (width < 640) newSize = 30
      else if (width < 1024) newSize = 45
      setCubeSize(newSize)
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [merged])

  return (
    <div
      onClick={handleClick}
      className="absolute inset-0 cursor-pointer z-10"
      style={{ perspective: 1000 }}
    >
      {/* Ambient light effect */}
      <div 
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(100,100,100,0.3) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transformStyle: "preserve-3d",
          transform: `translate(-50%, -50%) rotateX(-20deg) rotateY(${rotY}deg)`,
        }}
      >
        {cubes.map((cube, i) => {
          let transform: string
          let opacity = 1
          let transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
          let filter = "none"

          if (exploding) {
            const angle = (i / cubes.length) * Math.PI * 2
            const dist = 400 + Math.random() * 250
            const ex = Math.cos(angle) * dist
            const ey = Math.sin(angle) * dist - 50
            const ez = (Math.random() - 0.5) * 500
            transform = `translate3d(${cube.x + ex}px, ${cube.y + ey}px, ${cube.z + ez}px) rotateX(${Math.random() * 1080}deg) rotateY(${Math.random() * 1080}deg) rotateZ(${Math.random() * 720}deg) scale(0.3)`
            opacity = 0
            transition = "all 1.1s cubic-bezier(0.55, 0.055, 0.675, 0.19)"
            filter = "blur(2px)"
          } else if (cube.isNew) {
            transform = `translate3d(${cube.fromX}px, ${cube.fromY}px, -100px) scale(0.2)`
            opacity = 0.5
            transition = "none"
            filter = "blur(1px)"
          } else {
            transform = `translate3d(${cube.x}px, ${cube.y}px, ${cube.z}px) scale(1)`
          }

          return (
            <div
              key={cube.id}
              className="absolute"
              style={{
                transformStyle: "preserve-3d",
                transform,
                transition,
                opacity,
                filter,
              }}
            >
              <Cube size={cubeSize} />
            </div>
          )
        })}

        {/* Dynamic shadow under the cube structure */}
        {!exploding && (
          <div
            className="absolute"
            style={{
              width: merged ? 90 + cubes.length * 5 : 180,
              height: merged ? 90 + cubes.length * 5 : 180,
              left: "50%",
              transform: `translateX(-50%) rotateX(90deg) translateZ(-70px)`,
              background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
              transition: "all 0.5s ease-out",
              filter: "blur(8px)",
            }}
          />
        )}
      </div>

      {/* Explosion particles */}
      {exploding && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * Math.PI * 2
            const dist = 100 + Math.random() * 200
            const size = 2 + Math.random() * 4
            const delay = Math.random() * 0.3
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  background: `rgba(${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${150 + Math.random() * 100}, 0.8)`,
                  left: "50%",
                  top: "40%",
                  boxShadow: "0 0 6px rgba(255,255,255,0.5)",
                  animation: `particle-fly 1s ease-out ${delay}s forwards`,
                  transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
                  opacity: 0,
                }}
              />
            )
          })}
          {/* Flash effect */}
          <div 
            className="absolute w-40 h-40 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
              animation: "flash 0.5s ease-out forwards",
            }}
          />
        </div>
      )}

      
      <style jsx>{`
        @keyframes particle-fly {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx, 100px), var(--ty, 100px)) scale(0.2);
          }
        }
        @keyframes flash {
          0% {
            opacity: 1;
            transform: scale(0.5);
          }
          100% {
            opacity: 0;
            transform: scale(3);
          }
        }
      `}</style>
    </div>
  )
}
