import { z } from "zod"
import { router, publicProcedure, protectedProcedure } from "../init"
import { db } from "@/lib/db"
import { projects } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const projectRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(projects).orderBy(projects.createdAt)
  }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(projects)
        .where(eq(projects.category, input.category))
        .orderBy(projects.createdAt)
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.id, input.id))
      return result[0] ?? null
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        category: z.string().min(1),
        imageUrl: z.string().url(),
        coverImage: z.string().url().optional(),
        content: z.string().optional(),
        link: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(projects).values(input).returning()
      return result[0]
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        category: z.string().min(1).optional(),
        imageUrl: z.string().url().optional(),
        coverImage: z.string().url().optional(),
        content: z.string().optional(),
        link: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      const result = await db
        .update(projects)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(projects.id, id))
        .returning()
      return result[0]
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      await db.delete(projects).where(eq(projects.id, input.id))
      return { success: true }
    }),
})
