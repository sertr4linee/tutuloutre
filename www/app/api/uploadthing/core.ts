import { createUploadthing, type FileRouter } from "uploadthing/next"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const f = createUploadthing()

async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value

  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    await jwtVerify(token, secret)
    return { userId: "admin" }
  } catch {
    return null
  }
}

export const ourFileRouter = {
  projectImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await auth()
      if (!user) throw new Error("Unauthorized")
      return { userId: user.userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.ufsUrl)
      return { url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
