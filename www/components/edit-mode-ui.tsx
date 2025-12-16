"use client"

import { useEdit } from "./edit-context"
import { motion, AnimatePresence } from "framer-motion"
import { Pencil, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function EditModeUI() {
  const { isEditing, count } = useEdit()
  const router = useRouter()

  if (!isEditing) return null

  const exitEditMode = () => {
    router.push("/")
    router.refresh()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2"
      >
        <div className="bg-black text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
            <Pencil className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-sm">Edit Mode Active</p>
            <p className="text-xs text-white/60">{count} contents are compatible to edit</p>
          </div>
        </div>

        <button
          onClick={exitEditMode}
          className="bg-white text-black w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
          title="Exit Edit Mode"
        >
          <X className="w-5 h-5" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
