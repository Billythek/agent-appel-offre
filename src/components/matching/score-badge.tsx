"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ScoreBadgeProps {
  score: number
  className?: string
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500/15 text-emerald-700 border-emerald-500/25 dark:text-emerald-400"
    if (score >= 50) return "bg-amber-500/15 text-amber-700 border-amber-500/25 dark:text-amber-400"
    return "bg-red-500/15 text-red-700 border-red-500/25 dark:text-red-400"
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-semibold tabular-nums",
        getScoreColor(score),
        className
      )}
    >
      {score}%
    </Badge>
  )
}
