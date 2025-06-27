import React from 'react';
import TabNavigation from '../components/TabNavigation';
import AbilityCalculator from '../components/tools/AbilityCalculator';

const ToolsPage: React.FC = () => (
  <div className="p-8 text-white space-y-4">
    <TabNavigation />
    <h1 className="text-2xl font-bold">Инструменты</h1>
    <AbilityCalculator />
  </div>
);

export default ToolsPage;
