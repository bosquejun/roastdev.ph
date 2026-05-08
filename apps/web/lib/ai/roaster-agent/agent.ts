import instructions from "./instructions"
import { model } from "../model"
import { ToolLoopAgent } from "ai"
import { scrapeSiteTool } from "../tools/scrape-site"

export const roasterAgent = new ToolLoopAgent({
  model,
  instructions,
  tools: { scrapeSite: scrapeSiteTool },
})
