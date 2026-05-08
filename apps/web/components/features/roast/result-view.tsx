/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
"use client"

import { motion, AnimatePresence } from "motion/react"
import { MoveUpRight, AlertTriangle, RotateCcw } from "lucide-react"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { TypingAnimation } from "@workspace/ui/components/typing-animation"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"

const ROAST_QUIPS = [
  "Summoning our most brutally honest AI... wag kang matakot.",
  "Reading your landing page. Iniisip na namin kung saan magsisimula.",
  "Consulting the ghosts of failed startups past...",
  "Scraping your site. Ang daming red flags, sandali lang.",
  "Preparing the verbal beatdown. Hinga muna tayo.",
  "Our AI is clutching its chest. May nahanap na.",
  "Counting the number of 'revolutionary' claims on your homepage...",
  "Loading the pain. Please hold.",
  "Your startup is about to get cooked. Medium-rare or well-done?",
  "Firecrawling through your site like a curious tita at a reunion.",
]

function RoastSkeleton() {
  const [quipIndex, setQuipIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setQuipIndex((i) => (i + 1) % ROAST_QUIPS.length)
        setVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8 py-4">
      <div
        className="text-center transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className="brand-gradient-text text-sm font-medium italic">
          {ROAST_QUIPS[quipIndex]}
        </p>
      </div>
      {[
        ["w-full", "w-[92%]", "w-[96%]", "w-[78%]"],
        ["w-[98%]", "w-full", "w-[88%]", "w-[60%]"],
        ["w-full", "w-[94%]", "w-[90%]", "w-[72%]"],
        ["w-[96%]", "w-full", "w-[85%]", "w-[45%]"],
      ].map((lines, i) => (
        <div key={i} className="space-y-2.5">
          {lines.map((w, j) => (
            <Skeleton key={j} className={`h-[1.1rem] ${w}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

function RoastError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="border-2 border-accent-danger p-4">
        <AlertTriangle className="h-10 w-10 text-accent-danger" />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-bold tracking-wide uppercase">
          The AI Chickened Out
        </p>
        <p className="text-sm text-muted-foreground">
          Something went wrong mid-roast. Even our AI has bad days.{" "}
          <span className="italic">Nanlumo yata.</span>
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 border-2 border-border px-6 py-2 text-sm font-bold tracking-wider uppercase transition-all hover:border-accent-danger hover:text-accent-danger active:translate-x-[2px] active:translate-y-[2px]"
      >
        <RotateCcw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  )
}

interface ResultViewProps {
  host: string
}

export function ResultView({ host }: ResultViewProps) {
  const isSentRef = useRef<boolean>(null)
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/roast",
    }),
    onData: (dataPart) => {
      console.log({ dataPart })
    },
  })

  const handleRetry = () => {
    sendMessage({
      text: `Roast this startup's landing page https://${host}. Seven beats. No mercy. Sige na.`,
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: fire once on mount
  useEffect(() => {
    if (isSentRef.current) return
    isSentRef.current = true
    sendMessage({
      text: `Roast this startup's landing page https://${host}. Seven beats. No mercy. Sige na.`,
    })
  }, [])

  const roasterMessages = useMemo(
    () => messages.filter((m) => m.role !== "user"),
    [messages]
  )

  const hasStreaming = useMemo(() => {
    return roasterMessages.some((m) =>
      m.parts.some((part) => part.type === "text")
    )
  }, [roasterMessages]) // Only re-runs if the messages array reference changes

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="px-8 py-10"
    >
      <div className="relative mx-auto mb-12 max-w-2xl">
        <svg
          className="absolute -top-3 -left-3 text-muted-foreground"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <svg
          className="absolute -top-3 -right-3 text-muted-foreground"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <svg
          className="absolute -bottom-3 -left-3 text-muted-foreground"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <svg
          className="absolute -right-3 -bottom-3 text-muted-foreground"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <div className="flex items-center gap-3 border border-border bg-card p-4">
          <img
            src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
            alt="favicon"
            className="h-8 w-8 rounded-md"
          />
          <span className="text-lg font-semibold">{host}</span>
          <Link
            href={`https://${host}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center justify-center gap-2 rounded-lg bg-accent-danger px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
          >
            Visit Site <MoveUpRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-2">
        <AnimatePresence mode="wait">
          {/* submitted or streaming with no content yet — waiting for first byte */}
          {(status === "submitted" ||
            (status === "streaming" && !hasStreaming)) && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RoastSkeleton />
            </motion.div>
          )}

          {/* error */}
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RoastError onRetry={handleRetry} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* streaming + ready — render messages as they arrive */}
        {(status === "streaming" || status === "ready") &&
          roasterMessages.map((message) => (
            <div key={message.id} className="break-words whitespace-pre-wrap">
              {message.parts.map((part, index) =>
                part.type === "text" ? (
                  <span
                    key={index}
                    style={{
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      fontSize: "1.05rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {part.text}
                  </span>
                ) : null
              )}
            </div>
          ))}

        {/* ready — subtle done indicator */}
        {status === "ready" && messages.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-6 text-center text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase"
          >
            — Roast Complete. Masakit? Ganun talaga. —
          </motion.p>
        )}
      </div>

      {/*<section className="mb-12 grid grid-cols-1 gap-0 overflow-hidden border-2 border-border bg-card lg:grid-cols-12">
        <div className="relative overflow-hidden border-b-2 border-border bg-background p-6 lg:col-span-7 lg:border-r-2 lg:border-b-0">
          <div className="-mx-6 -mt-6 mb-4 flex items-center gap-2 border-b-2 border-border bg-border p-2 px-6">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-accent-danger" />
              <div className="h-3 w-3 rounded-full bg-accent-warning" />
              <div className="h-3 w-3 rounded-full bg-accent-success" />
            </div>
            <div className="flex-1 text-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              https://sari-sari-saas.ph/landing
            </div>
          </div>
          <div className="group relative mt-8 aspect-video overflow-hidden rounded-lg border-2 border-border bg-white">
            <img
              alt="Project Preview"
              className="h-full w-full object-cover contrast-125 grayscale transition-all duration-500 group-hover:grayscale-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAms2udUdGtRnN3j8p29OBQBM8NjpNqkrGw1-tsSPdabldrL3O9X_ZHBFNiiWEtBxgGngmiKRzJvznVrull6KwsDW4Ddi8jAVLd3PQbX62FDJPvbxQ5RQZ9dlXMflmSEZBrOPWHGX3QkKI9i7aePH_rQdLLKIl9elsVAQHwDJ1K1YoUf75Pe2PW-morvf4fevEBjcHRm0o5JwMIlWy72kGt8f0Vchj0u1VizvIMmuPnxnznTx5F-v2aVVNbf8ujE--yTBO-rnonxjg"
            />
            <div className="pointer-events-none absolute inset-0 bg-accent-danger/10" />
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <AlertCircle className="h-20 w-20 fill-accent-danger text-accent-danger" />
                <div className="mt-2 bg-accent-danger px-4 py-1 text-sm font-bold text-white uppercase">
                  Visual Gore Detected
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 lg:col-span-5">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-accent-danger uppercase">
              <Brain className="h-6 w-6" />
              The Verdict
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <blockquote className="border-l-4 border-accent-danger bg-muted py-4 pr-4 pl-4 italic">
                &quot;Lodi, anong taon na? 2005 ba ulit? The gradient work here
                is more &#39;expired sardine can&#39; than &#39;next-gen
                fintech&#39;. Mash-up ng Bootstrap 3 templates and pure chaos.
                Sakit sa bangs ng UX mo, pre.&quot;
              </blockquote>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                Analysis: High cognitive load, zero visual hierarchy, and
                buttons that look like they were designed in MS Paint. Your CTA
                is hiding better than a corrupt politician.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <h3 className="border-b border-border pb-2 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Metrics of Shame
            </h3>
            <div className="space-y-6">
              <MetricBar
                label="First Impression"
                score={12}
                colorClass="bg-accent-danger"
                shadowClass="shadow-[0_0_15px_rgba(255,78,78,0.4)]"
              />
              <MetricBar
                label="Trust Factor"
                score={34}
                colorClass="bg-accent-warning"
                shadowClass="shadow-[0_0_15_rgba(250,204,21,0.4)]"
              />
              <MetricBar
                label="Pinoyness (Barkada Energy)"
                score={92}
                colorClass="bg-accent-success"
                shadowClass="shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              />
            </div>
          </div>
        </div>
      </section>*/}

      {/*<CommunityReactions />*/}
    </motion.div>
  )
}
