import { create } from 'zustand';

import { Picture } from '../core/picture';

interface PictureStore {
  pictures: Picture[];
  setPictures: (pictures: Picture[]) => void;
}

export const usePictureStore = create<PictureStore>()((set) => ({
  pictures: [],
  setPictures: (pictures) => set({ pictures }),
}));
