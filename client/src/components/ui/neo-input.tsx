import { type InputHTMLAttributes, forwardRef } from "react"

interface NeoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const NeoInput = forwardRef<HTMLInputElement, NeoInputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className="mb-4">
      {label && <label className="block font-bold mb-2 text-black">{label}</label>}
      <input
        ref={ref}
        className={`w-full p-3 border-3 border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-red-500 font-medium">{error}</p>}
    </div>
  )
})

NeoInput.displayName = "NeoInput"
