import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

export default function Page() {
  // This component automatically processes the result from GitHub
  return <AuthenticateWithRedirectCallback />
}
