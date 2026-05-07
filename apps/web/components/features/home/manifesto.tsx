import { CheckSquare } from "lucide-react";

export function Manifesto() {
  return (
    <section className="py-24 border-t-2 border-(--border-muted) grid md:grid-cols-2 gap-16 items-center p-8">
      <div>
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-tighter">
          Ang Manifesto
        </h2>
        <p className="text-lg mb-8 leading-relaxed italic border-l-2 border-(--accent-warning) pl-6 font-medium">
          &quot;We&#39;re tired of &#39;Looks great!&#39; and &#39;Good job!&#39;. We need the
          truth. Because the truth builds unicorns, but fake praise
          builds ghost towns.&quot;
        </p>
        <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
          <li className="flex items-start gap-4">
            <CheckSquare className="text-(--accent-warning) w-5 h-5 flex-shrink-0" />
            <span>Dito bawal ang masyadong sensitive. Barkada energy lang.</span>
          </li>
          <li className="flex items-start gap-4">
            <CheckSquare className="text-(--accent-warning) w-5 h-5 flex-shrink-0" />
            <span>AI results based on real conversion and UX data.</span>
          </li>
          <li className="flex items-start gap-4">
            <CheckSquare className="text-(--accent-warning) w-5 h-5 flex-shrink-0" />
            <span>Community support after the roast to help you fix things.</span>
          </li>
        </ul>
      </div>
      <div className="relative aspect-video bg-(--surface-container) border-2 border-(--border-muted) flex items-center justify-center group overflow-hidden">
        <img
          alt="Developers collaborating"
          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBump2wxKGkUzI5l0Q7JOzaNYx0J4n-N32Y-RGVtU1mqloYRYvyx8O3CqdUaHb79BaG7oLAWLVJriKySiD3VC97-i0ZXxKHIck4LVfygTbL9BuVR1xutu9-jrcDTbguXiLWjGsrkFvqsNdVQiuPRCvrvbZlZewX5uHLCVUpLkTXs4RYZSguEp9uodRCpVk7CZJh5ycUrspYeeUi-SC9zj4-Wd14-LrbBEjbHPhSpDPIZKvcugfrYEzU6nf6eNLYZp7QL_cIHsXNx_c"
        />
        <div className="relative z-10 text-center p-8 bg-(--bg-primary)/80 border border-(--border-muted) backdrop-blur-sm">
          <p className="text-xl font-bold mb-2 uppercase">
            Build. Roast. Repeat.
          </p>
          <button className="text-(--accent-warning) text-xs font-bold tracking-[0.2em] border-b-2 border-(--accent-warning) uppercase">
            SEE THE HALL OF SHAME
          </button>
        </div>
      </div>
    </section>
  );
}
