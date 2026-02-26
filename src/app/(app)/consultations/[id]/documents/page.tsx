"use client"

import { DocumentGrid } from "@/components/documents/document-grid"
import { ToneSelector } from "@/components/documents/tone-selector"
import { ConfidenceBadge } from "@/components/workflow/confidence-badge"
import { LegalDisclaimer } from "@/components/workflow/legal-disclaimer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useConsultation } from "@/contexts/consultation-context"
import { toast } from "sonner"
import { toasts } from "@/lib/toast-messages"
import { ShieldCheck, CheckCircle2, Send } from "lucide-react"

export default function DocumentsPage() {
  const { documents, hitl2Validated, validateHitl2 } = useConsultation()

  const allDocsReady = documents.every(
    (d) => d.status === "genere" || d.status === "valide"
  )

  const handleValidateHitl2 = () => {
    validateHitl2()
    toast.success(toasts.hitl2Validated)
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Generation des documents</h2>
          <p className="text-sm text-muted-foreground">
            Documents a produire pour cette consultation
          </p>
        </div>
        <ToneSelector />
      </div>

      <DocumentGrid />

      {/* Carte HITL 2 */}
      {!hitl2Validated ? (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Send className="size-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Soumission finale — HITL 2</h3>
                  <p className="text-sm text-muted-foreground">
                    {documents.filter((d) => d.status === "genere" || d.status === "valide").length}/
                    {documents.length} documents prets
                  </p>
                </div>
              </div>
              <ConfidenceBadge type="human" />
            </div>

            <LegalDisclaimer />

            {allDocsReady ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" className="w-full">
                    <ShieldCheck className="mr-2 size-5" />
                    Valider et soumettre le dossier
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Soumission finale du dossier</AlertDialogTitle>
                    <AlertDialogDescription>
                      Vous etes sur le point de soumettre definitivement ce dossier
                      de consultation. Cette action est irreversible. Assurez-vous
                      que tous les documents ont ete relus et valides.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleValidateHitl2}>
                      Confirmer la soumission
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button size="lg" className="w-full" disabled>
                      <ShieldCheck className="mr-2 size-5" />
                      Valider et soumettre le dossier
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Tous les documents doivent etre generes avant la soumission
                </TooltipContent>
              </Tooltip>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20">
          <CardContent className="flex items-center gap-3 pt-6">
            <CheckCircle2 className="size-5 text-emerald-600" />
            <div>
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">
                Dossier soumis
              </h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Le dossier a ete valide et soumis avec succes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
