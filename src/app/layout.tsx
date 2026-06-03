import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from './BottomNav';
import FavoritesProvider from './FavoritesProvider';

export const metadata: Metadata = {
  title: 'MediTool – Krankheitsbild-Assistent',
  description: 'Referenz-App für Pflegekräfte und medizinisches Personal.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'MediTool' },
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: false, themeColor: '#0891B2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head><link rel="apple-touch-icon" href="/icon-192.png"/></head>
      <body className="min-h-screen flex flex-col">
        <FavoritesProvider>
          <header className="sticky top-0 z-50 bg-med-bg/90 backdrop-blur-xl border-b border-white/5 safe-top">
            <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-med-cyan to-med-teal flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                </div>
                <span className="font-bold text-lg tracking-tight">Medi<span className="text-med-cyan">Tool</span></span>
              </a>
              <span className="chip bg-med-cyan/10 text-med-cyan text-[10px] px-2 py-0.5">v1.2</span>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <BottomNav/>
        </FavoritesProvider>
      </body>
    </html>
  );
}
