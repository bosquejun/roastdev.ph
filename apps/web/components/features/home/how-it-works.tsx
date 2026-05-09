import { Search, Zap, MessageSquare } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Submit Your URL",
    description:
      "Drop your landing page, portfolio, or product link. No sign-up required. We take any publicly accessible URL.",
    accent: "varaccent-danger",
    glow: "rgba(255,78,78,0.15)",
  },
  {
    number: "02",
    icon: Zap,
    title: "AI Runs the Roast",
    description:
      "Our model tears through your UX, copy, trust signals, and conversion flow. No bias. No sugarcoating. Just data.",
    accent: "varorange-vibrant",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Community Piles On",
    description:
      "Filipino builders from the community react, comment, and share hard-won fixes. Barkada energy, real feedback.",
    accent: "varaccent-warning",
    glow: "rgba(250,204,21,0.15)",
  },
]

const CornerDot = ({ position }: { position: "tl" | "tr" | "bl" | "br" }) => {
  const posClass = {
    tl: "-top-[4.5px] -left-[4.5px]",
    tr: "-top-[4.5px] -right-[4.5px]",
    bl: "-bottom-[4.5px] -left-[4.5px]",
    br: "-bottom-[4.5px] -right-[4.5px]",
  }[position]

  return (
    <div
      className={`absolute z-10 size-2 rounded-full ${posClass}`}
      style={{
        background: "linear-gradient(135deg, #FF4E4E, #FACC15)",
        boxShadow: "0 0 6px rgba(255,78,78,0.6)",
      }}
    />
  )
}

export function HowItWorks() {
  return (
    <section className="pb-24">
      {/* Section label */}
      <div className="mb-12 text-center">
        <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
          The Process
        </p>
        <h2 className="text-3xl font-bold tracking-tighter uppercase md:text-4xl">
          Three Steps to{" "}
          <span className="bg-gradient-to-r from-accent-danger via-orange-vibrant to-accent-warning bg-clip-text text-transparent">
            Brutal Clarity
          </span>
        </h2>
      </div>

      {/* Card-9 double-frame container */}
      <div className="relative w-full border border-border px-4 sm:px-8 md:px-12">
        {/* Horizontal inner rails */}
        <div className="absolute top-8 left-0 z-0 h-px w-full bg-border" />
        <div className="absolute bottom-8 left-0 z-0 h-px w-full bg-border" />

        {/* Vertical inner rails + corner dots */}
        <div className="relative w-full border-x border-border">
          <CornerDot position="tl" />
          <CornerDot position="tr" />
          <CornerDot position="bl" />
          <CornerDot position="br" />

          {/* Content */}
          <div className="divide-border-muted relative z-20 grid grid-cols-1 divide-y py-10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="group relative px-8 py-8"
                  style={{ "--step-glow": step.glow } as React.CSSProperties}
                >
                  {/* Glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at center, ${step.glow} 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Step number */}
                    <p
                      className="mb-4 text-[11px] font-black tracking-[0.3em] uppercase"
                      style={{ color: step.accent }}
                    >
                      {step.number}
                    </p>

                    {/* Icon */}
                    <div
                      className="mb-6 flex h-10 w-10 items-center justify-center border"
                      style={{ borderColor: step.accent }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: step.accent }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-bold tracking-tight uppercase">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed font-medium text-muted-foreground">
                      {step.description}
                    </p>

                    {/* Bottom accent line */}
                    <div
                      className="mt-6 h-px w-12"
                      style={{ background: step.accent }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
