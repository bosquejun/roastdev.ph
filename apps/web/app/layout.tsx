import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"

import "@workspace/ui/globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontDisplay = localFont({
  src: "../public/retropix.ttf",
  variable: "--font-heading",
  display: "swap",
})

const fontBody = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-body",
})

const RailCross = () => (
  <div className="relative flex size-3 shrink-0 items-center justify-center">
    {/* horizontal arm */}
    <div
      className="absolute h-px w-full"
      style={{ background: "linear-gradient(90deg, #FF4E4E, #FACC15)" }}
    />
    {/* vertical arm */}
    <div
      className="absolute h-full w-px"
      style={{ background: "linear-gradient(180deg, #FF4E4E, #FACC15)" }}
    />
  </div>
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark antialiased",
        fontMono.variable,
        fontDisplay.variable,
        fontBody.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <div className="min-h-screen bg-background selection:bg-accent-danger selection:text-white">
            {/* Fixed vertical rails — z-[60] to render above navbar z-50 */}
            <div className="pointer-events-none fixed inset-0 z-[60]">
              <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="absolute inset-y-0 left-4 w-px bg-border sm:left-6 md:left-8" />
                <div className="absolute inset-y-0 right-4 w-px bg-border sm:right-6 md:right-8" />
              </div>
            </div>

            {/* Fixed horizontal rail at bottom of navbar with centered dots */}
            <div className="pointer-events-none fixed top-[80px] right-0 left-0 z-[60]">
              {/* The rail line */}
              <div className="h-px w-full bg-border" />
              {/* Crosses centered on the rail × vertical rail intersection */}
              <div className="mx-auto flex max-w-7xl -translate-y-1/2 justify-between px-4 sm:px-6 md:px-8">
                <div className="-translate-x-1/2">
                  <RailCross />
                </div>
                <div className="translate-x-1/2">
                  <RailCross />
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="relative mx-auto min-h-screen max-w-7xl px-4 sm:px-6 md:px-8">
              <Navbar />
              {children}
            </div>

            {/* Horizontal rail above footer — full viewport width, same structure as navbar rail */}
            <div className="pointer-events-none right-0 left-0 z-[60]">
              <div className="h-px w-full bg-border" />
              <div className="mx-auto flex max-w-7xl -translate-y-1/2 justify-between px-4 sm:px-6 md:px-8">
                <div className="-translate-x-1/2">
                  <RailCross />
                </div>
                <div className="translate-x-1/2">
                  <RailCross />
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
