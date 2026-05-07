import { ResultView } from "@/components/features/roast/result-view"

interface RoastedPageProps {
  params: Promise<{ host: string }>
}

export default async function RoastedPage({ params }: RoastedPageProps) {
  const { host } = await params

  return <ResultView host={host} />
}
