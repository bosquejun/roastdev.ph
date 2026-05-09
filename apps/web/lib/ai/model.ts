import { mistral } from "@ai-sdk/mistral"
import { LanguageModel, wrapLanguageModel } from "ai"
import { cachedResponseMiddleware } from "./middleware/cached-response-middleware"

export const model: LanguageModel = wrapLanguageModel({
  model: mistral("mistral-large-latest"),
  middleware: [cachedResponseMiddleware],
})
