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
