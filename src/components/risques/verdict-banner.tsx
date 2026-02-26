"use client"

import { useState } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, AlertTriangle, XCircle, ThumbsUp, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { toasts } from "@/lib/toast-messages"
import { useConsultation } from "@/contexts/consultation-context"

interface VerdictBannerProps {
  verdict: "go" | "review" | "nogo"
  score: number
}

const verdictConfig = {
  go: {
    icon: CheckCircle,
    title: "Recommandation : GO",
    description:
      "L'analyse globale indique un profil de risque acceptable. Les criteres financiers, techniques et juridiques sont favorables. Vous pouvez poursuivre la soumission.",
    bgClass:
      "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-100",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    descClass: "text-emerald-800 dark:text-emerald-200",
  },
  review: {
    icon: AlertTriangle,
    title: "Recommandation : REVUE NECESSAIRE",
    description:
      "Certains indicateurs necessitent une attention particuliere avant de prendre une decision. Une revue approfondie des clauses identifiees est recommandee.",
    bgClass:
      "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-100",
    iconClass: "text-amber-600 dark:text-amber-400",
    descClass: "text-amber-800 dark:text-amber-200",
  },
  nogo: {
    icon: XCircle,
    title: "Recommandation : NO-GO",
    description:
      "Le profil de risque est trop eleve pour cette consultation. Des clauses critiques et des indicateurs defavorables ont ete detectes.",
    bgClass:
      "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/50 dark:border-red-800 dark:text-red-100",
    iconClass: "text-red-600 dark:text-red-400",
    descClass: "text-red-800 dark:text-red-200",
  },
}

export function VerdictBanner({ verdict, score }: VerdictBannerProps) {
  const { verdictStatus, acceptVerdict, rejectVerdict, verdictComment } = useConsultation()
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState("")

  const config = verdictConfig[verdict]
  const Icon = config.icon

  const handleAccept = () => {
    acceptVerdict()
    toast.success(toasts.verdictAccepted)
  }

  const handleReject = () => {
    if (comment.trim()) {
      rejectVerdict(comment)
      toast.success(toasts.verdictRejected)
      setShowComment(false)
    }
  }

  return (
    <div className="space-y-3">
      <Alert className={cn("w-full", config.bgClass)}>
        <Icon className={cn("size-5", config.iconClass)} />
        <AlertTitle className="flex items-center gap-3 text-base font-bold">
          {config.title}
          <span className="ml-auto text-sm font-semibold tabular-nums">
            Score global : {score}/100
          </span>
        </AlertTitle>
        <AlertDescription className={cn("mt-1", config.descClass)}>
          {config.description}
        </AlertDescription>

        {/* Boutons d'action */}
        {verdictStatus === "pending" && (
          <div className="mt-4 flex items-center gap-3">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleAccept}
            >
              <ThumbsUp className="mr-2 size-4" />
              Accepter le verdict
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowComment(!showComment)}
            >
              <MessageSquare className="mr-2 size-4" />
              Rejeter / Commenter
            </Button>
          </div>
        )}

        {/* Etat apres decision */}
        {verdictStatus === "accepted" && (
          <div className="mt-4 flex items-center gap-2 rounded-md bg-emerald-100 dark:bg-emerald-900/30 px-3 py-2">
            <CheckCircle className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Verdict accepte
            </span>
          </div>
        )}

        {verdictStatus === "rejected" && (
          <div className="mt-4 space-y-2 rounded-md bg-red-100 dark:bg-red-900/30 px-3 py-2">
            <div className="flex items-center gap-2">
              <XCircle className="size-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">
                Verdict rejete
              </span>
            </div>
            {verdictComment && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Commentaire : {verdictComment}
              </p>
            )}
          </div>
        )}
      </Alert>

      {/* Zone de commentaire pour rejet */}
      {showComment && verdictStatus === "pending" && (
        <div className="space-y-2 rounded-lg border p-4">
          <p className="text-sm font-medium">Commentaire de rejet :</p>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Expliquez pourquoi vous rejetez ce verdict..."
            rows={3}
            className="resize-none"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleReject}
              disabled={!comment.trim()}
            >
              Confirmer le rejet
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowComment(false)}
            >
              Annuler
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
