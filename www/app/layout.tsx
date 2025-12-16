import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import "./globals.css"
import { TRPCProvider } from "@/lib/trpc/client"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Tutuloutre",
  description: "Designer Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <TRPCProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </TRPCProvider>
      </body>
    </html>
  )
}
