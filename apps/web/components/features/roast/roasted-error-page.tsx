"use client"

import { AlertTriangle } from "lucide-react"
import Link from "next/link"

interface RoastedErrorPageProps {
  host: string
}

export function RoastedErrorPage({ host }: RoastedErrorPageProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-8 py-16">
      <div className="border-2 border-accent-danger p-4">
        <AlertTriangle className="h-10 w-10 text-accent-danger" />
      </div>
      <div className="space-y-2 text-center">
        <p className="text-lg font-bold tracking-wide uppercase">
          Invalid Host
        </p>
        <p className="text-sm text-muted-foreground">
          The host <span className="font-mono font-semibold">{host}</span> is
          not a valid URL. Please check the address and try again.
        </p>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 border-2 border-border px-6 py-2 text-sm font-bold tracking-wider uppercase transition-all hover:border-accent-danger hover:text-accent-danger"
      >
        Go Back Home
      </Link>
    </div>
  )
}
