"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle, Pencil, FileText, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { ConfidenceBadge } from "@/components/workflow/confidence-badge"
import type { Exigence } from "@/lib/mock-data"

interface ExigenceDetailDialogProps {
  exigence: Exigence | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAccept: (id: string) => void
  onReject: (id: string, reason: string) => void
  onEdit: (id: string, newDescription: string) => void
}

export function ExigenceDetailDialog({
  exigence,
  open,
  onOpenChange,
  onAccept,
  onReject,
  onEdit,
}: ExigenceDetailDialogProps) {
  const [mode, setMode] = useState<"view" | "edit" | "reject">("view")
  const [editValue, setEditValue] = useState("")
  const [rejectReason, setRejectReason] = useState("")

  if (!exigence) return null

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      setMode("view")
      setEditValue("")
      setRejectReason("")
    }
    onOpenChange(isOpen)
  }

  const handleAccept = () => {
    onAccept(exigence.id)
    handleOpen(false)
  }

  const handleReject = () => {
    onReject(exigence.id, rejectReason)
    handleOpen(false)
  }

  const handleEdit = () => {
    onEdit(exigence.id, editValue)
    handleOpen(false)
  }

  const startEdit = () => {
    setEditValue(exigence.editedDescription ?? exigence.description)
    setMode("edit")
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{exigence.code}</Badge>
            <Badge variant="secondary" className="text-xs">
              {exigence.categorie}
            </Badge>
            <ConfidenceBadge type="ia" className="ml-auto" />
          </div>
          <DialogTitle className="mt-2">{exigence.titre}</DialogTitle>
          <DialogDescription>
            {exigence.source && (
              <span className="flex items-center gap-1">
                <FileText className="size-3" />
                Source : {exigence.source}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Score de confiance IA */}
          {exigence.score > 0 && (
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
              <Bot className="size-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Score de confiance IA :
              </span>
              <span
                className={cn(
                  "text-sm font-bold",
                  exigence.score >= 80
                    ? "text-emerald-600"
                    : exigence.score >= 50
                      ? "text-amber-600"
                      : "text-red-600"
                )}
              >
                {exigence.score}%
              </span>
            </div>
          )}

          {/* Contenu selon le mode */}
          {mode === "view" && (
            <div className="rounded-lg border bg-muted/20 p-4">
              <p className="text-sm leading-relaxed">
                {exigence.editedDescription ?? exigence.description}
              </p>
            </div>
          )}

          {mode === "edit" && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Modifier la description :</p>
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          )}

          {mode === "reject" && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Motif du rejet :</p>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                placeholder="Expliquez pourquoi cette exigence est rejetee..."
                className="resize-none"
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {mode === "view" && (
            <>
              <Button variant="outline" onClick={startEdit}>
                <Pencil className="mr-2 size-4" />
                Modifier
              </Button>
              <Button
                variant="outline"
                className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
                onClick={() => setMode("reject")}
              >
                <XCircle className="mr-2 size-4" />
                Rejeter
              </Button>
              <Button onClick={handleAccept}>
                <CheckCircle2 className="mr-2 size-4" />
                Accepter
              </Button>
            </>
          )}

          {mode === "edit" && (
            <>
              <Button variant="outline" onClick={() => setMode("view")}>
                Annuler
              </Button>
              <Button onClick={handleEdit} disabled={!editValue.trim()}>
                Sauvegarder
              </Button>
            </>
          )}

          {mode === "reject" && (
            <>
              <Button variant="outline" onClick={() => setMode("view")}>
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={!rejectReason.trim()}
              >
                Confirmer le rejet
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
