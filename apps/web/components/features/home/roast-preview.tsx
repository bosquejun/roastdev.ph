import { Rocket } from "lucide-react"
import { MetricBar } from "../../shared/metric-bar"

export function RoastPreview() {
  return (
    <section className="p-8 pb-24">
      <div className="relative overflow-hidden border-2 border-border bg-card p-1">
        <div className="flex items-center justify-between bg-border px-4 py-2">
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
        <div className="grid gap-8 p-8 md:grid-cols-12">
          <div className="space-y-8 md:col-span-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center border border-border bg-muted">
                <Rocket className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">RoastDevPH</h3>
                <p className="text-xs text-muted-foreground italic">
                  Submitted by: @jun
                </p>
              </div>
            </div>
            <div className="border-l-4 border-accent-warning bg-muted px-6 py-6 italic">
              <p className="mb-4 text-xl font-bold">
                &quot;Ganda ng UI, pero asan yung users? Ghost town yarn?&quot;
              </p>
              <p className="leading-relaxed font-medium text-muted-foreground not-italic">
                &quot;Seryoso, batch {new Date().getFullYear()} na pero yung
                landing page mo mukhang template na binili sa Envato nung 2018.
                Ang daming buttons na &#39;Coming Soon&#39; - pre, MVP ba
                &#39;to o listahan ng pangarap?&quot;
              </p>
            </div>
          </div>
          <div className="space-y-6 md:col-span-4">
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
