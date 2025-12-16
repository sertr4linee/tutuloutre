"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useEdit } from "./edit-context"

export function EditSelectionOverlay() {
  const { isEditing } = useEdit()
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isEditing) return

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const editable = target.closest("[data-editable-key]") as HTMLElement
      
      if (editable) {
        setActiveElement(editable)
        setTargetRect(editable.getBoundingClientRect())
      } else {
        setActiveElement(null)
        setTargetRect(null)
      }
    }

    const handleScroll = () => {
      if (activeElement) {
        setTargetRect(activeElement.getBoundingClientRect())
      }
    }

    document.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("scroll", handleScroll, { capture: true, passive: true })
    
    return () => {
      document.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isEditing, activeElement])

  if (!isEditing || !targetRect || !mounted) return null

  return createPortal(
    <div
      className="fixed z-[9999] pointer-events-none border-2 border-blue-600 rounded-lg transition-all duration-75 ease-out"
      style={{
        top: targetRect.top - 4,
        left: targetRect.left - 4,
        width: targetRect.width + 8,
        height: targetRect.height + 8,
      }}
    >
      <div className="absolute -top-7 left-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider flex items-center gap-1">
        <span>Edit</span>
      </div>
    </div>,
    document.body
  )
}
