import { AlertTriangle } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface LegalDisclaimerProps {
  className?: string
}

export function LegalDisclaimer({ className }: LegalDisclaimerProps) {
  return (
    <Alert className={cn("border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10", className)}>
      <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle className="text-amber-800 dark:text-amber-300">
        Avertissement legal
      </AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-400/80">
        Ce document a ete genere avec l&apos;assistance de l&apos;intelligence
        artificielle. Il est recommande de faire valider l&apos;ensemble des
        elements par un professionnel qualifie avant soumission.
      </AlertDescription>
    </Alert>
  )
}
