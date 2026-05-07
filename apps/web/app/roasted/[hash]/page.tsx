import { ResultView } from "@/components/features/roast/result-view";

interface RoastedPageProps {
  params: Promise<{ hash: string }>;
}

export default async function RoastedPage({ params }: RoastedPageProps) {
  const { hash } = await params;

  return <ResultView hash={hash} />;
}
