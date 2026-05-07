"use server";

import { isValidUrl, normalizeUrl, resolveRedirects } from "@/lib/url";
import { generateHash } from "@/lib/hash";

export interface ResolveResult {
  host: string;
  hash: string;
}

export async function resolveUrl(formData: FormData): Promise<ResolveResult | null> {
  const url = formData.get("url") as string;

  if (!url || !isValidUrl(url)) {
    return null;
  }

  const normalizedUrl = normalizeUrl(url);
  const resolved = await resolveRedirects(normalizedUrl);

  if (!resolved) {
    return null;
  }

  const urlObj = new URL(resolved);
  const host = urlObj.host;
  const hash = await generateHash(resolved);

  return { host, hash };
}

export async function roastUrl(formData: FormData): Promise<void> {
  const url = formData.get("url") as string;

  if (!url || !isValidUrl(url)) {
    return;
  }

  const normalizedUrl = normalizeUrl(url);

  let hash: string;
  try {
    const resolved = await resolveRedirects(normalizedUrl);
    if (!resolved) {
      return;
    }
    hash = await generateHash(resolved);
  } catch {
    return;
  }

  import("next/navigation").then(({ redirect }) => {
    redirect(`/roasted/${hash}`);
  });
}
