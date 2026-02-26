import { Bot, Hand } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ConfidenceBadgeProps {
  type: "ia" | "human"
  className?: string
}

export function ConfidenceBadge({ type, className }: ConfidenceBadgeProps) {
  if (type === "ia") {
    return (
      <Badge
        variant="secondary"
        className={cn("gap-1.5", className)}
      >
        <Bot className="size-3.5" />
        Verifie par IA
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 border-amber-500/30 bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400",
        className
      )}
    >
      <Hand className="size-3.5" />
      Validation humaine requise
    </Badge>
  )
}
