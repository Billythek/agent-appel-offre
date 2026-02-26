// Messages toast centralises en francais

export const toasts = {
  // Exigences
  exigenceValidated: "Exigence validee avec succes",
  exigenceRejected: "Exigence rejetee",
  exigenceEdited: "Exigence modifiee et sauvegardee",
  allExigencesValidated: "Toutes les exigences ont ete validees",

  // Matching
  matchValidated: "Correspondance validee",
  matchRejected: "Correspondance rejetee",
  matchReassigned: "Produit reassigne avec succes",
  allMatchesValidated: "Toutes les correspondances ont ete validees",
  recommendationsGenerated: "Recommandations IA generees",

  // Risques
  verdictAccepted: "Verdict accepte — vous pouvez poursuivre",
  verdictRejected: "Verdict rejete — commentaire enregistre",
  clauseAccepted: "Risque accepte pour cette clause",
  clauseFlagged: "Clause signalee comme bloquante",

  // Documents
  documentGenerated: (code: string) => `Document ${code} genere avec succes`,
  documentSaved: "Document sauvegarde",
  documentValidated: (code: string) => `Document ${code} valide`,

  // HITL
  hitl1Validated:
    "Analyse et matching valides — generation des documents debloquee",
  hitl2Validated:
    "Dossier valide et soumis avec succes",

  // Upload
  uploadSuccess: "DCE analyse avec succes — nouvelle consultation creee",
  uploadError: "Erreur lors de l'upload. Veuillez reessayer.",

  // Notifications
  allNotificationsRead: "Toutes les notifications marquees comme lues",
} as const
