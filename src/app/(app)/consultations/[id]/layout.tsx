"use client"

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { WorkflowStepper } from "@/components/workflow/workflow-stepper"
import { ConsultationProvider, useConsultation } from "@/contexts/consultation-context"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

function ConsultationLayoutInner({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const pathname = usePathname()
  const id = params.id as string
  const base = `/consultations/${id}`

  const { hitl1Validated, currentWorkflowStep } = useConsultation()

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

  const isDocumentsLocked = !hitl1Validated

  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-semibold">{id.toUpperCase()}</h1>
        <p className="text-sm text-muted-foreground">
          Dossier de consultation en cours de traitement
        </p>
      </div>

      <div className="px-4 lg:px-6">
        <WorkflowStepper
          currentStep={currentWorkflowStep}
          hitl1Validated={hitl1Validated}
        />
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
            {isDocumentsLocked ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium",
                      "opacity-50 cursor-not-allowed text-muted-foreground"
                    )}
                  >
                    <Lock className="size-3" />
                    Documents
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  Validez d&apos;abord l&apos;analyse et le matching (HITL 1)
                </TooltipContent>
              </Tooltip>
            ) : (
              <TabsTrigger value="documents" asChild>
                <Link href={`${base}/documents`}>Documents</Link>
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </div>

      {children}
    </div>
  )
}

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConsultationProvider>
      <ConsultationLayoutInner>{children}</ConsultationLayoutInner>
    </ConsultationProvider>
  )
}
