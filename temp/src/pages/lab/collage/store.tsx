import { create } from 'zustand';
import Photo from '../../../core/photo';

type Store = {
  photos: Photo[];
  setPhotos: (photos: Photo[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;

  ratio: string;
  setRatio: (ratio: string) => void;

  numberOfRow: number;
  setNumberOfRow: (numberOfRow: number) => void;

  numberOfColumn: number;
  setNumberOfColumn: (numberOfColumn: number) => void;

  paddingTop: number;
  setPaddingTop: (paddingTop: number) => void;

  paddingBottom: number;
  setPaddingBottom: (paddingBottom: number) => void;

  paddingLeft: number;
  setPaddingLeft: (paddingLeft: number) => void;

  paddingRight: number;
  setPaddingRight: (paddingRight: number) => void;

  marginEach: number;
  setMarginEach: (marginEach: number) => void;
};

export const useStore = create<Store>((set) => ({
  photos: [],
  setPhotos: (photos) => set({ photos }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  backgroundColor: localStorage.getItem('lab:backgroundColor') || '#ffffff',
  setBackgroundColor: (backgroundColor) => {
    localStorage.setItem('lab:backgroundColor', backgroundColor);
    set({ backgroundColor });
  },

  ratio: localStorage.getItem('lab:ratio') || '4:5',
  setRatio: (ratio) => {
    localStorage.setItem('lab:ratio', ratio);
    set({ ratio });
  },

  numberOfRow: localStorage.getItem('lab:numberOfRow') ? Number(localStorage.getItem('lab:numberOfRow')) : 2,
  setNumberOfRow: (numberOfRow) => {
    localStorage.setItem('lab:numberOfRow', String(numberOfRow));
    set({ numberOfRow });
  },

  numberOfColumn: localStorage.getItem('lab:numberOfColumn') ? Number(localStorage.getItem('lab:numberOfColumn')) : 2,
  setNumberOfColumn: (numberOfColumn) => {
    localStorage.setItem('lab:numberOfColumn', String(numberOfColumn));
    set({ numberOfColumn });
  },

  paddingTop: localStorage.getItem('lab:paddingTop') ? Number(localStorage.getItem('lab:paddingTop')) : 50,
  setPaddingTop: (paddingTop) => {
    localStorage.setItem('lab:paddingTop', String(paddingTop));
    set({ paddingTop });
  },

  paddingBottom: localStorage.getItem('lab:paddingBottom') ? Number(localStorage.getItem('lab:paddingBottom')) : 50,
  setPaddingBottom: (paddingBottom) => {
    localStorage.setItem('lab:paddingBottom', String(paddingBottom));
    set({ paddingBottom });
  },

  paddingLeft: localStorage.getItem('lab:paddingLeft') ? Number(localStorage.getItem('lab:paddingLeft')) : 50,
  setPaddingLeft: (paddingLeft) => {
    localStorage.setItem('lab:paddingLeft', String(paddingLeft));
    set({ paddingLeft });
  },

  paddingRight: localStorage.getItem('lab:paddingRight') ? Number(localStorage.getItem('lab:paddingRight')) : 50,
  setPaddingRight: (paddingRight) => {
    localStorage.setItem('lab:paddingRight', String(paddingRight));
    set({ paddingRight });
  },

  marginEach: localStorage.getItem('lab:marginEach') ? Number(localStorage.getItem('lab:marginEach')) : 50,
  setMarginEach: (marginEach) => {
    localStorage.setItem('lab:marginEach', String(marginEach));
    set({ marginEach });
  },
}));
