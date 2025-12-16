"use client"

import { motion } from "framer-motion"

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-sm font-medium tracking-widest uppercase text-black/60">Scroll</span>
      <div className="h-12 w-px bg-black/20 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 w-full h-1/2 bg-black"
          animate={{ top: ["-100%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  )
}
