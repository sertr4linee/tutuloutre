import { getAlbum } from '@/app/actions'
import AlbumPageClient from './AlbumPageClient'
import { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ id: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params
  
  if (!resolvedParams?.id) {
    return {
      title: 'Album non trouvé',
      description: 'Album de photos introuvable',
    }
  }

  const result = await getAlbum(resolvedParams.id)
  
  return {
    title: result.data?.title || 'Album',
    description: result.data?.description || 'Album de photos',
  }
}

export default async function AlbumPage({ params }: Props) {
  const resolvedParams = await params
  
  if (!resolvedParams?.id) {
    return <div>Album ID not found</div>
  }

  const result = await getAlbum(resolvedParams.id)
  
  return (
    <div className="relative">
      <Suspense fallback={<div>Chargement...</div>}>
        <AlbumPageClient initialData={result.data || null} />
      </Suspense>
    </div>
  )
}