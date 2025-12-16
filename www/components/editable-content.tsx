"use client"

import { useState, useEffect } from "react"
import { useEdit } from "./edit-context"
import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

interface EditableContentProps {
  contentKey: string
  defaultValue: string
  className?: string
  as?: any
  multiline?: boolean
}

export function EditableContent({
  contentKey,
  defaultValue,
  className,
  as: Component = "div",
  multiline = false,
}: EditableContentProps) {
  const { isEditing, register, unregister } = useEdit()
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [tempValue, setTempValue] = useState(defaultValue)
  
  const { data: content, refetch } = trpc.content.get.useQuery(
    { key: contentKey },
    { 
      initialData: { key: contentKey, value: defaultValue, updatedAt: new Date().toISOString() },
      refetchOnMount: false 
    }
  )
  
  const updateContent = trpc.content.update.useMutation({
    onSuccess: () => {
      setIsEditingContent(false)
      refetch()
    }
  })

  useEffect(() => {
    if (isEditing) {
      register(contentKey)
    }
    return () => unregister(contentKey)
  }, [isEditing, contentKey, register, unregister])

  const displayValue = content?.value || defaultValue

  if (!isEditing) {
    return (
      <Component className={className} dangerouslySetInnerHTML={{ __html: displayValue }} />
    )
  }

  if (isEditingContent) {
    return (
      <div className="relative group" onClick={(e) => e.stopPropagation()}>
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className={cn(
            "w-full bg-white text-black p-2 rounded border border-black/20 outline-none font-mono text-sm",
            multiline ? "min-h-[100px]" : "min-h-[40px]",
            className
          )}
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
        <div className="absolute -top-10 right-0 flex gap-2 bg-white shadow-lg rounded-lg p-1 z-50">
          <button
            onClick={(e) => {
              e.stopPropagation()
              updateContent.mutate({ key: contentKey, value: tempValue })
            }}
            className="p-1 hover:bg-green-50 text-green-600 rounded"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsEditingContent(false)
              setTempValue(displayValue)
            }}
            className="p-1 hover:bg-red-50 text-red-600 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <Component
      data-editable-key={contentKey}
      className={cn(
        "relative transition-all duration-200 cursor-pointer",
        className
      )}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setTempValue(displayValue)
        setIsEditingContent(true)
      }}
      dangerouslySetInnerHTML={{ __html: displayValue }}
    />
  )
}
