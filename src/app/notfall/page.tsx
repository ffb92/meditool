'use client';

import { useState } from 'react';
import { getAllDiseases } from '@/lib/data';
import { notfallMedikamente, type NotfallMedikament } from '@/lib/notfallmedikamente';
import { useRecents } from '@/lib/hooks';
import Link from 'next/link';

const categoryIcons: Record<string, string> = {'Chirurgie':'🔪','Kardiologie':'❤️','Neurologie':'🧠','Pflege':'🩹','Notfallmedizin':'🚨','Intensivmedizin':'🫁','Endokrinologie':'🩸','Gastroenterologie':'🔍','Pneumologie':'🫁','Urologie':'💧','Infektiologie':'🦠','Orthopädie':'🦴'};

export default function NotfallPage() {
  const diseases = getAllDiseases().filter(d=>d.urgency==='akut');
  const { addRecent } = useRecents();
  const [activeTab, setActiveTab] = useState<'krankheiten'|'medikamente'>('krankheiten');
  const [medSearch, setMedSearch] = useState('');
  const [selectedMed, setSelectedMed] = useState<NotfallMedikament|null>(null);

  const filteredMeds = notfallMedikamente.filter(m=>medSearch===''||m.name.toLowerCase().includes(medSearch.toLowerCase())||m.wirkstoff.toLowerCase().includes(medSearch.toLowerCase())||m.indikation.toLowerCase().includes(medSearch.toLowerCase()));
  const medCategories = [...new Set(notfallMedikamente.map(m=>m.kategorie))];

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-slide-up">
      <h1 className="text-lg font-bold text-white">Notfall</h1>
      <p className="text-sm text-med-muted mb-4">Schnellzugriff für kritische Situationen</p>
      <div className="flex bg-med-card rounded-xl p-1 mb-4 border border-white/5">
        <button onClick={()=>setActiveTab('krankheiten')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab==='krankheiten'?'bg-med-cyan text-white shadow-lg':'text-med-muted'}`}>🏥 Krankheitsbilder ({diseases.length})</button>
        <button onClick={()=>{setActiveTab('medikamente');setSelectedMed(null)}} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab==='medikamente'?'bg-med-cyan text-white shadow-lg':'text-med-muted'}`}>💊 Medikamente ({notfallMedikamente.length})</button>
      </div>

      {activeTab==='krankheiten'&&<>
        {diseases.length>0&&<div className="card bg-med-amber/5 border-med-amber/20 mb-4 flex items-center gap-3"><span className="text-2xl">⚠️</span><div><div className="text-sm font-semibold text-med-amber">{diseases.length} akute Krankheitsbilder</div><div className="text-xs text-med-muted">Große Tippflächen für schnellen Zugriff</div></div></div>}
        <div className="space-y-3">
          {diseases.map((d)=>(<Link key={d.id} href={`/disease/${d.id}`} onClick={()=>addRecent(d.id)} className="card border-med-red/20 bg-med-red/5 block group"><div className="flex items-center gap-3 mb-2"><div className="w-12 h-12 rounded-2xl bg-med-red/15 flex items-center justify-center text-2xl">{categoryIcons[d.category]||'📋'}</div><div className="flex-1 min-w-0"><h3 className="font-bold text-white group-hover:text-med-red transition-colors">{d.name}</h3><p className="text-xs text-med-muted mt-0.5">{d.category}</p></div><span className="chip chip-akut text-xs px-3 py-1">🔴 Akut</span></div><p className="text-xs text-med-text/70 line-clamp-2">{d.summary}</p><div className="flex flex-wrap gap-1 mt-2">{d.symptoms.slice(0,4).map((s,i)=>(<span key={i} className="chip bg-med-red/5 text-med-text/60 border-med-red/10 text-[10px] px-2 py-0.5">{s}</span>))}</div></Link>))}
        </div>
      </>}

      {activeTab==='medikamente'&&<>
        <div className="relative mb-4"><svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-med-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><input type="text" value={medSearch} onChange={(e)=>setMedSearch(e.target.value)} placeholder="Medikament oder Wirkstoff suchen..." className="w-full bg-med-card border border-white/10 rounded-xl py-3 pl-11 pr-4 text-med-text placeholder:text-med-muted text-sm focus:outline-none focus:border-med-cyan/50 transition-all"/></div>
        {selectedMed&&<div className="section-card border-med-cyan/30 mb-4 animate-slide-up"><div className="flex items-center justify-between mb-3"><h2 className="text-base font-bold text-white">{selectedMed.name}</h2><button onClick={()=>setSelectedMed(null)} className="text-med-muted hover:text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button></div><div className="space-y-2 text-sm"><div className="flex items-center justify-between py-1.5 border-b border-white/5"><span className="text-med-muted">Wirkstoff</span><span className="text-white font-medium">{selectedMed.wirkstoff}</span></div><div className="flex items-start justify-between py-1.5 border-b border-white/5"><span className="text-med-muted shrink-0 mr-4">Indikation</span><span className="text-white text-right">{selectedMed.indikation}</span></div><div className="flex items-start justify-between py-1.5 border-b border-white/5"><span className="text-med-muted shrink-0 mr-4">Dosierung</span><span className="text-med-cyan font-semibold text-right">{selectedMed.dosierung}</span></div><div className="flex items-center justify-between py-1.5 border-b border-white/5"><span className="text-med-muted">Applikation</span><span className="text-white">{selectedMed.applikation}</span></div><div className="flex items-center justify-between py-1.5 border-b border-white/5"><span className="text-med-muted">Maximaldosis</span><span className="text-med-amber">{selectedMed.maxDosis}</span></div><div className="py-1.5"><span className="text-med-muted block mb-1">⚠️ Hinweise</span><p className="text-med-text/80 text-xs leading-relaxed">{selectedMed.hinweise}</p></div></div></div>}
        {!medSearch&&<div className="space-y-4">{medCategories.map(cat=>{const meds=notfallMedikamente.filter(m=>m.kategorie===cat);return<div key={cat}><h3 className="text-[11px] font-semibold text-med-muted uppercase tracking-wider mb-2">{cat}</h3><div className="space-y-1.5">{meds.map(m=>(<button key={m.wirkstoff} onClick={()=>setSelectedMed(m)} className={`w-full card text-left py-3 flex items-center justify-between group ${selectedMed?.wirkstoff===m.wirkstoff?'border-med-cyan/30 bg-med-cyan/5':''}`}><div><div className="text-sm font-medium text-white">{m.name}</div><div className="text-[10px] text-med-muted">{m.indikation}</div></div><svg className="w-4 h-4 text-med-muted group-hover:text-med-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg></button>))}</div></div>})}</div>}
        {medSearch&&<div className="space-y-1.5">{filteredMeds.map(m=>(<button key={m.wirkstoff} onClick={()=>setSelectedMed(m)} className={`w-full card text-left py-3 flex items-center justify-between group ${selectedMed?.wirkstoff===m.wirkstoff?'border-med-cyan/30 bg-med-cyan/5':''}`}><div><div className="text-sm font-medium text-white">{m.name}</div><div className="text-[10px] text-med-muted">{m.kategorie} – {m.indikation}</div></div><svg className="w-4 h-4 text-med-muted group-hover:text-med-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg></button>))}{filteredMeds.length===0&&<div className="text-center py-12"><p className="text-med-muted">Kein Medikament gefunden</p></div>}</div>}
      </>}
      <div className="h-20"/>
    </div>
  );
}
