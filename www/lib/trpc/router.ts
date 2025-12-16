import { router } from "./init"
import { projectRouter } from "./routers/project"
import { contentRouter } from "./routers/content"

export const appRouter = router({
  project: projectRouter,
  content: contentRouter,
})

export type AppRouter = typeof appRouter
