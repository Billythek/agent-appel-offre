"use client"

import { Clock, Building2, GripVertical } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export interface KanbanCardData {
  id: string
  reference: string
  title: string
  buyer: string
  deadline: string
  status: string
  score: number
}

interface KanbanCardProps {
  card: KanbanCardData
  isDragging?: boolean
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}

const statusConfig: Record<string, { label: string; className: string }> = {
  nouveau: {
    label: "Nouveau",
    className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  analyse: {
    label: "Analyse IA",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  validation: {
    label: "Validation",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  },
  generation: {
    label: "Génération",
    className: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  },
  soumis: {
    label: "Soumis",
    className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
}

function getDaysRemaining(deadline: string): number {
  const now = new Date()
  const target = new Date(deadline)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function getCountdownColor(days: number): string {
  if (days <= 3) return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
  if (days <= 7) return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
  return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
}

export function KanbanCard({ card, isDragging, dragHandleProps }: KanbanCardProps) {
  const daysRemaining = getDaysRemaining(card.deadline)
  const statusInfo = statusConfig[card.status] ?? statusConfig.nouveau
  const isAnalyse = card.status === "analyse"

  return (
    <Card
      className={cn(
        "gap-0 p-3 transition-shadow hover:shadow-md cursor-grab",
        isDragging && "opacity-50 shadow-lg rotate-2"
      )}
    >
      {/* En-tete: reference + poignee */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold text-foreground">{card.reference}</span>
        <div {...dragHandleProps} className="text-muted-foreground hover:text-foreground cursor-grab">
          <GripVertical className="size-4" />
        </div>
      </div>

      {/* Titre tronque */}
      <p className="text-sm text-muted-foreground truncate mb-2" title={card.title}>
        {card.title}
      </p>

      {/* Acheteur */}
      <div className="flex items-center gap-1.5 mb-2">
        <Building2 className="size-3 text-muted-foreground shrink-0" />
        <span className="text-xs text-muted-foreground truncate">{card.buyer}</span>
      </div>

      {/* Barre de progression si en analyse */}
      {isAnalyse && (
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Analyse</span>
            <span className="text-xs font-medium">{card.score}%</span>
          </div>
          <Progress value={card.score} className="h-1.5" />
        </div>
      )}

      {/* Badges: statut + compte a rebours */}
      <div className="flex items-center justify-between gap-2">
        <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0", statusInfo.className)}>
          {statusInfo.label}
        </Badge>
        <Badge
          variant="secondary"
          className={cn("text-[10px] px-1.5 py-0 gap-1", getCountdownColor(daysRemaining))}
        >
          <Clock className="size-3" />
          J{daysRemaining >= 0 ? `-${daysRemaining}` : `+${Math.abs(daysRemaining)}`}
        </Badge>
      </div>
    </Card>
  )
}
