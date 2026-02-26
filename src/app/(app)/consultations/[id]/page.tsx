import { TocNavigator } from "@/components/consultations/toc-navigator"
import { ExigencesTable } from "@/components/consultations/exigences-table"

export default function AnalyseDcePage() {
  return (
    <div className="grid gap-4 px-4 lg:px-6 @xl/main:grid-cols-[280px_1fr]">
      <TocNavigator />
      <ExigencesTable />
    </div>
  )
}
