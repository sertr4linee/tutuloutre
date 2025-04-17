import type { ButtonHTMLAttributes, ReactNode } from "react"

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "danger" | "success"
  size?: "sm" | "md" | "lg"
}

export function NeoButton({ children, variant = "primary", size = "md", className, ...props }: NeoButtonProps) {
  const variantStyles = {
    primary: "bg-pink-400 hover:bg-pink-500",
    secondary: "bg-gray-200 hover:bg-gray-300",
    danger: "bg-red-400 hover:bg-red-500",
    success: "bg-green-400 hover:bg-green-500",
  }

  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-5",
    lg: "py-3 px-7 text-lg",
  }

  return (
    <button
      className={`font-bold border-3 border-black shadow-neo transition-all active:translate-x-1 active:translate-y-1 active:shadow-none ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
