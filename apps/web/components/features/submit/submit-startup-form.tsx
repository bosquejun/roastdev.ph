"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { AlertCircle, Loader } from "lucide-react";
import { SubmitStartupSchema, submitStartupSchema } from "@/lib/schemas";

const FOCUS_OPTIONS = [
  { id: "overall", label: "Overall First Impression" },
  { id: "ux", label: "UX/UI Design" },
  { id: "pricing", label: "Pricing & Value" },
  { id: "copy", label: "Copy & Messaging" },
  { id: "onboarding", label: "Onboarding Flow" },
  { id: "mobile", label: "Mobile Experience" },
];

export function SubmitStartupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  });

  const description = watch("description") || "";
  const charCount = description.length;

  const onSubmit = async (data: SubmitStartupSchema) => {
    setIsSubmitting(true);

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: data.url }),
    });

    const result = await res.json();

    if (result.hash) {
      router.push(`/roasted/${result.hash}`);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="companyName"
          className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          Company/Product Name
        </label>
        <Input
          id="companyName"
          {...register("companyName")}
          placeholder="RocketPH, KonekTok, PayMaya..."
          className="w-full bg-card h-12 border-2 border-border px-4 py-3 text-sm font-medium focus:border-accent-warning focus:ring-0 outline-none transition-colors"
        />
        {errors.companyName && (
          <div className="flex items-center gap-2 text-accent-danger text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.companyName.message}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="url"
          className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          Website URL
        </label>
        <Input
          id="url"
          {...register("url")}
          placeholder="https://yourstartup.com"
          type="text"
          className="w-full bg-card h-12 border-2 border-border px-4 py-3 text-sm font-medium focus:border-accent-warning focus:ring-0 outline-none transition-colors"
        />
        {errors.url && (
          <div className="flex items-center gap-2 text-accent-danger text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.url.message}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          Short Description
        </label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="A P2P payments app for rural Philippines..."
          className="w-full bg-card border-2 border-border px-4 py-3 text-sm font-medium focus:border-accent-warning focus:ring-0 outline-none transition-colors min-h-[100px] resize-none"
        />
        <div className="flex justify-between items-center">
          {errors.description && (
            <div className="flex items-center gap-2 text-accent-danger text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.description.message}</span>
            </div>
          )}
          <span className={`text-xs ml-auto ${charCount > 270 ? "text-accent-warning" : "text-muted-foreground"}`}>
            {charCount}/300
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
          What to Focus On (Optional)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {FOCUS_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                value={option.id}
                {...register("focusAreas")}
                className="w-5 h-5 rounded border-2 border-border bg-card checked:bg-accent-danger checked:border-accent-danger focus:ring-0 cursor-pointer"
              />
              <span className="text-sm font-medium text-foreground group-hover:text-accent-warning transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent-danger h-14 text-white font-bold px-8 py-4 border-2 border-accent-danger active:translate-y-1 active:translate-x-[2px] transition-all hover:bg-opacity-90 uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:translate-x-0"
      >
        {isSubmitting ? (
          <>
            <Loader className="w-5 h-5 animate-spin mr-2" />
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
  );
}
