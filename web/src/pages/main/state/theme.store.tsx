import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  svg: string;
  setSvg: (svg: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      svg: `
<svg viewBox="0 0 ${'${'}IMAGE_WIDTH} ${'${'}IMAGE_HEIGHT}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image x="0" y="0" width="${'${'}IMAGE_WIDTH}" height="${'${'}IMAGE_HEIGHT}" xlink:href="${'${'}IMAGE_DATA}" />
</svg>`.trimStart(),
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
