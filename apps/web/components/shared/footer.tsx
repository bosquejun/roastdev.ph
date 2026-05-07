export function Footer() {
  return (
    <footer className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-lg font-bold uppercase tracking-tighter">
          ROASTDEVPH
        </div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          © 2024 ROASTDEVPH — NO MERCY FOR YOUR STACK.
        </p>
        <div className="flex gap-6">
          {["Archives", "Leaderboard", "Github", "Submit"].map((link) => (
            <a
              key={link}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-white underline decoration-2 decoration-accent-danger underline-offset-4"
              href="#"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>

  );
}