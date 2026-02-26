"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

interface TocItem {
  id: string
  title: string
  exigencesCount: number
  /** red = penalites, orange = delais, blue = technique, green = valide */
  color: "red" | "orange" | "blue" | "green" | "neutral"
}

interface TocSection {
  id: string
  title: string
  items: TocItem[]
}

// -------------------------------------------------------------------
// Couleurs semantiques
// -------------------------------------------------------------------

const colorMap: Record<TocItem["color"], string> = {
  red: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  orange: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  neutral: "bg-muted text-muted-foreground",
}

// -------------------------------------------------------------------
// Donnees de demonstration
// -------------------------------------------------------------------

const mockSections: TocSection[] = [
  {
    id: "rc",
    title: "Reglement de consultation",
    items: [
      { id: "rc-1", title: "Objet du marche", exigencesCount: 3, color: "blue" },
      { id: "rc-2", title: "Conditions de participation", exigencesCount: 5, color: "orange" },
      { id: "rc-3", title: "Criteres d'attribution", exigencesCount: 4, color: "red" },
      { id: "rc-4", title: "Delai de validite des offres", exigencesCount: 1, color: "orange" },
      { id: "rc-5", title: "Pieces a fournir", exigencesCount: 6, color: "green" },
    ],
  },
  {
    id: "cctp",
    title: "CCTP",
    items: [
      { id: "cctp-1", title: "Specifications generales", exigencesCount: 8, color: "blue" },
      { id: "cctp-2", title: "Exigences de performance", exigencesCount: 5, color: "blue" },
      { id: "cctp-3", title: "Normes et certifications", exigencesCount: 3, color: "blue" },
      { id: "cctp-4", title: "Conditions de livraison", exigencesCount: 2, color: "orange" },
      { id: "cctp-5", title: "Garantie et maintenance", exigencesCount: 4, color: "blue" },
    ],
  },
  {
    id: "ae",
    title: "Acte d'engagement",
    items: [
      { id: "ae-1", title: "Identification du candidat", exigencesCount: 2, color: "neutral" },
      { id: "ae-2", title: "Montant du marche", exigencesCount: 1, color: "orange" },
      { id: "ae-3", title: "Delais d'execution", exigencesCount: 3, color: "orange" },
      { id: "ae-4", title: "Penalites de retard", exigencesCount: 2, color: "red" },
    ],
  },
  {
    id: "bpu",
    title: "BPU / DQE",
    items: [
      { id: "bpu-1", title: "Bordereau de prix unitaires", exigencesCount: 12, color: "neutral" },
      { id: "bpu-2", title: "Detail quantitatif estimatif", exigencesCount: 8, color: "neutral" },
      { id: "bpu-3", title: "Decomposition du prix global", exigencesCount: 4, color: "neutral" },
    ],
  },
]

// -------------------------------------------------------------------
// Composant
// -------------------------------------------------------------------

export function TocNavigator() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="pr-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Table des matieres
        </h3>
        <Accordion type="multiple" defaultValue={["rc", "cctp", "ae", "bpu"]}>
          {mockSections.map((section) => {
            const totalExigences = section.items.reduce(
              (sum, item) => sum + item.exigencesCount,
              0
            )
            return (
              <AccordionItem key={section.id} value={section.id} className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{section.title}</span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0 bg-muted text-muted-foreground"
                    >
                      {totalExigences}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <ul className="space-y-0.5">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setSelectedItem(item.id)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent",
                            selectedItem === item.id && "bg-accent font-medium"
                          )}
                        >
                          <span className="truncate mr-2">{item.title}</span>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] px-1.5 py-0 shrink-0",
                              colorMap[item.color]
                            )}
                          >
                            {item.exigencesCount}
                          </Badge>
                        </button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </ScrollArea>
  )
}
