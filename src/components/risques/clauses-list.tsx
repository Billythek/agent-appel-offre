"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AlertTriangle, ShieldAlert, Info } from "lucide-react"

type Severity = "critique" | "majeur" | "mineur"

interface Clause {
  id: string
  titre: string
  article: string
  severite: Severity
  description: string
  alternative: string
}

const severityConfig: Record<
  Severity,
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

const mockClauses: Clause[] = [
  {
    id: "clause-1",
    titre: "Pénalités de retard illimitées",
    article: "Article 14.3 - CCAP",
    severite: "critique",
    description:
      "Le cahier des charges prévoit des pénalités de retard sans plafonnement. L'absence de limite supérieure expose le titulaire à un risque financier potentiellement supérieur au montant du marché.",
    alternative:
      "Proposer un plafonnement des pénalités à 10% du montant total du marché, conformément aux pratiques courantes des marchés publics.",
  },
  {
    id: "clause-2",
    titre: "Responsabilité étendue post-livraison",
    article: "Article 22.1 - CCAP",
    severite: "critique",
    description:
      "La clause impose une responsabilité du prestataire pendant 10 ans après la réception, ce qui dépasse largement les obligations légales habituelles (garantie décennale réservée aux ouvrages).",
    alternative:
      "Limiter la responsabilité post-livraison à 2 ans pour la garantie contractuelle et renvoyer aux régimes légaux pour les durées supérieures.",
  },
  {
    id: "clause-3",
    titre: "Clause de résiliation unilatérale sans indemnité",
    article: "Article 31.2 - CCAG",
    severite: "majeur",
    description:
      "Le maître d'ouvrage se réserve le droit de résilier le marché à tout moment sans motif et sans indemnisation du titulaire pour les travaux réalisés.",
    alternative:
      "Négocier l'ajout d'une indemnité de résiliation couvrant au minimum les frais engagés et la marge sur les prestations déjà réalisées.",
  },
  {
    id: "clause-4",
    titre: "Délai de paiement supérieur à 60 jours",
    article: "Article 11.5 - CCAP",
    severite: "majeur",
    description:
      "Le délai de paiement prévu est de 90 jours à compter de la réception de la facture, ce qui impacte significativement la trésorerie et dépasse le cadre réglementaire.",
    alternative:
      "Exiger un délai de paiement conforme à la réglementation (30 jours pour l'État, 50 jours pour les collectivités) avec intérêts moratoires automatiques.",
  },
  {
    id: "clause-5",
    titre: "Propriété intellectuelle cédée intégralement",
    article: "Article 25.1 - CCAP",
    severite: "mineur",
    description:
      "La clause prévoit une cession totale et exclusive des droits de propriété intellectuelle sur l'ensemble des livrables, y compris les outils et méthodes préexistants du prestataire.",
    alternative:
      "Distinguer les créations spécifiques au marché (cessibles) des outils et méthodes préexistants (licence d'utilisation accordée au client).",
  },
]

export function ClausesList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clauses à risque identifiées</CardTitle>
        <CardDescription>
          {mockClauses.length} clauses nécessitant une attention particulière
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {mockClauses.map((clause) => {
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
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-1">
                    <div>
                      <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wide">
                        Risque identifié
                      </p>
                      <p className="text-sm leading-relaxed">
                        {clause.description}
                      </p>
                    </div>
                    <div className="rounded-lg border border-dashed bg-muted/50 p-3">
                      <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wide">
                        Alternative suggérée
                      </p>
                      <p className="text-sm leading-relaxed">
                        {clause.alternative}
                      </p>
                    </div>
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
