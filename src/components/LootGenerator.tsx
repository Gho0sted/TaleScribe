import React, { useState } from 'react';
import { useLootGenerator } from '../stores/useContentStore';
import { useTranslation } from 'react-i18next';

const LootGenerator: React.FC = () => {
  const { t } = useTranslation();
  const { loot, generateLoot, resetLoot } = useLootGenerator();
  const [level, setLevel] = useState(1);
  const [filters, setFilters] = useState<{[k:string]: boolean}>({ weapon:false, artifact:false, potion:false });

  const toggle = (key: string) => setFilters({ ...filters, [key]: !filters[key] });

  const onGenerate = () => {
    const selected = Object.keys(filters).filter((k) => filters[k]);
    generateLoot(level, selected);
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Loot Generator</h3>
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="number"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="input w-24"
        />
        {['weapon','artifact','potion'].map((t) => (
          <label key={t} className="flex items-center space-x-2">
            <input type="checkbox" checked={filters[t]} onChange={() => toggle(t)} />
            <span className="capitalize">{t}</span>
          </label>
        ))}
      </div>
      <div className="space-x-3">
        <button className="btn-primary" onClick={onGenerate}>Generate</button>
        <button className="btn-secondary" onClick={resetLoot}>Reset</button>
      </div>
      <div className="mt-4 grid gap-4">
        {loot.length === 0 ? (
          <p className="text-gray-400">{t('generatorsPage.noLoot')}</p>
        ) : (
          loot.map((item) => (
            <div key={item.id} className="card animate-slideUp">
              <div className="font-bold">{item.name}</div>
              <div className="text-sm text-gray-400">
                {item.rarity} - {item.value} gp x{item.quantity}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LootGenerator;
