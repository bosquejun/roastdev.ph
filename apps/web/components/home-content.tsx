"use client"

import { motion } from "motion/react"
import { Navbar } from "./shared/navbar"
import { Footer } from "./shared/footer"
import { LandingHero } from "./features/home/landing-hero"
import { HowItWorks } from "./features/home/how-it-works"
import { RoastPreview } from "./features/home/roast-preview"
import { Manifesto } from "./features/home/manifesto"

const RailCross = () => (
  <div className="relative z-[70] flex size-3 shrink-0 items-center justify-center">
    <div
      className="absolute h-px w-full"
      style={{ background: "linear-gradient(90deg, #FF4E4E, #FACC15)" }}
    />
    <div
      className="absolute h-full w-px"
      style={{ background: "linear-gradient(180deg, #FF4E4E, #FACC15)" }}
    />
  </div>
)

export function HomeContent() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent-danger selection:text-white">
      {/* Fixed vertical rails — z-[60] to render above navbar z-50 */}
      <div className="pointer-events-none fixed inset-0 z-[60]">
        <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="absolute inset-y-0 left-4 w-px bg-border sm:left-6 md:left-8" />
          <div className="absolute inset-y-0 right-4 w-px bg-border sm:right-6 md:right-8" />
        </div>
      </div>

      {/* Fixed horizontal rail at bottom of navbar with centered dots */}
      <div className="pointer-events-none fixed top-[80px] right-0 left-0 z-[70]">
        {/* The rail line */}
        <div className="h-px w-full bg-border" />
        {/* Crosses centered on the rail × vertical rail intersection */}
        <div className="mx-auto flex max-w-7xl -translate-y-1/2 justify-between px-4 sm:px-6 md:px-8">
          <div className="-translate-x-1/2">
            <RailCross />
          </div>
          <div className="translate-x-1/2">
            <RailCross />
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 md:px-8">
        <Navbar />

        <main className="px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-24"
          >
            <LandingHero />
            <HowItWorks />
            <RoastPreview />
            <Manifesto />
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
