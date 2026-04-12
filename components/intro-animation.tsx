"use client"

import { useEffect, useState } from "react"

// Timeline (ms):
// 0        → letters rendered at scatter origins (visible, no transition)
// 80       → phase "arriving" → letters fly to center (transition fires)
// 1000     → phase "hold"    → letters locked, tagline + details fade in
// 2600     → phase "fade-out"→ whole overlay fades to nothing
// 3400     → done, unmount

const LETTERS = ["N", "O", "R", "B", "U"]

const SCATTER_ORIGINS = [
  { x: "-180%", y: "-120%", rotate: -30 },
  { x: "-90%",  y:  "160%", rotate:  20 },
  { x:   "0%",  y: "-200%", rotate: -10 },
  { x:  "110%", y:  "150%", rotate:  25 },
  { x:  "200%", y: "-100%", rotate: -22 },
]

type Phase = "scatter" | "arriving" | "hold" | "fade-out" | "done"

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null)
  const [phase, setPhase] = useState<Phase>("scatter")

  useEffect(() => {
    const seen = sessionStorage.getItem("intro-seen")
    if (seen) {
      setShouldShow(false)
      onComplete()
      return
    }
    sessionStorage.setItem("intro-seen", "1")
    setShouldShow(true)

    // Short delay so React has painted the scatter positions before we
    // trigger the fly-in transition
    const t0 = setTimeout(() => setPhase("arriving"),  80)
    const t1 = setTimeout(() => setPhase("hold"),      1000)
    const t2 = setTimeout(() => setPhase("fade-out"),  2600)
    const t3 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 3400)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  if (shouldShow === null || !shouldShow || phase === "done") return null

  const isScatter  = phase === "scatter"
  const isArriving = phase === "arriving"
  const isHold     = phase === "hold"
  const isFadeOut  = phase === "fade-out"

  // Letters are at scatter origin while "scatter" or "arriving" (transition fires on "arriving")
  const lettersAtOrigin = isScatter || isArriving

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
        opacity: isFadeOut ? 0 : 1,
        transition: isFadeOut ? "opacity 0.8s cubic-bezier(0.76,0,0.24,1)" : "none",
        pointerEvents: isFadeOut ? "none" : "all",
      }}
    >
      {/* Horizontal rule that draws in during hold */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          height: "1px",
          background: "rgba(255,255,255,0.07)",
          width: isHold || isFadeOut ? "100%" : "0%",
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
          const origin    = SCATTER_ORIGINS[i]
          const flyDelay  = i * 60   // stagger each letter 60ms

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
                // Scatter: placed at origin, fully visible (no transition yet)
                // Arriving: transition fires from origin → 0,0
                // Hold/FadeOut: settled at 0,0
                transform: lettersAtOrigin
                  ? `translate(${origin.x}, ${origin.y}) rotate(${origin.rotate}deg)`
                  : "translate(0%, 0%) rotate(0deg)",
                opacity: 1,
                transition: isArriving
                  ? `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${flyDelay}ms`
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
          opacity: isHold || isFadeOut ? 1 : 0,
          transform: isHold || isFadeOut ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
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

      {/* Top-left label */}
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
          opacity: isHold || isFadeOut ? 1 : 0,
          transition: "opacity 0.5s ease 0.8s",
          userSelect: "none",
        }}
      >
        Portfolio
      </div>

      {/* Bottom-right year */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(20px, 4vh, 40px)",
          right: "clamp(20px, 4vw, 48px)",
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.15em",
          opacity: isHold || isFadeOut ? 1 : 0,
          transition: "opacity 0.5s ease 0.8s",
          userSelect: "none",
        }}
      >
        © 2025
      </div>
    </div>
  )
}
