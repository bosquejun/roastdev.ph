import instructions from "./instructions"
import { getModel } from "../model"
import { ToolLoopAgent, tool } from "ai"
import { FirecrawlTools } from "firecrawl-aisdk"
import { redis } from "@/lib/redis"

const { scrape } = FirecrawlTools({
  scrape: { formats: ["markdown"], onlyMainContent: true, maxAge: 3_600_000 },
})

const cachedScrape = tool({
  ...scrape,
  execute: async (args: any) => {
    const cacheKey = `scrape:${args.url}`
    const cachedResult = await redis.get(cacheKey)

    console.log(`cached scraped url: ${cachedResult}`)

    if (cachedResult) return cachedResult

    const result = await scrape.execute!(args, {} as any)
    await redis.set(cacheKey, result)
    return result
  },
})

export const roasterAgent = new ToolLoopAgent({
  model: getModel(),
  instructions,
  tools: { scrape: cachedScrape },
})
