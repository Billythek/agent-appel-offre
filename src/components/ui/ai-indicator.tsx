"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface AiIndicatorProps {
  label?: string
  className?: string
}

export function AiIndicator({
  label = "Traitement IA en cours",
  className,
}: AiIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm",
        className
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Bot className="size-4 text-primary" />
      </motion.div>
      <span className="text-muted-foreground">{label}</span>
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="size-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
