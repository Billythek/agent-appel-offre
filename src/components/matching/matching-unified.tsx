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
import { Progress } from "@/components/ui/progress"
import { ScoreBadge } from "@/components/matching/score-badge"
import { cn } from "@/lib/utils"
import {
  Lightbulb,
  Package,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

// ─── Types ──────────────────────────────────────────────────────────────────

interface Produit {
  id: string
  nom: string
  reference: string
  fournisseur: string
  description: string
}

interface Exigence {
  id: string
  code: string
  titre: string
  description: string
  categorie: string
  produitMatchId: string | null
  score: number
  validee: boolean
}

interface Suggestion {
  id: string
  texte: string
  type: "manque" | "amelioration"
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const mockProduits: Produit[] = [
  {
    id: "prod-1",
    nom: "Serveur Dell PowerEdge R750",
    reference: "PE-R750-XS",
    fournisseur: "Dell Technologies",
    description:
      "Serveur rack 2U haute performance, processeur Intel Xeon Scalable 3e gen, 512 Go RAM, stockage NVMe.",
  },
  {
    id: "prod-2",
    nom: "Switch Cisco Catalyst 9300",
    reference: "C9300-48P-A",
    fournisseur: "Cisco Systems",
    description:
      "Switch réseau manageable 48 ports PoE+, empilable, support SD-Access et DNA Center.",
  },
  {
    id: "prod-3",
    nom: "Firewall Fortinet FortiGate 200F",
    reference: "FG-200F-BDL",
    fournisseur: "Fortinet",
    description:
      "Pare-feu nouvelle génération, débit 27 Gbps, IPS, antivirus, filtrage web, SD-WAN intégré.",
  },
  {
    id: "prod-4",
    nom: "Baie de stockage NetApp AFF A250",
    reference: "AFF-A250-SAS",
    fournisseur: "NetApp",
    description:
      "Baie de stockage 100% flash, déduplication inline, réplication SnapMirror, 50 To bruts.",
  },
]

const mockExigences: Exigence[] = [
  {
    id: "exig-1",
    code: "EX-001",
    titre: "Capacité de calcul haute performance",
    description:
      "Le serveur doit supporter au minimum 2 processeurs de dernière génération avec 256 Go de RAM extensible à 512 Go.",
    categorie: "Infrastructure",
    produitMatchId: "prod-1",
    score: 92,
    validee: true,
  },
  {
    id: "exig-2",
    code: "EX-002",
    titre: "Réseau haut débit avec PoE",
    description:
      "Équipement réseau supportant au minimum 48 ports Gigabit Ethernet avec alimentation PoE+ sur tous les ports.",
    categorie: "Réseau",
    produitMatchId: "prod-2",
    score: 85,
    validee: true,
  },
  {
    id: "exig-3",
    code: "EX-003",
    titre: "Protection périmétrique avancée",
    description:
      "Solution de sécurité réseau incluant IPS, antivirus, filtrage web et VPN SSL avec un débit minimum de 20 Gbps.",
    categorie: "Sécurité",
    produitMatchId: "prod-3",
    score: 78,
    validee: false,
  },
  {
    id: "exig-4",
    code: "EX-004",
    titre: "Stockage redondant haute disponibilité",
    description:
      "Baie de stockage avec réplication synchrone, déduplication native et capacité nette de 30 To minimum.",
    categorie: "Stockage",
    produitMatchId: "prod-4",
    score: 65,
    validee: false,
  },
  {
    id: "exig-5",
    code: "EX-005",
    titre: "Supervision centralisée SNMP",
    description:
      "Tous les équipements doivent être compatibles SNMP v3 et intégrables dans une plateforme de supervision centralisée.",
    categorie: "Supervision",
    produitMatchId: "prod-2",
    score: 45,
    validee: false,
  },
  {
    id: "exig-6",
    code: "EX-006",
    titre: "Garantie et support 24/7",
    description:
      "Support technique 24h/24, 7j/7 avec remplacement matériel sous 4h sur site pour tous les équipements critiques.",
    categorie: "Services",
    produitMatchId: null,
    score: 0,
    validee: false,
  },
]

const mockSuggestions: Suggestion[] = [
  {
    id: "sug-1",
    texte:
      "Aucun produit ne couvre l'exigence EX-006 (Garantie 24/7). Envisagez d'ajouter un contrat de maintenance Cisco SmartNet ou Dell ProSupport Plus.",
    type: "manque",
  },
  {
    id: "sug-2",
    texte:
      "Le score de matching sur l'exigence EX-005 (Supervision SNMP) est faible. Le switch Cisco C9300 supporte SNMP mais la couverture des autres équipements n'est pas assurée.",
    type: "amelioration",
  },
  {
    id: "sug-3",
    texte:
      "La protection périmétrique (EX-003) atteint 78% — vérifier la compatibilité VPN SSL avec le volume d'utilisateurs simultanés requis.",
    type: "amelioration",
  },
]

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
  onHover,
}: {
  exigence: Exigence
  isHighlighted: boolean
  onHover: (produitId: string | null) => void
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-all",
        isHighlighted
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "hover:border-primary/40"
      )}
      onMouseEnter={() => onHover(exigence.produitMatchId)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <Checkbox
            checked={exigence.validee}
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
              {exigence.description}
            </p>
          </div>
        </div>
        <div className="shrink-0">
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
        </div>
      </div>
      {exigence.produitMatchId && (
        <div className="mt-2 flex items-center gap-1 pl-6">
          <ArrowRight className="text-muted-foreground size-3" />
          <span className="text-muted-foreground text-xs">
            {mockProduits.find((p) => p.id === exigence.produitMatchId)?.nom}
          </span>
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
  produit: Produit
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
      {/* Exigences couvertes */}
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
}: {
  suggestions: Suggestion[]
}) {
  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="size-4 text-amber-500" />
          Suggestions IA — Lacunes détectées
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
        <Button variant="outline" size="sm" className="mt-2 w-full">
          <Sparkles className="mr-2 size-3" />
          Générer des recommandations détaillées
        </Button>
      </CardContent>
    </Card>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function MatchingUnified() {
  const [highlightedProduit, setHighlightedProduit] = useState<string | null>(
    null
  )

  const coveredCount = mockExigences.filter((e) => e.produitMatchId).length

  // Build product -> exigences map
  const produitExigencesMap = useMemo(() => {
    const map = new Map<string, Exigence[]>()
    for (const ex of mockExigences) {
      if (ex.produitMatchId) {
        const existing = map.get(ex.produitMatchId) ?? []
        existing.push(ex)
        map.set(ex.produitMatchId, existing)
      }
    }
    return map
  }, [])

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Coverage Gauge */}
      <CoverageGauge covered={coveredCount} total={mockExigences.length} />

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
                {mockExigences.length}
              </Badge>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 p-3">
                {mockExigences.map((exigence) => (
                  <ExigenceCard
                    key={exigence.id}
                    exigence={exigence}
                    isHighlighted={
                      highlightedProduit !== null &&
                      exigence.produitMatchId === highlightedProduit
                    }
                    onHover={setHighlightedProduit}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: Produits / Références */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <Package className="text-muted-foreground size-4" />
              <h3 className="text-sm font-semibold">
                Produits / Références
              </h3>
              <Badge variant="secondary" className="ml-auto">
                {mockProduits.length}
              </Badge>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 p-3">
                {mockProduits.map((produit) => (
                  <ProduitCard
                    key={produit.id}
                    produit={produit}
                    matchedExigences={
                      produitExigencesMap.get(produit.id) ?? []
                    }
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
      <SuggestionPanel suggestions={mockSuggestions} />
    </div>
  )
}
