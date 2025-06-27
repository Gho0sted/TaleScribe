/**
 * Page listing characters for current edition
 * Страница со списком персонажей выбранной редакции
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconUser, IconPlusCircle, IconSearch } from '../../constants/icons';
import { useTalescribe } from '../../contexts/TalescribeContext';

const CharactersPage: React.FC = () => {
  const { t } = useTranslation();
  const { characters, selectedEdition } = useTalescribe();
  const [searchTerm, setSearchTerm] = useState('');

  const editionCharacters = characters.filter(
    (char) => char.edition === selectedEdition,
  );
  const filteredCharacters = editionCharacters.filter(
    (char) =>
      !searchTerm || char.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center">
            <IconUser className="h-10 w-10 mr-4 text-green-600" />{' '}
            {t('charactersPage.title', {
              edition: selectedEdition.toUpperCase(),
            })}
          </h1>
          <button className="btn-primary">
            <IconPlusCircle className="h-5 w-5 mr-2" />{' '}
            {t('charactersPage.createButton')}
          </button>
        </div>
        <div className="card mb-8">
          <div className="relative max-w-md">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t('charactersPage.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>
        {filteredCharacters.length === 0 ? (
          <div className="text-center py-16">
            <IconUser className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('charactersPage.emptyTitle', {
                edition: selectedEdition.toUpperCase(),
              })}
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {t('charactersPage.emptyText')}
            </p>
            <button className="btn-primary">
              <IconPlusCircle className="h-5 w-5 mr-2" />{' '}
              {t('charactersPage.createButton')}
            </button>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCharacters.map((character) => (
              <div key={character.id} className="card-hover">
                <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-6 text-white rounded-t-2xl">
                  <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                  <p className="text-lg opacity-90">
                    {character.race} {character.class} {character.level} уровня
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">КД</div>
                      <div className="text-xl font-bold">
                        {character.armorClass}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">ХИТЫ</div>
                      <div className="text-xl font-bold">
                        {character.hitPoints.current}/{character.hitPoints.max}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">СКОРОСТЬ</div>
                      <div className="text-xl font-bold">{character.speed}</div>
                    </div>
                  </div>
                  {character.background && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {character.background}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharactersPage;
