import i18n from 'i18next';
import ko from './locales/ko.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import zh_CN from './locales/zh-CN.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const supportLanguages = ['en', 'ja', 'ko', 'zh-CN'];

export { supportLanguages };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    // lng: 'ja', // for debugging
    supportedLngs: supportLanguages,
    debug: false,
    resources: {
      en: { translation: en },
      ja: { translation: ja },
      ko: { translation: ko },
      'zh-CN': { translation: zh_CN },
    },
  });
