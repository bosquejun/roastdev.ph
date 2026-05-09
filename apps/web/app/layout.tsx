import type { Metadata } from "next"
import { Geist_Mono, Inter, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "@workspace/ui/globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"

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

export const metadata: Metadata = {
  title: "RoastDev PH — We'll Destroy Your Website So Your Users Don't Have To",
  description:
    "Submit your portfolio or landing page. A Filipino senior dev, four beers deep, will tell you exactly what's wrong with it. No sugarcoating. No mercy. Tangina.",
  openGraph: {
    title:
      "RoastDev PH — We'll Destroy Your Website So Your Users Don't Have To",
    description:
      "Submit your portfolio or landing page. A Filipino senior dev, four beers deep, will tell you exactly what's wrong with it. No sugarcoating. No mercy. Tangina.",
    url: "https://roastdev-ph.vercel.app",
    siteName: "RoastDev PH",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "RoastDev PH — We'll Destroy Your Website So Your Users Don't Have To",
    description:
      "Submit your portfolio. A Filipino senior dev roasts it. Brutally. For free.",
  },
}

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
        <ClerkProvider
          appearance={{
            elements: {
              modalBackdrop: "!bg-background/50 backdrop-blur",
              cardBox: "!rounded-none",
              socialButtonsBlockButton:
                "!rounded-none h-12 w-full !border-2 !border-card !bg-secondary px-6 py-2 !text-lg font-bold !text-white uppercase !shadow-[4px_4px_0px_0px_#2e2e32] transition-all hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ",
              formButtonPrimary:
                "!rounded-none h-12 w-full !border-2 !border-card !bg-gradient-to-r !from-accent-danger via-orange-vibrant to-accent-warning px-6 py-2 !text-lg font-bold !text-white uppercase !shadow-[4px_4px_0px_0px_#7f1d1d] transition-all hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ",
              formFieldInput: "!rounded-none",
              userButtonPopoverCard: "!rounded-none",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  )
}
