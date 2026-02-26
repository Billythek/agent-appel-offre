"use client"

import * as React from "react"
import { useState } from "react"
import { Bell, Bot, Clock, CheckCircle2, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { toasts } from "@/lib/toast-messages"

interface Notification {
  id: string
  type: "ia_complete" | "deadline" | "validation"
  title: string
  description: string
  time: string
  read: boolean
  link?: string
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "ia_complete",
    title: "Analyse terminee",
    description: "DCE-2025-001 — Parsing et extraction des exigences completes",
    time: "Il y a 5 min",
    read: false,
    link: "/consultations/dce-2025-001",
  },
  {
    id: "2",
    type: "deadline",
    title: "Echeance critique",
    description: "DCE-2025-003 — Date limite dans 48h",
    time: "Il y a 1h",
    read: false,
    link: "/consultations/dce-2025-003",
  },
  {
    id: "3",
    type: "validation",
    title: "Validation requise",
    description: "DCE-2025-002 — Matching pret pour validation HITL 1",
    time: "Il y a 2h",
    read: true,
    link: "/consultations/dce-2025-002/matching",
  },
  {
    id: "4",
    type: "ia_complete",
    title: "Documents generes",
    description: "DCE-2025-001 — DC1, DC2 et memoire technique prets",
    time: "Il y a 3h",
    read: true,
    link: "/consultations/dce-2025-001/documents",
  },
]

const iconMap = {
  ia_complete: Bot,
  deadline: Clock,
  validation: CheckCircle2,
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const unread = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success(toasts.allNotificationsRead)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-8">
          <Bell className="size-4" />
          {unread > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex size-4 items-center justify-center p-0 text-[10px]"
            >
              {unread}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            {unread > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={markAllAsRead}
              >
                <CheckCheck className="mr-1 size-3" />
                Tout marquer comme lu
              </Button>
            )}
          </div>
          <SheetDescription>
            {unread > 0
              ? `${unread} notification${unread > 1 ? "s" : ""} non lue${unread > 1 ? "s" : ""}`
              : "Tout est a jour"}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="flex flex-col gap-1 p-4">
            {notifications.map((notification, index) => {
              const Icon = iconMap[notification.type]
              return (
                <React.Fragment key={notification.id}>
                  <div
                    className={`flex gap-3 rounded-lg p-3 transition-colors hover:bg-accent cursor-pointer ${
                      !notification.read ? "bg-accent/50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 inline-block size-2 rounded-full bg-primary" />
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                        {notification.link && (
                          <a
                            href={notification.link}
                            className="text-xs text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Voir
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator />}
                </React.Fragment>
              )
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
