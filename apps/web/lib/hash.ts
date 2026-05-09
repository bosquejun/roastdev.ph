import { resolveRedirects } from "./url"

export async function generateHash(url: string): Promise<string> {
  const normalized = url.startsWith("http") ? url : `https://${url}`

  const resolved = await resolveRedirects(normalized)
  if (!resolved) {
    throw new Error("Failed to resolve URL")
  }

  const urlObj = new URL(resolved)
  const hostOnly = urlObj.host

  const data = new TextEncoder().encode(hostOnly)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex.substring(0, 12)
}
