"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { SquigglyText } from "@workspace/ui/components/squiggly-text";
import { Flame } from "lucide-react";

interface LandingHeroProps {
  onRoast?: (url: string) => void;
}

export function LandingHero({ onRoast }: LandingHeroProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    if (url?.trim()) {
      onRoast?.(url);
    }
  };

  return (
    <section className="pt-24 pb-0 text-center relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(46,46,50,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(46,46,50,0.5) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Radial + edge fade mask to show grid only in center */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, var(--bg-primary) 80%),
            linear-gradient(to bottom, var(--bg-primary) 0%, transparent 15%, transparent 75%, var(--bg-primary) 100%),
            linear-gradient(to right, var(--bg-primary) 0%, transparent 10%, transparent 90%, var(--bg-primary) 100%)
          `,
        }}
      />
      <div className="relative z-10">
      {/* Gradient border via background-clip trick */}
      <div className="inline-flex p-[1.5px] bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-(--bg-primary) text-[11px] font-bold uppercase tracking-widest">
          <span className="bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) bg-clip-text text-transparent">
            MASAKIT NA KATOTOHANAN
          </span>
        </div>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-8 max-w-4xl mx-auto uppercase italic leading-[1.1]">
        Your startup is probably{" "}
        <SquigglyText
                  stepDuration={90}
                  scale={[6, 9]}
                  className="text-amber-500"
                >
                   <span className="bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) text-transparent px-2 inline-block bg-clip-text">
          trash
        </span>
                </SquigglyText>

        . Let's fix it.
      </h1>
      <p className="text-lg text-(--text-secondary) mb-12 max-w-2xl mx-auto font-medium">
        Brutally honest roasts and real feedback from the Filipino
        builder community. No sugar-coating, just pure product growth.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex flex-col md:flex-row gap-0 group"
      >
        <Input
          name="url"
          className="w-full bg-(--bg-surface) h-12 border-2 border-(--border-muted) px-6 py-4 text-sm font-medium focus:border-(--accent-warning) focus:ring-0 outline-none transition-colors"
          placeholder="https://your-startup.com"
          type="text"
          required
        />
        <Button className="bg-(--accent-danger) h-12 text-white font-bold px-8 py-4 border-2 border-(--accent-danger) whitespace-nowrap active:translate-y-1 transition-all hover:bg-opacity-90 uppercase text-sm">
          <Flame/> Get Roasted
        </Button>
      </form>
      </div>
    </section>
  );
}
