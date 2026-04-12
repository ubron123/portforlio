"use client"

import { useEffect, useState } from "react"

// Timeline (ms):
// 0        → letters fly in from scattered positions, converge to center
// 900      → all letters locked in place (hold phase)
// 900–2400 → tagline + corner details fade in, name holds
// 2400     → entire overlay fades out smoothly
// 3200     → done, unmount

const LETTERS = ["N", "O", "R", "B", "U"]

// Where each letter originates before converging
const SCATTER_ORIGINS = [
  { x: "-180%", y: "-120%", rotate: -30 },
  { x: "-90%",  y: "160%",  rotate: 20  },
  { x: "0%",    y: "-200%", rotate: -10 },
  { x: "110%",  y: "150%",  rotate: 25  },
  { x: "200%",  y: "-100%", rotate: -22 },
]

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null)
  const [phase, setPhase] = useState<"fly-in" | "hold" | "fade-out" | "done">("fly-in")

  useEffect(() => {
    // Only show once per browser session
    const seen = sessionStorage.getItem("intro-seen")
    if (seen) {
      setShouldShow(false)
      onComplete()
      return
    }
    sessionStorage.setItem("intro-seen", "1")
    setShouldShow(true)

    const t1 = setTimeout(() => setPhase("hold"),     900)
    const t2 = setTimeout(() => setPhase("fade-out"), 2600)
    const t3 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 3400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  if (shouldShow === null || !shouldShow || phase === "done") return null

  const isHold    = phase === "hold"
  const isFadeOut = phase === "fade-out"

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        // Whole overlay fades out in fade-out phase
        opacity: isFadeOut ? 0 : 1,
        transition: isFadeOut ? "opacity 0.8s cubic-bezier(0.76,0,0.24,1)" : "none",
        pointerEvents: isFadeOut ? "none" : "all",
      }}
    >
      {/* Thin rule that draws in during hold */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          height: "1px",
          background: "rgba(255,255,255,0.07)",
          width: isHold ? "100%" : "0%",
          transition: "width 1s cubic-bezier(0.76,0,0.24,1) 0.1s",
          transform: "translateY(-1px)",
          pointerEvents: "none",
        }}
      />

      {/* NORBU letters */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "clamp(4px, 1.5vw, 18px)",
          lineHeight: 1,
        }}
      >
        {LETTERS.map((letter, i) => {
          const origin = SCATTER_ORIGINS[i]
          // Stagger the fly-in: each letter arrives 70ms after the previous
          const flyInDelay = i * 70

          return (
            <span
              key={letter}
              style={{
                display: "block",
                fontFamily: "var(--font-sans, 'Geist', sans-serif)",
                fontWeight: 900,
                fontSize: "clamp(72px, 17vw, 210px)",
                color: "#fff",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                userSelect: "none",
                willChange: "transform, opacity",
                // fly-in: start from scatter origin, arrive at natural position
                transform: isHold
                  ? "translate(0%, 0%) rotate(0deg)"
                  : `translate(${origin.x}, ${origin.y}) rotate(${origin.rotate}deg)`,
                opacity: isHold ? 1 : 0,
                transition: isHold
                  ? `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${flyInDelay}ms,
                     opacity  0.5s  ease                         ${flyInDelay}ms`
                  : "none",
              }}
            >
              {letter}
            </span>
          )
        })}
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: "clamp(12px, 2.5vh, 28px)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          opacity: isHold ? 1 : 0,
          transform: isHold ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
        }}
      >
        <span
          style={{
            display: "block",
            width: "28px",
            height: "1px",
            background: "rgba(255,255,255,0.35)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-sans, 'Geist', sans-serif)",
            fontWeight: 400,
            fontSize: "clamp(9px, 1.2vw, 12px)",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Full-Stack Product Engineer
        </span>
        <span
          style={{
            display: "block",
            width: "28px",
            height: "1px",
            background: "rgba(255,255,255,0.35)",
          }}
        />
      </div>

      {/* Top-left wordmark */}
      <div
        style={{
          position: "absolute",
          top: "clamp(20px, 4vh, 40px)",
          left: "clamp(20px, 4vw, 48px)",
          fontFamily: "var(--font-sans, 'Geist', sans-serif)",
          fontSize: "11px",
          fontWeight: 500,
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          opacity: isHold ? 1 : 0,
          transition: "opacity 0.5s ease 0.9s",
          userSelect: "none",
        }}
      >
        Portfolio
      </div>

      {/* Corner year stamp */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(20px, 4vh, 40px)",
          right: "clamp(20px, 4vw, 48px)",
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.15em",
          opacity: isHold ? 1 : 0,
          transition: "opacity 0.5s ease 0.9s",
          userSelect: "none",
        }}
      >
        © 2025
      </div>
    </div>
  )
}
