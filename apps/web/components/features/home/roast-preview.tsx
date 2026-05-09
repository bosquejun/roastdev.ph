import { Rocket } from "lucide-react"
import { MetricBar } from "../../shared/metric-bar"

export function RoastPreview() {
  return (
    <section className="p-4 pb-24 md:p-8">
      <div className="relative overflow-hidden border-2 border-border bg-card p-1">
        <div className="flex items-center justify-between bg-border px-3 py-2 md:px-4">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-accent-danger" />
            <div className="h-3 w-3 rounded-full bg-accent-warning" />
            <div className="h-3 w-3 rounded-full bg-accent-success" />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            ROAST_TERMINAL_V1.0
          </span>
          <div className="w-12"></div>
        </div>
        <div className="grid gap-6 p-4 md:grid-cols-12 md:gap-8 md:p-8">
          <div className="space-y-5 md:col-span-8 md:space-y-8">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-muted md:h-16 md:w-16">
                <Rocket className="h-7 w-7 text-muted-foreground md:h-10 md:w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold md:text-2xl">RoastDevPH</h3>
                <p className="text-xs text-muted-foreground italic">
                  Submitted by: @jun
                </p>
              </div>
            </div>
            <div className="border-l-4 border-accent-warning bg-muted px-4 py-4 italic md:px-6 md:py-6">
              <p className="mb-3 text-base font-bold md:mb-4 md:text-xl">
                &quot;Ganda ng UI, pero asan yung users? Ghost town yarn?&quot;
              </p>
              <p className="text-sm leading-relaxed font-medium text-muted-foreground not-italic md:text-base">
                &quot;Seryoso, batch {new Date().getFullYear()} na pero yung
                landing page mo mukhang template na binili sa Envato nung 2018.
                Ang daming buttons na &#39;Coming Soon&#39; - pre, MVP ba
                &#39;to o listahan ng pangarap?&quot;
              </p>
            </div>
          </div>
          <div className="space-y-4 md:col-span-4 md:space-y-6">
            <MetricBar
              label="Nobody Cares Level"
              score={87}
              colorClass="bg-accent-success"
              shadowClass="shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            />
            <MetricBar
              label="Actual Users"
              score={3}
              colorClass="bg-accent-danger"
              shadowClass="shadow-[0_0_15px_rgba(255,78,78,0.4)]"
            />
            <MetricBar
              label="Cringe Density"
              score={60}
              colorClass="bg-accent-warning"
              shadowClass="shadow-[0_0_15px_rgba(250,204,21,0.4)]"
            />
            <MetricBar
              label="10x Potential"
              score={8}
              colorClass="bg-accent-danger"
              shadowClass="shadow-[0_0_15px_rgba(255,78,78,0.4)]"
            />
            <MetricBar
              label="Series A Delusion"
              score={94}
              colorClass="bg-accent-success"
              shadowClass="shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
