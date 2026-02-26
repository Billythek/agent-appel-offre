"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  Eye,
  CheckCircle2,
  XCircle,
  Pencil,
  CheckCheck,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { toasts } from "@/lib/toast-messages"
import { useConsultation } from "@/contexts/consultation-context"
import { AiIndicator } from "@/components/ui/ai-indicator"
import { ConfidenceBadge } from "@/components/workflow/confidence-badge"
import { ExigenceDetailDialog } from "./exigence-detail-dialog"
import type { Exigence, ExigenceType, Priorite, ValidationStatus } from "@/lib/mock-data"

// ─── Configuration des couleurs ────────────────────────────────────────────

const typeColors: Record<ExigenceType, string> = {
  Technique: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Administrative: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Financiere: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  Juridique: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

const prioriteColors: Record<Priorite, string> = {
  Critique: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  Important: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  Standard: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
}

const statusBorderColors: Record<ValidationStatus, string> = {
  pending: "border-l-blue-400",
  accepted: "border-l-emerald-500",
  rejected: "border-l-red-500",
  edited: "border-l-amber-500",
}

const statusLabels: Record<ValidationStatus, string> = {
  pending: "En attente",
  accepted: "Validee",
  rejected: "Rejetee",
  edited: "Modifiee",
}

const statusColors: Record<ValidationStatus, string> = {
  pending: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  accepted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  edited: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
}

// ─── Composant ─────────────────────────────────────────────────────────────

export function ExigencesTable() {
  const {
    exigences,
    validateExigence,
    rejectExigence,
    editExigence,
    validateAllExigences,
  } = useConsultation()

  const [detailExigence, setDetailExigence] = useState<Exigence | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  // Edition inline
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  // Rejet avec AlertDialog
  const [rejectTarget, setRejectTarget] = useState<Exigence | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const pendingCount = exigences.filter((e) => e.validationStatus === "pending").length
  const validatedCount = exigences.filter(
    (e) => e.validationStatus === "accepted" || e.validationStatus === "edited"
  ).length

  // ── Handlers ───────────────────────────────────────────────────────────

  const handleValidate = (id: string) => {
    validateExigence(id)
    toast.success(toasts.exigenceValidated)
  }

  const handleReject = () => {
    if (!rejectTarget) return
    rejectExigence(rejectTarget.id, rejectReason)
    toast.success(toasts.exigenceRejected)
    setRejectTarget(null)
    setRejectReason("")
  }

  const handleStartEdit = (exigence: Exigence) => {
    setEditingId(exigence.id)
    setEditValue(exigence.editedDescription ?? exigence.description)
  }

  const handleSaveEdit = (id: string) => {
    editExigence(id, editValue)
    toast.success(toasts.exigenceEdited)
    setEditingId(null)
    setEditValue("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  }

  const handleValidateAll = () => {
    validateAllExigences()
    toast.success(toasts.allExigencesValidated)
  }

  const handleOpenDetail = (exigence: Exigence) => {
    setDetailExigence(exigence)
    setDetailOpen(true)
  }

  return (
    <>
      <div className="space-y-3">
        {/* Header avec actions batch */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ConfidenceBadge type="ia" />
            <span className="text-sm text-muted-foreground">
              {validatedCount}/{exigences.length} validees
            </span>
          </div>
          {pendingCount > 0 && (
            <Button size="sm" onClick={handleValidateAll}>
              <CheckCheck className="mr-2 size-4" />
              Tout valider ({pendingCount})
            </Button>
          )}
        </div>

        {/* Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="min-w-[300px]">Exigence</TableHead>
                <TableHead className="w-[120px]">Type</TableHead>
                <TableHead className="w-[110px]">Priorite</TableHead>
                <TableHead className="w-[100px]">Statut</TableHead>
                <TableHead className="w-[60px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exigences.map((exigence) => (
                <TableRow
                  key={exigence.id}
                  className={cn(
                    "border-l-4",
                    statusBorderColors[exigence.validationStatus]
                  )}
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {exigence.numero}
                  </TableCell>
                  <TableCell className="max-w-[400px]">
                    {editingId === exigence.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          rows={3}
                          className="resize-none text-sm"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(exigence.id)}
                          >
                            Sauvegarder
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <span className="line-clamp-2 text-sm">
                        {exigence.editedDescription ?? exigence.description}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn("text-xs", typeColors[exigence.type])}
                    >
                      {exigence.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn("text-xs", prioriteColors[exigence.priorite])}
                    >
                      {exigence.priorite}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn("text-xs", statusColors[exigence.validationStatus])}
                    >
                      {statusLabels[exigence.validationStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenDetail(exigence)}>
                          <Eye className="mr-2 size-4" />
                          Voir le detail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleValidate(exigence.id)}>
                          <CheckCircle2 className="mr-2 size-4" />
                          Valider
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStartEdit(exigence)}>
                          <Pencil className="mr-2 size-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => setRejectTarget(exigence)}
                        >
                          <XCircle className="mr-2 size-4" />
                          Rejeter
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog detail exigence */}
      <ExigenceDetailDialog
        exigence={detailExigence}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAccept={(id) => {
          validateExigence(id)
          toast.success(toasts.exigenceValidated)
        }}
        onReject={(id, reason) => {
          rejectExigence(id, reason)
          toast.success(toasts.exigenceRejected)
        }}
        onEdit={(id, desc) => {
          editExigence(id, desc)
          toast.success(toasts.exigenceEdited)
        }}
      />

      {/* AlertDialog pour rejet */}
      <AlertDialog
        open={!!rejectTarget}
        onOpenChange={(open) => {
          if (!open) {
            setRejectTarget(null)
            setRejectReason("")
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rejeter l&apos;exigence ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous etes sur le point de rejeter l&apos;exigence{" "}
              <strong>{rejectTarget?.code}</strong>. Cette action peut etre
              annulee ulterieurement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Motif du rejet (obligatoire)..."
              rows={3}
              className="resize-none"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={!rejectReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmer le rejet
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
