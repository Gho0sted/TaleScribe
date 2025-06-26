import React, { useState, useCallback } from 'react';
import { Dice6, Trash2 } from 'lucide-react';
import { DiceUtils } from '../../utils/DiceUtils';
import { DiceRoll } from '../../types';

const DiceRollerPage: React.FC = () => {
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([]);
  const [customDice, setCustomDice] = useState({ count: 1, sides: 20, modifier: 0 });

  const rollDice = useCallback(
    (count: number, sides: number, modifier: number = 0, label: string = '') => {
      const result = DiceUtils.rollDice(count, sides, modifier);
      const rollData: DiceRoll = {
        id: Date.now(),
        ...result,
        label,
        timestamp: new Date().toLocaleTimeString(),
      };
      setRollHistory((prev) => [rollData, ...prev.slice(0, 19)]);
      return result;
    },
    []
  );

  const rollCustomDice = () => {
    rollDice(customDice.count, customDice.sides, customDice.modifier, 'Пользовательский бросок');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🎲</div>
          <h1 className="text-4xl font-bold gradient-text mb-4">Магические кости</h1>
          <p className="text-gray-400 text-lg">Бросайте кости с модификаторами</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">Быстрые броски</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { name: 'd4', sides: 4, color: 'from-red-400 to-red-600' },
                { name: 'd6', sides: 6, color: 'from-orange-400 to-orange-600' },
                { name: 'd8', sides: 8, color: 'from-yellow-400 to-yellow-600' },
                { name: 'd10', sides: 10, color: 'from-green-400 to-green-600' },
                { name: 'd12', sides: 12, color: 'from-blue-400 to-blue-600' },
                { name: 'd20', sides: 20, color: 'from-purple-400 to-purple-600' },
                { name: 'd100', sides: 100, color: 'from-pink-400 to-pink-600' },
              ].map((die) => (
                <button
                  key={die.sides}
                  onClick={() => rollDice(1, die.sides, 0, die.name)}
                  className={`bg-gradient-to-br ${die.color} hover:shadow-2xl text-white p-6 rounded-3xl font-bold transition-all text-center group transform hover:scale-105 active:scale-95 border-2 border-white/20`}
                >
                  <div className="bg-white/20 rounded-2xl p-4 mb-4 backdrop-blur-sm">
                    <Dice6 className="h-12 w-12 mx-auto group-hover:animate-spin" />
                  </div>
                  <div className="text-xl font-bold mb-1">{die.name}</div>
                  <div className="text-sm opacity-80 font-medium">1-{die.sides}</div>
                </button>
              ))}
            </div>
            <div className="card bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Пользовательский бросок</h3>
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Количество</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={customDice.count}
                    onChange={(e) => setCustomDice((prev) => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
                    className="input bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Стороны</label>
                  <input
                    type="number"
                    min="2"
                    max="100"
                    value={customDice.sides}
                    onChange={(e) => setCustomDice((prev) => ({ ...prev, sides: parseInt(e.target.value) || 20 }))}
                    className="input bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Модификатор</label>
                  <input
                    type="number"
                    min="-20"
                    max="20"
                    value={customDice.modifier}
                    onChange={(e) => setCustomDice((prev) => ({ ...prev, modifier: parseInt(e.target.value) || 0 }))}
                    className="input bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
                <div className="flex items-end">
                  <button onClick={rollCustomDice} className="w-full btn-primary bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
                    Бросить
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm mb-2">Формула:</div>
                <div className="text-white font-mono text-lg bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600">
                  {customDice.count}d{customDice.sides}
                  {DiceUtils.formatModifier(customDice.modifier)}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">История бросков</h2>
            <div className="card bg-gray-800 border-gray-700 max-h-[600px] overflow-hidden p-0">
              <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Последние броски</h3>
                  <button onClick={() => setRollHistory([])} className="text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto scrollbar-thin">
                {rollHistory.length > 0 ? (
                  <div className="divide-y divide-gray-700">
                    {rollHistory.map((roll) => (
                      <div key={roll.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">{roll.label || roll.formula}</span>
                          <span className="text-xs text-gray-500">{roll.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-300">[{roll.rolls.join(', ')}]</span>
                            {roll.modifier !== 0 && <span className="text-sm text-blue-400">{DiceUtils.formatModifier(roll.modifier)}</span>}
                          </div>
                          <span className="text-lg font-bold text-white">= {roll.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Dice6 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">История бросков пока пуста</p>
                    <p className="text-gray-500 text-sm mt-2">Сделайте первый бросок!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceRollerPage;
