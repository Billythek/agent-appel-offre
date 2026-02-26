import { RadarChart } from "@/components/risques/radar-chart"
import { ScoreGlobal } from "@/components/risques/score-global"
import { VerdictBanner } from "@/components/risques/verdict-banner"
import { ClausesList } from "@/components/risques/clauses-list"
import { ScenarioSimulator } from "@/components/risques/scenario-simulator"

export default function RisquesPage() {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <VerdictBanner verdict="review" score={72} />
      <div className="grid gap-6 @xl/main:grid-cols-2">
        <RadarChart />
        <ScoreGlobal score={72} />
      </div>
      <ScenarioSimulator />
      <ClausesList />
    </div>
  )
}
