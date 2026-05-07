import instructions from "./instructions"
import { getModel } from "../model"
import { ToolLoopAgent } from "ai"
import { FirecrawlTools } from "firecrawl-aisdk"

const { scrape } = FirecrawlTools({
  scrape: { formats: ["markdown"], onlyMainContent: true },
})

export const roasterAgent = new ToolLoopAgent({
  model: getModel(),
  instructions,
  tools: { scrape },
})
