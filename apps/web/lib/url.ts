export function isValidUrl(url: string): boolean {
  const trimmed = url.trim();

  if (trimmed.startsWith("http://")) {
    return false;
  }

  let urlToCheck = trimmed;
  if (
    !trimmed.startsWith("http://") &&
    !trimmed.startsWith("https://")
  ) {
    urlToCheck = `https://${trimmed}`;
  }

  try {
    const parsed = new URL(urlToCheck);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (
    !trimmed.startsWith("http://") &&
    !trimmed.startsWith("https://")
  ) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export async function resolveRedirects(url: string): Promise<string | null> {
  const normalized = normalizeUrl(url);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(normalized, {
      method: "HEAD",
      redirect: "manual",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const location = response.headers.get("Location");
    if (location) {
      return resolveRedirects(location);
    }

    return normalized;
  } catch {
    return null;
  }
}
