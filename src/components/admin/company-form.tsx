"use client"

import * as React from "react"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const secteurs = [
  "BTP & Construction",
  "Informatique & Digital",
  "Médical & Santé",
  "Défense & Sécurité",
  "Énergie & Environnement",
  "Transport & Logistique",
  "Formation & Éducation",
  "Services Généraux",
  "Conseil & Ingénierie",
  "Agroalimentaire",
]

export function CompanyForm() {
  const [raisonSociale, setRaisonSociale] = React.useState("TechBuild Solutions SAS")
  const [siret, setSiret] = React.useState("12345678901234")
  const [adresse, setAdresse] = React.useState(
    "15 rue de l'Innovation\n75008 Paris\nFrance"
  )
  const [secteur, setSecteur] = React.useState("BTP & Construction")
  const [certifications, setCertifications] = React.useState(
    "ISO 9001, ISO 14001, Qualibat RGE, MASE"
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil de l&apos;entreprise</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-6"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="raison-sociale">Raison sociale</Label>
            <Input
              id="raison-sociale"
              placeholder="Nom de l'entreprise"
              value={raisonSociale}
              onChange={(e) => setRaisonSociale(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="siret">SIRET</Label>
            <Input
              id="siret"
              placeholder="14 caractères"
              maxLength={14}
              value={siret}
              onChange={(e) => setSiret(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              Numéro SIRET à 14 chiffres
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="adresse">Adresse</Label>
            <Textarea
              id="adresse"
              placeholder="Adresse complète de l'entreprise"
              rows={3}
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="secteur">Secteur principal</Label>
            <Select value={secteur} onValueChange={setSecteur}>
              <SelectTrigger id="secteur" className="w-full">
                <SelectValue placeholder="Sélectionner un secteur" />
              </SelectTrigger>
              <SelectContent>
                {secteurs.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="certifications">Certifications</Label>
            <Input
              id="certifications"
              placeholder="ISO 9001, Qualibat, MASE..."
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              Séparez les certifications par des virgules
            </p>
          </div>

          <div className="grid gap-2">
            <Label>Logo de l&apos;entreprise</Label>
            <div className="border-input bg-background hover:bg-accent/50 flex flex-col items-center justify-center gap-2 rounded-md border border-dashed p-6 transition-colors cursor-pointer">
              <Upload className="text-muted-foreground size-8" />
              <p className="text-muted-foreground text-sm">
                Cliquez ou déposez votre logo ici
              </p>
              <p className="text-muted-foreground text-xs">
                PNG, JPG ou SVG (max. 2 Mo)
              </p>
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                className="sr-only"
              />
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            Enregistrer
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
