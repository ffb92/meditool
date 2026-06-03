'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useFavoritesContext } from './FavoritesProvider';

const tabs = [
  { href: '/', label: 'Start', icon: (active: boolean) => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2:1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>) },
  { href: '/search', label: 'Suche', icon: (active: boolean) => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2:1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>) },
  { href: '/notfall', label: 'Notfall', icon: (active: boolean) => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2:1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>) },
  { href: '/categories', label: 'Katalog', icon: (active: boolean) => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2:1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>) },
  { href: '/favorites', label: 'Merkliste', icon: (active: boolean) => (<svg className="w-6 h-6" fill={active?'currentColor':'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?0:1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>) },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { favorites } = useFavoritesContext();
  return (
    <nav className="sticky bottom-0 z-50 bg-med-card/95 backdrop-blur-xl border-t border-white/5 safe-bottom">
      <div className="max-w-2xl mx-auto h-16 flex items-stretch">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <Link key={tab.href} href={tab.href} className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors relative ${isActive?'text-med-cyan':'text-med-muted'}`}>
              {tab.href==='/notfall'&&<span className="absolute top-1.5 right-1/4 w-2 h-2 rounded-full bg-med-red animate-pulse"/>}
              {tab.href==='/favorites'&&favorites.length>0&&<span className="absolute top-1.5 right-1/4 min-w-[18px] h-[18px] rounded-full bg-med-cyan text-[10px] font-bold text-white flex items-center justify-center px-1">{favorites.length}</span>}
              {tab.icon(isActive)}
              <span className="text-[10px] font-semibold">{tab.label}</span>
              {isActive&&<div className="absolute -top-px left-1/4 right-1/4 h-0.5 rounded-full bg-med-cyan"/>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
