import { z } from "zod"
import { router, publicProcedure, protectedProcedure } from "../init"
import { db } from "@/lib/db"
import { siteContent } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const contentRouter = router({
  get: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const result = await db.select().from(siteContent).where(eq(siteContent.key, input.key))
      return result[0] || null
    }),

  getAll: publicProcedure.query(async () => {
    return await db.select().from(siteContent)
  }),

  update: protectedProcedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .insert(siteContent)
        .values({ key: input.key, value: input.value })
        .onConflictDoUpdate({
          target: siteContent.key,
          set: { value: input.value, updatedAt: new Date() },
        })
      return { success: true }
    }),
})
