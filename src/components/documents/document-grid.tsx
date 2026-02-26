"use client"

import { FileText } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type DocumentStatus = "Généré" | "En cours" | "En attente"

interface DocumentItem {
  id: string
  code: string
  title: string
  status: DocumentStatus
  progress: number
}

const documents: DocumentItem[] = [
  {
    id: "doc-1",
    code: "DC1",
    title: "Lettre de candidature",
    status: "Généré",
    progress: 100,
  },
  {
    id: "doc-2",
    code: "DC2",
    title: "Déclaration du candidat",
    status: "En cours",
    progress: 75,
  },
  {
    id: "doc-3",
    code: "MT",
    title: "Mémoire Technique",
    status: "En attente",
    progress: 0,
  },
  {
    id: "doc-4",
    code: "BPU",
    title: "BPU / DQE",
    status: "En attente",
    progress: 0,
  },
  {
    id: "doc-5",
    code: "DPGF",
    title: "DPGF",
    status: "En attente",
    progress: 0,
  },
  {
    id: "doc-6",
    code: "AE",
    title: "Acte d\u2019engagement",
    status: "En attente",
    progress: 0,
  },
]

function statusVariant(status: DocumentStatus) {
  switch (status) {
    case "Généré":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
    case "En cours":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
    case "En attente":
      return "bg-muted text-muted-foreground"
  }
}

function progressColor(status: DocumentStatus) {
  switch (status) {
    case "Généré":
      return "[&>[data-slot=progress-indicator]]:bg-emerald-500"
    case "En cours":
      return "[&>[data-slot=progress-indicator]]:bg-amber-500"
    case "En attente":
      return "[&>[data-slot=progress-indicator]]:bg-muted-foreground/30"
  }
}

export function DocumentGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">{doc.code}</CardTitle>
                  <p className="text-xs text-muted-foreground">{doc.title}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={statusVariant(doc.status)}
              >
                {doc.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progression</span>
              <span>{doc.progress} %</span>
            </div>
            <Progress
              value={doc.progress}
              className={progressColor(doc.status)}
            />
          </CardContent>

          <CardFooter>
            {doc.status === "En attente" ? (
              <Button className="w-full" size="sm">
                Générer
              </Button>
            ) : (
              <Button variant="outline" className="w-full" size="sm">
                Éditer
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
