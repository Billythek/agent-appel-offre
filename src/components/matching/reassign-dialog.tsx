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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import type { Produit } from "@/lib/mock-data"

interface ReassignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exigenceCode: string
  produits: Produit[]
  currentProduitId: string | null
  onConfirm: (produitId: string) => void
}

export function ReassignDialog({
  open,
  onOpenChange,
  exigenceCode,
  produits,
  currentProduitId,
  onConfirm,
}: ReassignDialogProps) {
  const [selected, setSelected] = useState(currentProduitId ?? "")

  const handleConfirm = () => {
    if (selected) {
      onConfirm(selected)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reassigner le produit</DialogTitle>
          <DialogDescription>
            Choisissez un produit pour l&apos;exigence{" "}
            <strong>{exigenceCode}</strong>
          </DialogDescription>
        </DialogHeader>

        <RadioGroup value={selected} onValueChange={setSelected} className="gap-3">
          {produits.map((produit) => (
            <div
              key={produit.id}
              className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={produit.id} id={produit.id} className="mt-0.5" />
              <Label htmlFor={produit.id} className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Package className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{produit.nom}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    {produit.reference}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {produit.fournisseur}
                  </span>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleConfirm} disabled={!selected}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
