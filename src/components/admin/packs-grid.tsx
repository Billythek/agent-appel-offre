"use client"

import * as React from "react"
import {
  HardHat,
  Monitor,
  Stethoscope,
  Shield,
  Zap,
  Truck,
  GraduationCap,
  Briefcase,
  type LucideIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface PackSectoriel {
  id: string
  nom: string
  description: string
  icon: LucideIcon
  actif: boolean
}

const packsInitiaux: PackSectoriel[] = [
  {
    id: "btp",
    nom: "BTP & Construction",
    description:
      "Marchés de travaux, voirie, bâtiment, génie civil et rénovation énergétique.",
    icon: HardHat,
    actif: true,
  },
  {
    id: "it",
    nom: "Informatique & Digital",
    description:
      "Développement logiciel, infogérance, cybersécurité et transformation digitale.",
    icon: Monitor,
    actif: true,
  },
  {
    id: "medical",
    nom: "Médical & Santé",
    description:
      "Équipements médicaux, fournitures hospitalières, services de santé et biotechnologies.",
    icon: Stethoscope,
    actif: false,
  },
  {
    id: "defense",
    nom: "Défense & Sécurité",
    description:
      "Marchés de défense, sécurité civile, équipements de protection et surveillance.",
    icon: Shield,
    actif: false,
  },
  {
    id: "energie",
    nom: "Énergie & Environnement",
    description:
      "Énergies renouvelables, gestion des déchets, eau et assainissement.",
    icon: Zap,
    actif: true,
  },
  {
    id: "transport",
    nom: "Transport & Logistique",
    description:
      "Transport de personnes et de marchandises, logistique et supply chain.",
    icon: Truck,
    actif: false,
  },
  {
    id: "education",
    nom: "Formation & Éducation",
    description:
      "Formation professionnelle, éducation, e-learning et conseil pédagogique.",
    icon: GraduationCap,
    actif: false,
  },
  {
    id: "general",
    nom: "Services Généraux",
    description:
      "Nettoyage, restauration collective, maintenance, gardiennage et facilities.",
    icon: Briefcase,
    actif: true,
  },
]

export function PacksGrid() {
  const [packs, setPacks] = React.useState<PackSectoriel[]>(packsInitiaux)

  function togglePack(id: string) {
    setPacks((prev) =>
      prev.map((pack) =>
        pack.id === id ? { ...pack, actif: !pack.actif } : pack
      )
    )
  }

  const packsActifs = packs.filter((p) => p.actif).length

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Packs sectoriels</h3>
        <p className="text-muted-foreground text-sm">
          {packsActifs} pack{packsActifs > 1 ? "s" : ""} actif
          {packsActifs > 1 ? "s" : ""} sur {packs.length}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {packs.map((pack) => {
          const Icon = pack.icon
          return (
            <Card
              key={pack.id}
              className={
                pack.actif
                  ? "border-primary/30 bg-primary/5"
                  : "opacity-75"
              }
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${
                      pack.actif
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`pack-${pack.id}`}
                      checked={pack.actif}
                      onCheckedChange={() => togglePack(pack.id)}
                    />
                    <Label htmlFor={`pack-${pack.id}`} className="sr-only">
                      Activer {pack.nom}
                    </Label>
                  </div>
                </div>
                <CardTitle className="text-base">{pack.nom}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{pack.description}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
