import { ArchivesTable } from "@/components/bibliotheque/archives-table"
import { TemplatesGrid } from "@/components/bibliotheque/templates-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BibliothequePage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-semibold">Bibliothèque</h1>
        <p className="text-sm text-muted-foreground">
          Archives, templates et documents types
        </p>
      </div>
      <div className="px-4 lg:px-6">
        <Tabs defaultValue="archives">
          <TabsList>
            <TabsTrigger value="archives">Archives</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="archives" className="mt-4">
            <ArchivesTable />
          </TabsContent>
          <TabsContent value="templates" className="mt-4">
            <TemplatesGrid />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
