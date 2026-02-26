"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const sources = [
  { id: "boamp", label: "BOAMP" },
  { id: "ted", label: "TED" },
  { id: "joue", label: "JOUE" },
  { id: "marches-online", label: "Marchés Online" },
] as const

const secteurs = [
  { id: "informatique", label: "Informatique & Numérique" },
  { id: "btp", label: "BTP & Génie civil" },
  { id: "sante", label: "Santé & Médical" },
  { id: "transport", label: "Transport & Logistique" },
  { id: "energie", label: "Énergie & Environnement" },
  { id: "defense", label: "Défense & Sécurité" },
  { id: "education", label: "Éducation & Formation" },
  { id: "conseil", label: "Conseil & Ingénierie" },
] as const

const frequences = [
  { value: "temps-reel", label: "Temps réel" },
  { value: "quotidien", label: "Quotidien" },
  { value: "hebdomadaire", label: "Hebdomadaire" },
] as const

export function AlertRulesForm() {
  const [motsCles, setMotsCles] = useState("")
  const [montantMin, setMontantMin] = useState("")
  const [montantMax, setMontantMax] = useState("")
  const [selectedSources, setSelectedSources] = useState<string[]>([
    "boamp",
    "ted",
  ])
  const [selectedSecteurs, setSelectedSecteurs] = useState<string[]>([
    "informatique",
  ])
  const [frequence, setFrequence] = useState("quotidien")

  function toggleItem(list: string[], item: string) {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurer les alertes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mots-clés */}
        <div className="space-y-2">
          <Label htmlFor="mots-cles">Mots-clés</Label>
          <Input
            id="mots-cles"
            placeholder="cybersécurité, maintenance, développement..."
            value={motsCles}
            onChange={(e) => setMotsCles(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Séparez les mots-clés par des virgules.
          </p>
        </div>

        {/* Montants */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="montant-min">Montant minimum</Label>
            <div className="relative">
              <Input
                id="montant-min"
                type="number"
                placeholder="0"
                value={montantMin}
                onChange={(e) => setMontantMin(e.target.value)}
                className="pr-8"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                &euro;
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="montant-max">Montant maximum</Label>
            <div className="relative">
              <Input
                id="montant-max"
                type="number"
                placeholder="1 000 000"
                value={montantMax}
                onChange={(e) => setMontantMax(e.target.value)}
                className="pr-8"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                &euro;
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Sources */}
        <div className="space-y-3">
          <Label>Sources</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sources.map((source) => (
              <div key={source.id} className="flex items-center gap-2">
                <Checkbox
                  id={`source-${source.id}`}
                  checked={selectedSources.includes(source.id)}
                  onCheckedChange={() =>
                    setSelectedSources((prev) => toggleItem(prev, source.id))
                  }
                />
                <Label
                  htmlFor={`source-${source.id}`}
                  className="cursor-pointer font-normal"
                >
                  {source.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Secteurs */}
        <div className="space-y-3">
          <Label>Secteurs</Label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {secteurs.map((secteur) => (
              <div key={secteur.id} className="flex items-center gap-2">
                <Checkbox
                  id={`secteur-${secteur.id}`}
                  checked={selectedSecteurs.includes(secteur.id)}
                  onCheckedChange={() =>
                    setSelectedSecteurs((prev) =>
                      toggleItem(prev, secteur.id)
                    )
                  }
                />
                <Label
                  htmlFor={`secteur-${secteur.id}`}
                  className="cursor-pointer font-normal"
                >
                  {secteur.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Fréquence */}
        <div className="space-y-3">
          <Label>Fréquence des alertes</Label>
          <RadioGroup value={frequence} onValueChange={setFrequence}>
            {frequences.map((f) => (
              <div key={f.value} className="flex items-center gap-2">
                <RadioGroupItem value={f.value} id={`freq-${f.value}`} />
                <Label
                  htmlFor={`freq-${f.value}`}
                  className="cursor-pointer font-normal"
                >
                  {f.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        <Button className="w-full sm:w-auto">
          Enregistrer les alertes
        </Button>
      </CardContent>
    </Card>
  )
}
