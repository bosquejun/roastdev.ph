"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { SquigglyText } from "@workspace/ui/components/squiggly-text"
import { Flame, AlertCircle, Loader2, Loader } from "lucide-react"
import { resolveUrl, ResolveResult } from "@/app/actions/roast"
import { RoastFormSchema, roastFormSchema } from "@/lib/schemas"

export function LandingHero() {
  const router = useRouter()
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<RoastFormSchema>({
    resolver: zodResolver(roastFormSchema),
    mode: "onChange",
  })

  const urlValue = watch("url")
  const hasContent = urlValue && urlValue.trim().length > 0
  const isValid = hasContent && !errors.url

  const [isResolving, setIsResolving] = useState(false)

  const handleSubmit = async () => {
    if (!isValid) return

    setIsResolving(true)
    const formData = new FormData()
    formData.set("url", urlValue)

    const result = await resolveUrl(formData)

    if (result) {
      router.push(`/roasted/${result.host}`)
    }

    setIsResolving(false)
  }

  return (
    <section
      className="relative overflow-hidden pt-24 pb-0 text-center"
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
        <div className="mb-8 inline-flex bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) p-[1.5px]">
          <div className="inline-flex items-center gap-2 bg-(--bg-primary) px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
            <span className="bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) bg-clip-text text-transparent">
              MASAKIT NA KATOTOHANAN
            </span>
          </div>
        </div>
        <h1 className="mx-auto mb-8 max-w-4xl text-5xl leading-[1.1] font-bold uppercase italic md:text-7xl">
          Your startup is probably{" "}
          <SquigglyText
            stepDuration={90}
            scale={[6, 9]}
            className="text-amber-500"
          >
            <span className="inline-block bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) bg-clip-text px-2 text-transparent">
              trash
            </span>
          </SquigglyText>
          . Let&apos;s fix it.
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg font-medium text-(--text-secondary)">
          Brutally honest roasts and real feedback from the Filipino builder
          community. No sugar-coating, just pure product growth.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="group mx-auto flex max-w-xl flex-col gap-0 md:flex-row"
        >
          <div className="flex-1">
            <Input
              {...register("url")}
              className="h-12 w-full border-2 border-(--border-muted) bg-(--bg-surface) px-6 py-4 text-sm font-medium transition-colors outline-none focus:border-(--accent-warning) focus:ring-0"
              placeholder="https://your-startup.com"
              type="text"
            />
            {errors.url ? (
              <div className="mt-2 ml-1 flex items-center gap-2 text-left text-sm font-medium text-(--accent-danger)">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errors.url.message}</span>
              </div>
            ) : (
              <p className="mt-2 ml-1 text-left text-xs text-(--text-secondary)">
                Enter your landing page URL (e.g., yourstartup.com)
              </p>
            )}
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={Boolean(!isValid && urlValue) || isResolving}
            className="hover:bg-opacity-90 h-12 border-2 border-(--accent-danger) bg-(--accent-danger) px-8 py-4 text-sm font-bold whitespace-nowrap text-white uppercase transition-all active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0"
          >
            {isResolving ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
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
  )
}
