"use client"

import { MessageSquare, Share2, Download } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

function CommunityButton({
  icon,
  label,
  count,
}: {
  icon: string
  label: string
  count: string
}) {
  return (
    <button className="flex items-center gap-3 border-2 border-border bg-background px-6 py-3 transition-all hover:border-accent-danger active:translate-x-[2px] active:translate-y-[2px]">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-bold uppercase">{label}</span>
      <span className="ml-2 bg-accent-warning/10 px-2 py-0.5 text-sm text-accent-warning">
        {count}
      </span>
    </button>
  )
}

export function CommunityReactions() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="border-2 border-border bg-card p-6 md:col-span-2">
        <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold uppercase">
          <MessageSquare className="h-6 w-6 text-accent-warning" />
          Community Reactions
        </h3>
        <div className="mb-8 flex flex-wrap gap-4">
          <CommunityButton icon="🔥" label="Hot Take" count="1.2k" />
          <CommunityButton icon="💀" label="Roasted" count="843" />
          <CommunityButton icon="💯" label="Respeto" count="45" />
        </div>
        <div className="space-y-4">
          <div className="border-l-2 border-border bg-muted p-4">
            <p className="mb-1 text-[10px] font-bold tracking-widest text-accent-warning uppercase">
              @frontend_king
            </p>
            <p className="text-sm font-medium">
              &quot;Grabe yung padding sa mobile view. Pwede na tayuan ng
              bahay.&quot;
            </p>
          </div>
          <div className="border-l-2 border-border bg-muted p-4">
            <p className="mb-1 text-[10px] font-bold tracking-widest text-accent-warning uppercase">
              @debug_queen
            </p>
            <p className="text-sm font-medium">
              &quot;The font choice is giving me PTSD from my 2008 Friendster
              layouts. 💀&quot;
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between border-2 border-border bg-accent-danger p-6 text-background">
        <div>
          <h3 className="mb-4 text-4xl leading-[0.9] font-black uppercase">
            Shame is a team sport.
          </h3>
          <p className="text-sm font-bold tracking-tight uppercase opacity-90">
            Invite the squad to witness the tragedy.
          </p>
        </div>
        <div className="mt-8 space-y-3">
          <Button className="flex w-full items-center justify-center gap-2 border-2 border-background bg-background py-3 font-bold text-white uppercase transition-all hover:bg-transparent hover:text-background active:translate-x-[2px] active:translate-y-[2px]">
            <Share2 className="h-5 w-5" />
            Share the Roast
          </Button>
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 border-2 border-background bg-transparent py-3 font-bold text-background uppercase transition-all hover:bg-background hover:text-foreground active:translate-x-[2px] active:translate-y-[2px]"
          >
            <Download className="h-5 w-5" />
            Export Disaster Log
          </Button>
        </div>
      </div>
    </section>
  )
}
