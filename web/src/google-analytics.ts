import GoogleAnalytics4 from 'react-ga4';

GoogleAnalytics4.initialize('G-DGLD1E89C7');

const pageView = (pathname: string) => {
  GoogleAnalytics4.send({ hitType: 'pageview', page: pathname });
};

const addPhotoByClickEvent = () => {
  GoogleAnalytics4.event({ action: '버튼 클릭으로 사진 추가', category: 'add-photo-button' });
};

const addPhotoByDragAndDropEvent = () => {
  GoogleAnalytics4.event({ action: '드래그 앤 드롭으로 사진 추가', category: 'add-photo-button' });
};

const downloadOnePhotoEvent = () => {
  GoogleAnalytics4.event({ action: '단일 사진 다운로드', category: 'download-photo-button' });
};

const downloadAllPhotosEvent = () => {
  GoogleAnalytics4.event({ action: '복수 사진 다운로드', category: 'download-photo-button' });
};

const jpegDownloadEvent = () => {
  GoogleAnalytics4.event({ action: 'JPEG 변환 후 다운로드', category: 'download-format-button' });
};

const webpDownloadEvent = () => {
  GoogleAnalytics4.event({ action: 'WEBP 변환 후 다운로드', category: 'download-format-button' });
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
