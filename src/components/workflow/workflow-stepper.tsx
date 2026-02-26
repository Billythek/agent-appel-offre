"use client"

import { motion } from "framer-motion"
import {
  Upload,
  FileSearch,
  GitCompareArrows,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Shield,
  Lock,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  label: string
  icon: React.ElementType
  isHitl?: boolean
  hitlLabel?: string
}

const steps: Step[] = [
  {
    id: "upload",
    label: "Upload & Parsing",
    icon: Upload,
  },
  {
    id: "analyse",
    label: "Analyse DCE",
    icon: FileSearch,
  },
  {
    id: "matching",
    label: "Matching",
    icon: GitCompareArrows,
    isHitl: true,
    hitlLabel: "HITL 1",
  },
  {
    id: "risques",
    label: "Risques",
    icon: AlertTriangle,
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
  },
  {
    id: "validation",
    label: "Validation finale",
    icon: CheckCircle2,
    isHitl: true,
    hitlLabel: "HITL 2",
  },
]

type StepStatus = "completed" | "active" | "upcoming" | "locked"

function getStepStatus(
  stepId: string,
  currentStep: string,
  hitl1Validated: boolean
): StepStatus {
  const stepIds = steps.map((s) => s.id)
  const currentIndex = stepIds.indexOf(currentStep)
  const stepIndex = stepIds.indexOf(stepId)

  // L'onglet Documents est verrouille si HITL1 pas valide
  if (stepId === "documents" && !hitl1Validated && currentStep !== "documents" && currentStep !== "validation") {
    return "locked"
  }
  if (stepId === "validation" && !hitl1Validated) {
    return "locked"
  }

  if (stepIndex < currentIndex) return "completed"
  if (stepIndex === currentIndex) return "active"
  return "upcoming"
}

interface WorkflowStepperProps {
  currentStep: string
  hitl1Validated?: boolean
}

export function WorkflowStepper({ currentStep, hitl1Validated = false }: WorkflowStepperProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-[640px] items-center justify-between px-4 py-6">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id, currentStep, hitl1Validated)
          const Icon = step.icon

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step circle + label */}
              <div className="relative flex flex-col items-center gap-2">
                {/* HITL badge */}
                {step.isHitl && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "absolute -top-7 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      status === "completed"
                        ? "bg-primary/10 text-primary"
                        : status === "active"
                          ? "bg-primary/15 text-primary animate-pulse"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Shield className="size-3" />
                    {step.hitlLabel}
                  </motion.div>
                )}

                {/* Circle */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
                  className={cn(
                    "relative flex size-10 items-center justify-center rounded-full border-2 transition-colors",
                    status === "completed" &&
                      "border-primary bg-primary text-primary-foreground",
                    status === "active" &&
                      "border-primary bg-background text-primary ring-4 ring-primary/20",
                    status === "upcoming" &&
                      "border-muted bg-muted text-muted-foreground",
                    status === "locked" &&
                      "border-muted bg-muted/50 text-muted-foreground/50"
                  )}
                >
                  {status === "completed" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, delay: index * 0.08 + 0.1 }}
                    >
                      <CheckCircle2 className="size-5" />
                    </motion.div>
                  ) : status === "locked" ? (
                    <Lock className="size-4" />
                  ) : (
                    <Icon className="size-5" />
                  )}

                  {/* Active pulse */}
                  {status === "active" && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.4, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.08 + 0.15 }}
                  className={cn(
                    "text-center text-xs font-medium whitespace-nowrap",
                    status === "completed" && "text-primary",
                    status === "active" && "text-primary font-semibold",
                    status === "upcoming" && "text-muted-foreground",
                    status === "locked" && "text-muted-foreground/50"
                  )}
                >
                  {step.label}
                </motion.span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="relative mx-2 h-0.5 flex-1">
                  <div className="bg-muted absolute inset-0 rounded-full" />
                  {status === "completed" && (
                    <motion.div
                      className="bg-primary absolute inset-0 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
