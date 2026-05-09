import { Button } from "@workspace/ui/components/button"
import { ArrowRight, Flame } from "lucide-react"

export function Manifesto() {
  return (
    <section className="grid items-center gap-16 border-t border-border px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
      <div>
        <h2 className="mb-8 text-3xl font-bold tracking-tighter uppercase">
          Ang Manifesto
        </h2>

        <div className="mb-10 space-y-1 border-l-2 border-accent-warning pl-6">
          <p className="text-lg leading-snug font-medium">
            Your barkada said it looked clean.
          </p>
          <p className="text-lg leading-snug font-medium">
            Your co-founder said it was almost there.
          </p>
          <p className="text-lg leading-snug font-medium">
            Your mom said she&apos;s proud of you.
          </p>
          <p className="mt-4 text-xl font-bold">Lahat sila nagsinungaling.</p>
        </div>

        <ul className="space-y-4 text-sm font-bold tracking-widest uppercase">
          <li className="flex items-start gap-2">
            <Flame className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-warning" />
            <span>Wala kaming pakialam sa feelings mo. Facts lang.</span>
          </li>
          <li className="flex items-start gap-2">
            <Flame className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-400" />
            <span>Not vibes. Actual UX and conversion data.</span>
          </li>
          <li className="flex items-start gap-2">
            <Flame className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-danger" />
            <span>
              Get roasted. Fix it. Ship something people actually use.
            </span>
          </li>
        </ul>
      </div>

      <div className="group relative -mx-4 flex min-h-[350px] items-center justify-center border-2 border-border bg-muted p-4">
        <img
          alt="Hall of Shame"
          className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBump2wxKGkUzI5l0Q7JOzaNYx0J4n-N32Y-RGVtU1mqloYRYvyx8O3CqdUaHb79BaG7oLAWLVJriKySiD3VC97-i0ZXxKHIck4LVfygTbL9BuVR1xutu9-jrcDTbguXiLWjGsrkFvqsNdVQiuPRCvrvbZlZewX5uHLCVUpLkTXs4RYZSguEp9uodRCpVk7CZJh5ycUrspYeeUi-SC9zj4-Wd14-LrbBEjbHPhSpDPIZKvcugfrYEzU6nf6eNLYZp7QL_cIHsXNx_c"
        />
        <div className="relative z-10 border border-border bg-background/70 p-4 text-center backdrop-blur-sm md:p-8">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Mga biktima
          </p>
          <div className="mt-4 mb-8 inline-flex bg-gradient-to-r from-accent-danger via-orange-vibrant to-accent-warning p-[1.5px]">
            <div className="inline-flex items-center gap-2 bg-background px-3 py-1 text-lg font-bold tracking-widest uppercase">
              <span className="bg-gradient-to-r from-accent-danger via-orange-vibrant to-accent-warning bg-clip-text text-transparent">
                Hall of Shame
              </span>
            </div>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            Real sites. Real burns. Walang nakaligtas.
          </p>
          <Button
            variant="link"
            disabled
            className="inline-flex items-center border-0 border-b-2 border-accent-warning text-xs font-bold tracking-[0.2em] text-accent-warning uppercase transition-opacity hover:opacity-70"
          >
            Coming Soon
            {/*<ArrowRight className="size-3" />*/}
          </Button>
        </div>
      </div>
    </section>
  )
}
