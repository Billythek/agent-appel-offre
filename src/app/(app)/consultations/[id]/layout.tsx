"use client"

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkflowStepper } from "@/components/workflow/workflow-stepper"

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const id = params.id as string
  const base = `/consultations/${id}`

  const currentTab =
    pathname === base
      ? "analyse"
      : pathname.includes("/matching")
        ? "matching"
        : pathname.includes("/risques")
          ? "risques"
          : pathname.includes("/documents")
            ? "documents"
            : "analyse"

  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-semibold">{id.toUpperCase()}</h1>
        <p className="text-sm text-muted-foreground">
          Dossier de consultation en cours de traitement
        </p>
      </div>

      <div className="px-4 lg:px-6">
        <WorkflowStepper currentStep={currentTab} />
      </div>

      <div className="px-4 lg:px-6">
        <Tabs value={currentTab}>
          <TabsList>
            <TabsTrigger value="analyse" asChild>
              <Link href={base}>Analyse DCE</Link>
            </TabsTrigger>
            <TabsTrigger value="matching" asChild>
              <Link href={`${base}/matching`}>Matching</Link>
            </TabsTrigger>
            <TabsTrigger value="risques" asChild>
              <Link href={`${base}/risques`}>Risques</Link>
            </TabsTrigger>
            <TabsTrigger value="documents" asChild>
              <Link href={`${base}/documents`}>Documents</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {children}
    </div>
  )
}
