import i18n from 'i18next';
import ko from './translations/ko.json';
import en from './translations/en.json';
import ja from './translations/ja.json';
import { initReactI18next } from 'react-i18next';
import { useStore } from '../store';

i18n.use(initReactI18next).init({
  lng: useStore.getState().language,
  debug: false,
  resources: {
    en: { translation: en },
    ja: { translation: ja },
    ko: { translation: ko },
  },
});

const supportLanguages = ['en', 'ja', 'ko'];

export { supportLanguages };
