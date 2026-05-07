/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
"use client"

import { motion } from "motion/react"
import {
  Brain,
  AlertCircle,
  Loader2,
  ExternalLink,
  MoveUpRight,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { MetricBar } from "../../shared/metric-bar"
import { CommunityReactions } from "./community-reactions"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useMemo, useRef } from "react"
import Link from "next/link"

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

  const isLoading = status !== "ready"

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // useEffect(() => {
  //   if (isSentRef.current) return
  //   isSentRef.current = true
  //   sendMessage({
  //     text: `Roast this startup's landing page https://${host}. Seven beats. No mercy. Sige na.`,
  //   })
  // }, [])

  // const websiteInfo = useMemo(() => {
  //   const info = messages.filter((m) => m.role === "system")

  //   return info
  // }, [messages])

  const streamingContent = messages
    .filter((m) => m.role !== "user")
    .map((message) =>
      message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("")
    )
    .join("")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="px-8 py-10"
    >
      <div className="relative mx-auto mb-6 max-w-2xl">
        <svg
          className="absolute -top-3 -left-3"
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
          className="absolute -top-3 -right-3"
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
          className="absolute -bottom-3 -left-3"
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
          className="absolute -right-3 -bottom-3"
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
        <div className="flex items-center gap-3 border border-(--border-muted) bg-(--bg-surface) p-4">
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
            className="ml-auto flex items-center justify-center gap-2 rounded-lg bg-(--accent-danger) px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
          >
            Visit Site <MoveUpRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-2">
        {isLoading && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <Loader2 className="h-8 w-8 animate-spin text-(--accent-danger)" />
            <p className="text-sm font-medium text-(--text-secondary)">
              Roasting in progress...
            </p>
          </div>
        )}
        {messages
          .filter((m) => m.role !== "user")
          .map((message) => (
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
      </div>

      {/*<section className="mb-12 grid grid-cols-1 gap-0 overflow-hidden border-2 border-(--border-muted) bg-(--bg-surface) lg:grid-cols-12">
        <div className="relative overflow-hidden border-b-2 border-(--border-muted) bg-(--bg-primary) p-6 lg:col-span-7 lg:border-r-2 lg:border-b-0">
          <div className="-mx-6 -mt-6 mb-4 flex items-center gap-2 border-b-2 border-(--border-muted) bg-(--border-muted) p-2 px-6">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-(--accent-danger)" />
              <div className="h-3 w-3 rounded-full bg-(--accent-warning)" />
              <div className="h-3 w-3 rounded-full bg-(--accent-success)" />
            </div>
            <div className="flex-1 text-center text-[10px] font-bold tracking-widest text-(--text-secondary) uppercase">
              https://sari-sari-saas.ph/landing
            </div>
          </div>
          <div className="group relative mt-8 aspect-video overflow-hidden rounded-lg border-2 border-(--border-muted) bg-white">
            <img
              alt="Project Preview"
              className="h-full w-full object-cover contrast-125 grayscale transition-all duration-500 group-hover:grayscale-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAms2udUdGtRnN3j8p29OBQBM8NjpNqkrGw1-tsSPdabldrL3O9X_ZHBFNiiWEtBxgGngmiKRzJvznVrull6KwsDW4Ddi8jAVLd3PQbX62FDJPvbxQ5RQZ9dlXMflmSEZBrOPWHGX3QkKI9i7aePH_rQdLLKIl9elsVAQHwDJ1K1YoUf75Pe2PW-morvf4fevEBjcHRm0o5JwMIlWy72kGt8f0Vchj0u1VizvIMmuPnxnznTx5F-v2aVVNbf8ujE--yTBO-rnonxjg"
            />
            <div className="pointer-events-none absolute inset-0 bg-(--accent-danger)/10" />
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <AlertCircle className="h-20 w-20 fill-(--accent-danger) text-(--accent-danger)" />
                <div className="mt-2 bg-(--accent-danger) px-4 py-1 text-sm font-bold text-white uppercase">
                  Visual Gore Detected
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 lg:col-span-5">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-(--accent-danger) uppercase">
              <Brain className="h-6 w-6" />
              The Verdict
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <blockquote className="border-l-4 border-(--accent-danger) bg-(--surface-container) py-4 pr-4 pl-4 italic">
                &quot;Lodi, anong taon na? 2005 ba ulit? The gradient work here
                is more &#39;expired sardine can&#39; than &#39;next-gen
                fintech&#39;. Mash-up ng Bootstrap 3 templates and pure chaos.
                Sakit sa bangs ng UX mo, pre.&quot;
              </blockquote>
              <p className="text-sm font-medium tracking-wide text-(--text-secondary) uppercase">
                Analysis: High cognitive load, zero visual hierarchy, and
                buttons that look like they were designed in MS Paint. Your CTA
                is hiding better than a corrupt politician.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <h3 className="border-b border-(--border-muted) pb-2 text-[10px] font-bold tracking-[0.2em] text-(--text-secondary) uppercase">
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
      </section>*/}

      {/*<CommunityReactions />*/}
    </motion.div>
  )
}
