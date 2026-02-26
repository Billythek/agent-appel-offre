"use client"

import { MoreHorizontal, Eye, Download } from "lucide-react"
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

interface Archive {
  id: string
  reference: string
  titre: string
  dateSoumission: string
  resultat: "Go" | "NoGo"
  score: number
}

const archives: Archive[] = [
  {
    id: "arch-1",
    reference: "AO-2025-0412",
    titre: "Maintenance réseau informatique - Mairie de Toulouse",
    dateSoumission: "2025-11-15",
    resultat: "Go",
    score: 88,
  },
  {
    id: "arch-2",
    reference: "AO-2025-0387",
    titre: "Déploiement fibre optique - Département de l\u2019Hérault",
    dateSoumission: "2025-10-02",
    resultat: "Go",
    score: 76,
  },
  {
    id: "arch-3",
    reference: "AO-2025-0355",
    titre: "Fourniture matériel bureautique - Rectorat de Lille",
    dateSoumission: "2025-09-18",
    resultat: "NoGo",
    score: 42,
  },
  {
    id: "arch-4",
    reference: "AO-2025-0298",
    titre: "Audit sécurité SI - CHU de Strasbourg",
    dateSoumission: "2025-08-05",
    resultat: "Go",
    score: 91,
  },
  {
    id: "arch-5",
    reference: "AO-2025-0264",
    titre: "Développement portail citoyen - Communauté urbaine de Dunkerque",
    dateSoumission: "2025-07-22",
    resultat: "NoGo",
    score: 38,
  },
]

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr))
}

function resultatBadgeClass(resultat: "Go" | "NoGo") {
  if (resultat === "Go") {
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
  }
  return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
}

export function ArchivesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Référence</TableHead>
          <TableHead className="min-w-[250px]">Titre consultation</TableHead>
          <TableHead>Date soumission</TableHead>
          <TableHead>Résultat</TableHead>
          <TableHead className="text-right">Score</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {archives.map((arch) => (
          <TableRow key={arch.id}>
            <TableCell className="font-mono text-xs">
              {arch.reference}
            </TableCell>
            <TableCell>{arch.titre}</TableCell>
            <TableCell className="text-sm">
              {formatDate(arch.dateSoumission)}
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={resultatBadgeClass(arch.resultat)}
              >
                {arch.resultat}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-medium tabular-nums">
              {arch.score} %
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
                    <Eye className="mr-2 h-4 w-4" />
                    Consulter
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
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
