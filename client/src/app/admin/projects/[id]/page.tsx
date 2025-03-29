import { Suspense } from 'react'
import EditProjectClient from './EditProjectClient'

interface Props {
  params: {
    id: string
  }
}

export default function EditProjectPage({ params }: Props) {
  const { id } = params;

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFBF5] p-4">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <EditProjectClient id={id} />
    </Suspense>
  )
} 