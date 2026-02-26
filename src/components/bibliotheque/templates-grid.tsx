"use client"

import {
  FileText,
  Mail,
  ClipboardList,
  CalendarDays,
  Table2,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface Template {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

const templates: Template[] = [
  {
    id: "tpl-1",
    icon: FileText,
    title: "Mémoire technique standard",
    description:
      "Modèle structuré pour rédiger un mémoire technique conforme aux exigences courantes des marchés publics.",
  },
  {
    id: "tpl-2",
    icon: Mail,
    title: "Lettre de motivation",
    description:
      "Courrier d\u2019accompagnement personnalisable pour présenter la candidature et valoriser les atouts de l\u2019entreprise.",
  },
  {
    id: "tpl-3",
    icon: ClipboardList,
    title: "Note méthodologique",
    description:
      "Document détaillant la méthodologie de travail, les moyens mis en \u0153uvre et le plan d\u2019assurance qualité.",
  },
  {
    id: "tpl-4",
    icon: CalendarDays,
    title: "Planning prévisionnel",
    description:
      "Gabarit de planning avec jalons, phases et livrables pour illustrer le déroulement du projet proposé.",
  },
  {
    id: "tpl-5",
    icon: Table2,
    title: "Tableau de prix",
    description:
      "Modèle de bordereau de prix unitaires et de décomposition du prix global forfaitaire pré-formaté.",
  },
]

export function TemplatesGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((tpl) => {
        const Icon = tpl.icon
        return (
          <Card key={tpl.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm">{tpl.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {tpl.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Utiliser
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
