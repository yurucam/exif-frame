import { create } from 'zustand';

interface LoadingStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>()((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
