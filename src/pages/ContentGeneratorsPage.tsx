import React from 'react';
import LootGenerator from '../LootGenerator';
import EventGenerator from '../EventGenerator';
import NPCGenerator from '../NPCGenerator';

const ContentGeneratorsPage: React.FC = () => (
  <div className="bg-gray-900 text-white min-h-screen p-8 space-y-8">
    <LootGenerator />
    <EventGenerator />
    <NPCGenerator />
  </div>
);

export default ContentGeneratorsPage;
