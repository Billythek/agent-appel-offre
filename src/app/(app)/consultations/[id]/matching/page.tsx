"use client"

import { MatchingUnified } from "@/components/matching/matching-unified"
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
import { ShieldCheck, CheckCircle2 } from "lucide-react"

export default function MatchingPage() {
  const { exigences, hitl1Validated, validateHitl1 } = useConsultation()

  const validatedCount = exigences.filter(
    (e) => e.validationStatus === "accepted" || e.validationStatus === "edited"
  ).length
  const threshold = Math.ceil(exigences.length * 0.5)
  const canValidate = validatedCount >= threshold

  const handleValidateHitl1 = () => {
    validateHitl1()
    toast.success(toasts.hitl1Validated)
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <MatchingUnified />

      {/* Carte HITL 1 */}
      {!hitl1Validated ? (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Point de validation HITL 1</h3>
                  <p className="text-sm text-muted-foreground">
                    {validatedCount}/{exigences.length} exigences validees
                  </p>
                </div>
              </div>
              <ConfidenceBadge type="human" />
            </div>

            <LegalDisclaimer />

            {canValidate ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" className="w-full">
                    <ShieldCheck className="mr-2 size-5" />
                    Valider l&apos;analyse et le matching
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la validation HITL 1</AlertDialogTitle>
                    <AlertDialogDescription>
                      Vous confirmez que l&apos;analyse DCE, le matching produit et les
                      risques ont ete verifies. Cette action debloque la generation
                      des documents de reponse.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleValidateHitl1}>
                      Confirmer la validation
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
                      Valider l&apos;analyse et le matching
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Validez au moins {threshold} exigences ({validatedCount}/{threshold} actuellement)
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
                HITL 1 valide
              </h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                L&apos;analyse et le matching ont ete valides. La generation des documents est debloquee.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
