"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from "lucide-react"

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
  className?: string
}

export function TiptapEditor({ content, onChange, className }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Commencez a rediger...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  })

  if (!editor) {
    return <Skeleton className="h-[400px] w-full rounded-lg" />
  }

  const toolbarButtons = [
    {
      icon: Bold,
      label: "Gras",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: Italic,
      label: "Italique",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: Strikethrough,
      label: "Barre",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    { separator: true },
    {
      icon: Heading1,
      label: "Titre 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: Heading2,
      label: "Titre 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: Heading3,
      label: "Titre 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    { separator: true },
    {
      icon: List,
      label: "Liste",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      label: "Liste numerotee",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: Quote,
      label: "Citation",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    { separator: true },
    {
      icon: Undo,
      label: "Annuler",
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
    },
    {
      icon: Redo,
      label: "Retablir",
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
    },
  ] as const

  return (
    <div className={cn("rounded-lg border", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b bg-muted/30 px-2 py-1.5">
        {toolbarButtons.map((btn, i) => {
          if ("separator" in btn) {
            return <Separator key={i} orientation="vertical" className="mx-1 h-6" />
          }
          const Icon = btn.icon
          return (
            <Button
              key={i}
              variant="ghost"
              size="icon"
              className={cn(
                "size-8",
                btn.isActive && "bg-accent text-accent-foreground"
              )}
              onClick={btn.action}
              title={btn.label}
              type="button"
            >
              <Icon className="size-4" />
            </Button>
          )
        })}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
