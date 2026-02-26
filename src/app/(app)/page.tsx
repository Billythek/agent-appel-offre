import { SectionCards } from "@/components/dashboard/section-cards"
import { ChartConsultations } from "@/components/dashboard/chart-consultations"
import { ChartDecisions } from "@/components/dashboard/chart-decisions"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="grid gap-4 px-4 lg:px-6 @xl/main:grid-cols-2">
        <ChartConsultations />
        <ChartDecisions />
      </div>
      <div className="px-4 lg:px-6">
        <RecentActivity />
      </div>
    </div>
  )
}
