"use client"

import { MoreHorizontal, Pencil, Trash2, Copy } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Product {
  id: string
  reference: string
  designation: string
  categorie: string
  prixUnitaireHT: number
  matchsHistoriques: number
}

const products: Product[] = [
  {
    id: "prod-1",
    reference: "PRD-001",
    designation: "Licence logicielle cybersécurité - Pack entreprise",
    categorie: "Logiciel",
    prixUnitaireHT: 12500,
    matchsHistoriques: 14,
  },
  {
    id: "prod-2",
    reference: "PRD-002",
    designation: "Serveur rack 2U haute disponibilité",
    categorie: "Matériel",
    prixUnitaireHT: 8900,
    matchsHistoriques: 9,
  },
  {
    id: "prod-3",
    reference: "PRD-003",
    designation: "Prestation audit sécurité informatique (jour)",
    categorie: "Service",
    prixUnitaireHT: 1200,
    matchsHistoriques: 22,
  },
  {
    id: "prod-4",
    reference: "PRD-004",
    designation: "Câblage réseau catégorie 6a (mètre linéaire)",
    categorie: "Matériel",
    prixUnitaireHT: 45,
    matchsHistoriques: 31,
  },
  {
    id: "prod-5",
    reference: "PRD-005",
    designation: "Formation cybersécurité - module avancé (session)",
    categorie: "Formation",
    prixUnitaireHT: 3500,
    matchsHistoriques: 7,
  },
  {
    id: "prod-6",
    reference: "PRD-006",
    designation: "Maintenance préventive système (forfait annuel)",
    categorie: "Service",
    prixUnitaireHT: 18000,
    matchsHistoriques: 12,
  },
  {
    id: "prod-7",
    reference: "PRD-007",
    designation: "Poste de travail sécurisé tout-en-un",
    categorie: "Matériel",
    prixUnitaireHT: 2150,
    matchsHistoriques: 18,
  },
  {
    id: "prod-8",
    reference: "PRD-008",
    designation: "Abonnement SOC managé (mensuel)",
    categorie: "Service",
    prixUnitaireHT: 4500,
    matchsHistoriques: 5,
  },
]

function formatPrix(prix: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(prix)
}

function categorieBadgeClass(cat: string) {
  switch (cat) {
    case "Logiciel":
      return "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300"
    case "Matériel":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
    case "Service":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
    case "Formation":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function ProductsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Référence</TableHead>
          <TableHead className="min-w-[250px]">Désignation</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead className="text-right">Prix unitaire HT</TableHead>
          <TableHead className="text-center">Matchs historiques</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((prod) => (
          <TableRow key={prod.id}>
            <TableCell className="font-mono text-xs">
              {prod.reference}
            </TableCell>
            <TableCell>{prod.designation}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={categorieBadgeClass(prod.categorie)}
              >
                {prod.categorie}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-medium tabular-nums">
              {formatPrix(prod.prixUnitaireHT)}
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="secondary">{prod.matchsHistoriques}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Dupliquer
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
