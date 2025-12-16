"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Instrument_Serif } from "next/font/google"
import { BeigeBackground } from "@/components/beige-background"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push("/admin")
      } else {
        setError("Mot de passe incorrect")
      }
    } catch {
      setError("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <BeigeBackground />
      
      <div className="relative z-10 w-full max-w-md px-8">
        <h1 className={`${instrumentSerif.className} text-5xl text-black mb-12 text-center`}>
          Admin
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-3">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-black/10 rounded-lg focus:outline-none focus:border-black/30 transition-colors text-black"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <a 
          href="/" 
          className="block text-center mt-8 text-black/40 hover:text-black transition-colors text-sm"
        >
          ← Retour au site
        </a>
      </div>
    </div>
  )
}
