"use client";

import { motion } from "motion/react";
import { Navbar } from "./shared/navbar";
import { Footer } from "./shared/footer";
import { LandingHero } from "./features/home/landing-hero";
import { HowItWorks } from "./features/home/how-it-works";
import { RoastPreview } from "./features/home/roast-preview";
import { Manifesto } from "./features/home/manifesto";

const RailCross = () => (
  <div className="relative shrink-0 size-3 flex items-center justify-center">
    <div
      className="absolute h-px w-full"
      style={{ background: "linear-gradient(90deg, #FF4E4E, #FACC15)" }}
    />
    <div
      className="absolute w-px h-full"
      style={{ background: "linear-gradient(180deg, #FF4E4E, #FACC15)" }}
    />
  </div>
);

export function HomeContent() {
  return (
    <div className="min-h-screen selection:bg-accent-danger selection:text-white bg-background">

      {/* Fixed vertical rails — z-[60] to render above navbar z-50 */}
      <div className="fixed inset-0 z-[60] pointer-events-none">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 relative">
          <div className="absolute inset-y-0 left-4 sm:left-6 md:left-8 w-px bg-border" />
          <div className="absolute inset-y-0 right-4 sm:right-6 md:right-8 w-px bg-border" />
        </div>
      </div>

      {/* Fixed horizontal rail at bottom of navbar with centered dots */}
      <div className="fixed top-[80px] left-0 right-0 z-[60] pointer-events-none">
        {/* The rail line */}
        <div className="h-px bg-border w-full" />
        {/* Crosses centered on the rail × vertical rail intersection */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between -translate-y-1/2">
          <div className="-translate-x-1/2">
            <RailCross />
          </div>
          <div className="translate-x-1/2">
            <RailCross />
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen">
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
  );
}
