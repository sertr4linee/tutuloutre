import type { ReactNode } from "react"

interface NeoCardProps {
  children: ReactNode
  title?: string
  color?: string
  className?: string
}

export function NeoCard({ children, title, color = "white", className = "" }: NeoCardProps) {
  return (
    <div className={`border-3 border-black shadow-neo ${className}`} style={{ backgroundColor: color }}>
      {title && <div className="border-b-3 border-black p-4 font-bold text-lg">{title}</div>}
      <div className="p-6">{children}</div>
    </div>
  )
}
