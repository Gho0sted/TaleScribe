import React from 'react';
import TabNavigation from '../components/TabNavigation';
import { useAppTranslation } from '../hooks/useAppTranslation';

const ArmorPage: React.FC = () => {
  const { t } = useAppTranslation();
  return (
    <div className="p-8 text-white">
      <TabNavigation />
      <h1 className="text-2xl font-bold">{t('pages.armor')}</h1>
    </div>
  );
};

export default ArmorPage;
