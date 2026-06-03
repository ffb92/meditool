'use client';

import { useState, useRef, useEffect } from 'react';
import { getAllDiseases } from '@/lib/data';
import { useFavoritesContext } from '../FavoritesProvider';
import { useRecents } from '@/lib/hooks';
import Link from 'next/link';

const categoryIcons: Record<string, string> = {'Chirurgie':'🔪','Kardiologie':'❤️','Neurologie':'🧠','Pflege':'🩹','Notfallmedizin':'🚨','Intensivmedizin':'🫁','Endokrinologie':'🩸','Gastroenterologie':'🔍','Pneumologie':'🫁','Urologie':'💧','Infektiologie':'🦠','Orthopädie':'🦴'};
const urgencyLabels: Record<string, string> = {akut:'Akut',subakut:'Subakut',elektiv:'Elektiv'};
const RECENT_SEARCHES_KEY = 'meditool_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<string|null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const diseases = getAllDiseases();
  const { isFavorite, toggle } = useFavoritesContext();
  const { addRecent } = useRecents();

  useEffect(()=>{try{const s=localStorage.getItem(RECENT_SEARCHES_KEY);if(s)setRecentSearches(JSON.parse(s))}catch{};inputRef.current?.focus()},[]);

  const saveSearch=(t:string)=>{if(!t.trim())return;setRecentSearches(p=>{const n=[t,...p.filter(s=>s!==t)].slice(0,MAX_RECENT_SEARCHES);localStorage.setItem(RECENT_SEARCHES_KEY,JSON.stringify(n));return n})};
  const hasInput=search.trim().length>0;
  const filtered=hasInput?diseases.filter(d=>{const q=search.toLowerCase();const m=d.name.toLowerCase().includes(q)||d.category.toLowerCase().includes(q)||d.symptoms.some(s=>s.toLowerCase().includes(q))||d.summary.toLowerCase().includes(q);const u=!urgencyFilter||d.urgency===urgencyFilter;return m&&u}):[];

  const highlight=(text:string,query:string)=>{if(!query)return text;const i=text.toLowerCase().indexOf(query.toLowerCase());if(i===-1)return text;return <>{text.slice(0,i)}<mark className="bg-med-cyan/30 text-med-cyan-light rounded-sm px-0.5">{text.slice(i,i+query.length)}</mark>{text.slice(i+query.length)}</>};

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-slide-up">
      <h1 className="text-lg font-bold text-white mb-3">Suche</h1>
      <form onSubmit={(e)=>{e.preventDefault();if(search.trim())saveSearch(search.trim())}} className="relative mb-3">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-med-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input ref={inputRef} type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Krankheitsbild, Symptom, Medikament..." className="w-full bg-med-card border-2 border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-med-text placeholder:text-med-muted text-base focus:outline-none focus:border-med-cyan focus:ring-4 focus:ring-med-cyan/10 transition-all"/>
        {search&&<button type="button" onClick={()=>{setSearch('');inputRef.current?.focus()}} className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-med-muted hover:bg-white/20 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>}
      </form>

      {hasInput&&<div className="flex gap-2 mb-4">
        {[{k:null,l:'Alle'},{k:'akut',l:'🔴 Akut'},{k:'subakut',l:'🟡 Subakut'},{k:'elektiv',l:'🟢 Elektiv'}].map(f=>(<button key={f.k??'all'} onClick={()=>setUrgencyFilter((!urgencyFilter&&f.k===null)||urgencyFilter===f.k?null:f.k)} className={`chip text-xs transition-all ${((f.k===null&&!urgencyFilter)||urgencyFilter===f.k)?'bg-med-cyan/20 text-med-cyan border-med-cyan/30':'bg-white/5 text-med-muted border-white/10 hover:bg-white/10'}`}>{f.l}</button>))}
        {filtered.length>0&&<span className="text-xs text-med-muted/60 ml-auto self-center">{filtered.length} Treffer</span>}
      </div>}

      {hasInput&&<div className="space-y-2">
        {filtered.map(d=>(<div key={d.id} className="card flex items-start gap-3 group relative"><Link href={`/disease/${d.id}`} onClick={()=>{addRecent(d.id);saveSearch(search.trim())}} className="flex items-start gap-3 flex-1 min-w-0"><div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${d.urgency==='akut'?'bg-med-red/10':d.urgency==='subakut'?'bg-med-amber/10':'bg-med-cyan/10'}`}>{categoryIcons[d.category]||'📋'}</div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-0.5"><h3 className="font-semibold text-sm text-white group-hover:text-med-cyan transition-colors truncate">{highlight(d.name,search.trim())}</h3><span className={`chip text-[10px] px-2 py-0.5 ${d.urgency==='akut'?'chip-akut':d.urgency==='subakut'?'chip-subakut':'chip-elektiv'}`}>{urgencyLabels[d.urgency]}</span></div><p className="text-xs text-med-muted line-clamp-2">{highlight(d.summary,search.trim())}</p><div className="flex items-center gap-1.5 mt-1.5"><span className="text-[10px] text-med-muted/60">{d.category}</span><span className="text-[10px] text-med-muted/40">·</span><span className="text-[10px] text-med-muted/60">{d.tools.length+d.materials.length} Utensilien</span><span className="text-[10px] text-med-muted/40">·</span><span className="text-[10px] text-med-muted/60">{d.medications.length} Med.</span></div>{search.trim()&&d.symptoms.some(s=>s.toLowerCase().includes(search.toLowerCase()))&&<div className="flex flex-wrap gap-1 mt-1.5">{d.symptoms.filter(s=>s.toLowerCase().includes(search.toLowerCase())).slice(0,3).map((s,i)=>(<span key={i} className="chip bg-med-cyan/5 text-med-cyan-light border-med-cyan/10 text-[10px] px-2 py-0.5">{highlight(s,search.trim())}</span>))}</div>}</div></Link><button onClick={e=>{e.preventDefault();toggle(d.id)}} className={`shrink-0 mt-1 p-1.5 rounded-lg transition-all ${isFavorite(d.id)?'text-med-amber bg-med-amber/10':'text-med-muted/20 hover:text-med-amber hover:bg-med-amber/5'}`}><svg className="w-4 h-4" fill={isFavorite(d.id)?'currentColor':'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg></button></div>))}
        {filtered.length===0&&<div className="text-center py-16"><div className="text-5xl mb-3">🔍</div><p className="text-med-muted font-medium">Keine Ergebnisse</p><p className="text-xs text-med-muted/60 mt-1">Für „{search}" wurde nichts gefunden</p></div>}
      </div>}

      {!hasInput&&<div className="animate-slide-up">
        {recentSearches.length>0&&<div className="mb-6"><h3 className="text-xs font-semibold text-med-muted uppercase tracking-wider mb-2">🕐 Letzte Suchen</h3><div className="flex flex-wrap gap-2">{recentSearches.map((t,i)=>(<button key={i} onClick={()=>{setSearch(t);inputRef.current?.focus()}} className="chip bg-white/5 text-med-text/70 border-white/10 hover:bg-white/10 hover:text-white transition-all">{t}</button>))}<button onClick={()=>{setRecentSearches([]);localStorage.removeItem(RECENT_SEARCHES_KEY)}} className="chip bg-transparent text-med-muted/40 border-white/5 text-[10px] hover:text-med-red transition-colors">Löschen</button></div></div>}
        <div className="mb-6"><h3 className="text-xs font-semibold text-med-muted uppercase tracking-wider mb-2">💡 Schnellsuche</h3><div className="flex flex-wrap gap-2">{['Appendizitis','Sepsis','STEMI','Anaphylaxie','Apoplex','Intubation','Lungenembolie','Delir'].map(t=>(<button key={t} onClick={()=>{setSearch(t);inputRef.current?.focus()}} className="chip bg-med-cyan/5 text-med-cyan/80 border-med-cyan/10 hover:bg-med-cyan/10 hover:text-med-cyan transition-all text-xs">{t}</button>))}</div></div>
        <div className="card bg-gradient-to-br from-med-cyan/5 to-med-teal/5 border-med-cyan/10 text-center py-6"><div className="text-3xl mb-2">⌨️</div><p className="text-sm text-med-text/70">Tippe einen <span className="text-med-cyan font-medium">Begriff</span> ein –</p><p className="text-xs text-med-muted mt-0.5">Krankheitsbild, Symptom oder Medikament</p></div>
      </div>}
      <div className="h-20"/>
    </div>
  );
}
