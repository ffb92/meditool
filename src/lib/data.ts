import diseasesData from './diseases.json';

interface DiseasesFile { diseases: Disease[]; }
const data = diseasesData as DiseasesFile;

export interface Tool { name: string; purpose: string; }
export interface Material { name: string; detail: string; }
export interface Medication { name: string; dosage: string; timing: string; }

export interface Disease {
  id: string; name: string; category: string;
  urgency: 'akut' | 'subakut' | 'elektiv';
  summary: string; symptoms: string[];
  tools: Tool[]; materials: Material[];
  medications: Medication[]; preparation: string[]; notes: string;
}

export function getAllDiseases(): Disease[] { return data.diseases; }
export function getDiseaseById(id: string): Disease | undefined { return data.diseases.find((d) => d.id === id); }
export function getCategories(): string[] { const cats = new Set(data.diseases.map((d) => d.category)); return Array.from(cats).sort(); }
