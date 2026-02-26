"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { toasts } from "@/lib/toast-messages"
import { useConsultation } from "@/contexts/consultation-context"
import {
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  Flag,
} from "lucide-react"
import type { ClauseSeverity } from "@/lib/mock-data"

const severityConfig: Record<
  ClauseSeverity,
  { label: string; className: string; icon: typeof AlertTriangle }
> = {
  critique: {
    label: "Critique",
    className:
      "bg-red-500/15 text-red-700 border-red-500/25 dark:text-red-400",
    icon: ShieldAlert,
  },
  majeur: {
    label: "Majeur",
    className:
      "bg-amber-500/15 text-amber-700 border-amber-500/25 dark:text-amber-400",
    icon: AlertTriangle,
  },
  mineur: {
    label: "Mineur",
    className:
      "bg-yellow-500/15 text-yellow-700 border-yellow-500/25 dark:text-yellow-400",
    icon: Info,
  },
}

export function ClausesList() {
  const { clauses, acceptClause, flagClause } = useConsultation()

  const handleAccept = (clauseId: string) => {
    acceptClause(clauseId)
    toast.success(toasts.clauseAccepted)
  }

  const handleFlag = (clauseId: string) => {
    flagClause(clauseId)
    toast.success(toasts.clauseFlagged)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clauses a risque identifiees</CardTitle>
        <CardDescription>
          {clauses.length} clauses necessitant une attention particuliere
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {clauses.map((clause) => {
            const config = severityConfig[clause.severite]
            const Icon = config.icon

            return (
              <AccordionItem key={clause.id} value={clause.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-1 items-center gap-3">
                    <Badge
                      variant="outline"
                      className={cn("shrink-0", config.className)}
                    >
                      <Icon className="mr-1 size-3" />
                      {config.label}
                    </Badge>
                    <div className="flex flex-col items-start gap-0.5 text-left">
                      <span className="font-medium">{clause.titre}</span>
                      <span className="text-muted-foreground text-xs">
                        {clause.article}
                      </span>
                    </div>
                    {/* Indicateur de statut */}
                    {clause.status === "accepted" && (
                      <CheckCircle2 className="ml-auto size-4 text-emerald-600 shrink-0" />
                    )}
                    {clause.status === "flagged" && (
                      <Flag className="ml-auto size-4 text-red-600 shrink-0" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-1">
                    <div>
                      <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wide">
                        Risque identifie
                      </p>
                      <p className="text-sm leading-relaxed">
                        {clause.description}
                      </p>
                    </div>
                    <div className="rounded-lg border border-dashed bg-muted/50 p-3">
                      <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wide">
                        Alternative suggeree
                      </p>
                      <p className="text-sm leading-relaxed">
                        {clause.alternative}
                      </p>
                    </div>

                    {/* Boutons d'action */}
                    {clause.status === "pending" && (
                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950"
                          onClick={() => handleAccept(clause.id)}
                        >
                          <CheckCircle2 className="mr-2 size-4" />
                          Accepter le risque
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
                          onClick={() => handleFlag(clause.id)}
                        >
                          <Flag className="mr-2 size-4" />
                          Signaler comme bloquant
                        </Button>
                      </div>
                    )}

                    {clause.status === "accepted" && (
                      <div className="flex items-center gap-2 rounded-md bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2">
                        <CheckCircle2 className="size-4 text-emerald-600" />
                        <span className="text-sm text-emerald-700 dark:text-emerald-300">
                          Risque accepte
                        </span>
                      </div>
                    )}

                    {clause.status === "flagged" && (
                      <div className="flex items-center gap-2 rounded-md bg-red-50 dark:bg-red-950/30 px-3 py-2">
                        <Flag className="size-4 text-red-600" />
                        <span className="text-sm text-red-700 dark:text-red-300">
                          Signale comme bloquant
                        </span>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </CardContent>
    </Card>
  )
}
