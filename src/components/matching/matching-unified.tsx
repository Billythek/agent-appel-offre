"use client"

import { useMemo, useState } from "react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ScoreBadge } from "@/components/matching/score-badge"
import { ReassignDialog } from "@/components/matching/reassign-dialog"
import { AiIndicator } from "@/components/ui/ai-indicator"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { toasts } from "@/lib/toast-messages"
import { useConsultation } from "@/contexts/consultation-context"
import { simulateRecommendations } from "@/lib/simulate"
import {
  Lightbulb,
  Package,
  FileText,
  ArrowRight,
  Sparkles,
  X,
  RefreshCw,
  CheckCheck,
} from "lucide-react"
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import type { Exigence, Suggestion } from "@/lib/mock-data"

// ─── Coverage Gauge ─────────────────────────────────────────────────────────

const coverageChartConfig = {
  couverture: {
    label: "Couverture",
    color: "hsl(221.2 83.2% 53.3%)",
  },
} satisfies ChartConfig

function CoverageGauge({
  covered,
  total,
}: {
  covered: number
  total: number
}) {
  const pct = Math.round((covered / total) * 100)
  const data = [{ name: "Couverture", value: pct, fill: "hsl(221.2 83.2% 53.3%)" }]

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-muted/30 px-4 py-3">
      <ChartContainer
        config={coverageChartConfig}
        className="size-[72px] shrink-0"
      >
        <RadialBarChart
          data={data}
          startAngle={90}
          endAngle={90 - (pct / 100) * 360}
          innerRadius={26}
          outerRadius={36}
          barSize={8}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            background={{ fill: "hsl(var(--muted))" }}
          />
        </RadialBarChart>
      </ChartContainer>
      <div className="-ml-2">
        <p className="text-2xl font-bold tabular-nums">{pct}%</p>
        <p className="text-muted-foreground text-xs">
          d&apos;exigences couvertes ({covered}/{total})
        </p>
      </div>
    </div>
  )
}

// ─── Exigence Card ──────────────────────────────────────────────────────────

function ExigenceCard({
  exigence,
  isHighlighted,
  produitNom,
  onHover,
  onToggle,
  onReject,
  onReassign,
}: {
  exigence: Exigence
  isHighlighted: boolean
  produitNom: string | undefined
  onHover: (produitId: string | null) => void
  onToggle: () => void
  onReject: () => void
  onReassign: () => void
}) {
  const isValidated = exigence.validationStatus === "accepted" || exigence.validationStatus === "edited"

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-all",
        isHighlighted
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "hover:border-primary/40",
        isValidated && "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
        exigence.validationStatus === "rejected" && "border-red-400 bg-red-50/50 dark:bg-red-950/20 opacity-60"
      )}
      onMouseEnter={() => onHover(exigence.produitMatchId)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <Checkbox
            checked={isValidated}
            onCheckedChange={onToggle}
            className="mt-0.5"
            aria-label={`Valider l'exigence ${exigence.code}`}
          />
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="shrink-0 text-[10px]">
                {exigence.code}
              </Badge>
              <Badge variant="secondary" className="shrink-0 text-[10px]">
                {exigence.categorie}
              </Badge>
            </div>
            <p className="text-sm font-medium leading-snug">
              {exigence.titre}
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {exigence.editedDescription ?? exigence.description}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {exigence.produitMatchId ? (
            <ScoreBadge score={exigence.score} />
          ) : (
            <Badge
              variant="outline"
              className="border-dashed text-muted-foreground"
            >
              Non couvert
            </Badge>
          )}
          {exigence.produitMatchId && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-6"
                title="Reassigner"
                onClick={(e) => { e.stopPropagation(); onReassign() }}
              >
                <RefreshCw className="size-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 text-red-500 hover:text-red-600"
                title="Rejeter le match"
                onClick={(e) => { e.stopPropagation(); onReject() }}
              >
                <X className="size-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
      {produitNom && (
        <div className="mt-2 flex items-center gap-1 pl-6">
          <ArrowRight className="text-muted-foreground size-3" />
          <span className="text-muted-foreground text-xs">{produitNom}</span>
        </div>
      )}
    </div>
  )
}

// ─── Product Card ───────────────────────────────────────────────────────────

function ProduitCard({
  produit,
  matchedExigences,
  isHighlighted,
  onHover,
}: {
  produit: { id: string; nom: string; reference: string; fournisseur: string; description: string }
  matchedExigences: Exigence[]
  isHighlighted: boolean
  onHover: (produitId: string | null) => void
}) {
  const avgScore =
    matchedExigences.length > 0
      ? Math.round(
          matchedExigences.reduce((s, e) => s + e.score, 0) /
            matchedExigences.length
        )
      : 0

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-all",
        isHighlighted
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "hover:border-primary/40"
      )}
      onMouseEnter={() => onHover(produit.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <Package className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <div className="min-w-0 space-y-1">
            <p className="text-sm font-medium leading-snug">{produit.nom}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">
                {produit.reference}
              </Badge>
              <span className="text-muted-foreground text-xs">
                {produit.fournisseur}
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {produit.description}
            </p>
          </div>
        </div>
        <ScoreBadge score={avgScore} className="shrink-0" />
      </div>
      <div className="mt-3 space-y-1.5 pl-6">
        <p className="text-muted-foreground text-xs font-medium">
          Exigences couvertes ({matchedExigences.length})
        </p>
        {matchedExigences.map((ex) => (
          <div
            key={ex.id}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <span className="text-muted-foreground truncate">
              {ex.code} - {ex.titre}
            </span>
            <ScoreBadge score={ex.score} className="text-[10px]" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Suggestion Panel ───────────────────────────────────────────────────────

function SuggestionPanel({
  suggestions,
  onGenerate,
  isGenerating,
}: {
  suggestions: Suggestion[]
  onGenerate: () => void
  isGenerating: boolean
}) {
  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="size-4 text-amber-500" />
          Suggestions IA — Lacunes detectees
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestions.map((sug) => (
          <div
            key={sug.id}
            className="flex items-start gap-2 rounded-md border bg-muted/30 p-2.5"
          >
            <Lightbulb
              className={cn(
                "mt-0.5 size-4 shrink-0",
                sug.type === "manque"
                  ? "text-red-500"
                  : "text-amber-500"
              )}
            />
            <p className="text-xs leading-relaxed">{sug.texte}</p>
          </div>
        ))}
        {isGenerating ? (
          <AiIndicator label="Generation des recommandations..." className="mt-2 w-full justify-center" />
        ) : (
          <Button variant="outline" size="sm" className="mt-2 w-full" onClick={onGenerate}>
            <Sparkles className="mr-2 size-3" />
            Generer des recommandations detaillees
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function MatchingUnified() {
  const {
    exigences,
    produits,
    suggestions,
    validateMatch,
    rejectMatch,
    reassignMatch,
    validateAllMatches,
    setSuggestions,
  } = useConsultation()

  const [highlightedProduit, setHighlightedProduit] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reassignTarget, setReassignTarget] = useState<Exigence | null>(null)

  const coveredCount = exigences.filter((e) => e.produitMatchId).length
  const validatedCount = exigences.filter(
    (e) => e.validationStatus === "accepted" || e.validationStatus === "edited"
  ).length

  const produitExigencesMap = useMemo(() => {
    const map = new Map<string, Exigence[]>()
    for (const ex of exigences) {
      if (ex.produitMatchId) {
        const existing = map.get(ex.produitMatchId) ?? []
        existing.push(ex)
        map.set(ex.produitMatchId, existing)
      }
    }
    return map
  }, [exigences])

  const handleToggle = (exigenceId: string) => {
    validateMatch(exigenceId)
    toast.success(toasts.matchValidated)
  }

  const handleReject = (exigenceId: string) => {
    rejectMatch(exigenceId)
    toast.success(toasts.matchRejected)
  }

  const handleReassign = (exigenceId: string, produitId: string) => {
    reassignMatch(exigenceId, produitId)
    toast.success(toasts.matchReassigned)
  }

  const handleValidateAll = () => {
    validateAllMatches()
    toast.success(toasts.allMatchesValidated)
  }

  const handleGenerateRecommendations = async () => {
    setIsGenerating(true)
    const recs = await simulateRecommendations()
    setSuggestions(recs.map((r) => ({ ...r, id: r.id })))
    setIsGenerating(false)
    toast.success(toasts.recommendationsGenerated)
  }

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header batch */}
      <div className="flex items-center justify-between">
        <CoverageGauge covered={coveredCount} total={exigences.length} />
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {validatedCount}/{exigences.length} valides
          </span>
          <Button size="sm" onClick={handleValidateAll}>
            <CheckCheck className="mr-2 size-4" />
            Tout valider
          </Button>
        </div>
      </div>

      {/* Resizable 2-column layout */}
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-[500px] flex-1 rounded-lg border"
      >
        {/* Left: Exigences DCE */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <FileText className="text-muted-foreground size-4" />
              <h3 className="text-sm font-semibold">Exigences DCE</h3>
              <Badge variant="secondary" className="ml-auto">
                {exigences.length}
              </Badge>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 p-3">
                {exigences.map((exigence) => (
                  <ExigenceCard
                    key={exigence.id}
                    exigence={exigence}
                    isHighlighted={
                      highlightedProduit !== null &&
                      exigence.produitMatchId === highlightedProduit
                    }
                    produitNom={
                      exigence.produitMatchId
                        ? produits.find((p) => p.id === exigence.produitMatchId)?.nom
                        : undefined
                    }
                    onHover={setHighlightedProduit}
                    onToggle={() => handleToggle(exigence.id)}
                    onReject={() => handleReject(exigence.id)}
                    onReassign={() => setReassignTarget(exigence)}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: Produits */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <Package className="text-muted-foreground size-4" />
              <h3 className="text-sm font-semibold">Produits / References</h3>
              <Badge variant="secondary" className="ml-auto">
                {produits.length}
              </Badge>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 p-3">
                {produits.map((produit) => (
                  <ProduitCard
                    key={produit.id}
                    produit={produit}
                    matchedExigences={produitExigencesMap.get(produit.id) ?? []}
                    isHighlighted={highlightedProduit === produit.id}
                    onHover={setHighlightedProduit}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Suggestion Panel */}
      <SuggestionPanel
        suggestions={suggestions}
        onGenerate={handleGenerateRecommendations}
        isGenerating={isGenerating}
      />

      {/* Reassign Dialog */}
      <ReassignDialog
        open={!!reassignTarget}
        onOpenChange={(open) => !open && setReassignTarget(null)}
        exigenceCode={reassignTarget?.code ?? ""}
        produits={produits}
        currentProduitId={reassignTarget?.produitMatchId ?? null}
        onConfirm={(produitId) => {
          if (reassignTarget) {
            handleReassign(reassignTarget.id, produitId)
            setReassignTarget(null)
          }
        }}
      />
    </div>
  )
}
