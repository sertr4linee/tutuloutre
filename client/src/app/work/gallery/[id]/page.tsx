import { getAlbum } from '@/app/actions'
import AlbumPageClient from './AlbumPageClient'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Album',
  description: 'Album de photos',
}

interface Props {
  params: { id: string }
}

export default async function AlbumPage({ params }: Props) {
  const result = await getAlbum(params.id)
  
  return (
    <div className="relative">
      <div className="absolute left-4 sm:left-8 top-4 sm:top-8 z-50">
        <Link 
          href="/work/gallery"
          className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-black bg-white group-hover:bg-[#FFD2BF] transition-colors">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
          <span className="group-hover:underline text-xs sm:text-sm">Retour à la galerie</span>
        </Link>
      </div>
      <AlbumPageClient initialData={result.data || null} />
    </div>
  )
} 