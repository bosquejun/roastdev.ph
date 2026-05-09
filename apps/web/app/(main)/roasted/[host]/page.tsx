import { redirect } from "next/navigation"
import { normalizeUrl, resolveUrl } from "@/lib/url"
import { ResultView } from "@/components/features/roast/result-view"
import { RoastedErrorPage } from "@/components/features/roast/roasted-error-page"

interface RoastedPageProps {
  params: Promise<{ host: string }>
}

export default async function RoastedPage({ params }: RoastedPageProps) {
  const { host: rawHost } = await params

  const normalizedHost = normalizeUrl(rawHost)

  const { host } = await resolveUrl(rawHost)

  if (!host) {
    return <RoastedErrorPage host={rawHost} />
  }

  if (normalizeUrl(host) !== normalizedHost) {
    redirect(`/roasted/${host}`)
  }

  return <ResultView host={host} />
}
