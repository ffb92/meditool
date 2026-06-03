'use client';

import React, { createContext, useContext } from 'react';
import { useFavorites } from '@/lib/hooks';

interface FavoritesContextType { favorites: string[]; toggle: (id: string) => void; isFavorite: (id: string) => boolean; }
const FavoritesContext = createContext<FavoritesContextType>({ favorites: [], toggle: () => {}, isFavorite: () => false });
export function useFavoritesContext() { return useContext(FavoritesContext); }
export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const fav = useFavorites();
  return <FavoritesContext.Provider value={fav}>{children}</FavoritesContext.Provider>;
}
