import { CompanyForm } from "@/components/admin/company-form"
import { UsersTable } from "@/components/admin/users-table"
import { PacksGrid } from "@/components/admin/packs-grid"
import { AuditLog } from "@/components/admin/audit-log"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ParametresPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-semibold">Paramètres</h1>
        <p className="text-sm text-muted-foreground">
          Configuration de votre espace de travail
        </p>
      </div>
      <div className="px-4 lg:px-6">
        <Tabs defaultValue="entreprise">
          <TabsList>
            <TabsTrigger value="entreprise">Entreprise</TabsTrigger>
            <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
            <TabsTrigger value="packs">Packs sectoriels</TabsTrigger>
            <TabsTrigger value="audit">Journal d&apos;audit</TabsTrigger>
          </TabsList>
          <TabsContent value="entreprise" className="mt-4">
            <CompanyForm />
          </TabsContent>
          <TabsContent value="utilisateurs" className="mt-4">
            <UsersTable />
          </TabsContent>
          <TabsContent value="packs" className="mt-4">
            <PacksGrid />
          </TabsContent>
          <TabsContent value="audit" className="mt-4">
            <AuditLog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
