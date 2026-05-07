import { SubmitStartupForm } from "@/components/features/submit/submit-startup-form"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-xl p-8">
      <div className="mb-8">
        <div className="overflow-hidden rounded-t-lg border-2 border-(--border-muted) bg-(--bg-surface)">
          <div className="flex items-center gap-2 border-b border-(--border-muted) bg-(--bg-surface-elevated) px-4 py-2">
            <div className="h-3 w-3 rounded-full bg-(--accent-danger)" />
            <div className="h-3 w-3 rounded-full bg-(--accent-warning)" />
            <div className="h-3 w-3 rounded-full bg-(--accent-success)" />
            <span className="ml-3 text-xs font-bold tracking-wider text-(--text-secondary) uppercase">
              submit_startup.exe
            </span>
          </div>
          <div className="p-6 text-center">
            <h1 className="mb-3 text-3xl font-bold uppercase italic md:text-4xl">
              Submit Your Startup
            </h1>
            <p className="font-medium text-(--text-secondary)">
              Enter your details below and get ready for a brutal but
              constructive roast from the Filipino builder community.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-2 border-(--border-muted) bg-(--bg-surface) p-6">
        <SubmitStartupForm />
      </div>

      <p className="mt-6 text-center text-xs text-(--text-secondary)">
        We scan your landing page and generate a detailed roast based on UX,
        copy, pricing, and first impressions.
      </p>
    </div>
  )
}
