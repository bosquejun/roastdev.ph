import Link from "next/link";
import { Terminal, Code } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-(--bg-primary)/80 backdrop-blur-md">
      <nav className="flex justify-between items-center w-full px-6 h-20">
        <div className="flex items-center gap-8">
          <a
            className="font-bold text-2xl tracking-tighter uppercase text-(--accent-danger)"
            href="#"
          >
            RoastDevPH
          </a>
          <div className="hidden md:flex gap-6 items-center">
            <a
              className="text-(--accent-warning) border-b-2 border-(--accent-warning) pb-1 text-sm font-medium hover:text-(--accent-danger) transition-colors"
              href="#"
            >
              Roasts
            </a>
            <a
              className="text-(--text-secondary) text-sm font-medium hover:text-(--accent-danger) transition-colors"
              href="#"
            >
              Leaderboard
            </a>
            <a
              className="text-(--text-secondary) text-sm font-medium hover:text-(--accent-danger) transition-colors"
              href="#"
            >
              Archives
            </a>
            <Link
              href="/submit"
              className="text-sm font-bold uppercase tracking-wider hover:text-(--accent-danger) transition-colors"
            >
              Submit
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Sign in</Button>
          <Button className="hidden md:block bg-gradient-to-r from-(--accent-danger) via-(--orange-vibrant) to-(--accent-warning) text-white px-6 py-2 text-xs font-bold uppercase border-2 border-(--border-muted) shadow-[4px_4px_0px_0px_#7f1d1d] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            Join the Roast
          </Button>
        </div>
      </nav>
    </header>
  );
}
