"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerdictBannerProps {
  verdict: "go" | "review" | "nogo"
  score: number
}

const verdictConfig = {
  go: {
    icon: CheckCircle,
    title: "Recommandation : GO",
    description:
      "L'analyse globale indique un profil de risque acceptable. Les critères financiers, techniques et juridiques sont favorables. Vous pouvez poursuivre la soumission.",
    bgClass:
      "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-100",
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
  review: {
    icon: AlertTriangle,
    title: "Recommandation : REVUE NECESSAIRE",
    description:
      "Certains indicateurs nécessitent une attention particulière avant de prendre une décision. Une revue approfondie des clauses identifiées est recommandée.",
    bgClass:
      "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-100",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  nogo: {
    icon: XCircle,
    title: "Recommandation : NO-GO",
    description:
      "Le profil de risque est trop élevé pour cette consultation. Des clauses critiques et des indicateurs défavorables ont été détectés. Il est déconseillé de soumettre une offre.",
    bgClass:
      "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/50 dark:border-red-800 dark:text-red-100",
    iconClass: "text-red-600 dark:text-red-400",
  },
}

export function VerdictBanner({ verdict, score }: VerdictBannerProps) {
  const config = verdictConfig[verdict]
  const Icon = config.icon

  return (
    <Alert className={cn("w-full", config.bgClass)}>
      <Icon className={cn("size-5", config.iconClass)} />
      <AlertTitle className="flex items-center gap-3 text-base font-bold">
        {config.title}
        <span className="ml-auto text-sm font-semibold tabular-nums">
          Score global : {score}/100
        </span>
      </AlertTitle>
      <AlertDescription className={cn("mt-1", config.bgClass.includes("emerald") ? "text-emerald-800 dark:text-emerald-200" : config.bgClass.includes("amber") ? "text-amber-800 dark:text-amber-200" : "text-red-800 dark:text-red-200")}>
        {config.description}
      </AlertDescription>
    </Alert>
  )
}
