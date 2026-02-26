"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { mois: "Jan", consultations: 8 },
  { mois: "Fév", consultations: 12 },
  { mois: "Mar", consultations: 15 },
  { mois: "Avr", consultations: 11 },
  { mois: "Mai", consultations: 18 },
  { mois: "Jun", consultations: 22 },
]

const chartConfig = {
  consultations: {
    label: "Consultations",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartConsultations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution des consultations</CardTitle>
        <CardDescription>
          Nombre de consultations par mois sur les 6 derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mois"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
              <linearGradient id="fillConsultations" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-consultations)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-consultations)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="consultations"
              type="natural"
              fill="url(#fillConsultations)"
              stroke="var(--color-consultations)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
