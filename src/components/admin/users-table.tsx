"use client"

import * as React from "react"
import { MoreHorizontal, UserPlus, Pencil, Trash2, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Role = "Admin" | "Commercial" | "Juriste" | "Lecteur"
type Statut = "Actif" | "Inactif"

interface Utilisateur {
  id: string
  nom: string
  email: string
  role: Role
  statut: Statut
  derniereConnexion: string
}

const roleBadgeClasses: Record<Role, string> = {
  Admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Commercial: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Juriste: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Lecteur: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
}

const statutBadgeClasses: Record<Statut, string> = {
  Actif: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Inactif: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
}

const utilisateurs: Utilisateur[] = [
  {
    id: "1",
    nom: "Marie Dupont",
    email: "marie.dupont@techbuild.fr",
    role: "Admin",
    statut: "Actif",
    derniereConnexion: "26 fév. 2026, 09:15",
  },
  {
    id: "2",
    nom: "Pierre Martin",
    email: "pierre.martin@techbuild.fr",
    role: "Commercial",
    statut: "Actif",
    derniereConnexion: "25 fév. 2026, 17:42",
  },
  {
    id: "3",
    nom: "Sophie Leroy",
    email: "sophie.leroy@techbuild.fr",
    role: "Juriste",
    statut: "Actif",
    derniereConnexion: "26 fév. 2026, 08:30",
  },
  {
    id: "4",
    nom: "Jean Moreau",
    email: "jean.moreau@techbuild.fr",
    role: "Commercial",
    statut: "Inactif",
    derniereConnexion: "10 jan. 2026, 14:20",
  },
  {
    id: "5",
    nom: "Claire Bernard",
    email: "claire.bernard@techbuild.fr",
    role: "Lecteur",
    statut: "Actif",
    derniereConnexion: "24 fév. 2026, 11:05",
  },
]

export function UsersTable() {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Utilisateurs</h3>
          <p className="text-muted-foreground text-sm">
            {utilisateurs.length} utilisateurs enregistrés
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus />
              Inviter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inviter un utilisateur</DialogTitle>
              <DialogDescription>
                Envoyez une invitation par e-mail pour ajouter un nouvel
                utilisateur à l&apos;espace de travail.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="invite-nom">Nom complet</Label>
                <Input id="invite-nom" placeholder="Prénom Nom" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invite-email">Adresse e-mail</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="utilisateur@entreprise.fr"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invite-role">Rôle</Label>
                <Select defaultValue="Lecteur">
                  <SelectTrigger id="invite-role" className="w-full">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Juriste">Juriste</SelectItem>
                    <SelectItem value="Lecteur">Lecteur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                Envoyer l&apos;invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {utilisateurs.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.nom}</TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={roleBadgeClasses[user.role]}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statutBadgeClasses[user.statut]}
                  >
                    {user.statut}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.derniereConnexion}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShieldCheck />
                        Changer le rôle
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <Trash2 />
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
    </div>
  )
}
