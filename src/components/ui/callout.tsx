import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react"

const variants = {
  info: {
    container: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950",
    icon: Info,
    iconClass: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    container: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950",
    icon: AlertTriangle,
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  success: {
    container: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950",
    icon: CheckCircle2,
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
  error: {
    container: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950",
    icon: XCircle,
    iconClass: "text-red-600 dark:text-red-400",
  },
}

interface CalloutProps {
  variant?: keyof typeof variants
  title?: string
  children: React.ReactNode
  className?: string
}

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const { container, icon: Icon, iconClass } = variants[variant]

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        container,
        className
      )}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", iconClass)} />
      <div className="flex-1">
        {title && (
          <p className="mb-1 text-sm font-medium">{title}</p>
        )}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}
