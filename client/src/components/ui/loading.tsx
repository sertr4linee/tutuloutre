export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5]">
      <div className="relative">
        <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full"></div>
        <div className="relative animate-spin rounded-full h-32 w-32 border-4 border-black border-t-[#FFFBF5] bg-[#FFFBF5]"></div>
      </div>
    </div>
  )
} 