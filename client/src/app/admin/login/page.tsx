"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import GradientBackground from "@/components/ui/background"

export default function AdminLogin() {
  const [step, setStep] = useState<'password' | 'qr' | 'totp'>('password')
  const [password, setPassword] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [totpCode, setTotpCode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Première étape : mot de passe
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      
      if (res.ok) {
        // Si c'est la première connexion, on passe à l'étape QR
        // Sinon on passe directement au TOTP
        const { isFirstLogin } = await res.json()
        setStep(isFirstLogin ? 'qr' : 'totp')
      } else {
        setError("Mot de passe incorrect")
      }
    } catch {
      setError("Une erreur est survenue")
    }
  }

  // Deuxième étape : scan du QR code (première connexion uniquement)
  useEffect(() => {
    if (step === 'qr') {
      console.log('Fetching QR code...')
      fetch('/api/admin/auth/setup-2fa')
        .then(res => res.json())
        .then(data => {
          console.log('QR code received:', !!data.qrCode)
          setQrCode(data.qrCode)
        })
        .catch(err => {
          console.error('Error fetching QR code:', err)
          setError("Erreur lors de la génération du QR code")
        })
    }
  }, [step])

  // Troisième étape : vérification du code TOTP
  const handleTotpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/auth/verify-totp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: totpCode }),
      })
      
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError("Code incorrect")
      }
    } catch {
      setError("Une erreur est survenue")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8d7e6] to-[#e67e56]">
      <GradientBackground />
      <div className="w-full max-w-md p-8 bg-white rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
        
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full p-3 border-2 border-black rounded mb-4"
            />
            <button 
              type="submit"
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
            >
              Continuer
            </button>
          </form>
        )}

        {step === 'qr' && (
          <div className="text-center">
            <p className="mb-4">Scannez ce QR code avec votre application d&apos;authentification</p>
            {qrCode ? (
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-white rounded-lg border-2 border-black">
                  <Image
                    src={qrCode}
                    alt="QR Code for 2FA"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4 flex justify-center">
                <div className="animate-pulse w-[200px] h-[200px] bg-gray-200 rounded-lg"></div>
              </div>
            )}
            <button 
              onClick={() => setStep('totp')}
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
            >
              J&apos;ai scanné le QR code
            </button>
          </div>
        )}

        {step === 'totp' && (
          <form onSubmit={handleTotpSubmit}>
            <input
              type="text"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              placeholder="Code à 6 chiffres"
              className="w-full p-3 border-2 border-black rounded mb-4"
              maxLength={6}
            />
            <button 
              type="submit"
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
            >
              Se connecter
            </button>
          </form>
        )}
      </div>
    </div>
  )
} 