"use server";

import { isValidUrl, normalizeUrl, resolveRedirects } from "@/lib/url";
import { generateHash } from "@/lib/hash";

export interface SubmitResult {
  hash: string;
}

export async function submitStartup(formData: FormData): Promise<SubmitResult | null> {
  const url = formData.get("url") as string;

  if (!url || !isValidUrl(url)) {
    return null;
  }

  const normalizedUrl = normalizeUrl(url);
  const resolved = await resolveRedirects(normalizedUrl);

  if (!resolved) {
    return null;
  }

  const hash = await generateHash(resolved);

  return { hash };
}