import { useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'bg-[#DCFCE7]' : 'bg-[#FEE2E2]'
  const borderColor = type === 'success' ? 'border-[#22C55E]' : 'border-[#EF4444]'
  const textColor = type === 'success' ? 'text-[#15803D]' : 'text-[#B91C1C]'

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`relative ${bgColor} border-2 ${borderColor} rounded-lg p-4 pr-12 shadow-brutal`}>
        <div className="flex items-center">
          {type === 'success' ? (
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <p className={`font-medium ${textColor}`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-black/5 rounded-full transition-colors"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
} 