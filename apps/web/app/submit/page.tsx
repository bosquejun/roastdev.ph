import { SubmitStartupForm } from "@/components/features/submit/submit-startup-form";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <div className="bg-(--bg-surface) border-2 border-(--border-muted) rounded-t-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-(--bg-surface-elevated) border-b border-(--border-muted)">
                <div className="w-3 h-3 rounded-full bg-(--accent-danger)" />
                <div className="w-3 h-3 rounded-full bg-(--accent-warning)" />
                <div className="w-3 h-3 rounded-full bg-(--accent-success)" />
                <span className="ml-3 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                  submit_startup.exe
                </span>
              </div>
              <div className="p-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 uppercase italic">
                  Submit Your Startup
                </h1>
                <p className="text-(--text-secondary) font-medium">
                  Enter your details below and get ready for a brutal but constructive roast from the Filipino builder community.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-(--bg-surface) border-2 border-(--border-muted) rounded-lg p-6">
            <SubmitStartupForm />
          </div>

          <p className="mt-6 text-center text-xs text-(--text-secondary)">
            We scan your landing page and generate a detailed roast based on UX, copy, pricing, and first impressions.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}