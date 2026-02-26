import { OpportunitiesTable } from "@/components/opportunites/opportunities-table"

export default function OpportunitesPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h1 className="text-2xl font-semibold">Opportunités</h1>
          <p className="text-sm text-muted-foreground">
            Veille automatisée BOAMP / TED / JOUE
          </p>
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <OpportunitiesTable />
      </div>
    </div>
  )
}
