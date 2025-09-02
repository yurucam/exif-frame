import { create } from 'zustand';

interface TabIndexStore {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
}

export const useTabIndexStore = create<TabIndexStore>()((set) => ({
  tabIndex: 0,
  setTabIndex: (tabIndex) => set({ tabIndex }),
}));
