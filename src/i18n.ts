/**
 * i18n configuration and helper translation utilities.
 * Конфигурация i18n и вспомогательные функции перевода.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

/**
 * Translate helper used outside of React components.
 * Вспомогательная функция перевода вне React-компонентов.
 */
export function translate(
  key: Parameters<typeof i18n.t>[0],
  options?: Parameters<typeof i18n.t>[1],
) {
  return i18n.t(key, options);
}
