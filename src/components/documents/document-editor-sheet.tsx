"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "./tiptap-editor"
import { ToneSelector } from "./tone-selector"
import { LegalDisclaimer } from "@/components/workflow/legal-disclaimer"
import { toast } from "sonner"
import { toasts } from "@/lib/toast-messages"
import { Save, GitCompareArrows, FileDown } from "lucide-react"
import type { DocumentItem } from "@/lib/mock-data"

interface DocumentEditorSheetProps {
  document: DocumentItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (docId: string, content: string) => void
  onShowDiff: (doc: DocumentItem) => void
}

export function DocumentEditorSheet({
  document,
  open,
  onOpenChange,
  onSave,
  onShowDiff,
}: DocumentEditorSheetProps) {
  const [editedContent, setEditedContent] = useState("")
  const [initialized, setInitialized] = useState(false)

  // Initialiser le contenu quand le document change
  if (document && !initialized) {
    setEditedContent(document.editedContent ?? document.aiContent)
    setInitialized(true)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setInitialized(false)
    }
    onOpenChange(isOpen)
  }

  const handleSave = () => {
    if (document) {
      onSave(document.id, editedContent)
      toast.success(toasts.documentSaved)
      handleOpenChange(false)
    }
  }

  const hasChanges = document
    ? editedContent !== document.aiContent
    : false

  if (!document) return null

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="sm:max-w-2xl w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>
            {document.code} — {document.title}
          </SheetTitle>
          <SheetDescription>
            Editez le contenu genere par l&apos;IA avant validation
          </SheetDescription>
          <div className="pt-2">
            <ToneSelector />
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <TiptapEditor
            content={document.editedContent ?? document.aiContent}
            onChange={setEditedContent}
          />
        </div>

        <LegalDisclaimer className="mx-0" />

        <SheetFooter className="flex-row gap-2 pt-4 border-t">
          <Button onClick={handleSave}>
            <Save className="mr-2 size-4" />
            Sauvegarder
          </Button>
          {hasChanges && (
            <Button
              variant="outline"
              onClick={() => onShowDiff(document)}
            >
              <GitCompareArrows className="mr-2 size-4" />
              Voir les modifications
            </Button>
          )}
          <Button variant="outline">
            <FileDown className="mr-2 size-4" />
            Exporter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
