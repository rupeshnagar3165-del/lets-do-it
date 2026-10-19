export type SubjectType = 'physics' | 'chemistry';

export interface Chapter {
  id: string;
  subject: SubjectType;
  number: number;
  title: string;
  tagline: string;
  weightage: string; // e.g. "7-8 Marks in CBSE"
  pageCount: number;
  status: 'available' | 'coming_soon';
  price: number; // e.g. 15 for physics, 16 for chemistry
  highlightPoints: string[];
  mostRepeatedQuestions: string[];
  keyDerivationsOrMechanisms: string[];
  pdfUrl?: string;
  samplePreview: {
    pageTitle: string;
    handwrittenNotes: string[];
    diagramLabel?: string;
    diagramType?: 'dipole' | 'lcr' | 'sn1_sn2' | 'aldol' | 'prism' | 'rectifier' | 'clemmensen';
    examTrapWarning: string;
    topperSecretTip: string;
    previewImage?: string; // Optional scanned photo of note
    pdfUrl?: string; // Direct PDF file or embed link
  };
}

export interface Review {
  id: string;
  name: string;
  schoolOrCity: string;
  beforeScore: string;
  afterScore: string;
  quote: string;
  verifiedBadge: string;
  avatarLetter: string;
  subject?: 'Physics' | 'Chemistry' | 'Both';
  highlightTopic?: string;
}

export interface StudyResource {
  title: string;
  badge: string;
  description: string;
  includedIn49?: boolean;
  includedInVault?: boolean;
}

export interface MasterVaultBundle {
  id: 'vault-physics' | 'vault-chemistry' | 'vault-master';
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  chaptersCount: number;
  price: number;
  transactionNote: string;
}
