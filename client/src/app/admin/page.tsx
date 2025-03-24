"use client"

import Link from 'next/link'
import Image from 'next/image'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] p-4">
      <div className="max-w-lg mx-auto">
        <div className="relative border-4 border-black bg-white rounded-3xl p-6 mb-8">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-3xl -z-10"></div>
          
          <div className="mb-6">
            <div className="inline-block bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm transform -rotate-2">
              Admin
            </div>
            <h1 className="text-4xl font-bold mt-2">Dashboard</h1>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4">
            <Link href="/admin/blog" className="block">
              <div className="relative group">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative border-2 border-black rounded-xl p-4 bg-white transition-transform group-hover:-translate-y-0.5">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📝</span>
                    <div>
                      <div className="font-bold">Blog</div>
                      <div className="text-sm text-gray-600">Gérer vos articles</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/admin/albums" className="block">
              <div className="relative group">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative border-2 border-black rounded-xl p-4 bg-white transition-transform group-hover:-translate-y-0.5">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🖼️</span>
                    <div>
                      <div className="font-bold">Albums</div>
                      <div className="text-sm text-gray-600">Gérer vos photos</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/admin/projects" className="block">
              <div className="relative group">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative border-2 border-black rounded-xl p-4 bg-white transition-transform group-hover:-translate-y-0.5">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🎨</span>
                    <div>
                      <div className="font-bold">Projets</div>
                      <div className="text-sm text-gray-600">Gérer vos projets scolaires</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/admin/about" className="block">
              <div className="relative group">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative border-2 border-black rounded-xl p-4 bg-white transition-transform group-hover:-translate-y-0.5">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">👋</span>
                    <div>
                      <div className="font-bold">About</div>
                      <div className="text-sm text-gray-600">Votre présentation</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-4">
          <Link href="/" className="block">
            <div className="relative group">
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative border-2 border-black rounded-xl p-4 bg-[#E9B949] transition-transform group-hover:-translate-y-0.5">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">🏠</span>
                  <div className="font-bold">Retour au site</div>
                </div>
              </div>
            </div>
          </Link>

          <button 
            // onClick={() => signOut()}
            className="w-full"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative border-2 border-black rounded-xl p-4 bg-[#FF6B6B] text-white transition-transform group-hover:-translate-y-0.5">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">📱</span>
                  <div className="font-bold">Déconnexion</div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
} 