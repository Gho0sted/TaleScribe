import React from 'react';
import TabNavigation from '../components/TabNavigation';
import { useAppTranslation } from '../hooks/useAppTranslation';

const RacesPage: React.FC = () => {
  const { t } = useAppTranslation();
  return (
    <div className="p-8 text-white">
      <TabNavigation />
      <h1 className="text-2xl font-bold">{t('pages.races')}</h1>
    </div>
  );
};

export default RacesPage;
