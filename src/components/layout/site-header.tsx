"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { NotificationCenter } from "@/components/layout/notification-center"

const routeLabels: Record<string, string> = {
  "": "Dashboard",
  consultations: "Consultations",
  catalogue: "Catalogue",
  opportunites: "Opportunités",
  bibliotheque: "Bibliothèque",
  parametres: "Paramètres",
  matching: "Matching",
  risques: "Analyse Risques",
  documents: "Documents",
  alertes: "Alertes",
}

function useBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) {
    return [{ label: "Dashboard", href: "/", current: true }]
  }

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label =
      routeLabels[segment] || (segment.startsWith("dce-") || segment.startsWith("DCE-")
        ? segment.toUpperCase()
        : segment.charAt(0).toUpperCase() + segment.slice(1))
    const current = index === segments.length - 1
    return { label, href, current }
  })

  return crumbs
}

const ctaByRoute: Record<string, { label: string; href: string }> = {
  "/consultations": { label: "Nouveau DCE", href: "#" },
  "/catalogue": { label: "Importer", href: "#" },
  "/opportunites": { label: "Configurer alertes", href: "/opportunites/alertes" },
}

export function SiteHeader() {
  const pathname = usePathname()
  const breadcrumbs = useBreadcrumbs()
  const cta = ctaByRoute[pathname]

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.href}>
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.current ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-2">
          {cta && (
            <Button size="sm" asChild>
              <Link href={cta.href}>
                <Plus className="mr-1 size-4" />
                {cta.label}
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true })
              )
            }}
          >
            <Search className="size-4" />
            <span className="sr-only">Rechercher (Ctrl+K)</span>
          </Button>

          <NotificationCenter />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
