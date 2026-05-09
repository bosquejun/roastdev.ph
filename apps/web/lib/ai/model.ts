import { mistral } from "@ai-sdk/mistral"
import { wrapLanguageModel } from "ai"
import { cachedResponseMiddleware } from "./middleware/cached-response-middleware"

export const model = wrapLanguageModel({
  model: mistral("mistral-large-latest"),
  middleware: [cachedResponseMiddleware],
})
