"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { AlertCircle, Loader } from "lucide-react"
import { SubmitStartupSchema, submitStartupSchema } from "@/lib/schemas"

const FOCUS_OPTIONS = [
  { id: "overall", label: "Overall First Impression" },
  { id: "ux", label: "UX/UI Design" },
  { id: "pricing", label: "Pricing & Value" },
  { id: "copy", label: "Copy & Messaging" },
  { id: "onboarding", label: "Onboarding Flow" },
  { id: "mobile", label: "Mobile Experience" },
]

export function SubmitStartupForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubmitStartupSchema>({
    resolver: zodResolver(submitStartupSchema),
    defaultValues: {
      focusAreas: ["overall"],
    },
    mode: "onChange",
  })

  const description = watch("description") || ""
  const charCount = description.length

  const onSubmit = async (data: SubmitStartupSchema) => {
    setIsSubmitting(true)

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: data.url }),
    })

    const result = await res.json()

    if (result.hash) {
      router.push(`/roasted/${result.hash}`)
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="companyName"
          className="block text-xs font-bold tracking-wider text-muted-foreground uppercase"
        >
          Company/Product Name
        </label>
        <Input
          id="companyName"
          {...register("companyName")}
          placeholder="RocketPH, KonekTok, PayMaya..."
          className="h-12 w-full border-2 border-border bg-card px-4 py-3 text-sm font-medium transition-colors outline-none focus:border-accent-warning focus:ring-0"
        />
        {errors.companyName && (
          <div className="flex items-center gap-2 text-sm font-medium text-accent-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errors.companyName.message}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="url"
          className="block text-xs font-bold tracking-wider text-muted-foreground uppercase"
        >
          Website URL
        </label>
        <Input
          id="url"
          {...register("url")}
          placeholder="https://yourstartup.com"
          type="text"
          className="h-12 w-full border-2 border-border bg-card px-4 py-3 text-sm font-medium transition-colors outline-none focus:border-accent-warning focus:ring-0"
        />
        {errors.url && (
          <div className="flex items-center gap-2 text-sm font-medium text-accent-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errors.url.message}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-xs font-bold tracking-wider text-muted-foreground uppercase"
        >
          Short Description
        </label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="A P2P payments app for rural Philippines..."
          className="min-h-[100px] w-full resize-none border-2 border-border bg-card px-4 py-3 text-sm font-medium transition-colors outline-none focus:border-accent-warning focus:ring-0"
        />
        <div className="flex items-center justify-between">
          {errors.description && (
            <div className="flex items-center gap-2 text-sm font-medium text-accent-danger">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errors.description.message}</span>
            </div>
          )}
          <span
            className={`ml-auto text-xs ${charCount > 270 ? "text-accent-warning" : "text-muted-foreground"}`}
          >
            {charCount}/300
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold tracking-wider text-muted-foreground uppercase">
          What to Focus On (Optional)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {FOCUS_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="group flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                value={option.id}
                {...register("focusAreas")}
                className="h-5 w-5 cursor-pointer rounded border-2 border-border bg-card checked:border-accent-danger checked:bg-accent-danger focus:ring-0"
              />
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent-warning">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="hover:bg-opacity-90 h-14 w-full border-2 border-accent-danger bg-accent-danger px-8 py-4 text-sm font-bold text-white uppercase transition-all active:translate-x-[2px] active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-x-0 disabled:active:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Roasting...
          </>
        ) : (
          <>
            <span className="mr-2">🔥</span>
            GET MY ROAST
          </>
        )}
      </Button>
    </form>
  )
}
