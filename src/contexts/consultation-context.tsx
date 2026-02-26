"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react"
import {
  mockExigences as initialExigences,
  mockProduits,
  mockSuggestions,
  mockClauses as initialClauses,
  mockDocuments as initialDocuments,
  type Exigence,
  type Produit,
  type Suggestion,
  type Clause,
  type DocumentItem,
  type ValidationStatus,
  type ClauseStatus,
  type DocumentStatus,
} from "@/lib/mock-data"

// ─── Types du contexte ─────────────────────────────────────────────────────

interface ConsultationState {
  // Donnees
  exigences: Exigence[]
  produits: Produit[]
  suggestions: Suggestion[]
  clauses: Clause[]
  documents: DocumentItem[]

  // Verdict
  verdictStatus: "pending" | "accepted" | "rejected"
  verdictComment: string

  // HITL
  hitl1Validated: boolean
  hitl2Validated: boolean

  // Workflow derive
  currentWorkflowStep: string

  // Actions exigences
  validateExigence: (id: string) => void
  rejectExigence: (id: string, reason: string) => void
  editExigence: (id: string, newDescription: string) => void
  validateAllExigences: () => void

  // Actions matching
  validateMatch: (exigenceId: string) => void
  rejectMatch: (exigenceId: string) => void
  reassignMatch: (exigenceId: string, newProduitId: string) => void
  validateAllMatches: () => void

  // Actions risques
  acceptVerdict: () => void
  rejectVerdict: (comment: string) => void
  acceptClause: (clauseId: string) => void
  flagClause: (clauseId: string) => void

  // Actions documents
  setDocumentStatus: (docId: string, status: DocumentStatus, progress: number) => void
  generateDocument: (docId: string) => void
  updateDocumentContent: (docId: string, content: string) => void
  validateDocument: (docId: string) => void

  // Actions HITL
  validateHitl1: () => void
  validateHitl2: () => void

  // Actions suggestions
  setSuggestions: (suggestions: Suggestion[]) => void
}

// ─── Contexte ──────────────────────────────────────────────────────────────

const ConsultationContext = createContext<ConsultationState | null>(null)

export function useConsultation() {
  const ctx = useContext(ConsultationContext)
  if (!ctx) {
    throw new Error("useConsultation doit etre utilise dans un ConsultationProvider")
  }
  return ctx
}

// ─── Provider ──────────────────────────────────────────────────────────────

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [exigences, setExigences] = useState<Exigence[]>(initialExigences)
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions)
  const [clauses, setClauses] = useState<Clause[]>(initialClauses)
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments)
  const [verdictStatus, setVerdictStatus] = useState<"pending" | "accepted" | "rejected">("pending")
  const [verdictComment, setVerdictComment] = useState("")
  const [hitl1Validated, setHitl1Validated] = useState(false)
  const [hitl2Validated, setHitl2Validated] = useState(false)

  // ── Exigences ──────────────────────────────────────────────────────────

  const validateExigence = useCallback((id: string) => {
    setExigences((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, validationStatus: "accepted" as ValidationStatus } : e
      )
    )
  }, [])

  const rejectExigence = useCallback((id: string, reason: string) => {
    setExigences((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, validationStatus: "rejected" as ValidationStatus, rejectReason: reason }
          : e
      )
    )
  }, [])

  const editExigence = useCallback((id: string, newDescription: string) => {
    setExigences((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, validationStatus: "edited" as ValidationStatus, editedDescription: newDescription }
          : e
      )
    )
  }, [])

  const validateAllExigences = useCallback(() => {
    setExigences((prev) =>
      prev.map((e) =>
        e.validationStatus === "pending"
          ? { ...e, validationStatus: "accepted" as ValidationStatus }
          : e
      )
    )
  }, [])

  // ── Matching ───────────────────────────────────────────────────────────

  const validateMatch = useCallback((exigenceId: string) => {
    setExigences((prev) =>
      prev.map((e) =>
        e.id === exigenceId
          ? { ...e, validationStatus: e.validationStatus === "accepted" ? "pending" : "accepted" as ValidationStatus }
          : e
      )
    )
  }, [])

  const rejectMatch = useCallback((exigenceId: string) => {
    setExigences((prev) =>
      prev.map((e) =>
        e.id === exigenceId
          ? { ...e, validationStatus: "rejected" as ValidationStatus, produitMatchId: null, score: 0 }
          : e
      )
    )
  }, [])

  const reassignMatch = useCallback((exigenceId: string, newProduitId: string) => {
    setExigences((prev) =>
      prev.map((e) =>
        e.id === exigenceId
          ? { ...e, produitMatchId: newProduitId, score: 70, validationStatus: "accepted" as ValidationStatus }
          : e
      )
    )
  }, [])

  const validateAllMatches = useCallback(() => {
    setExigences((prev) =>
      prev.map((e) =>
        e.produitMatchId && e.validationStatus === "pending"
          ? { ...e, validationStatus: "accepted" as ValidationStatus }
          : e
      )
    )
  }, [])

  // ── Risques ────────────────────────────────────────────────────────────

  const acceptVerdict = useCallback(() => {
    setVerdictStatus("accepted")
  }, [])

  const rejectVerdict = useCallback((comment: string) => {
    setVerdictStatus("rejected")
    setVerdictComment(comment)
  }, [])

  const acceptClause = useCallback((clauseId: string) => {
    setClauses((prev) =>
      prev.map((c) =>
        c.id === clauseId ? { ...c, status: "accepted" as ClauseStatus } : c
      )
    )
  }, [])

  const flagClause = useCallback((clauseId: string) => {
    setClauses((prev) =>
      prev.map((c) =>
        c.id === clauseId ? { ...c, status: "flagged" as ClauseStatus } : c
      )
    )
  }, [])

  // ── Documents ──────────────────────────────────────────────────────────

  const setDocumentStatus = useCallback(
    (docId: string, status: DocumentStatus, progress: number) => {
      setDocuments((prev) =>
        prev.map((d) => (d.id === docId ? { ...d, status, progress } : d))
      )
    },
    []
  )

  const generateDocument = useCallback((docId: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId ? { ...d, status: "genere" as DocumentStatus, progress: 100 } : d
      )
    )
  }, [])

  const updateDocumentContent = useCallback((docId: string, content: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId ? { ...d, editedContent: content } : d
      )
    )
  }, [])

  const validateDocument = useCallback((docId: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId ? { ...d, status: "valide" as DocumentStatus } : d
      )
    )
  }, [])

  // ── HITL ───────────────────────────────────────────────────────────────

  const validateHitl1 = useCallback(() => {
    setHitl1Validated(true)
  }, [])

  const validateHitl2 = useCallback(() => {
    setHitl2Validated(true)
  }, [])

  // ── Workflow derive ────────────────────────────────────────────────────

  const currentWorkflowStep = useMemo(() => {
    if (hitl2Validated) return "validation"
    if (hitl1Validated) return "documents"
    // Si au moins la moitie des exigences sont validees, on est au matching
    const validatedCount = exigences.filter(
      (e) => e.validationStatus === "accepted" || e.validationStatus === "edited"
    ).length
    if (validatedCount >= exigences.length / 2) return "matching"
    return "analyse"
  }, [exigences, hitl1Validated, hitl2Validated])

  // ── Valeur du contexte ─────────────────────────────────────────────────

  const value = useMemo<ConsultationState>(
    () => ({
      exigences,
      produits: mockProduits,
      suggestions,
      clauses,
      documents,
      verdictStatus,
      verdictComment,
      hitl1Validated,
      hitl2Validated,
      currentWorkflowStep,
      validateExigence,
      rejectExigence,
      editExigence,
      validateAllExigences,
      validateMatch,
      rejectMatch,
      reassignMatch,
      validateAllMatches,
      acceptVerdict,
      rejectVerdict,
      acceptClause,
      flagClause,
      setDocumentStatus,
      generateDocument,
      updateDocumentContent,
      validateDocument,
      validateHitl1,
      validateHitl2,
      setSuggestions,
    }),
    [
      exigences,
      suggestions,
      clauses,
      documents,
      verdictStatus,
      verdictComment,
      hitl1Validated,
      hitl2Validated,
      currentWorkflowStep,
      validateExigence,
      rejectExigence,
      editExigence,
      validateAllExigences,
      validateMatch,
      rejectMatch,
      reassignMatch,
      validateAllMatches,
      acceptVerdict,
      rejectVerdict,
      acceptClause,
      flagClause,
      setDocumentStatus,
      generateDocument,
      updateDocumentContent,
      validateDocument,
      validateHitl1,
      validateHitl2,
      setSuggestions,
    ]
  )

  return (
    <ConsultationContext.Provider value={value}>
      {children}
    </ConsultationContext.Provider>
  )
}
