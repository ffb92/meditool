'use client';

import { useMemo } from 'react';
import { getAllDiseases } from '@/lib/data';
import { useFavoritesContext } from './FavoritesProvider';
import { useRecents } from '@/lib/hooks';
import Link from 'next/link';

const categoryIcons: Record<string, string> = {'Chirurgie':'🔪','Kardiologie':'❤️','Neurologie':'🧠','Pflege':'🩹','Notfallmedizin':'🚨','Intensivmedizin':'🫁','Endokrinologie':'🩸','Gastroenterologie':'🔍','Pneumologie':'🫁','Urologie':'💧','Infektiologie':'🦠','Orthopädie':'🦴'};
const urgencyLabels: Record<string, string> = {akut:'Akut',subakut:'Subakut',elektiv:'Elektiv'};

export default function DashboardPage() {
  const diseases = getAllDiseases();
  const { favorites } = useFavoritesContext();
  const { recents, addRecent } = useRecents();
  const stats = useMemo(()=>{const akut=diseases.filter(d=>d.urgency==='akut').length;const cats=new Set(diseases.map(d=>d.category)).size;return{total:diseases.length,akut,categories:cats}},[diseases]);
  const favDiseases = diseases.filter(d=>favorites.includes(d.id));
  const recentDiseases = recents.map(id=>diseases.find(d=>d.id===id)).filter(Boolean) as typeof diseases;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-slide-up">
      <div className="mb-5"><h1 className="text-xl font-bold text-white mb-1">Guten Dienst! 👋</h1><p className="text-sm text-med-muted">Alles griffbereit für deine Schicht.</p></div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="card text-center py-3"><div className="text-2xl font-bold text-med-cyan">{stats.total}</div><div className="text-[10px] text-med-muted mt-0.5">Einträge</div></div>
        <div className="card text-center py-3"><div className="text-2xl font-bold text-med-red">{stats.akut}</div><div className="text-[10px] text-med-muted mt-0.5">Akut</div></div>
        <div className="card text-center py-3"><div className="text-2xl font-bold text-med-teal">{stats.categories}</div><div className="text-[10px] text-med-muted mt-0.5">Kategorien</div></div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <Link href="/notfall" className="card bg-med-red/5 border-med-red/20 flex items-center gap-3 group"><div className="w-10 h-10 rounded-xl bg-med-red/15 flex items-center justify-center text-xl">🚨</div><div><div className="text-sm font-semibold text-white group-hover:text-med-red transition-colors">Notfall</div><div className="text-[10px] text-med-muted">Alle Akut-Fälle</div></div></Link>
        <Link href="/search" className="card flex items-center gap-3 group"><div className="w-10 h-10 rounded-xl bg-med-cyan/15 flex items-center justify-center text-xl">🔍</div><div><div className="text-sm font-semibold text-white group-hover:text-med-cyan transition-colors">Suche</div><div className="text-[10px] text-med-muted">Symptom, Eingriff...</div></div></Link>
      </div>
      {favDiseases.length>0&&<div className="mb-5"><div className="flex items-center justify-between mb-3"><h2 className="text-sm font-semibold text-white flex items-center gap-2"><span>⭐</span> Deine Merkliste</h2><Link href="/favorites" className="text-[11px] text-med-cyan hover:underline">Alle</Link></div><div className="space-y-2">{favDiseases.slice(0,4).map((d)=>(<Link key={d.id} href={`/disease/${d.id}`} onClick={()=>addRecent(d.id)} className="card flex items-center gap-3 group py-2.5"><span className="text-lg">{categoryIcons[d.category]||'📋'}</span><div className="flex-1 min-w-0"><div className="text-sm font-medium text-white truncate">{d.name}</div><div className="text-[10px] text-med-muted">{d.category}</div></div><span className={`chip text-[10px] px-2 py-0.5 ${d.urgency==='akut'?'chip-akut':d.urgency==='subakut'?'chip-subakut':'chip-elektiv'}`}>{urgencyLabels[d.urgency]}</span></Link>))}</div></div>}
      {recentDiseases.length>0&&<div className="mb-20"><h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-3"><span>🕐</span> Zuletzt angesehen</h2><div className="space-y-2">{recentDiseases.slice(0,5).map((d)=>(<Link key={d.id} href={`/disease/${d.id}`} onClick={()=>addRecent(d.id)} className="card flex items-center gap-3 group py-2.5"><span className="text-lg">{categoryIcons[d.category]||'📋'}</span><div className="flex-1 min-w-0"><div className="text-sm font-medium text-white truncate">{d.name}</div><div className="text-[10px] text-med-muted">{d.category}</div></div><span className={`chip text-[10px] px-2 py-0.5 ${d.urgency==='akut'?'chip-akut':d.urgency==='subakut'?'chip-subakut':'chip-elektiv'}`}>{urgencyLabels[d.urgency]}</span></Link>))}</div></div>}
      {favDiseases.length===0&&recentDiseases.length===0&&<div className="text-center py-12 mb-20"><div className="text-5xl mb-4">🏥</div><p className="text-med-muted mb-1">Noch keine Favoriten oder Verlauf</p><p className="text-xs text-med-muted/60 mb-4">Erkunde den Katalog und speichere wichtige Einträge</p><Link href="/categories" className="inline-flex items-center gap-1.5 chip bg-med-cyan/15 text-med-cyan">📂 Katalog öffnen</Link></div>}
    </div>
  );
}
