"use client"

import { MoreHorizontal, Eye, CheckCircle2, Link2, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

type ExigenceType = "Technique" | "Administrative" | "Financiere" | "Juridique"
type Priorite = "Critique" | "Important" | "Standard"
type Statut = "Extraite" | "Validee" | "Matchee"

interface Exigence {
  id: string
  numero: number
  description: string
  type: ExigenceType
  priorite: Priorite
  statut: Statut
}

// -------------------------------------------------------------------
// Configuration des couleurs
// -------------------------------------------------------------------

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

const statutColors: Record<Statut, string> = {
  Extraite: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  Validee: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Matchee: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
}

// -------------------------------------------------------------------
// Donnees de demonstration
// -------------------------------------------------------------------

const mockExigences: Exigence[] = [
  {
    id: "ex-1",
    numero: 1,
    description: "Le prestataire doit fournir une certification ISO 9001 en cours de validite",
    type: "Administrative",
    priorite: "Critique",
    statut: "Validee",
  },
  {
    id: "ex-2",
    numero: 2,
    description: "La solution doit supporter une charge minimale de 10 000 utilisateurs simultanes",
    type: "Technique",
    priorite: "Critique",
    statut: "Extraite",
  },
  {
    id: "ex-3",
    numero: 3,
    description: "Le delai de livraison ne doit pas exceder 6 mois a compter de la notification",
    type: "Juridique",
    priorite: "Important",
    statut: "Matchee",
  },
  {
    id: "ex-4",
    numero: 4,
    description: "Le montant du marche est soumis a un prix forfaitaire non revisable",
    type: "Financiere",
    priorite: "Important",
    statut: "Validee",
  },
  {
    id: "ex-5",
    numero: 5,
    description: "Le systeme doit garantir un taux de disponibilite de 99,9% minimum",
    type: "Technique",
    priorite: "Critique",
    statut: "Extraite",
  },
  {
    id: "ex-6",
    numero: 6,
    description: "Les donnees doivent etre hebergees sur le territoire francais (SecNumCloud)",
    type: "Technique",
    priorite: "Critique",
    statut: "Validee",
  },
  {
    id: "ex-7",
    numero: 7,
    description: "Penalite de 1% par jour calendaire de retard, plafonnee a 10% du marche",
    type: "Juridique",
    priorite: "Important",
    statut: "Matchee",
  },
  {
    id: "ex-8",
    numero: 8,
    description: "Le candidat doit justifier de 3 references similaires sur les 5 dernieres annees",
    type: "Administrative",
    priorite: "Standard",
    statut: "Extraite",
  },
  {
    id: "ex-9",
    numero: 9,
    description: "L'interface utilisateur doit etre conforme aux normes RGAA d'accessibilite",
    type: "Technique",
    priorite: "Important",
    statut: "Validee",
  },
  {
    id: "ex-10",
    numero: 10,
    description: "Le chiffre d'affaires annuel moyen doit etre superieur a 2 fois le montant du marche",
    type: "Financiere",
    priorite: "Standard",
    statut: "Extraite",
  },
]

// -------------------------------------------------------------------
// Composant
// -------------------------------------------------------------------

export function ExigencesTable() {
  return (
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
          {mockExigences.map((exigence) => (
            <TableRow key={exigence.id}>
              <TableCell className="font-medium text-muted-foreground">
                {exigence.numero}
              </TableCell>
              <TableCell className="max-w-[400px]">
                <span className="line-clamp-2 text-sm">{exigence.description}</span>
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
                  className={cn("text-xs", statutColors[exigence.statut])}
                >
                  {exigence.statut}
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
                    <DropdownMenuItem>
                      <Eye className="mr-2 size-4" />
                      Voir le detail
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle2 className="mr-2 size-4" />
                      Valider l&apos;exigence
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link2 className="mr-2 size-4" />
                      Matcher une reference
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="mr-2 size-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
