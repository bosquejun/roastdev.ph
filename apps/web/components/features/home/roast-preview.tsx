import { Rocket } from "lucide-react";
import { MetricBar } from "../../shared/metric-bar";

export function RoastPreview() {
  return (
    <section className="pb-24 p-8">
      <div className="bg-(--bg-surface) border-2 border-(--border-muted) relative p-1 overflow-hidden">
        <div className="bg-(--border-muted) flex justify-between items-center px-4 py-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-(--accent-danger)" />
            <div className="w-3 h-3 rounded-full bg-(--accent-warning)" />
            <div className="w-3 h-3 rounded-full bg-(--accent-success)" />
          </div>
          <span className="text-[10px] font-bold text-(--text-secondary) uppercase tracking-widest">
            ROAST_TERMINAL_V1.0
          </span>
          <div className="w-12"></div>
        </div>
        <div className="p-8 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-(--surface-container) border border-(--border-muted) flex items-center justify-center">
                <Rocket className="w-10 h-10 text-(--text-secondary)" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Grab-N-Go Saas</h3>
                <p className="text-xs text-(--text-secondary) italic">
                  Submitted by: @PinoyDevMaster
                </p>
              </div>
            </div>
            <div className="border-l-4 border-(--accent-warning) bg-(--surface-container) px-6 py-6 italic">
              <p className="text-xl font-bold mb-4">
                &quot;Ganda ng UI, pero asan yung users? Ghost town yarn?&quot;
              </p>
              <p className="text-(--text-secondary) font-medium leading-relaxed not-italic">
                &quot;Seryoso, batch {new Date().getFullYear()} na pero yung landing page mo mukhang
                template na binili sa Envato nung 2018. Ang daming buttons
                na &#39;Coming Soon&#39; - pre, MVP ba &#39;to o listahan ng
                pangarap?&quot;
              </p>
            </div>
          </div>
          <div className="md:col-span-4 space-y-6">
            <MetricBar
              label="First Impression"
              score={20}
              colorClass="bg-(--accent-danger)"
              shadowClass="shadow-[0_0_15px_rgba(255,78,78,0.4)]"
            />
            <MetricBar
              label="Trust Factor"
              score={40}
              colorClass="bg-(--accent-warning)"
              shadowClass="shadow-[0_0_15px_rgba(250,204,21,0.4)]"
            />
            <MetricBar
              label="Pinoyness"
              score={90}
              colorClass="bg-(--accent-success)"
              shadowClass="shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
