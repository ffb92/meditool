'use client';

import { use, useEffect } from 'react';
import { getDiseaseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useFavoritesContext } from '../../FavoritesProvider';
import { useRecents } from '@/lib/hooks';
import ChecklistView from '@/components/ChecklistView';

const urgencyColors: Record<string, string> = {akut:'chip-akut',subakut:'chip-subakut',elektiv:'chip-elektiv'};
const urgencyLabels: Record<string, string> = {akut:'Akut',subakut:'Subakut',elektiv:'Elektiv'};

export default function DiseasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const disease = getDiseaseById(id);
  const { isFavorite, toggle } = useFavoritesContext();
  const { addRecent } = useRecents();

  useEffect(() => { if (disease) addRecent(disease.id); }, [disease, addRecent]);

  if (!disease) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-med-muted hover:text-white transition-colors text-sm"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>Zurück</Link>
        <button onClick={()=>toggle(disease.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${isFavorite(disease.id)?'bg-med-amber/15 text-med-amber border border-med-amber/20':'bg-white/5 text-med-muted border border-white/10'}`}><svg className="w-4 h-4" fill={isFavorite(disease.id)?'currentColor':'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>{isFavorite(disease.id)?'Gemerkt':'Merken'}</button>
      </div>
      <div className="mb-5"><div className="flex items-center gap-2 mb-2"><span className="chip bg-white/5 text-med-muted border-white/10 text-xs">{disease.category}</span><span className={`chip text-xs ${urgencyColors[disease.urgency]}`}>{urgencyLabels[disease.urgency]}</span></div><h1 className="text-2xl font-bold text-white mb-2">{disease.name}</h1><p className="text-med-muted text-sm leading-relaxed">{disease.summary}</p></div>
      <div className="mb-4"><ChecklistView disease={disease}/></div>
      {disease.symptoms.length>0&&<section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-3">Symptome</h2><div className="flex flex-wrap gap-1.5">{disease.symptoms.map((s,i)=>(<span key={i} className="chip bg-med-cyan/5 text-med-text/80 border-med-cyan/10 text-xs">{s}</span>))}</div></section>}
      <section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-1">🏥 Instrumente & Werkzeuge ({disease.tools.length})</h2><div className="divide-y divide-white/5">{disease.tools.map((tool,i)=>(<div key={i} className="item-row"><div className="flex-1"><div className="text-sm font-medium text-white">{tool.name}</div><div className="text-xs text-med-muted">{tool.purpose}</div></div></div>))}</div></section>
      <section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-1">📦 Materialien ({disease.materials.length})</h2><div className="divide-y divide-white/5">{disease.materials.map((mat,i)=>(<div key={i} className="item-row"><div className="flex-1"><div className="text-sm font-medium text-white">{mat.name}</div><div className="text-xs text-med-muted">{mat.detail}</div></div></div>))}</div></section>
      <section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-1">💊 Medikation ({disease.medications.length})</h2><div className="divide-y divide-white/5">{disease.medications.map((med,i)=>(<div key={i} className="item-row"><div className="flex-1"><div className="text-sm font-medium text-white">{med.name}</div><div className="flex gap-3 text-xs text-med-muted mt-0.5"><span>Dosierung: {med.dosage}</span><span className="text-med-muted/50">·</span><span className="text-med-teal">{med.timing}</span></div></div></div>))}</div></section>
      <section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-3">✅ Vorbereitung & Ablauf</h2><ol className="space-y-2">{disease.preparation.map((step,i)=>(<li key={i} className="flex gap-3 text-sm"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-med-cyan/15 text-med-cyan text-xs font-semibold flex items-center justify-center mt-0.5">{i+1}</span><span className="text-med-text/90 pt-0.5">{step}</span></li>))}</ol></section>
      {disease.notes&&<section className="section-card mb-4 border-med-amber/20 bg-med-amber/5"><h2 className="text-xs font-semibold text-med-amber uppercase tracking-wider mb-2">⚠️ Wichtige Hinweise</h2><p className="text-sm text-med-text/80 leading-relaxed">{disease.notes}</p></section>}
      {disease.sources&&disease.sources.length>0&&<section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-2">📚 Verifizierte Quellen</h2><div className="space-y-1.5">{disease.sources.map((src,i)=>(<a key={i} href={src.url} target="_blank" rel="noopener noreferrer" className="block text-xs text-med-muted hover:text-med-cyan transition-colors py-0.5">• {src.name} <span className="text-med-muted/50">– {src.description}</span></a>))}</div></section>}
      <div className="text-center py-4 mb-20"><p className="text-[10px] text-med-muted/40">Diese App dient als Referenzhilfe und ersetzt keine klinische Entscheidung. Angaben ohne Gewähr. Stand: Juni 2026.</p></div>
    </div>
  );
}
