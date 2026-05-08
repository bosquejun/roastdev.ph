import Link from "next/link"
import { MoveUpRight } from "lucide-react"
import { Skeleton } from "@workspace/ui/components/skeleton"

export interface SiteMetadata {
  favicon?: string
  ogImage?: string
  ogTitle?: string
  title?: string
  ogDescription?: string
  description?: string
  category?: string
  language?: string
  keywords?: string
}

interface SiteMetadataCardProps {
  host: string
  metadata?: SiteMetadata | null
}

function getFaviconUrl(host: string, size: number) {
  return `https://www.google.com/s2/favicons?domain=${host}&sz=${size}`
}

function Favicon({
  host,
  favicon,
  size,
  className,
}: {
  host: string
  favicon?: string
  size: number
  className: string
}) {
  return (
    <img
      src={favicon || getFaviconUrl(host, size)}
      alt="favicon"
      className={className}
      onError={(e) => {
        e.currentTarget.src = getFaviconUrl(host, size)
      }}
    />
  )
}

export function SiteMetadataCard({ host, metadata }: SiteMetadataCardProps) {
  return (
    <div className="flex flex-col gap-4 border border-border bg-card p-4">
      {metadata ? (
        metadata.ogImage ? (
          <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted">
            <img
              src={metadata.ogImage}
              alt={metadata.ogTitle || metadata?.title || host}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted/50">
            <div className="flex h-full w-full items-center justify-center">
              <Favicon
                host={host}
                favicon={metadata.favicon}
                size={128}
                className="h-16 w-16 rounded-lg opacity-50"
              />
            </div>
          </div>
        )
      ) : (
        <Skeleton className="aspect-video w-full" />
      )}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Favicon
                host={host}
                favicon={metadata?.favicon}
                size={32}
                className="h-4 w-4 rounded-sm"
              />
              <span className="text-sm font-medium text-muted-foreground truncate">
                {host}
              </span>
            </div>
            {metadata ? (
              <h2 className="mt-1 text-xl font-bold leading-tight">
                {metadata.ogTitle || metadata.title || host}
              </h2>
            ) : (
              <Skeleton className="mt-1 h-6 w-3/4" />
            )}
          </div>
          <Link
            href={`https://${host}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-accent-danger px-3 py-1.5 text-sm font-semibold text-white transition-all hover:opacity-90"
          >
            Visit
            <MoveUpRight className="size-3.5" />
          </Link>
        </div>
        {metadata ? (
          (metadata.ogDescription || metadata.description) ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {metadata.ogDescription || metadata.description}
            </p>
          ) : null
        ) : (
          <Skeleton className="h-4 w-full" />
        )}
        {metadata ? (
          (metadata.category || metadata.language || metadata.keywords) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {metadata.category && (
                <span className="rounded-full bg-accent-danger/10 px-2.5 py-0.5 text-[10px] font-medium text-accent-danger">
                  {metadata.category}
                </span>
              )}
              {metadata.language && (
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {metadata.language.toUpperCase()}
                </span>
              )}
              {metadata.keywords && (
                <span className="line-clamp-1 text-xs text-muted-foreground">
                  {metadata.keywords.split(",").slice(0, 3).join(", ")}
                </span>
              )}
            </div>
          )
        ) : (
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        )}
      </div>
    </div>
  )
}

export function SiteMetadataCardSkeleton({ host }: { host: string }) {
  return (
    <div className="flex flex-col gap-4 border border-border bg-card p-4">
      <Skeleton className="aspect-video w-full" />
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mt-1 h-6 w-3/4" />
          </div>
          <Skeleton className="h-9 w-16 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  )
}