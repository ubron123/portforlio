"use client"

import { useState } from "react"
import { SplineRobot } from "@/components/spline-robot"
import { ProjectCarousel } from "@/components/project-carousel"

import { ProjectDetail } from "@/components/project-detail"
import { AboutSection } from "@/components/about-section"
import { AboutPage } from "@/components/about-page"
import { ServicesSection } from "@/components/services-section"
import { CTAFooter } from "@/components/cta-footer"

// Map project IDs to their gradients (matching project-carousel.tsx)
const projectGradients: Record<number, string> = {
  1: "linear-gradient(155deg, #6b7a94 0%, #9aa8c4 38%, #c5d0e3 100%)",
  2: "linear-gradient(145deg, #4a3d55 0%, #7d6b8a 45%, #a898b5 100%)",
  3: "#847777",
}

export default function Home() {
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false)
  const [isAboutPageOpen, setIsAboutPageOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(1)
  const [currentGradient, setCurrentGradient] = useState(projectGradients[1])

  const handleContactClick = () => {
    const footer = document.getElementById('cta-footer')
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleWorkClick = () => {
    setIsProjectDetailOpen(true)
  }

  const handleAboutClick = () => {
    setIsAboutPageOpen(true)
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Top Section - Black Background */}
      <section className="h-[50vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] bg-black relative flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 sm:py-6 z-20 relative">
          <button
            onClick={handleContactClick}
            className="text-white text-xs sm:text-sm tracking-wider hover:text-white/70 transition-colors cursor-pointer"
          >
            CONTACT
          </button>
          <span className="text-white text-xs sm:text-sm">© 2025</span>
        </header>

        {/* Spline 3D Robot */}
        <SplineRobot />

        {/* Main Headline */}
        <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-4 z-20 pointer-events-none">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-center leading-tight tracking-tight max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
            GREAT SAAS
            <br />
            PRODUCTS ARE BUILD
            <br />
            COMPONENT BY
            <br />
            COMPONENT
          </h1>
        </div>
      </section>

      {/* Bottom Section — project carousel + dynamic tint */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[50vh] lg:min-h-[48vh] overflow-hidden pb-24 sm:pb-28">
        <ProjectCarousel onActiveProjectChange={(id) => {
          setCurrentProject(id)
          setCurrentGradient(projectGradients[id] || projectGradients[1])
        }} />

        {/* Glass nav: WORK · menu · ABOUT */}
        <nav className="absolute bottom-5 sm:bottom-7 md:bottom-9 left-1/2 z-30 -translate-x-1/2">
          <div className="flex items-center gap-0 rounded-full border border-white/20 bg-white/10 px-1 py-1 shadow-lg backdrop-blur-xl sm:gap-0.5 sm:px-2 sm:py-1.5">
            <button
              type="button"
              onClick={handleWorkClick}
              className="rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/15 sm:px-5 sm:text-xs md:px-7"
            >
              WORK
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-white/90 transition-colors hover:bg-white/10"
              aria-label="Menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:h-5 sm:w-5" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleAboutClick}
              className="rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/15 sm:px-5 sm:text-xs md:px-7"
            >
              ABOUT
            </button>
          </div>
        </nav>

        {/* Spacing below project carousel */}
        <div className="h-8 md:h-12" />
      </section>

      {/* About Section with Timeline */}
      <AboutSection sectionGradient={currentGradient} />

      {/* Services Section with 3D Cube */}
      <ServicesSection />

      {/* CTA Footer */}
      <div id="cta-footer">
        <CTAFooter />
      </div>

      {/* Project Detail Modal */}
      <ProjectDetail
        isOpen={isProjectDetailOpen}
        onClose={() => setIsProjectDetailOpen(false)}
        currentProject={currentProject}
      />

      {/* About Page Modal */}
      <AboutPage
        isOpen={isAboutPageOpen}
        onClose={() => setIsAboutPageOpen(false)}
      />


    </main>
  )
}
