import { create } from 'zustand';
import Photo from '../../../core/photo';

type Store = {
  photos: Photo[];
  setPhotos: (photos: Photo[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  photos: [],
  setPhotos: (photos) => set({ photos }),

  loading: false,
  setLoading: (loading) => set({ loading }),
}));
