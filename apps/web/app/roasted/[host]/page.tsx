import { redirect } from "next/navigation"
import { normalizeUrl, resolveRedirects } from "@/lib/url"
import { ResultView } from "@/components/features/roast/result-view"
import { RoastedErrorPage } from "@/components/features/roast/roasted-error-page"

interface RoastedPageProps {
  params: Promise<{ host: string }>
}

export default async function RoastedPage({ params }: RoastedPageProps) {
  const { host } = await params
  const rawHost = host

  const normalizedUrl = normalizeUrl(rawHost)
  let urlHost: string

  try {
    urlHost = new URL(normalizedUrl).hostname
  } catch {
    return <RoastedErrorPage host={rawHost} />
  }

  if (!urlHost) {
    return <RoastedErrorPage host={rawHost} />
  }

  const resolvedUrl = await resolveRedirects(normalizedUrl)

  let finalHost = urlHost
  if (resolvedUrl && resolvedUrl !== normalizedUrl) {
    try {
      const resolvedHost = new URL(resolvedUrl).hostname
      const normalizedResolvedHost = normalizeUrl(resolvedHost).replace(
        "https://",
        ""
      )
      if (normalizedResolvedHost !== urlHost) {
        finalHost = normalizedResolvedHost
      }
    } catch {
      // ignore redirect resolution errors, proceed with valid host
    }
  }

  if (finalHost !== urlHost) {
    redirect(`/roasted/${finalHost}`)
  }

  return <ResultView host={finalHost} />
}
