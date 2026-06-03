'use client';

import { useState, useEffect } from 'react';
import type { Disease } from '@/lib/data';
import { useChecklist } from '@/lib/hooks';

interface ChecklistViewProps { disease: Disease; }

export default function ChecklistView({ disease }: ChecklistViewProps) {
  const allItems = [
    ...disease.tools.map(t => `${t.name}||${t.purpose}`),
    ...disease.materials.map(m => `${m.name}||${m.detail}`),
    ...disease.medications.map(m => `${m.name}||${m.dosage}`),
    ...disease.preparation.map(s => `STEP||${s}`),
  ];
  const { checked, toggleItem, resetAll, progress } = useChecklist(disease.id, allItems);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { if (progress === 100 && expanded) { const t = setTimeout(() => setExpanded(false), 2000); return () => clearTimeout(t); } }, [progress, expanded]);
  if (!expanded) return (
    <button onClick={() => setExpanded(true)} className="w-full section-card flex items-center justify-between group hover:border-med-cyan/30 transition-all">
      <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-med-cyan/10 flex items-center justify-center"><span className="text-lg">📋</span></div><div className="text-left"><div className="text-sm font-semibold text-white">Checklisten-Modus</div><div className="text-xs text-med-muted">{disease.tools.length + disease.materials.length + disease.medications.length} Instrumente · {disease.preparation.length} Schritte</div></div></div>
      <div className="flex items-center gap-2">{progress > 0 && <span className="text-xs font-semibold text-med-cyan">{progress}%</span>}<svg className="w-5 h-5 text-med-muted group-hover:text-med-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg></div>
    </button>
  );
  return (
    <div className="section-card border-med-cyan/30 animate-slide-up">
      <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><span className="text-lg">📋</span><h2 className="text-sm font-semibold text-white">Checkliste</h2><span className={`text-xs font-bold ${progress===100?'text-med-green':'text-med-cyan'}`}>{checked.length}/{allItems.length}</span></div><div className="flex items-center gap-2"><button onClick={resetAll} className="text-[10px] text-med-muted hover:text-med-amber transition-colors px-2 py-1 rounded-lg hover:bg-white/5">↺ Reset</button><button onClick={()=>setExpanded(false)} className="text-med-muted hover:text-white p-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button></div></div>
      <div className="h-1.5 rounded-full bg-white/5 mb-3 overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ${progress===100?'bg-med-green':'bg-med-cyan'}`} style={{width:`${progress}%`}}/></div>
      <div className="space-y-1 max-h-[60vh] overflow-y-auto">
        {disease.tools.map((t,i)=>{const isC=checked.includes(`${t.name}||${t.purpose}`);return <button key={`t${i}`} onClick={()=>toggleItem(`${t.name}||${t.purpose}`)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${isC?'bg-med-green/10':'bg-white/5 hover:bg-white/10'}`}><div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${isC?'bg-med-green border-med-green':'border-white/20'}`}>{isC&&<svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}</div><span className={`text-xs ${isC?'text-med-muted/50 line-through':'text-med-text/80'}`}>🏥 {t.name} – <span className="text-med-muted">{t.purpose}</span></span></button>})}
        {disease.materials.map((m,i)=>{const isC=checked.includes(`${m.name}||${m.detail}`);return <button key={`m${i}`} onClick={()=>toggleItem(`${m.name}||${m.detail}`)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${isC?'bg-med-green/10':'bg-white/5 hover:bg-white/10'}`}><div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${isC?'bg-med-green border-med-green':'border-white/20'}`}>{isC&&<svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}</div><span className={`text-xs ${isC?'text-med-muted/50 line-through':'text-med-text/80'}`}>📦 {m.name} <span className="text-med-muted/60">({m.detail})</span></span></button>})}
        {disease.medications.map((m,i)=>{const isC=checked.includes(`${m.name}||${m.dosage}`);return <button key={`med${i}`} onClick={()=>toggleItem(`${m.name}||${m.dosage}`)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${isC?'bg-med-green/10':'bg-white/5 hover:bg-white/10'}`}><div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${isC?'bg-med-green border-med-green':'border-white/20'}`}>{isC&&<svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}</div><span className={`text-xs ${isC?'text-med-muted/50 line-through':'text-med-text/80'}`}>💊 {m.name} <span className="text-med-muted/60">– {m.dosage}</span></span></button>})}
        {disease.preparation.map((s,i)=>{const isC=checked.includes(`STEP||${s}`);return <button key={`p${i}`} onClick={()=>toggleItem(`STEP||${s}`)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${isC?'bg-med-green/10':'bg-white/5 hover:bg-white/10'}`}><div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${isC?'bg-med-green border-med-green':'border-white/20'}`}>{isC&&<svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}</div><div className="flex items-center gap-2 min-w-0"><span className="text-[10px] font-bold text-med-muted/40 w-4 shrink-0">{i+1}</span><span className={`text-xs ${isC?'text-med-muted/50 line-through':'text-med-text/80'}`}>✅ {s}</span></div></button>})}
      </div>
      {progress===100&&<div className="mt-4 py-3 px-4 bg-med-green/10 border border-med-green/20 rounded-xl text-center animate-slide-up"><span className="text-sm font-semibold text-med-green">✅ Alles bereit!</span></div>}
    </div>
  );
}
