"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { SquigglyText } from "@workspace/ui/components/squiggly-text";
import { Flame, AlertCircle, Loader2, Loader } from "lucide-react";
import { resolveUrl, ResolveResult } from "@/app/actions/roast";
import { RoastFormSchema, roastFormSchema } from "@/lib/schemas";

export function LandingHero() {
  const router = useRouter();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<RoastFormSchema>({
    resolver: zodResolver(roastFormSchema),
    mode: "onChange",
  });

  const urlValue = watch("url");
  const hasContent = urlValue && urlValue.trim().length > 0;
  const isValid = hasContent && !errors.url;

  const [isResolving, setIsResolving] = useState(false);
  const [resolvedInfo, setResolvedInfo] = useState<ResolveResult | null>(null);

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsResolving(true);
    const formData = new FormData();
    formData.set("url", urlValue);

    const result = await resolveUrl(formData);

    if (result) {
      setResolvedInfo(result);
      router.push(`/roasted/${result.hash}`);
    }

    setIsResolving(false);
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

        . Let&apos;s fix it.
      </h1>
      <p className="text-lg text-(--text-secondary) mb-12 max-w-2xl mx-auto font-medium">
        Brutally honest roasts and real feedback from the Filipino
        builder community. No sugar-coating, just pure product growth.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="max-w-xl mx-auto flex flex-col md:flex-row gap-0 group"
      >
        <div className="flex-1">
          <Input
            {...register("url")}
            className="w-full bg-(--bg-surface) h-12 border-2 border-(--border-muted) px-6 py-4 text-sm font-medium focus:border-(--accent-warning) focus:ring-0 outline-none transition-colors"
            placeholder="https://your-startup.com"
            type="text"
          />
          {errors.url ? (
            <div className="flex items-center gap-2 mt-2 ml-1 text-(--accent-danger) text-sm font-medium text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.url.message}</span>
            </div>
          ) : (
            <p className="mt-2 ml-1 text-(--text-secondary) text-xs text-left">
              Enter your landing page URL (e.g., yourstartup.com)
            </p>
          )}
        </div>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={(Boolean(!isValid && urlValue)) || isResolving}
          className="bg-(--accent-danger) h-12 text-white font-bold px-8 py-4 border-2 border-(--accent-danger) whitespace-nowrap active:translate-y-1 transition-all hover:bg-opacity-90 uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0"
        >
          {isResolving ? (
            <>
              <Loader className="w-4 h-4 animate-spin mr-2" />
              Roasting..
            </>
          ) : (
            <>
              <Flame /> Get Roasted
            </>
          )}
        </Button>
      </form>
      </div>
    </section>
  );
}
