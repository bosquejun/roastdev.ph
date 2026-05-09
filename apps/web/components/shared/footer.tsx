import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand.svg"
            width={140}
            height={52}
            alt="RoastDevPH logo"
            className="h-auto w-28"
          />
        </Link>

        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-none text-xs text-muted-foreground opacity-35 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-white"
          >
            Discord
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} RoastDevPH
        </p>
      </div>
    </footer>
  )
}
