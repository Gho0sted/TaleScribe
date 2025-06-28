import React, { useMemo, useState } from 'react';
import useStoredState from '../../hooks/useStoredState';
import { classes } from '../../data/classes';
import { ClassData, Subclass } from '../../types/classes';
import { useAppTranslation } from '../../hooks/useAppTranslation';

const ClassesComponent: React.FC = () => {
  const { t } = useAppTranslation();
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useStoredState<boolean>(
    'darkTheme',
    true,
  );
  const [isFilterOpen, setIsFilterOpen] = useStoredState<boolean>(
    'filterOpen',
    true,
  );
  const [activeView, setActiveView] = useStoredState<'classes' | 'classDetail'>(
    'activeView',
    'classes',
  );
  const [selectedClassForDetail, setSelectedClassForDetail] =
    useState<ClassData | null>(null);

  const [sourceFilters, setSourceFilters] = useState<Record<string, boolean>>({
    Базовые: true,
    Приключения: true,
    Сеттинги: true,
    'Unearthed Arcana': true,
    '3rd party': true,
    Homebrew: true,
  });

  const [hitDieFilters, setHitDieFilters] = useState<Record<string, boolean>>({
    d6: true,
    d8: true,
    d10: true,
    d12: true,
  });

  const filteredClasses = useMemo(
    () =>
      classes.filter((cls) => {
        const matchesSearch =
          cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSource = sourceFilters[cls.source];
        const matchesHitDie = hitDieFilters[cls.hitDie];
        return matchesSearch && matchesSource && matchesHitDie;
      }),
    [searchTerm, sourceFilters, hitDieFilters],
  );

  const toggleSourceFilter = (source: string) => {
    setSourceFilters((prev) => ({ ...prev, [source]: !prev[source] }));
  };

  const toggleHitDieFilter = (hitDie: string) => {
    setHitDieFilters((prev) => ({ ...prev, [hitDie]: !prev[hitDie] }));
  };

  const getEnglishName = (name: string) => {
    const map: Record<string, string> = {
      Варвар: 'Barbarian',
      Бард: 'Bard',
      Жрец: 'Cleric',
      Воин: 'Fighter',
      Плут: 'Rogue',
      Магус: 'Magus',
    };
    return map[name] || name;
  };

  const openClassDetail = (cls: ClassData) => {
    setSelectedClassForDetail(cls);
    setActiveView('classDetail');
  };

  const backToClasses = () => {
    setActiveView('classes');
    setSelectedClassForDetail(null);
  };

  const quickStartCharacter = (cls: ClassData) => {
    const newCharacter = {
      id: Date.now(),
      name: `Новый ${cls.name}`,
      class: cls.name,
      level: 1,
      race: 'Человек',
      image: cls.image,
      background: 'Народный герой',
      hitDie: cls.hitDie,
      primaryAbility: cls.primaryAbility,
      description: cls.description,
    };
    // TODO: add character to store instead of alert
    console.log('Character created', newCharacter);
  };

  return (
    <div
      className={`min-h-screen transition-all ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      \
      <div className="p-4">
        {activeView === 'classes' && (
          <div className="mb-4">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('classes.searchPlaceholder')}
              className="border p-2 rounded"
            />
          </div>
        )}

        {activeView === 'classes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClasses.map((cls) => (
              <div
                key={cls.id}
                className="p-4 rounded shadow bg-white text-gray-900 cursor-pointer"
                onClick={() => openClassDetail(cls)}
              >
                <div className="font-bold text-xl mb-2">{cls.name}</div>
                <div className="text-sm mb-2">{getEnglishName(cls.name)}</div>
                <p className="text-sm mb-2">{cls.description}</p>
                <span className="text-xs">{cls.hitDie}</span>
              </div>
            ))}
          </div>
        )}

        {activeView === 'classDetail' && selectedClassForDetail && (
          <div>
            <button className="mb-4" onClick={backToClasses}>
              {t('common.back')}
            </button>
            <h2 className="text-2xl font-bold mb-2">
              {selectedClassForDetail.name}
            </h2>
            <p className="text-sm mb-4">{selectedClassForDetail.description}</p>

            <div className="mb-4">
              <h3 className="font-semibold">Ключевые особенности</h3>
              <ul className="list-disc list-inside text-sm">
                {selectedClassForDetail.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4 text-sm">
              <h3 className="font-semibold">Владения</h3>
              <p>Доспехи: {selectedClassForDetail.proficiencies.armor}</p>
              <p>Оружие: {selectedClassForDetail.proficiencies.weapons}</p>
              <p>Инструменты: {selectedClassForDetail.proficiencies.tools}</p>
              <p>
                Спасброски: {selectedClassForDetail.proficiencies.savingThrows}
              </p>
              <p>Навыки: {selectedClassForDetail.proficiencies.skills}</p>
            </div>

            <div className="mb-4 text-sm">
              <h3 className="font-semibold">Стартовое снаряжение</h3>
              <ul className="list-disc list-inside">
                {selectedClassForDetail.equipment.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* TODO: implement quick start workflow */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesComponent;
