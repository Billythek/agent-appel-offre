"use client"

import { MoreHorizontal, Eye, Download, XCircle } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Opportunity {
  id: string
  reference: string
  titre: string
  acheteur: string
  montant: number
  dateLimite: string
  score: number
}

const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    reference: "BOAMP-2026-0451",
    titre: "Maintenance des systèmes de vidéosurveillance - Ville de Lyon",
    acheteur: "Ville de Lyon",
    montant: 450000,
    dateLimite: "2026-03-15",
    score: 92,
  },
  {
    id: "opp-2",
    reference: "TED-2026-1287",
    titre: "Fourniture de matériel informatique pour les écoles",
    acheteur: "Région Île-de-France",
    montant: 1200000,
    dateLimite: "2026-03-22",
    score: 85,
  },
  {
    id: "opp-3",
    reference: "BOAMP-2026-0523",
    titre: "Prestations de nettoyage industriel - Site Airbus Toulouse",
    acheteur: "Airbus Defence & Space",
    montant: 320000,
    dateLimite: "2026-03-10",
    score: 78,
  },
  {
    id: "opp-4",
    reference: "JOUE-2026-0098",
    titre: "Conception et développement d\u2019une plateforme numérique santé",
    acheteur: "CHU de Bordeaux",
    montant: 890000,
    dateLimite: "2026-04-01",
    score: 71,
  },
  {
    id: "opp-5",
    reference: "MO-2026-0342",
    titre: "Travaux de réhabilitation énergétique de bâtiments communaux",
    acheteur: "Communauté d\u2019agglo. de Montpellier",
    montant: 2100000,
    dateLimite: "2026-03-28",
    score: 65,
  },
  {
    id: "opp-6",
    reference: "BOAMP-2026-0610",
    titre: "Mission d\u2019assistance à maîtrise d\u2019ouvrage - Transport urbain",
    acheteur: "Métropole de Nantes",
    montant: 550000,
    dateLimite: "2026-04-05",
    score: 58,
  },
  {
    id: "opp-7",
    reference: "TED-2026-1455",
    titre: "Fourniture et installation de bornes de recharge électrique",
    acheteur: "ENEDIS",
    montant: 780000,
    dateLimite: "2026-03-18",
    score: 47,
  },
  {
    id: "opp-8",
    reference: "BOAMP-2026-0789",
    titre: "Services de conseil en cybersécurité pour collectivités",
    acheteur: "Département du Rhône",
    montant: 260000,
    dateLimite: "2026-04-12",
    score: 34,
  },
]

function formatMontant(montant: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(montant)
}

function countdown(dateStr: string) {
  const target = new Date(dateStr)
  const now = new Date()
  const diff = Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (diff < 0) return "Expiré"
  if (diff === 0) return "Aujourd\u2019hui"
  if (diff === 1) return "Demain"
  return `${diff} jours`
}

function scoreColor(score: number) {
  if (score >= 75) return "[&>[data-slot=progress-indicator]]:bg-emerald-500"
  if (score >= 50) return "[&>[data-slot=progress-indicator]]:bg-amber-500"
  return "[&>[data-slot=progress-indicator]]:bg-red-500"
}

function countdownBadgeVariant(dateStr: string) {
  const target = new Date(dateStr)
  const now = new Date()
  const diff = Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (diff <= 3) return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
  if (diff <= 7) return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
  return "bg-muted text-muted-foreground"
}

function truncate(str: string, maxLen: number) {
  return str.length > maxLen ? str.slice(0, maxLen) + "\u2026" : str
}

export function OpportunitiesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Référence</TableHead>
          <TableHead className="min-w-[200px]">Titre</TableHead>
          <TableHead>Acheteur</TableHead>
          <TableHead className="text-right">Montant estimé</TableHead>
          <TableHead>Date limite</TableHead>
          <TableHead className="min-w-[140px]">Score pertinence</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {opportunities.map((opp) => (
          <TableRow key={opp.id}>
            <TableCell className="font-mono text-xs">{opp.reference}</TableCell>
            <TableCell
              className="max-w-[260px] truncate"
              title={opp.titre}
            >
              {truncate(opp.titre, 50)}
            </TableCell>
            <TableCell>{opp.acheteur}</TableCell>
            <TableCell className="text-right font-medium">
              {formatMontant(opp.montant)}
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={countdownBadgeVariant(opp.dateLimite)}
              >
                {countdown(opp.dateLimite)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress
                  value={opp.score}
                  className={`h-2 w-20 ${scoreColor(opp.score)}`}
                />
                <span className="text-xs font-medium tabular-nums">
                  {opp.score} %
                </span>
              </div>
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
                    Voir
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Importer
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    Ignorer
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
