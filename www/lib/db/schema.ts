import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  coverImage: text("cover_image"),
  content: text("content"),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const siteContent = pgTable("site_content", {
  key: text("key").primaryKey(),
  value: text("value").notNull(), // JSON string for complex objects, plain text for simple strings
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type SiteContent = typeof siteContent.$inferSelect
