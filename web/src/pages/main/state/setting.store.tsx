import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingState {
  darkMode: boolean;
  initializeDarkMode: () => void;
  toggleDarkMode: () => void;

  maintainExifMetadata: boolean;
  toggleMaintainExifMetadata: () => void;

  webpMode: boolean;
  toggleWebpMode: () => void;
}

export const useSettingStore = create<SettingState>()(
  persist(
    (set, get) => ({
      darkMode: false,
      initializeDarkMode: () => {
        const currentDarkMode = get().darkMode;
        document.getElementById('theme')!.className = currentDarkMode ? 'dark' : 'light';
      },
      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode;
        document.getElementById('theme')!.className = newDarkMode ? 'dark' : 'light';
        set({ darkMode: newDarkMode });
      },

      maintainExifMetadata: true,
      toggleMaintainExifMetadata: () => {
        set({ maintainExifMetadata: !get().maintainExifMetadata });
      },

      webpMode: true,
      toggleWebpMode: () => set({ webpMode: !get().webpMode }),
    }),
    {
      name: 'exif-frame-setting',
      partialize: (state) => ({
        darkMode: state.darkMode,
        maintainExifMetadata: state.maintainExifMetadata,
        webpMode: state.webpMode,
      }),
    }
  )
);
