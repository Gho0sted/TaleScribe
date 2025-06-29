import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { downloadFile } from '../../utils/downloadFile';
import en from '../../locales/en/translation.json';
import ru from '../../locales/ru/translation.json';
import { useAppTranslation } from '../../hooks/useAppTranslation';

const TranslationsPage: React.FC = () => {
  const [locale, setLocale] = useState<'en' | 'ru'>('en');
  const [text, setText] = useState(
    JSON.stringify(locale === 'en' ? en : ru, null, 2),
  );
  const { t } = useAppTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleSave = () => {
    try {
      const data = JSON.parse(text);
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      downloadFile(blob, `${locale}.json`);
    } catch {
      alert('Invalid JSON');
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">{t('admin.translationsTitle')}</h2>
      <div className="mb-4">
        <select
          value={locale}
          onChange={(e) => {
            const val = e.target.value as 'en' | 'ru';
            setLocale(val);
            setText(JSON.stringify(val === 'en' ? en : ru, null, 2));
          }}
          className="input"
        >
          <option value="en">en</option>
          <option value="ru">ru</option>
        </select>
      </div>
      <textarea
        value={text}
        onChange={handleChange}
        rows={10}
        className="w-full p-2 bg-gray-800 text-white rounded-lg"
      />
      <div className="mt-4 space-x-2">
        <Button onClick={handleSave}>{t('common.save')}</Button>
        <Button
          onClick={() =>
            setText(JSON.stringify(locale === 'en' ? en : ru, null, 2))
          }
        >
          {t('admin.restore')}
        </Button>
      </div>
    </Card>
  );
};

export default TranslationsPage;
