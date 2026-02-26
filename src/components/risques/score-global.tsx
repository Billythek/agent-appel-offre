"use client"

import { useMemo } from "react"
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

interface ScoreGlobalProps {
  score: number
}

const chartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ScoreGlobal({ score }: ScoreGlobalProps) {
  const scoreColor = useMemo(() => {
    if (score >= 80) return "#10b981"
    if (score >= 50) return "#f59e0b"
    return "#ef4444"
  }, [score])

  const data = [{ name: "Score", value: score, fill: scoreColor }]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score global</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px] w-[200px]"
        >
          <RadialBarChart
            data={data}
            startAngle={90}
            endAngle={90 - (score / 100) * 360}
            innerRadius={70}
            outerRadius={100}
            barSize={20}
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
        <div className="-mt-28 flex flex-col items-center gap-1">
          <span
            className="text-5xl font-bold tabular-nums"
            style={{ color: scoreColor }}
          >
            {score}
          </span>
          <span className="text-muted-foreground text-sm">sur 100</span>
        </div>
      </CardContent>
    </Card>
  )
}
