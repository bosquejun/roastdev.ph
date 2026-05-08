"use client"

import DitherShader from "@workspace/ui/components/dither-shader"
import { useClerk, useUser } from "@clerk/nextjs"
import { Skeleton } from "@workspace/ui/components/skeleton"

export function UserAvatar() {
  const { openUserProfile } = useClerk()
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn || !user?.imageUrl) {
    return <Skeleton className="size-10 rounded-full" />
  }

  return (
    <button type="button" onClick={() => openUserProfile()}>
      <div className="relative size-9 cursor-pointer overflow-hidden rounded-full">
        <DitherShader
          src={user?.imageUrl}
          gridSize={2}
          ditherMode="crosshatch"
          invert={false}
          animated
          colorMode="original"
          animationSpeed={0.1}
          threshold={0.5}
          className="size-full"
        />
      </div>
    </button>
  )
}
