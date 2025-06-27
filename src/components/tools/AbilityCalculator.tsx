import React, { useState, useEffect } from 'react';
import { ABILITY_SCORES_DATA, RACES_DATA } from '../../constants';
import { DiceUtils } from '../../utils/DiceUtils';
import { useAppTranslation } from '../../hooks/useAppTranslation';

type Method = 'random' | 'pointBuy' | 'standard' | 'manual';

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const POINT_COST: Record<number, number> = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

const rollStat = () => {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
};

const AbilityCalculator: React.FC = () => {
  const { t } = useAppTranslation();
  const [race, setRace] = useState('');
  const [anyBonus, setAnyBonus] = useState('strength');
  const [method, setMethod] = useState<Method>('random');
  const [scores, setScores] = useState<Record<string, number>>(
    () => ABILITY_SCORES_DATA.reduce((acc, a) => ({ ...acc, [a.id]: 8 }), {} as Record<string, number>),
  );
  const [rolled, setRolled] = useState<number[]>([]);
  const [points, setPoints] = useState(27);

  const raceBonuses = race ? RACES_DATA['5e'][race].bonuses : {};

  const finalScores = ABILITY_SCORES_DATA.reduce((acc, a) => {
    const base = scores[a.id] || 0;
    let bonus = raceBonuses[a.id] || 0;
    if (raceBonuses.any && anyBonus === a.id) bonus += raceBonuses.any;
    acc[a.id] = base + bonus;
    return acc;
  }, {} as Record<string, number>);

  useEffect(() => {
    if (method === 'random') {
      const vals = ABILITY_SCORES_DATA.map(() => rollStat());
      const obj = ABILITY_SCORES_DATA.reduce((acc, a, i) => ({ ...acc, [a.id]: vals[i] }), {} as Record<string, number>);
      setScores(obj);
    } else if (method === 'pointBuy') {
      const obj = ABILITY_SCORES_DATA.reduce((acc, a) => ({ ...acc, [a.id]: 8 }), {} as Record<string, number>);
      setScores(obj);
      setPoints(27);
    } else if (method === 'standard') {
      const obj = ABILITY_SCORES_DATA.reduce((acc, a, i) => ({ ...acc, [a.id]: STANDARD_ARRAY[i] }), {} as Record<string, number>);
      setScores(obj);
    } else if (method === 'manual') {
      setRolled([]);
      const obj = ABILITY_SCORES_DATA.reduce((acc, a) => ({ ...acc, [a.id]: 8 }), {} as Record<string, number>);
      setScores(obj);
    }
  }, [method]);

  useEffect(() => {
    if (method === 'pointBuy') {
      const spent = ABILITY_SCORES_DATA.reduce((sum, a) => sum + POINT_COST[scores[a.id]], 0);
      setPoints(27 - spent);
    }
  }, [scores, method]);

  const changePoint = (id: string, delta: number) => {
    const value = scores[id] + delta;
    if (value < 8 || value > 15) return;
    const costNew = POINT_COST[value];
    const costOld = POINT_COST[scores[id]];
    const newTotal = 27 - (points + costOld - costNew);
    if (newTotal < 0) return;
    setScores({ ...scores, [id]: value });
  };

  const rollManual = () => {
    const vals = ABILITY_SCORES_DATA.map(() => rollStat());
    setRolled(vals);
    const obj = ABILITY_SCORES_DATA.reduce((acc, a, i) => ({ ...acc, [a.id]: vals[i] }), {} as Record<string, number>);
    setScores(obj);
  };

  return (
    <div className="card space-y-4">
      <h3 className="text-xl font-bold">{t('tools.abilityCalculatorTitle')}</h3>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm mb-1">{t('tools.chooseRace')}</label>
          <select value={race} onChange={(e) => setRace(e.target.value)} className="input">
            <option value="">-</option>
            {Object.entries(RACES_DATA['5e']).map(([id, r]) => (
              <option key={id} value={id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        {raceBonuses.any && (
          <div>
            <label className="block text-sm mb-1">{t('tools.anyBonus')}</label>
            <select value={anyBonus} onChange={(e) => setAnyBonus(e.target.value)} className="input">
              {ABILITY_SCORES_DATA.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.short}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="space-x-2">
          {(['random', 'pointBuy', 'standard', 'manual'] as Method[]).map((m) => (
            <button
              key={m}
              className={`btn-secondary ${method === m ? 'bg-gray-700' : ''}`}
              onClick={() => setMethod(m)}
            >
              {t(`tools.method.${m}`)}
            </button>
          ))}
        </div>
        {method === 'manual' && (
          <button className="btn-primary" onClick={rollManual}>
            {t('tools.roll')}
          </button>
        )}
        {method === 'random' && (
          <button className="btn-primary" onClick={() => setMethod('random')}>
            {t('tools.reroll')}
          </button>
        )}
        {method === 'pointBuy' && (
          <div className="text-sm">{t('tools.pointsRemaining')}: {points}</div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ABILITY_SCORES_DATA.map((a) => (
          <div key={a.id} className="space-y-1">
            <label className="text-sm font-semibold">{a.short}</label>
            {method === 'pointBuy' ? (
              <div className="flex items-center space-x-2">
                <button className="btn-secondary" onClick={() => changePoint(a.id, -1)}>
                  -
                </button>
                <input className="input w-16 text-center" type="number" value={scores[a.id]} readOnly />
                <button className="btn-secondary" onClick={() => changePoint(a.id, 1)}>
                  +
                </button>
              </div>
            ) : (
              <input
                className="input w-24"
                type="number"
                value={scores[a.id]}
                onChange={(e) => setScores({ ...scores, [a.id]: Number(e.target.value) })}
              />
            )}
            <div className="text-xs text-gray-400">
              {t('tools.modifier')}: {DiceUtils.getModifier(finalScores[a.id]) >= 0 ? '+' : ''}
              {DiceUtils.getModifier(finalScores[a.id])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbilityCalculator;
