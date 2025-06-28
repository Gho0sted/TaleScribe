import React from 'react';
import TabNavigation from '../components/TabNavigation';
import AbilityCalculator from '../components/tools/AbilityCalculator';
import { useAppTranslation } from '../hooks/useAppTranslation';

const ToolsPage: React.FC = () => {
  const { t } = useAppTranslation();
  return (
    <div className="p-8 text-white space-y-4">
      <TabNavigation />
      <h1 className="text-2xl font-bold">{t('pages.tools')}</h1>
      <AbilityCalculator />
    </div>
  );
};

export default ToolsPage;
