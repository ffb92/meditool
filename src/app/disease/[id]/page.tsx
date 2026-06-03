import { getDiseaseById, getAllDiseases } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export function generateStaticParams() { return getAllDiseases().map((d) => ({ id: d.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const disease = getDiseaseById(id);
  if (!disease) return { title: 'Nicht gefunden' };
  return { title: `${disease.name} – MediTool` };
}

export default async function DiseasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const disease = getDiseaseById(id);
  if (!disease) notFound();

  const urgencyColors: Record<string, string> = { akut: 'chip-akut', subakut: 'chip-subakut', elektiv: 'chip-elektiv' };
  const urgencyLabels: Record<string, string> = { akut: 'Akut', subakut: 'Subakut', elektiv: 'Elektiv' };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-slide-up">
      <Link href="/" className="inline-flex items-center gap-1.5 text-med-muted hover:text-white transition-colors mb-4 text-sm">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>Zurück
      </Link>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2"><span className="chip bg-white/5 text-med-muted border-white/10 text-xs">{disease.category}</span><span className={`chip text-xs ${urgencyColors[disease.urgency]}`}>{urgencyLabels[disease.urgency]}</span></div>
        <h1 className="text-2xl font-bold text-white mb-2">{disease.name}</h1>
        <p className="text-med-muted text-sm leading-relaxed">{disease.summary}</p>
      </div>
      {disease.symptoms.length > 0 && (<section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-3">Symptome</h2><div className="flex flex-wrap gap-1.5">{disease.symptoms.map((s,i)=>(<span key={i} className="chip bg-med-cyan/5 text-med-text/80 border-med-cyan/10 text-xs">{s}</span>))}</div></section>)}
      <section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-1">\uD83C\uDFE5 Instrumente & Werkzeuge ({disease.tools.length})</h2><div className="divide-y divide-white/5">{disease.tools.map((t,i)=>(<div key={i} className="item-row"><div className="flex-1"><div className="text-sm font-medium text-white">{t.name}</div><div className="text-xs text-med-muted">{t.purpose}</div></div></div>))}</div></section>
      <section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-1">\uD83D\uDCE6 Materialien ({disease.materials.length})</h2><div className="divide-y divide-white/5">{disease.materials.map((m,i)=>(<div key={i} className="item-row"><div className="flex-1"><div className="text-sm font-medium text-white">{m.name}</div><div className="text-xs text-med-muted">{m.detail}</div></div></div>))}</div></section>
      <section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-1">\uD83D\uDC8A Medikation ({disease.medications.length})</h2><div className="divide-y divide-white/5">{disease.medications.map((m,i)=>(<div key={i} className="item-row"><div className="flex-1"><div className="text-sm font-medium text-white">{m.name}</div><div className="flex gap-3 text-xs text-med-muted mt-0.5"><span>Dosierung: {m.dosage}</span><span className="text-med-muted/50">·</span><span className="text-med-teal">{m.timing}</span></div></div></div>))}</div></section>
      <section className="section-card mb-4"><h2 className="text-xs font-semibold text-med-cyan uppercase tracking-wider mb-3">\u2705 Vorbereitung & Ablauf</h2><ol className="space-y-2">{disease.preparation.map((step,i)=>(<li key={i} className="flex gap-3 text-sm"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-med-cyan/15 text-med-cyan text-xs font-semibold flex items-center justify-center mt-0.5">{i+1}</span><span className="text-med-text/90 pt-0.5">{step}</span></li>))}</ol></section>
      {disease.notes && (<section className="section-card mb-20 border-med-amber/20 bg-med-amber/5"><h2 className="text-xs font-semibold text-med-amber uppercase tracking-wider mb-2">\u26A0\uFE0F Wichtige Hinweise</h2><p className="text-sm text-med-text/80 leading-relaxed">{disease.notes}</p></section>)}
      <div className="text-center py-4 mb-20"><p className="text-[10px] text-med-muted/40">Diese App dient als Referenzhilfe und ersetzt keine klinische Entscheidung. Angaben ohne Gewähr. Stand: Juni 2026.</p></div>
    </div>
  );
}
