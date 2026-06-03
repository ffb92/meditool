'use client';

import { getAllDiseases, getCategories } from '@/lib/data';
import { useFavoritesContext } from '../FavoritesProvider';
import Link from 'next/link';

const categoryIcons: Record<string, string> = {'Chirurgie':'🔪','Kardiologie':'❤️','Neurologie':'🧠','Pflege':'🩹','Notfallmedizin':'🚨','Intensivmedizin':'🫁','Endokrinologie':'🩸','Gastroenterologie':'🔍','Pneumologie':'🫁','Urologie':'💧','Infektiologie':'🦠','Orthopädie':'🦴'};
const urgencyLabels: Record<string, string> = {akut:'Akut',subakut:'Subakut',elektiv:'Elektiv'};

export default function CategoriesPage() {
  const diseases = getAllDiseases();
  const categories = getCategories();
  const { isFavorite, toggle } = useFavoritesContext();

  const grouped = categories.map(cat=>({name:cat,icon:categoryIcons[cat]||'📋',diseases:diseases.filter(d=>d.category===cat),akutCount:diseases.filter(d=>d.category===cat&&d.urgency==='akut').length}));

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-slide-up">
      <h1 className="text-lg font-bold text-white mb-1">Katalog</h1>
      <p className="text-sm text-med-muted mb-4">{diseases.length} Krankheitsbilder in {categories.length} Kategorien</p>
      <div className="space-y-3">
        {grouped.map((group)=>(<div key={group.name} className="card"><div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><span className="text-xl">{group.icon}</span><div><h2 className="font-semibold text-white text-sm">{group.name}</h2><p className="text-[11px] text-med-muted">{group.diseases.length} Einträge{group.akutCount>0?` · ${group.akutCount} akut`:''}</p></div></div><svg className="w-5 h-5 text-med-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div><div className="space-y-1.5">{group.diseases.map((d)=>(<div key={d.id} className="flex items-center justify-between py-1.5 px-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors group"><Link href={`/disease/${d.id}`} className="flex-1 min-w-0"><span className="text-sm text-med-text/80 group-hover:text-white truncate">{d.name}</span></Link><div className="flex items-center gap-2 shrink-0"><span className={`chip text-[10px] px-2 py-0.5 ${d.urgency==='akut'?'chip-akut':d.urgency==='subakut'?'chip-subakut':'chip-elektiv'}`}>{urgencyLabels[d.urgency]}</span><button onClick={(e)=>{e.preventDefault();toggle(d.id)}} className={`p-1 rounded-lg transition-all ${isFavorite(d.id)?'text-med-amber bg-med-amber/10':'text-med-muted/30 hover:text-med-amber'}`}><svg className="w-3.5 h-3.5" fill={isFavorite(d.id)?'currentColor':'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg></button></div></div>))}</div></div>))}
      </div>
      <div className="h-20"/>
    </div>
  );
}
