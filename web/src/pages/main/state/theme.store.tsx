import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { plainSvg } from '../theme/plain';

interface ThemeStore {
  svg: string;
  setSvg: (svg: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      svg: plainSvg,
      setSvg: (svg) => set({ svg }),
    }),
    {
      name: 'exif-frame-theme',
      partialize: (state) => ({
        svg: state.svg,
      }),
    }
  )
);
