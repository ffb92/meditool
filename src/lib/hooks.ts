'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'meditool_favorites';
const RECENTS_KEY = 'meditool_recents';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = useCallback((id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
}

const MAX_RECENTS = 8;

export function useRecents() {
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTS_KEY);
      if (stored) setRecents(JSON.parse(stored));
    } catch {}
  }, []);

  const addRecent = useCallback((id: string) => {
    setRecents(prev => {
      const next = [id, ...prev.filter(r => r !== id)].slice(0, MAX_RECENTS);
      localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { recents, addRecent };
}

const CHECKLISTS_KEY = 'meditool_checklists';
type ChecklistState = Record<string, string[]>;

export function useChecklist(diseaseId: string, items: string[]) {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CHECKLISTS_KEY);
      if (stored) {
        const all: ChecklistState = JSON.parse(stored);
        setChecked(all[diseaseId] || []);
      }
    } catch {}
  }, [diseaseId]);

  const toggleItem = useCallback((item: string) => {
    setChecked(prev => {
      const next = prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item];
      try {
        const stored = localStorage.getItem(CHECKLISTS_KEY);
        const all: ChecklistState = stored ? JSON.parse(stored) : {};
        all[diseaseId] = next;
        localStorage.setItem(CHECKLISTS_KEY, JSON.stringify(all));
      } catch {}
      return next;
    });
  }, [diseaseId]);

  const resetAll = useCallback(() => {
    setChecked([]);
    try {
      const stored = localStorage.getItem(CHECKLISTS_KEY);
      const all: ChecklistState = stored ? JSON.parse(stored) : {};
      all[diseaseId] = [];
      localStorage.setItem(CHECKLISTS_KEY, JSON.stringify(all));
    } catch {}
  }, [diseaseId]);

  const progress = items.length > 0 ? Math.round((checked.length / items.length) * 100) : 0;

  return { checked, toggleItem, resetAll, progress };
}
