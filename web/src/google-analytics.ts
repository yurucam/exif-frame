import GoogleAnalytics4 from 'react-ga4';

GoogleAnalytics4.initialize('G-DGLD1E89C7');

const pageView = (pathname: string) => {
  GoogleAnalytics4.send({ hitType: 'pageview', page: pathname });
};

const addPhotoByClickEvent = () => {
  GoogleAnalytics4.event({ action: 'click', category: 'add-photo-button', label: '버튼 클릭으로 사진 추가' });
};

const addPhotoByDragAndDropEvent = () => {
  GoogleAnalytics4.event({ action: 'drop', category: 'add-photo-button', label: '드래그 앤 드롭으로 사진 추가' });
};

const downloadOnePhotoEvent = () => {
  GoogleAnalytics4.event({ action: 'single', category: 'download-photo-button', label: '단일 사진 다운로드' });
};

const downloadAllPhotosEvent = () => {
  GoogleAnalytics4.event({ action: 'multiple', category: 'download-photo-button', label: '복수 사진 다운로드' });
};

const jpegDownloadEvent = () => {
  GoogleAnalytics4.event({ action: 'jpeg', category: 'download-format-button', label: 'JPEG 다운로드' });
};

const webpDownloadEvent = () => {
  GoogleAnalytics4.event({ action: 'webp', category: 'download-format-button', label: 'WEBP 다운로드' });
};

const changeThemeEvent = (theme: string) => {
  GoogleAnalytics4.event({ action: `테마 "${theme}"로 변경`, category: 'change-theme-radio', label: '테마 변경' });
};

export {
  pageView,
  addPhotoByClickEvent,
  addPhotoByDragAndDropEvent,
  downloadOnePhotoEvent,
  downloadAllPhotosEvent,
  jpegDownloadEvent,
  webpDownloadEvent,
  changeThemeEvent,
};
