import { initTRPC, TRPCError } from "@trpc/server"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

export const createTRPCContext = async () => {
  return {}
}

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

const isAuthed = t.middleware(async ({ next }) => {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value

  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    await jwtVerify(token, secret)
    return next()
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
})

export const protectedProcedure = t.procedure.use(isAuthed)
