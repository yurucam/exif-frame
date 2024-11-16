import { create } from 'zustand';
import themes from './themes';
import Photo from './core/photo';

type Store = {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;

  overrideMetadataIndexPopup: boolean;
  setOverrideMetadataIndexPopup: (opened: boolean) => void;

  overrideMetadataIndex: number | null;
  setOverrideMetadataIndex: (overrideMetadataIndex: number | null) => void;

  overridableMetadata: { [key: string]: string }[];
  setOverridableMetadata: (overridableMetadata: { [key: string]: string }[]) => void;

  addOverridableMetadataPopup: boolean;
  setAddOverridableMetadataPopup: (opened: boolean) => void;

  rerenderOptions: number;
  setRerenderOptions: () => void;

  language: 'en' | 'ja' | 'ko' | 'zh-CN';
  setLanguage: (language: 'en' | 'ja' | 'ko' | 'zh-CN') => void;

  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;

  openedPanel: 'left' | 'right' | null;
  setOpenedPanel: (panel: 'left' | 'right' | null) => void;

  openedAddPhotoErrorDialog: boolean;
  setOpenedAddPhotoErrorDialog: (opened: boolean) => void;

  languagePopover: boolean;
  setLanguagePopover: (opened: boolean) => void;

  quality: number;
  setQuality: (quality: number) => void;

  dateNotationPopover: boolean;
  setDateNotationPopover: (opened: boolean) => void;

  dateNotation: string;
  setDateNotation: (dateNotation: string) => void;

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

  maintainExif: boolean;
  setMaintainExif: (maintainExif: boolean) => void;

  preview: Photo | null;
  setPreview: (preview: Photo | null) => void;

  focalLength35mmMode: boolean;
  setFocalLength35mmMode: (focalLength35mmMode: boolean) => void;

  focalLengthRatioMode: boolean;
  setFocalLengthRatioMode: (focalLengthRatioMode: boolean) => void;

  focalLengthRatio: number;
  setFocalLengthRatio: (focalLengthRatio: number) => void;

  disableExposureMeter: boolean;
  setDisableExposureMeter: (disableExposureMeter: boolean) => void;

  ratio: string;
  setRatio: (ratio: string) => void;

  ratioPopover: boolean;
  setRatioPopover: (opened: boolean) => void;

  previewPhoto: Photo | null;
  setPreviewPhoto: (previewPhoto: Photo | null) => void;

  notCroppedMode: boolean;
  setNotCroppedMode: (notCroppedMode: boolean) => void;
};

const useStore = create<Store>((set) => ({
  tabIndex: 0,
  setTabIndex: (tabIndex: number) => set({ tabIndex }),

  overrideMetadataIndexPopup: false,
  setOverrideMetadataIndexPopup: (opened: boolean) => set({ overrideMetadataIndexPopup: opened }),

  overrideMetadataIndex: localStorage.getItem('overrideMetadataIndex') ? parseInt(localStorage.getItem('overrideMetadataIndex')!) : null,
  setOverrideMetadataIndex: (overrideMetadataIndex: number | null) =>
    set(() => {
      localStorage.setItem('overrideMetadataIndex', overrideMetadataIndex?.toString() || '');
      return { overrideMetadataIndex };
    }),

  overridableMetadata: JSON.parse(localStorage.getItem('overridableMetadata') || '[]'),
  setOverridableMetadata: (overridableMetadata: { [key: string]: string }[]) =>
    set(() => {
      localStorage.setItem('overridableMetadata', JSON.stringify(overridableMetadata));
      return { overridableMetadata };
    }),

  addOverridableMetadataPopup: false,
  setAddOverridableMetadataPopup: (opened: boolean) => set({ addOverridableMetadataPopup: opened }),

  rerenderOptions: 0,
  setRerenderOptions: () => set({ rerenderOptions: Math.random() }),

  language: (localStorage.getItem('language') as 'en' | 'ja' | 'ko' | 'zh-CN') || 'en',
  setLanguage: (language: 'en' | 'ja' | 'ko' | 'zh-CN') =>
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

  openedAddPhotoErrorDialog: false,
  setOpenedAddPhotoErrorDialog: (opened: boolean) => set({ openedAddPhotoErrorDialog: opened }),

  languagePopover: false,
  setLanguagePopover: (opened: boolean) => set({ languagePopover: opened }),

  quality: parseInt(localStorage.getItem('quality') || '95'),
  setQuality: (quality: number) =>
    set(() => {
      localStorage.setItem('quality', quality.toString());
      return { quality };
    }),

  dateNotationPopover: false,
  setDateNotationPopover: (opened: boolean) => set({ dateNotationPopover: opened }),

  dateNotation: localStorage.getItem('dateNotation') || '2001/01/01 01:01:01',
  setDateNotation: (dateNotation: string) =>
    set(() => {
      localStorage.setItem('dateNotation', dateNotation);
      return { dateNotation };
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

  maintainExif: localStorage.getItem('maintainExif') === 'true' || true,
  setMaintainExif: (maintainExif: boolean) =>
    set(() => {
      localStorage.setItem('maintainExif', maintainExif.toString());
      return { maintainExif };
    }),

  preview: null,
  setPreview: (preview: Photo | null) => set({ preview }),

  focalLength35mmMode: localStorage.getItem('focalLength35mmMode') === 'true',
  setFocalLength35mmMode: (focalLength35mmMode: boolean) =>
    set(() => {
      localStorage.setItem('focalLength35mmMode', focalLength35mmMode.toString());
      return { focalLength35mmMode };
    }),

  focalLengthRatioMode: localStorage.getItem('focalLengthRatioMode') === 'true',
  setFocalLengthRatioMode: (focalLengthRatioMode: boolean) =>
    set(() => {
      localStorage.setItem('focalLengthRatioMode', focalLengthRatioMode.toString());
      return { focalLengthRatioMode };
    }),

  focalLengthRatio: parseFloat(localStorage.getItem('focalLengthRatio') || '1'),
  setFocalLengthRatio: (focalLengthRatio: number) =>
    set(() => {
      localStorage.setItem('focalLengthRatio', focalLengthRatio.toString());
      return { focalLengthRatio };
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

  notCroppedMode: localStorage.getItem('notCroppedMode') === 'true',
  setNotCroppedMode: (notCroppedMode: boolean) =>
    set(() => {
      localStorage.setItem('notCroppedMode', notCroppedMode.toString());
      return { notCroppedMode };
    }),
}));

// Set the theme on page load
document.getElementById('theme')!.className = useStore.getState().darkMode ? 'dark' : 'light';

export { useStore };

export type { Store };
