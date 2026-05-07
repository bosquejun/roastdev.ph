"use client";

import { motion } from "motion/react";
import { Brain, AlertCircle } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { MetricBar } from "../../shared/metric-bar";
import { CommunityReactions } from "./community-reactions";

interface ResultViewProps {
  onBack: () => void;
}

export function ResultView({ onBack }: ResultViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pt-10"
    >
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="text-(--text-secondary) text-xs font-bold uppercase hover:text-(--accent-danger) flex items-center gap-2"
        >
          ← Back to Stream
        </button>
      </div>

      <section className="mb-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-(--accent-warning) text-(--accent-warning) text-[11px] font-bold mb-2 uppercase tracking-widest">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-(--accent-warning)"
              />
              Analysis Finalized
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-2">
              Sari-Sari Saas
            </h1>
            <p className="text-sm font-medium text-(--text-secondary) flex items-center justify-center md:justify-start gap-2 uppercase tracking-wide">
              SUBMITTED BY{" "}
              <span className="text-(--accent-danger)">@juan_developer</span>{" "}
              • FEB 2024
            </p>
          </div>
          <div className="flex justify-center md:justify-end mt-4 md:mt-0">
            <Button className="bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) text-black px-8 py-4 border-2 border-(--border-muted) font-bold uppercase text-xl shadow-[4px_4px_0px_0px_rgba(255,78,78,0.5)] tracking-tighter">
              Fix My Startup
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-(--border-muted) bg-(--bg-surface) overflow-hidden mb-12">
        <div className="lg:col-span-7 border-b-2 lg:border-b-0 lg:border-r-2 border-(--border-muted) p-6 bg-(--bg-primary) relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 bg-(--border-muted) p-2 -mx-6 -mt-6 border-b-2 border-(--border-muted) px-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-(--accent-danger)" />
              <div className="w-3 h-3 rounded-full bg-(--accent-warning)" />
              <div className="w-3 h-3 rounded-full bg-(--accent-success)" />
            </div>
            <div className="flex-1 text-center text-[10px] text-(--text-secondary) uppercase tracking-widest font-bold">
              https://sari-sari-saas.ph/landing
            </div>
          </div>
          <div className="mt-8 rounded-lg border-2 border-(--border-muted) overflow-hidden bg-white aspect-video relative group">
            <img
              alt="Project Preview"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAms2udUdGtRnN3j8p29OBQBM8NjpNqkrGw1-tsSPdabldrL3O9X_ZHBFNiiWEtBxgGngmiKRzJvznVrull6KwsDW4Ddi8jAVLd3PQbX62FDJPvbxQ5RQZ9dlXMflmSEZBrOPWHGX3QkKI9i7aePH_rQdLLKIl9elsVAQHwDJ1K1YoUf75Pe2PW-morvf4fevEBjcHRm0o5JwMIlWy72kGt8f0Vchj0u1VizvIMmuPnxnznTx5F-v2aVVNbf8ujE--yTBO-rnonxjg"
            />
            <div className="absolute inset-0 bg-(--accent-danger)/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <AlertCircle className="text-(--accent-danger) w-20 h-20 fill-(--accent-danger)" />
                <div className="bg-(--accent-danger) text-white px-4 py-1 font-bold uppercase mt-2 text-sm">
                  Visual Gore Detected
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-(--accent-danger) uppercase flex items-center gap-2">
              <Brain className="w-6 h-6" />
              The Verdict
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <blockquote className="border-l-4 border-(--accent-danger) pl-4 italic bg-(--surface-container) py-4 pr-4">
                &quot;Lodi, anong taon na? 2005 ba ulit? The gradient work here
                is more &#39;expired sardine can&#39; than &#39;next-gen fintech&#39;.
                Mash-up ng Bootstrap 3 templates and pure chaos. Sakit sa
                bangs ng UX mo, pre.&quot;
              </blockquote>
              <p className="text-(--text-secondary) text-sm font-medium uppercase tracking-wide">
                Analysis: High cognitive load, zero visual hierarchy, and
                buttons that look like they were designed in MS Paint. Your
                CTA is hiding better than a corrupt politician.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <h3 className="text-[10px] text-(--text-secondary) uppercase tracking-[0.2em] border-b border-(--border-muted) pb-2 font-bold">
              Metrics of Shame
            </h3>
            <div className="space-y-6">
              <MetricBar
                label="First Impression"
                score={12}
                colorClass="bg-(--accent-danger)"
                shadowClass="shadow-[0_0_15px_rgba(255,78,78,0.4)]"
              />
              <MetricBar
                label="Trust Factor"
                score={34}
                colorClass="bg-(--accent-warning)"
                shadowClass="shadow-[0_0_15_rgba(250,204,21,0.4)]"
              />
              <MetricBar
                label="Pinoyness (Barkada Energy)"
                score={92}
                colorClass="bg-(--accent-success)"
                shadowClass="shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              />
            </div>
          </div>
        </div>
      </section>

      <CommunityReactions />
    </motion.div>
  );
}