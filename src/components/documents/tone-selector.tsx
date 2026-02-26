"use client"

import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const tones = [
  { value: "formel", label: "Formel" },
  { value: "innovant", label: "Innovant" },
  { value: "technique", label: "Technique" },
] as const

export function ToneSelector() {
  const [tone, setTone] = useState<string>("formel")

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Ton du document</p>
      <ToggleGroup
        type="single"
        value={tone}
        onValueChange={(v) => {
          if (v) setTone(v)
        }}
        variant="outline"
      >
        {tones.map((t) => (
          <ToggleGroupItem key={t.value} value={t.value} aria-label={t.label}>
            {t.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
