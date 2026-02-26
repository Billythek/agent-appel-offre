"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}

export function TagInput({
  value,
  onChange,
  placeholder = "Ajouter un tag...",
  className,
}: TagInputProps) {
  const [input, setInput] = React.useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const tag = input.trim()
      if (tag && !value.includes(tag)) {
        onChange([...value, tag])
      }
      setInput("")
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div
      className={`flex flex-wrap gap-1.5 rounded-md border bg-background px-3 py-2 ${className}`}
    >
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="rounded-full p-0.5 hover:bg-muted-foreground/20"
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="min-w-[120px] flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
      />
    </div>
  )
}
