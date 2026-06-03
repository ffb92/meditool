'use client';

import { useState } from 'react';
import { getAllDiseases, getCategories } from '@/lib/data';
import { useFavoritesContext } from '../FavoritesProvider';
import Link from 'next/link';

const categoryIcons: Record<string, string> = {'Chirurgie':'🔪','Kardiologie':'❤️','Neurologie':'🧠','Pflege':'🩹','Notfallmedizin':'🚨','Intensivmedizin':'🫁','Endokrinologie':'🩸','Gastroenterologie':'🔍','Pneumologie':'🫁','Urologie':'💧','Infektiologie':'🦠','Orthopädie':'🦴'};
const categoryColors: Record<string, string> = {'Notfallmedizin':'from-med-red/20 to-med-red/5 border-med-red/20','Kardiologie':'from-med-red/20 to-med-red/5 border-med-red/15','Chirurgie':'from-blue-500/20 to-blue-500/5 border-blue-500/15','Neurologie':'from-purple-500/20 to-purple-500/5 border-purple-500/15','Intensivmedizin':'from-med-cyan/20 to-med-cyan/5 border-med-cyan/15','Pflege':'from-med-teal/20 to-med-teal/5 border-med-teal/15','Gastroenterologie':'from-amber-500/20 to-amber-500/5 border-amber-500/15','Infektiologie':'from-yellow-500/20 to-yellow-500/5 border-yellow-500/15','Pneumologie':'from-sky-500/20 to-sky-500/5 border-sky-500/15','Endokrinologie':'from-pink-500/20 to-pink-500/5 border-pink-500/15','Urologie':'from-indigo-500/20 to-indigo-500/5 border-indigo-500/15','Orthopädie':'from-emerald-500/20 to-emerald-500/5 border-emerald-500/15'};
const urgencyLabels: Record<string, string> = {akut:'Akut',subakut:'Subakut',elektiv:'Elektiv'};

export default function CategoriesPage() {
  const diseases = getAllDiseases();
  const categories = getCategories();
  const { isFavorite, toggle } = useFavoritesContext();
  const [expandedCat, setExpandedCat] = useState<string|null>(null);
  const [urgencyFilter, setUrgencyFilter] = useState<string|null>(null);

  const grouped = categories.map(cat=>{const cd=diseases.filter(d=>d.category===cat&&(!urgencyFilter||d.urgency===urgencyFilter));return{name:cat,icon:categoryIcons[cat]||'📋',color:categoryColors[cat]||'from-med-cyan/20 to-med-cyan/5 border-med-cyan/15',diseases:cd,akutCount:diseases.filter(d=>d.category===cat&&d.urgency==='akut').length,totalCount:diseases.filter(d=>d.category===cat).length}}).filter(g=>g.diseases.length>0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-slide-up">
      <div className="flex items-center justify-between mb-1"><h1 className="text-lg font-bold text-white">Katalog</h1><span className="text-xs text-med-muted">{diseases.length} Einträge</span></div>
      <p className="text-sm text-med-muted mb-4">Nach Fachbereich stöbern</p>
      <div className="flex gap-2 mb-5">
        {[{k:null,l:'Alle',i:'📋'},{k:'akut',l:'Akut',i:'🔴'},{k:'subakut',l:'Subakut',i:'🟡'},{k:'elektiv',l:'Elektiv',i:'🟢'}].map(f=>(<button key={f.k??'all'} onClick={()=>{const isActive=(f.k===null&&!urgencyFilter)||urgencyFilter===f.k;setUrgencyFilter(isActive?null:f.k)}} className={`chip text-xs transition-all ${(f.k===null&&!urgencyFilter)||urgencyFilter===f.k?'bg-med-cyan/20 text-med-cyan border-med-cyan/30':'bg-white/5 text-med-muted border-white/10 hover:bg-white/10'}`}>{f.i} {f.l}</button>))}
      </div>
      <div className="space-y-3">
        {grouped.map(group=>{const isExpanded=expandedCat===group.name;return(<div key={group.name}>
          <button onClick={()=>setExpandedCat(isExpanded?null:group.name)} className={`w-full rounded-2xl p-4 border text-left transition-all duration-200 bg-gradient-to-br ${group.color} ${isExpanded?'scale-[1.01] shadow-lg shadow-med-cyan/5':'hover:scale-[1.005]'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${isExpanded?'bg-white/15':'bg-white/5'}`}>{group.icon}</div><div><h2 className="font-bold text-white text-base">{group.name}</h2><div className="flex items-center gap-2 mt-0.5"><span className="text-xs text-med-muted">{urgencyFilter?group.diseases.length:group.totalCount} Einträge</span>{group.akutCount>0&&!urgencyFilter&&<span className="chip chip-akut text-[10px] px-2 py-0.5">{group.akutCount} akut</span>}</div></div></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isExpanded?'bg-white/15 rotate-180':'bg-white/5'}`}><svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
            </div>
            {!isExpanded&&<div className="flex flex-wrap gap-1.5 mt-3">{group.diseases.slice(0,4).map(d=>(<span key={d.id} className={`chip text-[10px] px-2 py-0.5 ${d.urgency==='akut'?'chip-akut bg-med-red/5':d.urgency==='subakut'?'chip-subakut bg-med-amber/5':'chip-elektiv bg-med-green/5'}`}>{d.name}</span>))}{group.diseases.length>4&&<span className="chip bg-white/5 text-med-muted/50 text-[10px] px-2 py-0.5">+{group.diseases.length-4} mehr</span>}</div>}
          </button>
          {isExpanded&&<div className="ml-4 mt-2 space-y-1 border-l-2 border-white/5 pl-4 animate-slide-up">{group.diseases.map(d=>(<div key={d.id} className="flex items-center justify-between py-2 px-3 -mx-3 rounded-xl hover:bg-white/5 transition-colors group"><Link href={`/disease/${d.id}`} className="flex-1 min-w-0 flex items-center gap-2.5"><span className={`w-2 h-2 rounded-full shrink-0 ${d.urgency==='akut'?'bg-med-red':d.urgency==='subakut'?'bg-med-amber':'bg-med-green'}`}/><div className="min-w-0"><span className="text-sm text-med-text/80 group-hover:text-white truncate block">{d.name}</span><span className="text-[10px] text-med-muted/50">{d.tools.length+d.materials.length} Utensilien · {d.medications.length} Med.</span></div></Link><div className="flex items-center gap-2 shrink-0"><span className={`chip text-[10px] px-2 py-0.5 ${d.urgency==='akut'?'chip-akut':d.urgency==='subakut'?'chip-subakut':'chip-elektiv'}`}>{urgencyLabels[d.urgency]}</span><button onClick={e=>{e.preventDefault();toggle(d.id)}} className={`p-1.5 rounded-lg transition-all ${isFavorite(d.id)?'text-med-amber bg-med-amber/10':'text-med-muted/20 hover:text-med-amber'}`}><svg className="w-3.5 h-3.5" fill={isFavorite(d.id)?'currentColor':'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg></button></div></div>))}</div>}
        </div>)})}
      </div>
      <div className="h-20"/>
    </div>
  );
}
