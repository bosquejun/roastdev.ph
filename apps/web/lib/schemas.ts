import { z } from "zod";

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;

export const roastFormSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .refine(
      (url) => {
        const trimmed = url.trim();
        if (trimmed.startsWith("http://")) return false;
        let urlToCheck = trimmed;
        if (
          !trimmed.startsWith("http://") &&
          !trimmed.startsWith("https://")
        ) {
          urlToCheck = `https://${trimmed}`;
        }
        try {
          const parsed = new URL(urlToCheck);
          if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
            return false;
          }
          const hostname = parsed.hostname;
          if (!hostname.includes(".") || hostname.endsWith(".")) {
            return false;
          }
          return URL_REGEX.test(urlToCheck);
        } catch {
          return false;
        }
      },
      {
        message: "Please enter a valid URL (e.g., yourstartup.com or https://yourstartup.com)",
      }
    ),
});

export type RoastFormSchema = z.infer<typeof roastFormSchema>;
