import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react"
import type { ReactNode } from "react"

type AlertType = "info" | "success" | "warning" | "error"

interface NeoAlertProps {
  type?: AlertType
  title?: string
  children: ReactNode
  className?: string
}

export function NeoAlert({ type = "info", title, children, className = "" }: NeoAlertProps) {
  const colors = {
    info: "bg-blue-400",
    success: "bg-green-400",
    warning: "bg-yellow-400",
    error: "bg-red-400",
  }

  const icons = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
  }

  return (
    <div className={`${colors[type]} p-4 border-3 border-black shadow-neo mb-6 rounded-lg ${className}`}>
      <div className="flex items-start gap-3">
        <div className="bg-white p-2 border-2 border-black rounded-md">{icons[type]}</div>
        <div>
          {title && <h4 className="font-bold text-lg mb-1">{title}</h4>}
          <div className="text-black">{children}</div>
        </div>
      </div>
    </div>
  )
}
