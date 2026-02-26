"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { decision: "go", count: 45, fill: "#28a745" },
  { decision: "review", count: 30, fill: "#ffc107" },
  { decision: "nogo", count: 25, fill: "#dc3545" },
]

const chartConfig = {
  count: {
    label: "Nombre",
  },
  go: {
    label: "Go",
    color: "#28a745",
  },
  review: {
    label: "Review",
    color: "#ffc107",
  },
  nogo: {
    label: "NoGo",
    color: "#dc3545",
  },
} satisfies ChartConfig

export function ChartDecisions() {
  const total = chartData.reduce((acc, item) => acc + item.count, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des décisions</CardTitle>
        <CardDescription>
          Distribution Go / Review / NoGo sur les consultations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="decision"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Décisions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="decision" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
