"use server";

import { redirect } from "next/navigation";
import { isValidUrl, normalizeUrl } from "@/lib/url";
import { generateHash } from "@/lib/hash";

export async function roastUrl(formData: FormData): Promise<void> {
  const url = formData.get("url") as string;

  if (!url || !isValidUrl(url)) {
    return;
  }

  const normalizedUrl = normalizeUrl(url);
  const hash = await generateHash(normalizedUrl);

  redirect(`/roasted/${hash}`);
}
