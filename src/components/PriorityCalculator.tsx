import React, { useState } from 'react';
import { ABILITY_SCORES_DATA, SKILLS_DATA } from '../constants';

const mod = (score: number) => Math.floor((score - 10) / 2);

type Scores = Record<string, number>;

const PriorityCalculator: React.FC = () => {
  const initialScores: Scores = ABILITY_SCORES_DATA.reduce(
    (acc, a) => ({ ...acc, [a.id]: 10 }),
    {} as Scores,
  );
  const [scores, setScores] = useState<Scores>(initialScores);
  const [bonus, setBonus] = useState(2);
  const [profs, setProfs] = useState<Record<string, boolean>>({});

  const savingThrows = ABILITY_SCORES_DATA.map((a) => ({
    id: a.id,
    name: a.short,
    value: mod(scores[a.id]) + bonus,
  }));

  const skills = SKILLS_DATA.map((s) => ({
    id: s.id,
    name: s.name,
    value: mod(scores[s.ability]) + (profs[s.id] ? bonus : 0),
  }));

  const updateScore = (id: string, value: number) => {
    setScores({ ...scores, [id]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {ABILITY_SCORES_DATA.map((a) => (
          <div key={a.id} className="space-y-1">
            <label className="block text-sm">{a.short}</label>
            <input
              className="input"
              type="number"
              value={scores[a.id]}
              onChange={(e) => updateScore(a.id, Number(e.target.value))}
            />
          </div>
        ))}
        <div className="space-y-1">
          <label className="block text-sm">Бонус мастерства</label>
          <input
            className="input"
            type="number"
            value={bonus}
            onChange={(e) => setBonus(Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Владение навыками</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SKILLS_DATA.map((s) => (
            <label key={s.id} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={!!profs[s.id]}
                onChange={(e) =>
                  setProfs({ ...profs, [s.id]: e.target.checked })
                }
              />
              <span>{s.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Спас-броски</h4>
          <table className="text-sm">
            <tbody>
              {savingThrows.map((s) => (
                <tr key={s.id}>
                  <td className="pr-2">{s.name}</td>
                  <td>{s.value >= 0 ? `+${s.value}` : s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Навыки</h4>
          <table className="text-sm">
            <tbody>
              {skills.map((s) => (
                <tr key={s.id}>
                  <td className="pr-2">{s.name}</td>
                  <td>{s.value >= 0 ? `+${s.value}` : s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriorityCalculator;
