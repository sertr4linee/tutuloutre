"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [showOTP, setShowOTP] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!showOTP) {
        const res = await api.auth.login(password)
        console.log('Login response:', res) // Debug
        if (res.requireOTP) {
          setShowOTP(true)
        } else {
          setError('Réponse invalide du serveur')
        }
      } else {
        const res = await api.auth.verifyOTP(otp)
        console.log('OTP response:', res) // Debug
        if (res.token) {
          document.cookie = `auth_token=${res.token}; path=/; max-age=604800; secure; samesite=lax`
          router.push('/admin/dashboard')
        } else {
          setError('Code OTP invalide')
        }
      }
    } catch (error) {
      console.error('Auth error:', error) // Debug
      setError(showOTP ? 'Erreur de vérification OTP' : 'Erreur d\'authentification')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5]">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white p-8 border-4 border-black rounded-xl shadow-brutal">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          
          {!showOTP ? (
            <div className="mb-4">
              <label className="block mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-black rounded-lg"
                required
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block mb-2">Code OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border-2 border-black rounded-lg"
                required
              />
            </div>
          )}

          {error && (
            <div className="mb-4 text-red-500">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion...' : (showOTP ? 'Vérifier' : 'Se connecter')}
          </button>
        </form>
      </div>
    </div>
  )
} 