import { mistral } from "@ai-sdk/mistral"
import { wrapLanguageModel } from "ai"
import { cachedResponseMiddleware } from "./middleware/cached-response-middleware"

export const getModel = () => mistral("mistral-large-latest")

export const model = wrapLanguageModel({
  model: mistral("mistral-large-latest"),
  middleware: [cachedResponseMiddleware],
})
