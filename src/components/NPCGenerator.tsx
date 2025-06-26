import React, { useState } from 'react';
import { useNPCGenerator } from '../stores/useContentStore';
import { useTranslation } from 'react-i18next';

const NPCGenerator: React.FC = () => {
  const { t } = useTranslation();
  const { npcs, generateNPC, resetNPCs } = useNPCGenerator();
  const [count, setCount] = useState(1);

  const onGenerate = () => generateNPC(count);

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">NPC Generator</h3>
      <div className="flex items-center space-x-3 mb-4">
        <label className="flex items-center space-x-2">
          <span>{t('generatorsPage.countLabel')}:</span>
          <input
            type="number"
            min={1}
            className="input w-20"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
        <button className="btn-primary" onClick={onGenerate}>Generate</button>
        <button className="btn-secondary" onClick={resetNPCs}>Reset</button>
      </div>
      <div className="grid gap-4">
        {npcs.length === 0 ? (
          <p className="text-gray-400">{t('generatorsPage.noNPCs')}</p>
        ) : (
          npcs.map((npc) => (
            <div key={npc.id} className="card animate-slideUp">
              <div className="font-bold mb-1">{npc.name}</div>
              <div className="text-sm text-gray-400">{npc.race} {npc.occupation}</div>
              <div className="text-sm text-gray-400">Voice: {npc.voiceTraits}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NPCGenerator;
