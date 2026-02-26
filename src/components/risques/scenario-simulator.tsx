"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calculator } from "lucide-react"

function computeScore(
  marge: number,
  sousTraitance: number,
  delai: number
): number {
  // Marge: optimale entre 10-20%, pénalité en dehors
  const margeScore =
    marge >= 10 && marge <= 20
      ? 100
      : marge < 10
        ? marge * 10
        : Math.max(0, 100 - (marge - 20) * 3)

  // Sous-traitance: plus c'est bas, mieux c'est (risque de dépendance)
  const sousTraitanceScore = Math.max(0, 100 - sousTraitance * 1.2)

  // Délai: optimal autour de 60-90 jours
  const delaiScore =
    delai >= 60 && delai <= 90
      ? 100
      : delai < 60
        ? Math.max(0, 50 + (delai / 60) * 50)
        : Math.max(0, 100 - ((delai - 90) / 90) * 60)

  // Pondération
  return Math.round(margeScore * 0.4 + sousTraitanceScore * 0.3 + delaiScore * 0.3)
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400"
  if (score >= 50) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

function getScoreBadgeClass(score: number) {
  if (score >= 80)
    return "bg-emerald-500/15 text-emerald-700 border-emerald-500/25 dark:text-emerald-400"
  if (score >= 50)
    return "bg-amber-500/15 text-amber-700 border-amber-500/25 dark:text-amber-400"
  return "bg-red-500/15 text-red-700 border-red-500/25 dark:text-red-400"
}

function getVerdict(score: number) {
  if (score >= 80) return "GO"
  if (score >= 50) return "REVUE"
  return "NO-GO"
}

export function ScenarioSimulator() {
  const [marge, setMarge] = useState(15)
  const [sousTraitance, setSousTraitance] = useState(30)
  const [delai, setDelai] = useState(90)

  const score = useMemo(
    () => computeScore(marge, sousTraitance, delai),
    [marge, sousTraitance, delai]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="size-5" />
          Simulateur de scénarios
        </CardTitle>
        <CardDescription>
          Ajustez les paramètres pour évaluer l&apos;impact sur le score global
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Slider: Marge commerciale */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="marge">Marge commerciale</Label>
            <span className="text-sm font-semibold tabular-nums">
              {marge}%
            </span>
          </div>
          <Slider
            id="marge"
            min={0}
            max={30}
            step={1}
            value={[marge]}
            onValueChange={(v) => setMarge(v[0])}
          />
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Slider: Part sous-traitance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="sous-traitance">Part sous-traitance</Label>
            <span className="text-sm font-semibold tabular-nums">
              {sousTraitance}%
            </span>
          </div>
          <Slider
            id="sous-traitance"
            min={0}
            max={100}
            step={1}
            value={[sousTraitance]}
            onValueChange={(v) => setSousTraitance(v[0])}
          />
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Slider: Délai livraison */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="delai">Délai livraison (jours)</Label>
            <span className="text-sm font-semibold tabular-nums">
              {delai} j
            </span>
          </div>
          <Slider
            id="delai"
            min={0}
            max={180}
            step={1}
            value={[delai]}
            onValueChange={(v) => setDelai(v[0])}
          />
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>0 j</span>
            <span>180 j</span>
          </div>
        </div>

        {/* Score en direct */}
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Score estimé</p>
              <p className="text-muted-foreground text-xs">
                Basé sur les paramètres actuels
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-3xl font-bold tabular-nums",
                  getScoreColor(score)
                )}
              >
                {score}
              </span>
              <Badge
                variant="outline"
                className={cn("text-xs font-bold", getScoreBadgeClass(score))}
              >
                {getVerdict(score)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
