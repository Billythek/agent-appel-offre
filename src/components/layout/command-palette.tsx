"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  FolderOpen,
  LayoutDashboard,
  Package,
  Search,
  Archive,
  Settings,
  FileText,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const pages = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Consultations", icon: FolderOpen, href: "/consultations" },
  { name: "Catalogue produits", icon: Package, href: "/catalogue" },
  { name: "Opportunités", icon: Search, href: "/opportunites" },
  { name: "Bibliothèque", icon: Archive, href: "/bibliotheque" },
  { name: "Paramètres", icon: Settings, href: "/parametres" },
]

const recentDce = [
  { name: "DCE-2025-001 — Fourniture matériel informatique", href: "/consultations/dce-2025-001" },
  { name: "DCE-2025-002 — Maintenance bâtiments", href: "/consultations/dce-2025-002" },
  { name: "DCE-2025-003 — Services de conseil", href: "/consultations/dce-2025-003" },
]

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false)
      command()
    },
    []
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Rechercher un DCE, produit, exigence..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.href}
              onSelect={() => runCommand(() => router.push(page.href))}
            >
              <page.icon className="mr-2 size-4" />
              {page.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Consultations récentes">
          {recentDce.map((dce) => (
            <CommandItem
              key={dce.href}
              onSelect={() => runCommand(() => router.push(dce.href))}
            >
              <FileText className="mr-2 size-4" />
              {dce.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
