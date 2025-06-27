/**
 * Switches UI language at runtime.
 * Переключает язык интерфейса в процессе работы приложения.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const change = (lng: 'en' | 'ru') => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => change('en')}
        className={`px-2 py-1 rounded ${i18n.language.startsWith('en') ? 'font-bold' : ''}`}
      >
        EN
      </button>
      <button
        onClick={() => change('ru')}
        className={`px-2 py-1 rounded ${i18n.language.startsWith('ru') ? 'font-bold' : ''}`}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;
