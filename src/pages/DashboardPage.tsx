/**
 * Dashboard with quick actions and edition statistics
 * Панель управления с быстрыми действиями и статистикой редакции
 */
import React from 'react';
// Use path relative to pages for stable bundling
import { useAppTranslation } from '../hooks/useAppTranslation';
import {
  IconSparkles,
  IconUser,
  IconDice6,
  IconScroll,
  IconAlertTriangle,
} from '../constants/icons';
import { useTalescribe } from '../contexts/TalescribeContext';
import { DND_EDITIONS } from '../constants';
import { DiceUtils } from '../utils/DiceUtils';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { t } = useAppTranslation();
  const { selectedEdition, characters, spells, bestiary, items } =
    useTalescribe();
  const [isOffline] = React.useState(!navigator.onLine);

  const currentEdition = DND_EDITIONS.find((e) => e.id === selectedEdition);
  const editionCharacters = characters.filter(
    (char) => char.edition === selectedEdition,
  );
  const editionSpells = spells.filter(
    (spell) => spell.edition === selectedEdition,
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container p-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🎲</div>
          <h1 className="text-5xl font-bold gradient-text mb-4">
            {t('dashboard.welcome')}
          </h1>
          <p className="text-gray-400 text-xl max-w-4xl mx-auto">
            {t('dashboard.tagline')}
          </p>
          <div className="inline-flex items-center bg-gray-800 rounded-2xl shadow-lg px-6 py-4 border border-gray-700 mb-8 mt-8">
            <span className="text-2xl mr-3">{currentEdition?.icon}</span>
            <div className="text-left">
              <div className="text-sm text-gray-400">
                {t('dashboard.currentEdition')}
              </div>
              <div className="font-bold text-white">{currentEdition?.name}</div>
            </div>
          </div>
          {isOffline && (
            <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4 max-w-md mx-auto mb-8">
              <div className="flex items-center justify-center">
                <IconAlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-yellow-200">
                  {t('dashboard.offlineMode')}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <button
            onClick={() => onNavigate('character-generator')}
            className="group bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-emerald-400/20"
          >
            <IconSparkles className="h-16 w-16 mx-auto mb-4 group-hover:animate-pulse" />
            <h3 className="text-xl font-bold mb-3">
              {t('dashboard.characterGenerator')}
            </h3>
            <p className="text-sm opacity-90">
              {t('dashboard.characterGeneratorDesc')}
            </p>
          </button>
          <button
            onClick={() => onNavigate('characters')}
            className="group bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-blue-400/20"
          >
            <IconUser className="h-16 w-16 mx-auto mb-4 group-hover:animate-bounce" />
            <h3 className="text-xl font-bold mb-3">
              {t('dashboard.characters')}
            </h3>
            <p className="text-sm opacity-90">
              {t('dashboard.charactersDesc')}
            </p>
          </button>
          <button
            onClick={() => onNavigate('dice')}
            className="group bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-700 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-teal-400/20"
          >
            <IconDice6 className="h-16 w-16 mx-auto mb-4 group-hover:animate-spin" />
            <h3 className="text-xl font-bold mb-3">{t('dashboard.dice')}</h3>
            <p className="text-sm opacity-90">{t('dashboard.diceDesc')}</p>
          </button>
          <button
            onClick={() => onNavigate('spells')}
            className="group bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 hover:from-purple-600 hover:via-violet-600 hover:to-indigo-700 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-purple-400/20"
          >
            <IconScroll className="h-16 w-16 mx-auto mb-4 group-hover:animate-pulse" />
            <h3 className="text-xl font-bold mb-3">{t('dashboard.spells')}</h3>
            <p className="text-sm opacity-90">{t('dashboard.spellsDesc')}</p>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="card">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl mr-6">
                <IconUser className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t('dashboard.characters')}
                </h3>
                <p className="text-4xl font-bold text-green-600 mb-1">
                  {editionCharacters.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  в {selectedEdition.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl mr-6">
                <IconScroll className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t('dashboard.spells')}
                </h3>
                <p className="text-4xl font-bold text-purple-600 mb-1">
                  {editionSpells.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  в {selectedEdition.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl mr-6">
                <IconUser className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Бестиарий
                </h3>
                <p className="text-4xl font-bold text-red-600 mb-1">
                  {bestiary.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  существ
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-2xl mr-6">
                <IconUser className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Предметы
                </h3>
                <p className="text-4xl font-bold text-amber-600 mb-1">
                  {items.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  в базе
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <IconDice6 className="h-7 w-7 mr-3 text-teal-400" />{' '}
            {t('dashboard.quickRolls')}
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[
              { name: 'd4', sides: 4, color: 'from-red-400 to-red-600' },
              { name: 'd6', sides: 6, color: 'from-orange-400 to-orange-600' },
              { name: 'd8', sides: 8, color: 'from-yellow-400 to-yellow-600' },
              { name: 'd10', sides: 10, color: 'from-green-400 to-green-600' },
              { name: 'd12', sides: 12, color: 'from-blue-400 to-blue-600' },
              {
                name: 'd20',
                sides: 20,
                color: 'from-purple-400 to-purple-600',
              },
              { name: 'd100', sides: 100, color: 'from-pink-400 to-pink-600' },
              { name: 'd2', sides: 2, color: 'from-gray-400 to-gray-600' },
            ].map((die) => (
              <button
                key={die.sides}
                onClick={async () => {
                  await DiceUtils.rollDiceAsync(1, die.sides);
                }}
                className={`bg-gradient-to-br ${die.color} hover:shadow-lg text-white py-4 px-6 rounded-2xl font-bold transition-all text-center group transform hover:scale-105`}
              >
                <IconDice6 className="h-8 w-8 mx-auto mb-2 group-hover:animate-spin" />
                <div className="text-sm font-bold">{die.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
