"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { SplitSquareHorizontal, Rows3 } from "lucide-react"

const ReactDiffViewer = dynamic(() => import("react-diff-viewer-continued"), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />,
})

// Convertir le HTML en texte lisible pour la comparaison
function htmlToText(html: string): string {
  return html
    .replace(/<h[1-6][^>]*>/gi, "\n## ")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<li[^>]*>/gi, "  - ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<strong[^>]*>/gi, "**")
    .replace(/<\/strong>/gi, "**")
    .replace(/<em[^>]*>/gi, "_")
    .replace(/<\/em>/gi, "_")
    .replace(/<ol[^>]*>/gi, "")
    .replace(/<\/ol>/gi, "")
    .replace(/<ul[^>]*>/gi, "")
    .replace(/<\/ul>/gi, "")
    .replace(/<tr[^>]*>/gi, "")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<td[^>]*>/gi, "| ")
    .replace(/<\/td>/gi, " ")
    .replace(/<table[^>]*>/gi, "")
    .replace(/<\/table>/gi, "")
    .replace(/<[^>]+>/gi, "")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

interface VersionDiffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentTitle: string
  originalContent: string
  editedContent: string
}

export function VersionDiffDialog({
  open,
  onOpenChange,
  documentTitle,
  originalContent,
  editedContent,
}: VersionDiffDialogProps) {
  const [splitView, setSplitView] = useState(true)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Comparaison — {documentTitle}</DialogTitle>
            <div className="flex gap-1">
              <Button
                variant={splitView ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setSplitView(true)}
                title="Vue cote a cote"
              >
                <SplitSquareHorizontal className="size-4" />
              </Button>
              <Button
                variant={!splitView ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setSplitView(false)}
                title="Vue unifiee"
              >
                <Rows3 className="size-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto rounded-lg border">
          <ReactDiffViewer
            oldValue={htmlToText(originalContent)}
            newValue={htmlToText(editedContent)}
            splitView={splitView}
            leftTitle="Version IA (originale)"
            rightTitle="Version editee"
            useDarkTheme={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
