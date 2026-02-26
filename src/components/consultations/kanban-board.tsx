"use client"

import { useState, useCallback } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { KanbanCard, type KanbanCardData } from "./kanban-card"

// -------------------------------------------------------------------
// Configuration des colonnes
// -------------------------------------------------------------------

interface ColumnConfig {
  id: string
  title: string
  color: string
  dotColor: string
}

const columns: ColumnConfig[] = [
  {
    id: "nouveau",
    title: "Nouveau",
    color: "bg-slate-50 dark:bg-slate-900/50",
    dotColor: "bg-slate-500",
  },
  {
    id: "analyse",
    title: "Analyse IA",
    color: "bg-blue-50 dark:bg-blue-950/30",
    dotColor: "bg-blue-500",
  },
  {
    id: "validation",
    title: "Validation",
    color: "bg-amber-50 dark:bg-amber-950/30",
    dotColor: "bg-amber-500",
  },
  {
    id: "generation",
    title: "Generation",
    color: "bg-purple-50 dark:bg-purple-950/30",
    dotColor: "bg-purple-500",
  },
  {
    id: "soumis",
    title: "Soumis",
    color: "bg-green-50 dark:bg-green-950/30",
    dotColor: "bg-green-500",
  },
]

// -------------------------------------------------------------------
// Donnees de demonstration
// -------------------------------------------------------------------

const initialCards: Record<string, KanbanCardData[]> = {
  nouveau: [
    {
      id: "card-1",
      reference: "DCE-2025-001",
      title: "Fourniture et maintenance de postes informatiques pour la Mairie de Lyon",
      buyer: "Mairie de Lyon",
      deadline: "2026-03-15",
      status: "nouveau",
      score: 0,
    },
    {
      id: "card-2",
      reference: "DCE-2025-002",
      title: "Refonte du systeme d'information RH — Region Ile-de-France",
      buyer: "Region Ile-de-France",
      deadline: "2026-03-22",
      status: "nouveau",
      score: 0,
    },
  ],
  analyse: [
    {
      id: "card-3",
      reference: "DCE-2025-003",
      title: "Deploiement reseau fibre optique — Campus universitaire de Bordeaux",
      buyer: "Universite de Bordeaux",
      deadline: "2026-03-10",
      status: "analyse",
      score: 65,
    },
    {
      id: "card-4",
      reference: "DCE-2025-004",
      title: "Solution de cybersecurite pour le CHU de Toulouse",
      buyer: "CHU Toulouse",
      deadline: "2026-03-28",
      status: "analyse",
      score: 32,
    },
  ],
  validation: [
    {
      id: "card-5",
      reference: "DCE-2025-005",
      title: "Migration cloud et hebergement SecNumCloud — Ministere de l'Interieur",
      buyer: "Ministere de l'Interieur",
      deadline: "2026-04-05",
      status: "validation",
      score: 88,
    },
    {
      id: "card-6",
      reference: "DCE-2025-006",
      title: "Plateforme de gestion documentaire pour le Conseil Departemental du Rhone",
      buyer: "CD du Rhone",
      deadline: "2026-03-08",
      status: "validation",
      score: 75,
    },
  ],
  generation: [
    {
      id: "card-7",
      reference: "DCE-2025-007",
      title: "Audit et conseil en transformation numerique — EPCI Grand Paris",
      buyer: "EPCI Grand Paris",
      deadline: "2026-04-12",
      status: "generation",
      score: 92,
    },
  ],
  soumis: [
    {
      id: "card-8",
      reference: "DCE-2025-008",
      title: "Fourniture de licences logicielles et support — CNRS",
      buyer: "CNRS",
      deadline: "2026-02-28",
      status: "soumis",
      score: 95,
    },
    {
      id: "card-9",
      reference: "DCE-2025-009",
      title: "Maintenance applicative TMA pour l'URSSAF Nationale",
      buyer: "URSSAF",
      deadline: "2026-03-01",
      status: "soumis",
      score: 87,
    },
  ],
}

// -------------------------------------------------------------------
// Composant carte triable
// -------------------------------------------------------------------

function SortableCard({ card }: { card: KanbanCardData }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <KanbanCard card={card} isDragging={isDragging} />
    </div>
  )
}

// -------------------------------------------------------------------
// Composant colonne
// -------------------------------------------------------------------

function KanbanColumn({
  config,
  cards,
}: {
  config: ColumnConfig
  cards: KanbanCardData[]
}) {
  const { setNodeRef, isOver } = useDroppable({ id: config.id })

  return (
    <div
      className={cn(
        "flex h-full w-[280px] shrink-0 flex-col rounded-lg border",
        config.color,
        isOver && "ring-2 ring-primary/30"
      )}
    >
      {/* En-tete de colonne */}
      <div className="flex items-center gap-2 border-b px-3 py-2.5">
        <div className={cn("size-2 rounded-full", config.dotColor)} />
        <h3 className="text-sm font-semibold text-foreground">{config.title}</h3>
        <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0">
          {cards.length}
        </Badge>
      </div>

      {/* Zone de depot avec cartes */}
      <div ref={setNodeRef} className="flex-1 overflow-y-auto p-2">
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {cards.map((card) => (
              <SortableCard key={card.id} card={card} />
            ))}
          </div>
        </SortableContext>
        {cards.length === 0 && (
          <div className="flex h-24 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
            Deposer ici
          </div>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------------
// Composant principal : Kanban Board
// -------------------------------------------------------------------

export function KanbanBoard() {
  const [columnCards, setColumnCards] = useState<Record<string, KanbanCardData[]>>(initialCards)
  const [activeCard, setActiveCard] = useState<KanbanCardData | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  // Trouver la colonne d'une carte
  const findColumn = useCallback(
    (cardId: string): string | null => {
      for (const [colId, cards] of Object.entries(columnCards)) {
        if (cards.some((c) => c.id === cardId)) return colId
      }
      return null
    },
    [columnCards]
  )

  // Debut du drag
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event
      const colId = findColumn(active.id as string)
      if (!colId) return
      const card = columnCards[colId].find((c) => c.id === active.id)
      if (card) setActiveCard(card)
    },
    [columnCards, findColumn]
  )

  // Survol pendant le drag (deplacement entre colonnes)
  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      const activeCol = findColumn(activeId)
      // overId peut etre un id de colonne ou un id de carte
      let overCol = columns.find((c) => c.id === overId)
        ? overId
        : findColumn(overId)

      if (!activeCol || !overCol || activeCol === overCol) return

      setColumnCards((prev) => {
        const activeCards = [...prev[activeCol]]
        const overCards = [...prev[overCol]]
        const activeIndex = activeCards.findIndex((c) => c.id === activeId)
        if (activeIndex === -1) return prev

        const [movedCard] = activeCards.splice(activeIndex, 1)
        const updatedCard = { ...movedCard, status: overCol }

        // Trouver l'index de drop dans la colonne cible
        const overIndex = overCards.findIndex((c) => c.id === overId)
        if (overIndex >= 0) {
          overCards.splice(overIndex, 0, updatedCard)
        } else {
          overCards.push(updatedCard)
        }

        return {
          ...prev,
          [activeCol]: activeCards,
          [overCol]: overCards,
        }
      })
    },
    [findColumn]
  )

  // Fin du drag
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveCard(null)

      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      const activeCol = findColumn(activeId)
      if (!activeCol) return

      // Reordonnancement dans la meme colonne
      const overCol = findColumn(overId)
      if (activeCol === overCol && activeCol) {
        setColumnCards((prev) => {
          const cards = [...prev[activeCol]]
          const oldIndex = cards.findIndex((c) => c.id === activeId)
          const newIndex = cards.findIndex((c) => c.id === overId)
          if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return prev

          const [movedCard] = cards.splice(oldIndex, 1)
          cards.splice(newIndex, 0, movedCard)
          return { ...prev, [activeCol]: cards }
        })
      }
    },
    [findColumn]
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ScrollArea className="w-full">
        <div className="flex gap-4 p-1 pb-4" style={{ minWidth: "fit-content" }}>
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              config={col}
              cards={columnCards[col.id] ?? []}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Overlay affiche pendant le drag */}
      <DragOverlay>
        {activeCard ? (
          <div className="w-[264px] rotate-3">
            <KanbanCard card={activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
