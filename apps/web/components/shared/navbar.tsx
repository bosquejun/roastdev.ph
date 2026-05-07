import Link from "next/link"
import { Terminal, Code } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-(--bg-primary)/80 backdrop-blur-md">
      <nav className="flex h-20 w-full items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <a
            className="text-2xl font-bold tracking-tighter text-(--accent-danger) uppercase"
            href="/"
          >
            RoastDevPH
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a
              className="border-b-2 border-(--accent-warning) pb-1 text-sm font-medium text-(--accent-warning) transition-colors hover:text-(--accent-danger)"
              href="#"
            >
              Roasts
            </a>
            <a
              className="text-sm font-medium text-(--text-secondary) transition-colors hover:text-(--accent-danger)"
              href="#"
            >
              Leaderboard
            </a>
            <a
              className="text-sm font-medium text-(--text-secondary) transition-colors hover:text-(--accent-danger)"
              href="#"
            >
              Archives
            </a>
            <Link
              href="/submit"
              className="text-sm font-bold tracking-wider uppercase transition-colors hover:text-(--accent-danger)"
            >
              Submit
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Sign in</Button>
          <Button className="hidden border-2 border-(--border-muted) bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) px-6 py-2 text-xs font-bold text-white uppercase shadow-[4px_4px_0px_0px_#7f1d1d] transition-all hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:block">
            Join the Roast
          </Button>
        </div>
      </nav>
    </header>
  )
}
