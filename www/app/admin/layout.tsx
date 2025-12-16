import { TRPCProvider } from "@/lib/trpc/client"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TRPCProvider>{children}</TRPCProvider>
}
