interface SignInTerminalProps {
  children?: React.ReactNode;
}

export function SignInTerminal({ children }: SignInTerminalProps) {
  return (
    <div className="w-full max-w-md">
      <div className="border-2 border-border bg-card shadow-[8px_8px_0px_0px_rgba(255,78,78,0.3)]">
        <div className="flex items-center gap-2 bg-muted px-4 py-3">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-[#ff5f56]" />
            <div className="size-3 rounded-full bg-[#ffbd2e]" />
            <div className="size-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            AUTH_TERMINAL
          </span>
        </div>

        <div className="px-8 py-10 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
