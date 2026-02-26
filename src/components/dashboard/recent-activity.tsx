"use client"

import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  FileText,
  Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    description: "Analyse IA terminée",
    reference: "DCE-2025-012",
    icon: Bot,
    time: "Il y a 5 min",
    color: "bg-blue-500",
    badgeVariant: "default" as const,
  },
  {
    id: 2,
    description: "Matching validé",
    reference: "DCE-2025-008",
    icon: CheckCircle2,
    time: "Il y a 1h",
    color: "bg-green-500",
    badgeVariant: "secondary" as const,
  },
  {
    id: 3,
    description: "Nouveau DCE importé",
    reference: "DCE-2025-015",
    icon: Upload,
    time: "Il y a 2h",
    color: "bg-purple-500",
    badgeVariant: "secondary" as const,
  },
  {
    id: 4,
    description: "Documents générés",
    reference: "DCE-2025-006",
    icon: FileText,
    time: "Il y a 3h",
    color: "bg-orange-500",
    badgeVariant: "secondary" as const,
  },
  {
    id: 5,
    description: "Décision Go/NoGo",
    reference: "DCE-2025-004",
    icon: AlertTriangle,
    time: "Il y a 5h",
    color: "bg-yellow-500",
    badgeVariant: "secondary" as const,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
        <CardDescription>
          Dernières actions effectuées sur la plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative flex gap-4 pb-6 last:pb-0">
              {/* Timeline line */}
              {index < activities.length - 1 && (
                <div className="absolute left-4 top-10 h-[calc(100%-16px)] w-px bg-border" />
              )}

              {/* Icon avatar */}
              <Avatar size="default" className="z-10 shrink-0">
                <AvatarFallback className={`${activity.color} text-white`}>
                  <activity.icon className="size-4" />
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-1 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {activity.description}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {activity.reference}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
