"use client"

type RotatingScrollTextProps = {
  /** Light text for colored / tinted backgrounds */
  variant?: "default" | "on-tint"
}

export function RotatingScrollText({ variant = "default" }: RotatingScrollTextProps) {
  const text = "SCROLL DOWN • SCROLL DOWN • SCROLL DOWN • "
  const isOnTint = variant === "on-tint"
  const fillClass = isOnTint ? "fill-white/85" : "fill-black/80"
  const iconClass = isOnTint ? "text-white/85" : "text-black/80"

  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-30 sm:bottom-5 sm:right-5 md:bottom-6 md:right-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
      <div className="relative h-full w-full animate-spin-slow">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
          </defs>
          <text
            className={`text-[5px] font-medium tracking-widest sm:text-[6px] md:text-[7px] lg:text-[8px] ${fillClass}`}
          >
            <textPath href="#circlePath">{text}</textPath>
          </text>
        </svg>

        <div className="absolute inset-0 flex animate-spin-slow-reverse items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 ${iconClass}`}
            aria-hidden
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 8s linear infinite;
        }
      `}</style>
    </div>
  )
}
