import { DocumentGrid } from "@/components/documents/document-grid"
import { ToneSelector } from "@/components/documents/tone-selector"

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Génération des documents</h2>
          <p className="text-sm text-muted-foreground">
            Documents à produire pour cette consultation
          </p>
        </div>
        <ToneSelector />
      </div>
      <DocumentGrid />
    </div>
  )
}
