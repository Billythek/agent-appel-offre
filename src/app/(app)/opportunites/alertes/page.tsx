import { AlertRulesForm } from "@/components/opportunites/alert-rules-form"

export default function AlertesPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-semibold">Configuration des alertes</h1>
        <p className="text-sm text-muted-foreground">
          Définissez vos critères de veille automatisée
        </p>
      </div>
      <div className="px-4 lg:px-6">
        <AlertRulesForm />
      </div>
    </div>
  )
}
