import { GitHubButton } from "@/components/auth/github-button";
import { SignInTerminal } from "@/components/auth/sign-in-terminal";
import Link from "next/link";

export default function SignInPage() {
  return (
    <SignInTerminal>
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wide text-accent-danger">
          Access Required
        </h1>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          Authenticate to continue your roasting session.
        </p>
      </div>

      {/* GitHub Button */}
      <GitHubButton />

      {/* Footer Link */}
      <div className="text-center">
        <p className="font-body text-sm text-muted-foreground">
          No account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-accent-warning transition-colors hover:text-accent-danger"
          >
            Join the roast →
          </Link>
        </p>
      </div>
    </SignInTerminal>
  );
}