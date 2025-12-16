"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"

type EditContextType = {
  isEditing: boolean
  register: (id: string) => void
  unregister: (id: string) => void
  count: number
}

const EditContext = createContext<EditContextType>({
  isEditing: false,
  register: () => {},
  unregister: () => {},
  count: 0,
})

export function EditProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const isEditing = searchParams.get("edit") === "true"
  const [registered, setRegistered] = useState<Set<string>>(new Set())

  const register = useCallback((id: string) => {
    setRegistered((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const unregister = useCallback((id: string) => {
    setRegistered((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  return (
    <EditContext.Provider value={{ isEditing, register, unregister, count: registered.size }}>
      {children}
    </EditContext.Provider>
  )
}

export const useEdit = () => useContext(EditContext)
