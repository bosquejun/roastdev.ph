import { Search, Zap, MessageSquare } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Submit Your URL",
    description:
      "Drop your landing page, portfolio, or product link. No sign-up required. We take any publicly accessible URL.",
    accent: "var(--accent-danger)",
    glow: "rgba(255,78,78,0.15)",
  },
  {
    number: "02",
    icon: Zap,
    title: "AI Runs the Roast",
    description:
      "Our model tears through your UX, copy, trust signals, and conversion flow. No bias. No sugarcoating. Just data.",
    accent: "var(--orange-vibrant)",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Community Piles On",
    description:
      "Filipino builders from the community react, comment, and share hard-won fixes. Barkada energy, real feedback.",
    accent: "var(--accent-warning)",
    glow: "rgba(250,204,21,0.15)",
  },
];

const CornerDot = ({ position }: { position: "tl" | "tr" | "bl" | "br" }) => {
  const posClass = {
    tl: "-top-[4.5px] -left-[4.5px]",
    tr: "-top-[4.5px] -right-[4.5px]",
    bl: "-bottom-[4.5px] -left-[4.5px]",
    br: "-bottom-[4.5px] -right-[4.5px]",
  }[position];

  return (
    <div
      className={`absolute z-10 size-2 rounded-full ${posClass}`}
      style={{
        background: "linear-gradient(135deg, #FF4E4E, #FACC15)",
        boxShadow: "0 0 6px rgba(255,78,78,0.6)",
      }}
    />
  );
};

export function HowItWorks() {
  return (
    <section className="pb-24">
      {/* Section label */}
      <div className="text-center mb-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-(--text-secondary) mb-3">
          The Process
        </p>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter">
          Three Steps to{" "}
          <span className="bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) bg-clip-text text-transparent">
            Brutal Clarity
          </span>
        </h2>
      </div>

      {/* Card-9 double-frame container */}
      <div className="relative w-full border border-(--border-muted) px-4 sm:px-8 md:px-12">
        {/* Horizontal inner rails */}
        <div className="absolute left-0 top-8 z-0 h-px w-full bg-(--border-muted)" />
        <div className="absolute bottom-8 left-0 z-0 h-px w-full bg-(--border-muted)" />

        {/* Vertical inner rails + corner dots */}
        <div className="relative w-full border-x border-(--border-muted)">
          <CornerDot position="tl" />
          <CornerDot position="tr" />
          <CornerDot position="bl" />
          <CornerDot position="br" />

          {/* Content */}
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-(--border-muted) py-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative px-8 py-8 group"
                  style={{ "--step-glow": step.glow } as React.CSSProperties}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center, ${step.glow} 0%, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    {/* Step number */}
                    <p
                      className="text-[11px] font-black uppercase tracking-[0.3em] mb-4"
                      style={{ color: step.accent }}
                    >
                      {step.number}
                    </p>

                    {/* Icon */}
                    <div
                      className="w-10 h-10 border flex items-center justify-center mb-6"
                      style={{ borderColor: step.accent }}
                    >
                      <Icon className="w-5 h-5" style={{ color: step.accent }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold uppercase tracking-tight mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-(--text-secondary) font-medium leading-relaxed">
                      {step.description}
                    </p>

                    {/* Bottom accent line */}
                    <div
                      className="mt-6 h-px w-12"
                      style={{ background: step.accent }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
