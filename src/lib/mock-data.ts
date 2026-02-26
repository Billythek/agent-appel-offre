// ─── Types ─────────────────────────────────────────────────────────────────

export type ExigenceType = "Technique" | "Administrative" | "Financiere" | "Juridique"
export type Priorite = "Critique" | "Important" | "Standard"
export type ValidationStatus = "pending" | "accepted" | "rejected" | "edited"

export interface Exigence {
  id: string
  numero: number
  code: string
  titre: string
  description: string
  type: ExigenceType
  categorie: string
  priorite: Priorite
  produitMatchId: string | null
  score: number
  validationStatus: ValidationStatus
  editedDescription?: string
  rejectReason?: string
  source?: string
}

export interface Produit {
  id: string
  nom: string
  reference: string
  fournisseur: string
  description: string
}

export interface Suggestion {
  id: string
  texte: string
  type: "manque" | "amelioration"
}

export type ClauseSeverity = "critique" | "majeur" | "mineur"
export type ClauseStatus = "pending" | "accepted" | "flagged"

export interface Clause {
  id: string
  titre: string
  article: string
  severite: ClauseSeverity
  description: string
  alternative: string
  status: ClauseStatus
}

export type DocumentStatus = "en_attente" | "generation" | "genere" | "valide"

export interface DocumentItem {
  id: string
  code: string
  title: string
  status: DocumentStatus
  progress: number
  aiContent: string
  editedContent?: string
}

export interface KanbanCardData {
  id: string
  reference: string
  title: string
  buyer: string
  deadline: string
  status: string
  score: number
}

// ─── Donnees mock : Exigences ──────────────────────────────────────────────

export const mockExigences: Exigence[] = [
  {
    id: "ex-1",
    numero: 1,
    code: "EX-001",
    titre: "Certification ISO 9001",
    description:
      "Le prestataire doit fournir une certification ISO 9001 en cours de validite",
    type: "Administrative",
    categorie: "Qualite",
    priorite: "Critique",
    produitMatchId: "prod-1",
    score: 92,
    validationStatus: "pending",
    source: "RC - Article 5.2",
  },
  {
    id: "ex-2",
    numero: 2,
    code: "EX-002",
    titre: "Capacite de charge 10 000 utilisateurs",
    description:
      "La solution doit supporter une charge minimale de 10 000 utilisateurs simultanes",
    type: "Technique",
    categorie: "Infrastructure",
    priorite: "Critique",
    produitMatchId: "prod-1",
    score: 85,
    validationStatus: "pending",
    source: "CCTP - Article 3.1",
  },
  {
    id: "ex-3",
    numero: 3,
    code: "EX-003",
    titre: "Delai de livraison 6 mois",
    description:
      "Le delai de livraison ne doit pas exceder 6 mois a compter de la notification",
    type: "Juridique",
    categorie: "Delais",
    priorite: "Important",
    produitMatchId: "prod-3",
    score: 78,
    validationStatus: "pending",
    source: "CCAP - Article 8.1",
  },
  {
    id: "ex-4",
    numero: 4,
    code: "EX-004",
    titre: "Prix forfaitaire non revisable",
    description:
      "Le montant du marche est soumis a un prix forfaitaire non revisable",
    type: "Financiere",
    categorie: "Prix",
    priorite: "Important",
    produitMatchId: "prod-4",
    score: 65,
    validationStatus: "pending",
    source: "AE - Article 4",
  },
  {
    id: "ex-5",
    numero: 5,
    code: "EX-005",
    titre: "Disponibilite 99,9%",
    description:
      "Le systeme doit garantir un taux de disponibilite de 99,9% minimum",
    type: "Technique",
    categorie: "Performance",
    priorite: "Critique",
    produitMatchId: "prod-2",
    score: 45,
    validationStatus: "pending",
    source: "CCTP - Article 4.2",
  },
  {
    id: "ex-6",
    numero: 6,
    code: "EX-006",
    titre: "Hebergement SecNumCloud",
    description:
      "Les donnees doivent etre hebergees sur le territoire francais (SecNumCloud)",
    type: "Technique",
    categorie: "Securite",
    priorite: "Critique",
    produitMatchId: null,
    score: 0,
    validationStatus: "pending",
    source: "CCTP - Article 6.1",
  },
  {
    id: "ex-7",
    numero: 7,
    code: "EX-007",
    titre: "Penalites de retard",
    description:
      "Penalite de 1% par jour calendaire de retard, plafonnee a 10% du marche",
    type: "Juridique",
    categorie: "Penalites",
    priorite: "Important",
    produitMatchId: "prod-3",
    score: 70,
    validationStatus: "pending",
    source: "CCAP - Article 14",
  },
  {
    id: "ex-8",
    numero: 8,
    code: "EX-008",
    titre: "3 references similaires",
    description:
      "Le candidat doit justifier de 3 references similaires sur les 5 dernieres annees",
    type: "Administrative",
    categorie: "References",
    priorite: "Standard",
    produitMatchId: "prod-2",
    score: 88,
    validationStatus: "pending",
    source: "RC - Article 6.3",
  },
  {
    id: "ex-9",
    numero: 9,
    code: "EX-009",
    titre: "Accessibilite RGAA",
    description:
      "L'interface utilisateur doit etre conforme aux normes RGAA d'accessibilite",
    type: "Technique",
    categorie: "Accessibilite",
    priorite: "Important",
    produitMatchId: "prod-1",
    score: 75,
    validationStatus: "pending",
    source: "CCTP - Article 5.4",
  },
  {
    id: "ex-10",
    numero: 10,
    code: "EX-010",
    titre: "Chiffre d'affaires minimum",
    description:
      "Le chiffre d'affaires annuel moyen doit etre superieur a 2 fois le montant du marche",
    type: "Financiere",
    categorie: "Capacite financiere",
    priorite: "Standard",
    produitMatchId: null,
    score: 0,
    validationStatus: "pending",
    source: "RC - Article 7.1",
  },
]

// ─── Donnees mock : Produits ───────────────────────────────────────────────

export const mockProduits: Produit[] = [
  {
    id: "prod-1",
    nom: "Serveur Dell PowerEdge R750",
    reference: "PE-R750-XS",
    fournisseur: "Dell Technologies",
    description:
      "Serveur rack 2U haute performance, processeur Intel Xeon Scalable 3e gen, 512 Go RAM, stockage NVMe.",
  },
  {
    id: "prod-2",
    nom: "Switch Cisco Catalyst 9300",
    reference: "C9300-48P-A",
    fournisseur: "Cisco Systems",
    description:
      "Switch reseau manageable 48 ports PoE+, empilable, support SD-Access et DNA Center.",
  },
  {
    id: "prod-3",
    nom: "Firewall Fortinet FortiGate 200F",
    reference: "FG-200F-BDL",
    fournisseur: "Fortinet",
    description:
      "Pare-feu nouvelle generation, debit 27 Gbps, IPS, antivirus, filtrage web, SD-WAN integre.",
  },
  {
    id: "prod-4",
    nom: "Baie de stockage NetApp AFF A250",
    reference: "AFF-A250-SAS",
    fournisseur: "NetApp",
    description:
      "Baie de stockage 100% flash, deduplication inline, replication SnapMirror, 50 To bruts.",
  },
]

// ─── Donnees mock : Suggestions IA ─────────────────────────────────────────

export const mockSuggestions: Suggestion[] = [
  {
    id: "sug-1",
    texte:
      "Aucun produit ne couvre l'exigence EX-006 (Hebergement SecNumCloud). Envisagez d'ajouter un hebergeur certifie SecNumCloud comme OVHcloud ou Outscale.",
    type: "manque",
  },
  {
    id: "sug-2",
    texte:
      "Le score de matching sur l'exigence EX-005 (Disponibilite 99,9%) est faible (45%). Le switch Cisco C9300 ne garantit pas seul ce niveau de SLA — envisagez une architecture redondante.",
    type: "amelioration",
  },
  {
    id: "sug-3",
    texte:
      "L'exigence EX-010 (Chiffre d'affaires) n'est couverte par aucun produit. Il s'agit d'une exigence administrative qui doit etre justifiee dans le DC2.",
    type: "manque",
  },
]

// ─── Donnees mock : Clauses a risque ───────────────────────────────────────

export const mockClauses: Clause[] = [
  {
    id: "clause-1",
    titre: "Penalites de retard illimitees",
    article: "Article 14.3 - CCAP",
    severite: "critique",
    description:
      "Le cahier des charges prevoit des penalites de retard sans plafonnement. L'absence de limite superieure expose le titulaire a un risque financier potentiellement superieur au montant du marche.",
    alternative:
      "Proposer un plafonnement des penalites a 10% du montant total du marche, conformement aux pratiques courantes des marches publics.",
    status: "pending",
  },
  {
    id: "clause-2",
    titre: "Responsabilite etendue post-livraison",
    article: "Article 22.1 - CCAP",
    severite: "critique",
    description:
      "La clause impose une responsabilite du prestataire pendant 10 ans apres la reception, ce qui depasse largement les obligations legales habituelles.",
    alternative:
      "Limiter la responsabilite post-livraison a 2 ans pour la garantie contractuelle et renvoyer aux regimes legaux pour les durees superieures.",
    status: "pending",
  },
  {
    id: "clause-3",
    titre: "Resiliation unilaterale sans indemnite",
    article: "Article 31.2 - CCAG",
    severite: "majeur",
    description:
      "Le maitre d'ouvrage se reserve le droit de resilier le marche a tout moment sans motif et sans indemnisation du titulaire pour les travaux realises.",
    alternative:
      "Negocier l'ajout d'une indemnite de resiliation couvrant au minimum les frais engages et la marge sur les prestations deja realisees.",
    status: "pending",
  },
  {
    id: "clause-4",
    titre: "Delai de paiement superieur a 60 jours",
    article: "Article 11.5 - CCAP",
    severite: "majeur",
    description:
      "Le delai de paiement prevu est de 90 jours a compter de la reception de la facture, ce qui impacte significativement la tresorerie.",
    alternative:
      "Exiger un delai de paiement conforme a la reglementation (30 jours pour l'Etat, 50 jours pour les collectivites) avec interets moratoires automatiques.",
    status: "pending",
  },
  {
    id: "clause-5",
    titre: "Propriete intellectuelle cedee integralement",
    article: "Article 25.1 - CCAP",
    severite: "mineur",
    description:
      "La clause prevoit une cession totale et exclusive des droits de propriete intellectuelle sur l'ensemble des livrables, y compris les outils et methodes preexistants du prestataire.",
    alternative:
      "Distinguer les creations specifiques au marche (cessibles) des outils et methodes preexistants (licence d'utilisation accordee au client).",
    status: "pending",
  },
]

// ─── Donnees mock : Documents ──────────────────────────────────────────────

export const mockDocuments: DocumentItem[] = [
  {
    id: "doc-1",
    code: "DC1",
    title: "Lettre de candidature",
    status: "en_attente",
    progress: 0,
    aiContent: `<h2>Lettre de candidature — DC1</h2>
<p>Objet : Candidature au marche public ref. DCE-2025-001</p>
<p>Madame, Monsieur,</p>
<p>Nous avons l'honneur de vous presenter notre candidature dans le cadre du marche public susvise. Notre entreprise, forte de plus de 15 annees d'experience dans le domaine, dispose des competences techniques et des ressources humaines necessaires a la bonne execution des prestations decrites dans le cahier des charges.</p>
<h3>Engagement du candidat</h3>
<p>Le candidat s'engage a respecter l'ensemble des clauses du marche et a fournir les prestations conformement aux specifications techniques detaillees dans le CCTP.</p>
<ul>
<li>Certification ISO 9001 en cours de validite</li>
<li>Capacite financiere demontree sur les 3 derniers exercices</li>
<li>References similaires sur les 5 dernieres annees</li>
</ul>
<p>Nous restons a votre disposition pour tout complement d'information.</p>`,
  },
  {
    id: "doc-2",
    code: "DC2",
    title: "Declaration du candidat",
    status: "en_attente",
    progress: 0,
    aiContent: `<h2>Declaration du candidat — DC2</h2>
<h3>Identification du candidat</h3>
<p>Denomination sociale : [A completer]</p>
<p>Forme juridique : SAS au capital de [montant] euros</p>
<p>Adresse du siege : [A completer]</p>
<h3>Renseignements relatifs a la situation juridique</h3>
<p>Le candidat declare sur l'honneur ne faire l'objet d'aucune exclusion de la participation aux marches publics prevue aux articles L.2141-1 a L.2141-11 du Code de la commande publique.</p>
<h3>Capacite economique et financiere</h3>
<ul>
<li>Chiffre d'affaires global des 3 derniers exercices</li>
<li>Chiffre d'affaires specifique au domaine d'activite</li>
</ul>`,
  },
  {
    id: "doc-3",
    code: "MT",
    title: "Memoire Technique",
    status: "en_attente",
    progress: 0,
    aiContent: `<h2>Memoire Technique</h2>
<h3>1. Comprehension du besoin</h3>
<p>L'analyse approfondie du cahier des charges nous permet d'identifier les enjeux majeurs de cette consultation. Le besoin porte principalement sur la fourniture d'une infrastructure informatique haute performance repondant aux exigences de securite et de disponibilite de l'administration.</p>
<h3>2. Methodologie proposee</h3>
<p>Notre approche repose sur une methodologie eprouvee en 4 phases :</p>
<ol>
<li><strong>Phase d'audit</strong> : Analyse de l'existant et validation des besoins</li>
<li><strong>Phase de conception</strong> : Architecture technique detaillee</li>
<li><strong>Phase de deploiement</strong> : Installation et configuration</li>
<li><strong>Phase de recette</strong> : Tests et validation</li>
</ol>
<h3>3. Moyens techniques</h3>
<p>L'ensemble des equipements proposes sont de derniere generation et certifies pour un usage en environnement critique.</p>`,
  },
  {
    id: "doc-4",
    code: "BPU",
    title: "BPU / DQE",
    status: "en_attente",
    progress: 0,
    aiContent: `<h2>Bordereau des Prix Unitaires</h2>
<h3>Lot 1 — Infrastructure serveurs</h3>
<table>
<tr><td>Serveur Dell PowerEdge R750</td><td>Unite</td><td>[Prix unitaire]</td></tr>
<tr><td>Installation et configuration</td><td>Forfait</td><td>[Prix]</td></tr>
<tr><td>Formation administrateurs</td><td>Jour</td><td>[Prix/jour]</td></tr>
</table>
<h3>Lot 2 — Reseau et securite</h3>
<table>
<tr><td>Switch Cisco Catalyst 9300</td><td>Unite</td><td>[Prix unitaire]</td></tr>
<tr><td>Firewall FortiGate 200F</td><td>Unite</td><td>[Prix unitaire]</td></tr>
</table>
<p><em>Les prix sont exprimes en euros HT et sont fermes et non revisables pendant toute la duree du marche.</em></p>`,
  },
  {
    id: "doc-5",
    code: "DPGF",
    title: "DPGF",
    status: "en_attente",
    progress: 0,
    aiContent: `<h2>Decomposition du Prix Global et Forfaitaire</h2>
<h3>Prestation principale</h3>
<p>Le montant global et forfaitaire de la prestation s'eleve a [montant] euros HT, decompose comme suit :</p>
<ul>
<li>Fourniture materielle : [montant] EUR HT</li>
<li>Prestations d'installation : [montant] EUR HT</li>
<li>Formation et transfert de competences : [montant] EUR HT</li>
<li>Garantie et maintenance 3 ans : [montant] EUR HT</li>
</ul>
<h3>Options</h3>
<ul>
<li>Extension de garantie +2 ans : [montant] EUR HT</li>
<li>Support premium 24/7 : [montant] EUR HT/an</li>
</ul>`,
  },
  {
    id: "doc-6",
    code: "AE",
    title: "Acte d'engagement",
    status: "en_attente",
    progress: 0,
    aiContent: `<h2>Acte d'Engagement</h2>
<h3>Objet du marche</h3>
<p>Le present acte d'engagement est passe en application du Code de la commande publique. Il porte sur [objet du marche].</p>
<h3>Engagement du candidat</h3>
<p>Le candidat s'engage, sur la base de son offre et pour son propre compte, a executer les prestations dans les conditions definies ci-apres :</p>
<ul>
<li>Duree du marche : [duree]</li>
<li>Montant total HT : [montant] EUR</li>
<li>Montant total TTC : [montant] EUR</li>
</ul>
<h3>Modalites de reglement</h3>
<p>Le paiement sera effectue par virement bancaire dans un delai de 30 jours a compter de la reception de la facture.</p>
<p><strong>Fait a [Ville], le [Date]</strong></p>`,
  },
]

// ─── Donnees mock : Kanban ─────────────────────────────────────────────────

export const mockKanbanCards: Record<string, KanbanCardData[]> = {
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
