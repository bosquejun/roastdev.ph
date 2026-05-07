"use client";

import { MessageSquare, Share2, Download } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

function CommunityButton({
  icon,
  label,
  count,
}: {
  icon: string;
  label: string;
  count: string;
}) {
  return (
    <button className="flex items-center gap-3 px-6 py-3 border-2 border-border hover:border-accent-danger transition-all bg-background active:translate-x-[2px] active:translate-y-[2px]">
      <span className="text-2xl">{icon}</span>
      <span className="font-bold text-sm uppercase">{label}</span>
      <span className="text-sm text-accent-warning bg-accent-warning/10 ml-2 px-2 py-0.5">
        {count}
      </span>
    </button>
  );
}

export function CommunityReactions() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 border-2 border-border p-6 bg-card">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 uppercase">
          <MessageSquare className="w-6 h-6 text-accent-warning" />
          Community Reactions
        </h3>
        <div className="flex flex-wrap gap-4 mb-8">
          <CommunityButton icon="🔥" label="Hot Take" count="1.2k" />
          <CommunityButton icon="💀" label="Roasted" count="843" />
          <CommunityButton icon="💯" label="Respeto" count="45" />
        </div>
        <div className="space-y-4">
          <div className="p-4 border-l-2 border-border bg-muted">
            <p className="text-accent-warning text-[10px] font-bold mb-1 uppercase tracking-widest">
              @frontend_king
            </p>
            <p className="text-sm font-medium">
              &quot;Grabe yung padding sa mobile view. Pwede na tayuan ng
              bahay.&quot;
            </p>
          </div>
          <div className="p-4 border-l-2 border-border bg-muted">
            <p className="text-accent-warning text-[10px] font-bold mb-1 uppercase tracking-widest">
              @debug_queen
            </p>
            <p className="text-sm font-medium">
              &quot;The font choice is giving me PTSD from my 2008 Friendster
              layouts. 💀&quot;
            </p>
          </div>
        </div>
      </div>

      <div className="border-2 border-border p-6 bg-accent-danger text-background flex flex-col justify-between">
        <div>
          <h3 className="text-4xl font-black uppercase leading-[0.9] mb-4">
            Shame is a team sport.
          </h3>
          <p className="text-sm font-bold uppercase tracking-tight opacity-90">
            Invite the squad to witness the tragedy.
          </p>
        </div>
        <div className="space-y-3 mt-8">
          <Button className="w-full bg-background text-white border-2 border-background py-3 font-bold uppercase flex items-center justify-center gap-2 hover:bg-transparent hover:text-background transition-all active:translate-x-[2px] active:translate-y-[2px]">
            <Share2 className="w-5 h-5" />
            Share the Roast
          </Button>
          <Button
            variant="outline"
            className="w-full border-2 border-background text-background bg-transparent py-3 font-bold uppercase flex items-center justify-center gap-2 hover:bg-background hover:text-foreground transition-all active:translate-x-[2px] active:translate-y-[2px]"
          >
            <Download className="w-5 h-5" />
            Export Disaster Log
          </Button>
        </div>
      </div>
    </section>
  );
}