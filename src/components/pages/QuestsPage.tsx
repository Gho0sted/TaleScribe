import React, { useState, useMemo, useCallback } from 'react';
import { useTalescribe } from '../../contexts/TalescribeContext';
import { Card } from '../ui/Card';
import { Scroll, Star } from '../../constants/icons';
import { useTranslation } from 'react-i18next';

interface Quest {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  rewards: string[];
  createdAt: string;
}

const difficulties = ['Легкий', 'Средний', 'Сложный'];

const titles = [
  'Спасти деревню',
  'Найти артефакт',
  'Уничтожить монстра',
  'Исследовать руины',
];

const descriptions = [
  'Местные жители нуждаются в помощи отважных героев.',
  'Легендарный предмет скрыт глубоко под землей.',
  'Опасное существо угрожает округе.',
  'Древние руины хранят множество тайн.',
];

const rewardsList = [
  'Золото',
  'Опыт',
  'Магический предмет',
];

const generateQuest = (level: number): Quest => {
  const idx = Math.floor(Math.random() * titles.length);
  const difficulty = difficulties[Math.min(difficulties.length - 1, Math.floor(level / 7))];
  return {
    id: Date.now(),
    title: titles[idx],
    difficulty,
    description: descriptions[idx],
    rewards: [rewardsList[Math.floor(Math.random() * rewardsList.length)]],
    createdAt: new Date().toLocaleString(),
  };
};

const QuestGenerator: React.FC = () => {
  const { t } = useTranslation();
  const { characters } = useTalescribe();
  const [quest, setQuest] = useState<Quest | null>(null);

  const averageLevel = useMemo(() => {
    if (characters.length === 0) return 1;
    const sum = characters.reduce((s, c) => s + c.level, 0);
    return Math.round(sum / characters.length);
  }, [characters]);

  const createQuest = useCallback(() => {
    setQuest(generateQuest(averageLevel));
  }, [averageLevel]);

  return (
    <Card>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('questsPage.generator')}</h2>
        <button
          onClick={createQuest}
          className="btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center space-x-2"
        >
          <Scroll className="w-5 h-5" />
          <span>{t('questsPage.generate')}</span>
        </button>
      </div>
      {quest && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">{quest.title}</h3>
          <p className="text-gray-300">{quest.description}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>{t('questsPage.difficulty')}: {quest.difficulty}</span>
            <span>•</span>
            <span>{quest.createdAt}</span>
          </div>
          <div className="mt-2">
            <h4 className="font-semibold text-gray-300 mb-1">Награды</h4>
            <ul className="list-disc list-inside space-y-1">
              {quest.rewards.map((r, i) => (
                <li key={i} className="flex items-center space-x-1 text-gray-300">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

const QuestsPage: React.FC = () => (
  <div className="p-8 space-y-8">
    <QuestGenerator />
  </div>
);

export default QuestsPage;
