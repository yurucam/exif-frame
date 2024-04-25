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

  fixWatermark: boolean;
  setFixWatermark: (fixWatermark: boolean) => void;

  watermark: string;
  setWatermark: (watermark: string) => void;

  exportToJpeg: boolean;
  setExportToJpeg: (exportToJpeg: boolean) => void;

  preview: Photo | null;
  setPreview: (preview: Photo | null) => void;

  focalLength35mmMode: boolean;
  setFocalLength35mmMode: (focalLength35mmMode: boolean) => void;

  disableExposureMeter: boolean;
  setDisableExposureMeter: (disableExposureMeter: boolean) => void;

  ratio: string;
  setRatio: (ratio: string) => void;

  ratioPopover: boolean;
  setRatioPopover: (opened: boolean) => void;

  previewPhoto: Photo | null;
  setPreviewPhoto: (previewPhoto: Photo | null) => void;
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
      if (imageWidth > 4096) imageWidth = 4096;
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

  fixWatermark: localStorage.getItem('fixWatermark') === 'true',
  setFixWatermark: (fixWatermark: boolean) =>
    set(() => {
      localStorage.setItem('fixWatermark', fixWatermark.toString());
      return { fixWatermark };
    }),

  watermark: localStorage.getItem('watermark') || '',
  setWatermark: (watermark: string) =>
    set(() => {
      localStorage.setItem('watermark', watermark);
      return { watermark };
    }),

  exportToJpeg: localStorage.getItem('exportToJpeg') === 'true',
  setExportToJpeg: (exportToJpeg: boolean) =>
    set(() => {
      localStorage.setItem('exportToJpeg', exportToJpeg.toString());
      return { exportToJpeg };
    }),

  preview: null,
  setPreview: (preview: Photo | null) => set({ preview }),

  focalLength35mmMode: localStorage.getItem('focalLength35mmMode') === 'true',
  setFocalLength35mmMode: (focalLength35mmMode: boolean) =>
    set(() => {
      localStorage.setItem('focalLength35mmMode', focalLength35mmMode.toString());
      return { focalLength35mmMode };
    }),

  disableExposureMeter: localStorage.getItem('disableExposureMeter') === 'true',
  setDisableExposureMeter: (disableExposureMeter: boolean) =>
    set(() => {
      localStorage.setItem('disableExposureMeter', disableExposureMeter.toString());
      return { disableExposureMeter };
    }),

  ratio: localStorage.getItem('ratio') || 'free',
  setRatio: (ratio: string) =>
    set(() => {
      localStorage.setItem('ratio', ratio);
      return { ratio };
    }),

  ratioPopover: false,
  setRatioPopover: (opened: boolean) => set({ ratioPopover: opened }),

  previewPhoto: null,
  setPreviewPhoto: (previewPhoto: Photo | null) => set({ previewPhoto }),
}));

// Set the theme on page load
document.getElementById('theme')!.className = useStore.getState().darkMode ? 'dark' : 'light';

export { useStore };

export type { Store };
