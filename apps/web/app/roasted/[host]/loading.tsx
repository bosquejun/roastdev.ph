import { Skeleton } from "@workspace/ui/components/skeleton"

export default function Loading() {
  return (
    <div className="px-8 py-10">
      <div className="mx-auto mb-12 max-w-2xl">
        <div className="flex items-center gap-3 border border-border bg-card p-4">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-5 w-48" />
          <div className="ml-auto flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
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