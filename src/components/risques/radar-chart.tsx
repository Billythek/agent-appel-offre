"use client"

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

const mockData = [
  { dimension: "Financier", score: 75 },
  { dimension: "Technique", score: 82 },
  { dimension: "Juridique", score: 60 },
  { dimension: "Délai", score: 45 },
  { dimension: "Concurrence", score: 70 },
]

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(221.2 83.2% 53.3%)",
  },
} satisfies ChartConfig

export function RadarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyse multi-dimensionnelle</CardTitle>
        <CardDescription>
          Évaluation des risques sur 5 axes stratégiques
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[300px] w-full"
        >
          <RechartsRadarChart data={mockData}>
            <PolarGrid
              gridType="polygon"
              stroke="hsl(var(--border))"
            />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{
                fill: "hsl(var(--foreground))",
                fontSize: 12,
              }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="var(--color-score)"
              fill="var(--color-score)"
              fillOpacity={0.25}
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "var(--color-score)",
                strokeWidth: 0,
              }}
            />
          </RechartsRadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
