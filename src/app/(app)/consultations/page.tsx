"use client"

import { useState } from "react"
import { KanbanBoard } from "@/components/consultations/kanban-board"
import { UploadDceDialog } from "@/components/consultations/upload-dce-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { KanbanCardData } from "@/components/consultations/kanban-card"

export default function ConsultationsPage() {
  const [uploadOpen, setUploadOpen] = useState(false)
  const [newCards, setNewCards] = useState<KanbanCardData[]>([])

  const handleUploadComplete = (reference: string, title: string) => {
    const newCard: KanbanCardData = {
      id: `card-new-${Date.now()}`,
      reference,
      title,
      buyer: "Nouveau DCE importe",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      status: "analyse",
      score: 15,
    }
    setNewCards((prev) => [...prev, newCard])
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h1 className="text-2xl font-semibold">Consultations</h1>
          <p className="text-sm text-muted-foreground">
            Pipeline de traitement des dossiers de consultation
          </p>
        </div>
        <Button onClick={() => setUploadOpen(true)}>
          <Plus className="mr-2 size-4" />
          Nouveau DCE
        </Button>
      </div>
      <div className="px-4 lg:px-6">
        <KanbanBoard newCards={newCards} />
      </div>

      <UploadDceDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onComplete={handleUploadComplete}
      />
    </div>
  )
}
