import { KanbanBoard } from "@/components/consultations/kanban-board"

export default function ConsultationsPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h1 className="text-2xl font-semibold">Consultations</h1>
          <p className="text-sm text-muted-foreground">
            Pipeline de traitement des dossiers de consultation
          </p>
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <KanbanBoard />
      </div>
    </div>
  )
}
