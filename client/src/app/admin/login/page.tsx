"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import GradientBackground from "@/components/ui/background"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [totp, setTotp] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!username || !password || !totp) {
      setError('Tous les champs sont requis')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password.trim(), 
          totp: totp.trim() 
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue')
      }

      if (!data.token) {
        throw new Error('Token manquant dans la réponse')
      }

      // Stocker le token dans le localStorage
      localStorage.setItem('adminToken', data.token)
      
      // Rediriger vers le dashboard
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <GradientBackground />
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-foreground">my space</h1>
        
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground">
              Identifiant
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded border border-input bg-background px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded border border-input bg-background px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="totp" className="block text-sm font-medium text-foreground">
              Code d'authentification
            </label>
            <input
              type="text"
              id="totp"
              value={totp}
              onChange={(e) => setTotp(e.target.value)}
              className="mt-1 block w-full rounded border border-input bg-background px-3 py-2"
              placeholder="Code à 6 chiffres"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
} 