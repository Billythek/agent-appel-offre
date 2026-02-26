"use client"

import { useState } from "react"
import { FileText, CheckCircle2, Pencil, GitCompareArrows } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AiIndicator } from "@/components/ui/ai-indicator"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { toasts } from "@/lib/toast-messages"
import { useConsultation } from "@/contexts/consultation-context"
import { simulateDocumentGeneration } from "@/lib/simulate"
import { DocumentEditorSheet } from "./document-editor-sheet"
import { VersionDiffDialog } from "./version-diff-dialog"
import type { DocumentItem, DocumentStatus } from "@/lib/mock-data"

function statusLabel(status: DocumentStatus) {
  switch (status) {
    case "genere":
      return "Genere"
    case "generation":
      return "Generation..."
    case "en_attente":
      return "En attente"
    case "valide":
      return "Valide"
  }
}

function statusVariant(status: DocumentStatus) {
  switch (status) {
    case "genere":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
    case "generation":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
    case "en_attente":
      return "bg-muted text-muted-foreground"
    case "valide":
      return "bg-primary/10 text-primary"
  }
}

function progressColor(status: DocumentStatus) {
  switch (status) {
    case "genere":
    case "valide":
      return "[&>[data-slot=progress-indicator]]:bg-emerald-500"
    case "generation":
      return "[&>[data-slot=progress-indicator]]:bg-blue-500"
    case "en_attente":
      return "[&>[data-slot=progress-indicator]]:bg-muted-foreground/30"
  }
}

export function DocumentGrid() {
  const {
    documents,
    setDocumentStatus,
    generateDocument,
    updateDocumentContent,
    validateDocument,
  } = useConsultation()

  const [generatingDocs, setGeneratingDocs] = useState<Set<string>>(new Set())
  const [editorDoc, setEditorDoc] = useState<DocumentItem | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [diffDoc, setDiffDoc] = useState<DocumentItem | null>(null)
  const [diffOpen, setDiffOpen] = useState(false)

  const handleGenerate = async (doc: DocumentItem) => {
    setGeneratingDocs((prev) => new Set(prev).add(doc.id))
    setDocumentStatus(doc.id, "generation", 0)

    await simulateDocumentGeneration(doc.id, (progress) => {
      setDocumentStatus(doc.id, "generation", progress)
    })

    generateDocument(doc.id)
    setGeneratingDocs((prev) => {
      const next = new Set(prev)
      next.delete(doc.id)
      return next
    })
    toast.success(toasts.documentGenerated(doc.code))
  }

  const handleEdit = (doc: DocumentItem) => {
    setEditorDoc(doc)
    setEditorOpen(true)
  }

  const handleSave = (docId: string, content: string) => {
    updateDocumentContent(docId, content)
  }

  const handleShowDiff = (doc: DocumentItem) => {
    setEditorOpen(false)
    // Trouver le document a jour
    const freshDoc = documents.find((d) => d.id === doc.id) ?? doc
    setDiffDoc(freshDoc)
    setDiffOpen(true)
  }

  const handleValidate = (doc: DocumentItem) => {
    validateDocument(doc.id)
    toast.success(toasts.documentValidated(doc.code))
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => {
          const isGenerating = generatingDocs.has(doc.id)
          const hasEdits = !!doc.editedContent && doc.editedContent !== doc.aiContent

          return (
            <Card key={doc.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2 text-sm">
                        {doc.code}
                        {hasEdits && (
                          <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                            Modifie
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">{doc.title}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={statusVariant(doc.status)}
                  >
                    {statusLabel(doc.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                {isGenerating ? (
                  <AiIndicator label="Generation en cours..." className="w-full justify-center text-xs" />
                ) : (
                  <>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Progression</span>
                      <span>{doc.progress} %</span>
                    </div>
                    <Progress
                      value={doc.progress}
                      className={progressColor(doc.status)}
                    />
                  </>
                )}
              </CardContent>

              <CardFooter className="flex-col gap-2">
                {doc.status === "en_attente" && !isGenerating && (
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => handleGenerate(doc)}
                  >
                    Generer
                  </Button>
                )}

                {(doc.status === "genere" || doc.status === "valide") && (
                  <div className="flex w-full gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(doc)}
                    >
                      <Pencil className="mr-1 size-3" />
                      Editer
                    </Button>
                    {hasEdits && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDiffDoc(doc)
                          setDiffOpen(true)
                        }}
                      >
                        <GitCompareArrows className="size-3" />
                      </Button>
                    )}
                    {doc.status !== "valide" && (
                      <Button
                        size="sm"
                        onClick={() => handleValidate(doc)}
                      >
                        <CheckCircle2 className="mr-1 size-3" />
                        Valider
                      </Button>
                    )}
                  </div>
                )}

                {doc.status === "generation" && isGenerating && (
                  <div className="w-full text-center text-xs text-muted-foreground">
                    Veuillez patienter...
                  </div>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Editor Sheet */}
      <DocumentEditorSheet
        document={editorDoc}
        open={editorOpen}
        onOpenChange={setEditorOpen}
        onSave={handleSave}
        onShowDiff={handleShowDiff}
      />

      {/* Version Diff Dialog */}
      {diffDoc && (
        <VersionDiffDialog
          open={diffOpen}
          onOpenChange={setDiffOpen}
          documentTitle={`${diffDoc.code} — ${diffDoc.title}`}
          originalContent={diffDoc.aiContent}
          editedContent={diffDoc.editedContent ?? diffDoc.aiContent}
        />
      )}
    </>
  )
}
