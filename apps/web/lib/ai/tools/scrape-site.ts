import { redis } from "@/lib/redis"
import Firecrawl from "@mendable/firecrawl-js"
import { tool } from "ai"
import { z } from "zod"

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY! })

export async function scrapeSite(url: string) {
  const cacheKey = `${new URL(url).host}:scrape-data`
  const cachedResult = await redis.get(cacheKey)

  if (cachedResult) return cachedResult

  const scrapeResponse = await firecrawl.scrape(url, {
    formats: ["markdown"],
  })
  await redis.set(cacheKey, scrapeResponse)

  return scrapeResponse
}

export const scrapeSiteTool = tool({
  execute: async ({ url }) => {
    const result = await scrapeSite(url)
    return result
  },
  inputSchema: z.object({
    url: z.string().url(),
  }),
  description: "Scrape site data",
})
