'use client';

import { getAllDiseases } from '@/lib/data';
import { useFavoritesContext } from '../FavoritesProvider';
import { useRecents } from '@/lib/hooks';
import Link from 'next/link';

const categoryIcons: Record<string, string> = {'Chirurgie':'🔪','Kardiologie':'❤️','Neurologie':'🧠','Pflege':'🩹','Notfallmedizin':'🚨','Intensivmedizin':'🫁','Endokrinologie':'🩸','Gastroenterologie':'🔍','Pneumologie':'🫁','Urologie':'💧','Infektiologie':'🦠','Orthopädie':'🦴'};
const urgencyLabels: Record<string, string> = {akut:'Akut',subakut:'Subakut',elektiv:'Elektiv'};

export default function FavoritesPage() {
  const diseases = getAllDiseases();
  const { favorites, toggle } = useFavoritesContext();
  const { addRecent } = useRecents();
  const favDiseases = diseases.filter(d=>favorites.includes(d.id));

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-slide-up">
      <div className="flex items-center justify-between mb-1"><h1 className="text-lg font-bold text-white">Merkliste</h1>{favDiseases.length>0&&<span className="chip bg-med-cyan/15 text-med-cyan text-xs">{favDiseases.length} Einträge</span>}</div>
      <p className="text-sm text-med-muted mb-4">Deine gespeicherten Krankheitsbilder für schnellen Zugriff</p>
      {favDiseases.length===0?(
        <div className="text-center py-16"><div className="text-5xl mb-4">⭐</div><p className="text-med-muted mb-3">Noch keine Favoriten gespeichert</p><p className="text-xs text-med-muted/60 mb-5">Tippe auf den Stern neben einem Krankheitsbild,<br/>um es hier zu speichern</p><div className="flex gap-3 justify-center"><Link href="/search" className="chip bg-med-cyan/15 text-med-cyan">🔍 Suche öffnen</Link><Link href="/categories" className="chip bg-white/5 text-med-muted">📂 Katalog öffnen</Link></div></div>
      ):(
        <div className="space-y-2">{favDiseases.map((d)=>(<div key={d.id} className="card flex items-start gap-3 group"><Link href={`/disease/${d.id}`} onClick={()=>addRecent(d.id)} className="flex items-start gap-3 flex-1 min-w-0"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-med-cyan/20 to-med-teal/20 flex items-center justify-center text-lg shrink-0">{categoryIcons[d.category]||'📋'}</div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-0.5"><h3 className="font-semibold text-sm text-white truncate">{d.name}</h3><span className={`chip text-[10px] px-2 py-0.5 ${d.urgency==='akut'?'chip-akut':d.urgency==='subakut'?'chip-subakut':'chip-elektiv'}`}>{urgencyLabels[d.urgency]}</span></div><p className="text-xs text-med-muted line-clamp-1">{d.summary}</p></div><svg className="w-5 h-5 text-med-muted/40 group-hover:text-med-cyan shrink-0 mt-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg></Link><button onClick={(e)=>{e.preventDefault();toggle(d.id)}} className="shrink-0 mt-1 p-1.5 rounded-lg text-med-amber bg-med-amber/10"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg></button></div>))}</div>
      )}
      {favDiseases.length>0&&<div className="mt-6 mb-20 py-4 px-4 bg-med-card rounded-2xl border border-white/5 text-center"><p className="text-xs text-med-muted">Tipp: In <Link href="/search" className="text-med-cyan underline">Suche</Link> oder <Link href="/categories" className="text-med-cyan underline">Katalog</Link> auf den ⭐ Stern tippen</p></div>}
    </div>
  );
}
