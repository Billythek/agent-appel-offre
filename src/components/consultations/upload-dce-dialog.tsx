"use client"

import { useState, useRef, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AiIndicator } from "@/components/ui/ai-indicator"
import { cn } from "@/lib/utils"
import { simulateUploadParsing, type UploadStep } from "@/lib/simulate"
import { toast } from "sonner"
import { toasts } from "@/lib/toast-messages"
import {
  Upload,
  FileText,
  CheckCircle2,
  X,
} from "lucide-react"

interface UploadDceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (reference: string, title: string) => void
}

export function UploadDceDialog({
  open,
  onOpenChange,
  onComplete,
}: UploadDceDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState<UploadStep | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const steps = [
    "Upload du fichier...",
    "OCR et extraction du texte...",
    "Extraction des exigences...",
    "Analyse IA en cours...",
  ]

  const resetState = () => {
    setFile(null)
    setIsProcessing(false)
    setCurrentStep(null)
    setCompletedSteps([])
    setProgress(0)
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen && !isProcessing) {
      resetState()
    }
    if (!isProcessing) {
      onOpenChange(isOpen)
    }
  }

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") {
      toast.error("Seuls les fichiers PDF sont acceptes")
      return
    }
    if (f.size > 100 * 1024 * 1024) {
      toast.error("Le fichier ne doit pas depasser 100 Mo")
      return
    }
    setFile(f)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [])

  const handleAnalyze = async () => {
    setIsProcessing(true)
    setCompletedSteps([])

    await simulateUploadParsing((step, index) => {
      setCurrentStep(step)
      setProgress(step.progress)
      if (index > 0) {
        setCompletedSteps((prev) => [...prev, index - 1])
      }
    })

    // Marquer la derniere etape comme terminee
    setCompletedSteps([0, 1, 2, 3])
    setProgress(100)

    // Generer une reference
    const num = Math.floor(Math.random() * 900) + 100
    const ref = `DCE-2026-${num}`
    const title = file?.name.replace(".pdf", "") ?? "Nouveau DCE"

    setTimeout(() => {
      setIsProcessing(false)
      toast.success(toasts.uploadSuccess)
      onComplete(ref, title)
      resetState()
      onOpenChange(false)
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Importer un DCE</DialogTitle>
          <DialogDescription>
            Deposez un fichier PDF pour lancer l&apos;analyse automatique par l&apos;IA
          </DialogDescription>
        </DialogHeader>

        {!file && !isProcessing && (
          <div
            className={cn(
              "flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="size-10 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">
                Glissez-deposez votre DCE ici
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Format PDF uniquement — 100 Mo maximum
              </p>
            </div>
            <Button variant="outline" size="sm" type="button">
              Parcourir les fichiers
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleFile(f)
              }}
            />
          </div>
        )}

        {file && !isProcessing && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <FileText className="size-8 text-red-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(1)} Mo — PDF
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => setFile(null)}
              >
                <X className="size-4" />
              </Button>
            </div>
            <Button className="w-full" onClick={handleAnalyze}>
              Analyser le DCE
            </Button>
          </div>
        )}

        {isProcessing && (
          <div className="space-y-4">
            <AiIndicator label={currentStep?.label ?? "Demarrage..."} className="w-full justify-center" />

            <Progress value={progress} className="[&>[data-slot=progress-indicator]]:bg-primary" />

            <div className="space-y-2">
              {steps.map((label, i) => {
                const isCompleted = completedSteps.includes(i)
                const isCurrent = currentStep?.label === label && !isCompleted

                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-2 text-sm",
                      isCompleted
                        ? "text-emerald-600"
                        : isCurrent
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="size-4 text-emerald-600" />
                    ) : (
                      <div className={cn(
                        "size-4 rounded-full border-2",
                        isCurrent ? "border-primary" : "border-muted"
                      )} />
                    )}
                    {label}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
