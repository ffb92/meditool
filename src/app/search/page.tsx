'use client';

import { useState } from 'react';
import { getAllDiseases, getCategories } from '@/lib/data';
import { useFavoritesContext } from '../FavoritesProvider';
import { useRecents } from '@/lib/hooks';
import Link from 'next/link';

const categoryIcons: Record<string, string> = {'Chirurgie':'🔪','Kardiologie':'❤️','Neurologie':'🧠','Pflege':'🩹','Notfallmedizin':'🚨','Intensivmedizin':'🫁','Endokrinologie':'🩸','Gastroenterologie':'🔍','Pneumologie':'🫁','Urologie':'💧','Infektiologie':'🦠','Orthopädie':'🦴'};
const urgencyLabels: Record<string, string> = {akut:'Akut',subakut:'Subakut',elektiv:'Elektiv'};

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string|null>(null);
  const diseases = getAllDiseases();
  const categories = getCategories();
  const { isFavorite, toggle } = useFavoritesContext();
  const { addRecent } = useRecents();

  const filtered = diseases.filter((d) => {
    const matchSearch = search===''||d.name.toLowerCase().includes(search.toLowerCase())||d.category.toLowerCase().includes(search.toLowerCase())||d.symptoms.some(s=>s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = !activeCategory||d.category===activeCategory;
    return matchSearch&&matchCat;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-slide-up">
      <h1 className="text-lg font-bold text-white mb-3">Suche</h1>
      <div className="relative mb-4">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-med-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Krankheitsbild, Symptom oder Kategorie..." autoFocus className="w-full bg-med-card border border-white/10 rounded-xl py-3 pl-11 pr-4 text-med-text placeholder:text-med-muted text-sm focus:outline-none focus:border-med-cyan/50 focus:ring-1 focus:ring-med-cyan/30 transition-all"/>
        {search&&<button onClick={()=>setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-med-muted hover:text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none -mx-1 px-1">
        <button onClick={()=>setActiveCategory(null)} className={`chip shrink-0 ${!activeCategory?'bg-med-cyan/20 text-med-cyan border-med-cyan/30':'bg-white/5 text-med-muted border-white/10'}`}>Alle</button>
        {categories.map((cat)=>(<button key={cat} onClick={()=>setActiveCategory(activeCategory===cat?null:cat)} className={`chip shrink-0 ${activeCategory===cat?'bg-med-cyan/20 text-med-cyan border-med-cyan/30':'bg-white/5 text-med-muted border-white/10'}`}>{categoryIcons[cat]||'📋'} {cat}</button>))}
      </div>
      {search&&<p className="text-xs text-med-muted mb-3">{filtered.length} Ergebnis{filtered.length!==1?'se':''}</p>}
      <div className="space-y-2">
        {filtered.map((disease)=>(<div key={disease.id} className="card flex items-start gap-3 group relative"><Link href={`/disease/${disease.id}`} onClick={()=>addRecent(disease.id)} className="flex items-start gap-3 flex-1 min-w-0"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-med-cyan/20 to-med-teal/20 flex items-center justify-center text-lg shrink-0">{categoryIcons[disease.category]||'📋'}</div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-0.5"><h3 className="font-semibold text-sm text-white group-hover:text-med-cyan transition-colors truncate">{disease.name}</h3><span className={`chip text-[10px] px-2 py-0.5 ${disease.urgency==='akut'?'chip-akut':disease.urgency==='subakut'?'chip-subakut':'chip-elektiv'}`}>{urgencyLabels[disease.urgency]}</span></div><p className="text-xs text-med-muted line-clamp-2">{disease.summary}</p><div className="flex items-center gap-1.5 mt-1.5"><span className="text-[10px] text-med-muted/60">{disease.category}</span><span className="text-[10px] text-med-muted/40">·</span><span className="text-[10px] text-med-muted/60">{disease.tools.length} Instr.</span><span className="text-[10px] text-med-muted/40">·</span><span className="text-[10px] text-med-muted/60">{disease.medications.length} Med.</span></div></div></Link><button onClick={(e)=>{e.preventDefault();toggle(disease.id)}} className={`shrink-0 mt-1 p-1.5 rounded-lg transition-all ${isFavorite(disease.id)?'text-med-amber bg-med-amber/10':'text-med-muted/30 hover:text-med-amber hover:bg-med-amber/5'}`}><svg className="w-4 h-4" fill={isFavorite(disease.id)?'currentColor':'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg></button></div>))}
        {filtered.length===0&&<div className="text-center py-16"><div className="text-4xl mb-3">🔍</div><p className="text-med-muted">Kein Krankheitsbild gefunden</p><p className="text-xs text-med-muted/60 mt-1">Versuche einen anderen Suchbegriff</p></div>}
      </div>
      <div className="h-20"/>
    </div>
  );
}
