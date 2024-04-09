import { create } from 'zustand';
import themes from './themes';
import Photo from './core/photo';

type Store = {
  language: 'en' | 'ja' | 'ko';
  setLanguage: (language: 'en' | 'ja' | 'ko') => void;

  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;

  openedPanel: 'left' | 'right' | null;
  setOpenedPanel: (panel: 'left' | 'right' | null) => void;

  languagePopover: boolean;
  setLanguagePopover: (opened: boolean) => void;

  quality: number;
  setQuality: (quality: number) => void;

  fixImageWidth: boolean;
  setFixImageWidth: (fixImageWidth: boolean) => void;

  imageWidth: number;
  setImageWidth: (imageWidth: number) => void;

  showCameraMaker: boolean;
  setShowCameraMaker: (showCameraMaker: boolean) => void;

  showCameraModel: boolean;
  setShowCameraModel: (showCameraModel: boolean) => void;

  showLensModel: boolean;
  setShowLensModel: (showLensModel: boolean) => void;

  overrideCameraMaker: string;
  setOverrideCameraMaker: (overrideCameraMaker: string) => void;

  overrideCameraModel: string;
  setOverrideCameraModel: (overrideCameraModel: string) => void;

  overrideLensModel: string;
  setOverrideLensModel: (overrideLensModel: string) => void;

  selectedThemeName: string;
  setSelectedThemeName: (name: string) => void;

  photos: Photo[];
  setPhotos: (photos: Photo[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  overrideMetadataPopup: boolean;
  setOverrideMetadataPopup: (opened: boolean) => void;

  overrideMetadataTarget: Photo | null;
  setOverrideMetadataTarget: (target: Photo) => void;
};

const useStore = create<Store>((set) => ({
  language: (localStorage.getItem('language') as 'en' | 'ja' | 'ko') || 'en',
  setLanguage: (language: 'en' | 'ja' | 'ko') =>
    set(() => {
      localStorage.setItem('language', language);
      return { language };
    }),

  darkMode: localStorage.getItem('darkMode') === 'true',
  setDarkMode: (darkMode: boolean) =>
    set(() => {
      document.getElementById('theme')!.className = darkMode ? 'dark' : 'light';
      localStorage.setItem('darkMode', darkMode.toString());
      return { darkMode };
    }),

  openedPanel: null,
  setOpenedPanel: (panel: 'left' | 'right' | null) => set({ openedPanel: panel }),

  languagePopover: false,
  setLanguagePopover: (opened: boolean) => set({ languagePopover: opened }),

  quality: parseInt(localStorage.getItem('quality') || '100'),
  setQuality: (quality: number) =>
    set(() => {
      localStorage.setItem('quality', quality.toString());
      return { quality };
    }),

  fixImageWidth: localStorage.getItem('fixImageWidth') === 'true',
  setFixImageWidth: (fixImageWidth: boolean) =>
    set(() => {
      localStorage.setItem('fixImageWidth', fixImageWidth.toString());
      return { fixImageWidth };
    }),

  imageWidth: parseInt(localStorage.getItem('imageWidth') || '1920'),
  setImageWidth: (imageWidth: number) =>
    set(() => {
      localStorage.setItem('imageWidth', imageWidth.toString() || '1920');
      return { imageWidth: imageWidth || 1920 };
    }),

  showCameraMaker: localStorage.getItem('showCameraMaker') !== 'false',
  setShowCameraMaker: (showCameraMaker: boolean) =>
    set(() => {
      localStorage.setItem('showCameraMaker', showCameraMaker.toString());
      return { showCameraMaker };
    }),

  showCameraModel: localStorage.getItem('showCameraModel') !== 'false',
  setShowCameraModel: (showCameraModel: boolean) =>
    set(() => {
      localStorage.setItem('showCameraModel', showCameraModel.toString());
      return { showCameraModel };
    }),

  showLensModel: localStorage.getItem('showLensModel') !== 'false',
  setShowLensModel: (showLensModel: boolean) =>
    set(() => {
      localStorage.setItem('showLensModel', showLensModel.toString());
      return { showLensModel };
    }),

  overrideCameraMaker: localStorage.getItem('overrideCameraMaker') || '',
  setOverrideCameraMaker: (overrideCameraMaker: string) =>
    set(() => {
      localStorage.setItem('overrideCameraMaker', overrideCameraMaker);
      return { overrideCameraMaker };
    }),

  overrideCameraModel: localStorage.getItem('overrideCameraModel') || '',
  setOverrideCameraModel: (overrideCameraModel: string) =>
    set(() => {
      localStorage.setItem('overrideCameraModel', overrideCameraModel);
      return { overrideCameraModel };
    }),

  overrideLensModel: localStorage.getItem('overrideLensModel') || '',
  setOverrideLensModel: (overrideLensModel: string) =>
    set(() => {
      localStorage.setItem('overrideLensModel', overrideLensModel);
      return { overrideLensModel };
    }),

  selectedThemeName: themes.find((theme) => theme.name === localStorage.getItem('selectedThemeName'))?.name || themes[0].name,
  setSelectedThemeName: (selectedThemeName: string) =>
    set(() => {
      localStorage.setItem('selectedThemeName', selectedThemeName);
      return { selectedThemeName };
    }),

  photos: [],
  setPhotos: (photos: Photo[]) => set({ photos }),

  loading: false,
  setLoading: (loading: boolean) => set({ loading }),

  overrideMetadataPopup: false,
  setOverrideMetadataPopup: (opened: boolean) => set({ overrideMetadataPopup: opened }),

  overrideMetadataTarget: null,
  setOverrideMetadataTarget: (target: Photo) => set({ overrideMetadataTarget: target }),
}));

// Set the theme on page load
document.getElementById('theme')!.className = useStore.getState().darkMode ? 'dark' : 'light';

export { useStore };
