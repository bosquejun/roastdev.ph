import { Geist, Geist_Mono, Inter, Be_Vietnam_Pro, Space_Grotesk } from "next/font/google"

import "@workspace/ui/globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const inter = Inter({subsets:['latin'], variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})

const fontBody = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-body",
  weight: '500'
})

const RailCross = () => (
  <div className="relative shrink-0 size-3 flex items-center justify-center">
    {/* horizontal arm */}
    <div
      className="absolute h-px w-full"
      style={{ background: "linear-gradient(90deg, #FF4E4E, #FACC15)" }}
    />
    {/* vertical arm */}
    <div
      className="absolute w-px h-full"
      style={{ background: "linear-gradient(180deg, #FF4E4E, #FACC15)" }}
    />
  </div>
);


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark antialiased", fontMono.variable, fontDisplay.variable, fontBody.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
<div className="min-h-screen selection:bg-accent-danger selection:text-white bg-background">

      {/* Fixed vertical rails — z-[60] to render above navbar z-50 */}
      <div className="fixed inset-0 z-[60] pointer-events-none">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 relative">
          <div className="absolute inset-y-0 left-4 sm:left-6 md:left-8 w-px bg-border" />
          <div className="absolute inset-y-0 right-4 sm:right-6 md:right-8 w-px bg-border" />
        </div>
      </div>

      {/* Fixed horizontal rail at bottom of navbar with centered dots */}
      <div className="fixed top-[80px] left-0 right-0 z-[60] pointer-events-none">
        {/* The rail line */}
        <div className="h-px bg-border w-full" />
        {/* Crosses centered on the rail × vertical rail intersection */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between -translate-y-1/2">
          <div className="-translate-x-1/2">
            <RailCross />
          </div>
          <div className="translate-x-1/2">
            <RailCross />
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen relative">
        <Navbar />
        {children}
      </div>

      {/* Horizontal rail above footer — full viewport width, same structure as navbar rail */}
      <div className="left-0 right-0 z-[60] pointer-events-none">
        <div className="h-px bg-border w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between -translate-y-1/2">
          <div className="-translate-x-1/2">
            <RailCross />
          </div>
          <div className="translate-x-1/2">
            <RailCross />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Footer />
      </div>
    </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
