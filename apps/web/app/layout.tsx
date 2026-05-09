import type { Metadata } from "next"
import { Geist_Mono, Inter, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"

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
  title: "RoastDev - Code Review with Personality",
  description:
    "Get brutally honest code reviews that actually help you improve. RoastDev provides AI-powered code reviews with a touch of humor while highlighting real issues and improvements.",
  openGraph: {
    title: "RoastDev - Code Review with Personality",
    description:
      "Get brutally honest code reviews that actually help you improve. RoastDev provides AI-powered code reviews with a touch of humor while highlighting real issues and improvements.",
    url: "https://roastdev.ph",
    siteName: "RoastDev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://roastdev.ph/og-image.png",
        width: 1200,
        height: 630,
        alt: "RoastDev - Code Review with Personality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoastDev - Code Review with Personality",
    description:
      "Get brutally honest code reviews that actually help you improve. RoastDev provides AI-powered code reviews with a touch of humor while highlighting real issues and improvements.",
    images: ["https://roastdev.ph/og-image.png"],
  },
}

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
      </body>
    </html>
  )
}
