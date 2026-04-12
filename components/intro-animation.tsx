"use client"

import { useEffect, useState } from "react"

const LETTERS = ["N", "O", "R", "B", "U"]

// Each letter's stagger delay in ms
const STAGGER_DELAY = 80

// Timeline (ms):
// 0        → letters begin sliding up one by one
// ~700     → all letters visible
// 800      → tagline fades in
// 2200     → hold
// 2600     → letters scatter / explode outward
// 3200     → overlay fades out fully

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "hold" | "scatter" | "exit" | "done">("enter")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const t1 = setTimeout(() => setPhase("hold"), 800)
    const t2 = setTimeout(() => setPhase("scatter"), 2400)
    const t3 = setTimeout(() => setPhase("exit"), 2900)
    const t4 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 3600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  if (phase === "done") return null

  return (
    <div
      aria-hidden="true"
      className="intro-overlay"
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
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.7s cubic-bezier(0.76,0,0.24,1)" : "none",
        pointerEvents: phase === "exit" ? "none" : "all",
      }}
    >
      {/* Thin horizontal rule that draws across */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          width: phase === "enter" || phase === "hold" || phase === "scatter" ? "100%" : "0%",
          transition: "width 1.2s cubic-bezier(0.76,0,0.24,1)",
          transform: "translateY(-1px)",
          pointerEvents: "none",
        }}
      />

      {/* Main NORBU lettering */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "clamp(4px, 1.5vw, 20px)",
          lineHeight: 1,
        }}
      >
        {LETTERS.map((letter, i) => {
          const delay = i * STAGGER_DELAY

          let transform = "translateY(120%) skewY(8deg)"
          let opacity = 0

          if (phase === "hold") {
            transform = "translateY(0%) skewY(0deg)"
            opacity = 1
          } else if (phase === "scatter") {
            // Each letter flies in a unique direction
            const directions = [
              "translate(-160%, -90%) rotate(-25deg)",
              "translate(-80%, 130%) rotate(15deg)",
              "translate(10%, -150%) rotate(-8deg) scale(0.6)",
              "translate(100%, 110%) rotate(20deg)",
              "translate(160%, -80%) rotate(-18deg)",
            ]
            transform = directions[i]
            opacity = 0
          } else if (phase === "exit") {
            const directions = [
              "translate(-160%, -90%) rotate(-25deg)",
              "translate(-80%, 130%) rotate(15deg)",
              "translate(10%, -150%) rotate(-8deg) scale(0.6)",
              "translate(100%, 110%) rotate(20deg)",
              "translate(160%, -80%) rotate(-18deg)",
            ]
            transform = directions[i]
            opacity = 0
          } else if (phase === "enter" && mounted) {
            // stay hidden — CSS transition handles the reveal
            transform = "translateY(120%) skewY(8deg)"
            opacity = 0
          }

          const isHold = phase === "hold"
          const isEntering = phase === "enter" && mounted

          return (
            <div
              key={letter}
              style={{
                overflow: "hidden",
                display: "inline-block",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans, 'Geist', sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(72px, 18vw, 220px)",
                  color: "#fff",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  transform: isHold
                    ? "translateY(0%) skewY(0deg)"
                    : phase === "scatter" || phase === "exit"
                    ? (() => {
                        const dirs = [
                          "translate(-160%, -90%) rotate(-25deg)",
                          "translate(-80%, 130%) rotate(15deg)",
                          "translate(10%, -150%) rotate(-8deg) scale(0.6)",
                          "translate(100%, 110%) rotate(20deg)",
                          "translate(160%, -80%) rotate(-18deg)",
                        ]
                        return dirs[i]
                      })()
                    : "translateY(110%) skewY(6deg)",
                  opacity:
                    phase === "scatter" || phase === "exit"
                      ? 0
                      : isHold
                      ? 1
                      : 0,
                  transition: isHold
                    ? `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.5s ease ${delay}ms`
                    : phase === "scatter" || phase === "exit"
                    ? `transform 0.55s cubic-bezier(0.4,0,1,1) ${i * 40}ms, opacity 0.4s ease ${i * 30}ms`
                    : "none",
                  willChange: "transform, opacity",
                  userSelect: "none",
                }}
              >
                {letter}
              </span>
            </div>
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
          opacity: phase === "hold" ? 1 : 0,
          transform: phase === "hold" ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
        }}
      >
        <span
          style={{
            display: "block",
            width: "32px",
            height: "1px",
            background: "rgba(255,255,255,0.4)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-sans, 'Geist', sans-serif)",
            fontWeight: 400,
            fontSize: "clamp(10px, 1.3vw, 13px)",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          Full-Stack Product Engineer
        </span>
        <span
          style={{
            display: "block",
            width: "32px",
            height: "1px",
            background: "rgba(255,255,255,0.4)",
          }}
        />
      </div>

      {/* Corner year stamp */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(20px, 4vh, 40px)",
          right: "clamp(20px, 4vw, 48px)",
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.15em",
          opacity: phase === "hold" ? 1 : 0,
          transition: "opacity 0.5s ease 0.8s",
          userSelect: "none",
        }}
      >
        © 2025
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
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          opacity: phase === "hold" ? 1 : 0,
          transition: "opacity 0.5s ease 0.8s",
          userSelect: "none",
        }}
      >
        Portfolio
      </div>
    </div>
  )
}
