'use client';

import { useState } from 'react';
import { getAllDiseases, getCategories, type Disease } from '@/lib/data';
import Link from 'next/link';

const urgencyLabels: Record<string, string> = { akut: 'Akut', subakut: 'Subakut', elektiv: 'Elektiv' };
const categoryIcons: Record<string, string> = { 'Chirurgie': '\uD83D\uDD2A', 'Kardiologie': '\u2764\uFE0F', 'Neurologie': '\uD83E\uDDE0', 'Pflege': '\uD83E\uDE79', 'Notfallmedizin': '\uD83D\uDEA8', 'Intensivmedizin': '\uD83E\uDEC1', 'Endokrinologie': '\uD83E\uDE78', 'Gastroenterologie': '\uD83D\uDD0D' };

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const diseases = getAllDiseases();
  const categories = getCategories();

  const filtered = diseases.filter((d) => {
    const matchSearch = search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase()) || d.symptoms.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = !activeCategory || d.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="relative mb-4">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-med-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Krankheitsbild, Symptom oder Kategorie suchen..." className="w-full bg-med-card border border-white/10 rounded-xl py-3 pl-11 pr-4 text-med-text placeholder:text-med-muted text-sm focus:outline-none focus:border-med-cyan/50 focus:ring-1 focus:ring-med-cyan/30 transition-all" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-3 mb-2 -mx-1 px-1">
        <button onClick={() => setActiveCategory(null)} className={`chip shrink-0 ${!activeCategory ? 'bg-med-cyan/20 text-med-cyan border-med-cyan/30' : 'bg-white/5 text-med-muted border-white/10'}`}>Alle</button>
        {categories.map((cat) => (<button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)} className={`chip shrink-0 ${activeCategory === cat ? 'bg-med-cyan/20 text-med-cyan border-med-cyan/30' : 'bg-white/5 text-med-muted border-white/10'}`}>{(categoryIcons[cat] || '\uD83D\uDCCB')} {cat}</button>))}
      </div>
      <div className="space-y-3 animate-slide-up">
        {filtered.map((disease) => (
          <Link key={disease.id} href={`/disease/${disease.id}`} className="card flex items-start gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-med-cyan/20 to-med-teal/20 flex items-center justify-center text-lg shrink-0">{categoryIcons[disease.category] || '\uD83D\uDCCB'}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-sm text-white group-hover:text-med-cyan transition-colors truncate">{disease.name}</h3>
                <span className={`chip text-[10px] px-2 py-0.5 ${disease.urgency === 'akut' ? 'chip-akut' : disease.urgency === 'subakut' ? 'chip-subakut' : 'chip-elektiv'}`}>{urgencyLabels[disease.urgency]}</span>
              </div>
              <p className="text-xs text-med-muted line-clamp-2">{disease.summary}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] text-med-muted/60">{disease.category}</span>
                <span className="text-[10px] text-med-muted/40">·</span>
                <span className="text-[10px] text-med-muted/60">{disease.tools.length} Instrumente</span>
                <span className="text-[10px] text-med-muted/40">·</span>
                <span className="text-[10px] text-med-muted/60">{disease.medications.length} Medikamente</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-med-muted/40 group-hover:text-med-cyan shrink-0 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        ))}
        {filtered.length === 0 && (<div className="text-center py-16"><div className="text-4xl mb-3">\uD83D\uDD0D</div><p className="text-med-muted">Kein Krankheitsbild gefunden</p></div>)}
      </div>
      <div className="h-20" />
    </div>
  );
}
