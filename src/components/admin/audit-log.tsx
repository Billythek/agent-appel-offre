"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type ActionType =
  | "Connexion"
  | "Validation"
  | "Modification"
  | "Suppression"
  | "Export"

interface EntreeJournal {
  id: string
  dateHeure: string
  utilisateur: string
  action: ActionType
  details: string
}

const actionBadgeClasses: Record<ActionType, string> = {
  Connexion:
    "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  Validation:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Modification:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Suppression:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Export:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
}

const journalEntrees: EntreeJournal[] = [
  {
    id: "1",
    dateHeure: "26 fév. 2026, 09:15",
    utilisateur: "Marie Dupont",
    action: "Connexion",
    details: "Connexion depuis 192.168.1.42 (Chrome / Windows)",
  },
  {
    id: "2",
    dateHeure: "26 fév. 2026, 09:22",
    utilisateur: "Marie Dupont",
    action: "Validation",
    details:
      "Validation du dossier AO-2026-0142 - Mairie de Lyon, lot voirie",
  },
  {
    id: "3",
    dateHeure: "25 fév. 2026, 17:45",
    utilisateur: "Pierre Martin",
    action: "Modification",
    details:
      "Mise à jour du mémoire technique - Consultation CHU Bordeaux",
  },
  {
    id: "4",
    dateHeure: "25 fév. 2026, 16:30",
    utilisateur: "Sophie Leroy",
    action: "Export",
    details:
      "Export PDF du dossier complet AO-2026-0138 - Région Occitanie",
  },
  {
    id: "5",
    dateHeure: "25 fév. 2026, 14:10",
    utilisateur: "Pierre Martin",
    action: "Connexion",
    details: "Connexion depuis 10.0.0.15 (Firefox / macOS)",
  },
  {
    id: "6",
    dateHeure: "25 fév. 2026, 11:55",
    utilisateur: "Marie Dupont",
    action: "Suppression",
    details:
      "Suppression du brouillon AO-2026-0135 - Consultation test interne",
  },
  {
    id: "7",
    dateHeure: "24 fév. 2026, 15:20",
    utilisateur: "Claire Bernard",
    action: "Connexion",
    details: "Connexion depuis 172.16.0.8 (Safari / iOS)",
  },
  {
    id: "8",
    dateHeure: "24 fév. 2026, 10:05",
    utilisateur: "Sophie Leroy",
    action: "Validation",
    details:
      "Validation juridique du CCAP - AO-2026-0140 - SNCF Réseau",
  },
]

export function AuditLog() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Journal d&apos;audit</h3>
        <p className="text-muted-foreground text-sm">
          Historique des actions effectuées sur la plateforme
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date / heure</TableHead>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Détails</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journalEntrees.map((entree) => (
              <TableRow key={entree.id}>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {entree.dateHeure}
                </TableCell>
                <TableCell className="font-medium whitespace-nowrap">
                  {entree.utilisateur}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={actionBadgeClasses[entree.action]}
                  >
                    {entree.action}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[400px] truncate">
                  {entree.details}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
