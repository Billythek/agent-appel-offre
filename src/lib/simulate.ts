import { mockDocuments } from "./mock-data"

// ─── Simulation Upload & Parsing DCE ───────────────────────────────────────

export interface UploadStep {
  label: string
  progress: number
}

const uploadSteps: UploadStep[] = [
  { label: "Upload du fichier...", progress: 25 },
  { label: "OCR et extraction du texte...", progress: 50 },
  { label: "Extraction des exigences...", progress: 75 },
  { label: "Analyse IA en cours...", progress: 100 },
]

export function simulateUploadParsing(
  onProgress: (step: UploadStep, index: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    let i = 0
    const interval = setInterval(() => {
      if (i < uploadSteps.length) {
        onProgress(uploadSteps[i], i)
        i++
      } else {
        clearInterval(interval)
        resolve()
      }
    }, 1000)
  })
}

// ─── Simulation Generation Document ────────────────────────────────────────

export function simulateDocumentGeneration(
  docId: string,
  onProgress: (progress: number) => void
): Promise<string> {
  return new Promise((resolve) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 20
      onProgress(Math.min(progress, 100))
      if (progress >= 100) {
        clearInterval(interval)
        const doc = mockDocuments.find((d) => d.id === docId)
        resolve(doc?.aiContent ?? "<p>Contenu genere par l'IA</p>")
      }
    }, 400)
  })
}

// ─── Simulation Recommandations IA ─────────────────────────────────────────

export interface Recommendation {
  id: string
  texte: string
  type: "manque" | "amelioration"
}

export function simulateRecommendations(): Promise<Recommendation[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "rec-1",
          texte:
            "Recommandation : ajouter un hebergeur certifie SecNumCloud (OVHcloud ou Outscale) pour couvrir l'exigence EX-006.",
          type: "manque",
        },
        {
          id: "rec-2",
          texte:
            "Le score de disponibilite (EX-005) peut etre ameliore en proposant une architecture active-passive avec basculement automatique.",
          type: "amelioration",
        },
        {
          id: "rec-3",
          texte:
            "Pour l'exigence EX-010, incluez les bilans certifies des 3 derniers exercices dans le DC2.",
          type: "amelioration",
        },
      ])
    }, 1500)
  })
}
