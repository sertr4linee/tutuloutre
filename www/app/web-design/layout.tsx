import { TRPCProvider } from "@/lib/trpc/client"

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TRPCProvider>{children}</TRPCProvider>
}
