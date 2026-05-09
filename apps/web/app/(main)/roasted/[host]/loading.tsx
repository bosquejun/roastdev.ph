import { SiteMetadataCardSkeleton } from "@/components/features/roast/site-metadata-card"
import { Skeleton } from "@workspace/ui/components/skeleton"

export default function Loading() {
  return (
    <div className="px-8 py-10">
      <div className="mx-auto mb-12 max-w-2xl">
        <SiteMetadataCardSkeleton host="..." />
      </div>
      <div className="mx-auto max-w-3xl space-y-2">
        <div className="space-y-2.5">
          <Skeleton className="h-[1.1rem] w-full" />
          <Skeleton className="h-[1.1rem] w-[92%]" />
          <Skeleton className="h-[1.1rem] w-[96%]" />
          <Skeleton className="h-[1.1rem] w-[78%]" />
        </div>
        <div className="space-y-2.5">
          <Skeleton className="h-[1.1rem] w-[98%]" />
          <Skeleton className="h-[1.1rem] w-full" />
          <Skeleton className="h-[1.1rem] w-[88%]" />
          <Skeleton className="h-[1.1rem] w-[60%]" />
        </div>
        <div className="space-y-2.5">
          <Skeleton className="h-[1.1rem] w-full" />
          <Skeleton className="h-[1.1rem] w-[94%]" />
          <Skeleton className="h-[1.1rem] w-[90%]" />
          <Skeleton className="h-[1.1rem] w-[72%]" />
        </div>
      </div>
    </div>
  )
}
