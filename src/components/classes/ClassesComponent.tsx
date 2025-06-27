import React, { useState, useEffect } from 'react';

function useStoredState<T>(
  key: string,
  initial: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [key, state]);
  return [state, setState];
}

interface Subclass {
  name: string;
  description: string;
  features?: string[];
}

interface ClassData {
  id: number;
  name: string;
  hitDie: string;
  primaryAbility: string;
  savingThrows: string;
  description: string;
  features: string[];
  subclasses: Subclass[];
  proficiencies: {
    armor: string;
    weapons: string;
    tools: string;
    savingThrows: string;
    skills: string;
  };
  hitPoints: {
    hitDie: string;
    firstLevel: string;
    higherLevels: string;
  };
  equipment: string[];
  image: string;
  color: string;
  icon: string;
  source: string;
  sourceCode: string;
}

const ClassesComponent: React.FC = () => {
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

  const classes: ClassData[] = [
    {
      id: 1,
      name: 'Варвар',
      hitDie: 'd12',
      primaryAbility: 'Сила',
      savingThrows: 'Сила, Телосложение',
      description: 'Первобытный воин ярости и дикой природы',
      features: [
        'Защита без доспехов',
        'Ярость',
        'Безрассудная атака',
        'Чувство опасности',
        'Изначальное знание',
        'Увеличение характеристик',
        'Быстрое передвижение',
        'Дополнительная атака',
        'Дикий инстинкт',
        'Инстинктивный бросок',
        'Сильный критический удар',
        'Непреклонная ярость',
        'Непрерывная ярость',
        'Неукротимая мощь',
        'Дикий чемпион',
      ],
      subclasses: [
        {
          name: 'Путь берсерка',
          description: 'Воины, впадающие в неукротимую ярость',
          features: ['Бешенство', 'Бездумная ярость', 'Ответный удар'],
        },
        {
          name: 'Путь тотемного воина',
          description: 'Варвары, черпающие силу из духов животных',
          features: ['Тотемный дух', 'Аспект зверя', 'Гармония тотема'],
        },
        {
          name: 'Путь предков',
          description: 'Воины, направляемые духами своих предков',
          features: ['Духи предков', 'Щит предков', 'Мстительные предки'],
        },
      ],
      proficiencies: {
        armor: 'Лёгкие доспехи, средние доспехи, щиты',
        weapons: 'Простое оружие, воинское оружие',
        tools: 'Нет',
        savingThrows: 'Сила, Телосложение',
        skills: 'Выберите две из: Выживание, Запугивание, Атлетика',
      },
      hitPoints: {
        hitDie: '1d12 за уровень варвара',
        firstLevel: '12 + модификатор Телосложения',
        higherLevels:
          '1d12 (или 7) + модификатор Телосложения за каждый уровень после 1-го',
      },
      equipment: [
        'Большой топор или любое воинское оружие',
        'Два ручных топора или любое простое оружие',
        'Набор путешественника и четыре метательных копья',
      ],
      image: 'barbarian.jpg',
      color: 'red',
      icon: '🪓',
      source: 'Базовые',
      sourceCode: 'PHB',
    },
    {
      id: 2,
      name: 'Бард',
      hitDie: 'd8',
      primaryAbility: 'Харизма',
      savingThrows: 'Ловкость, Харизма',
      description: 'Мастер песни, речи и магии, которую они содержат',
      features: [
        'Вдохновение барда',
        'Использование заклинаний',
        'Мастер на все руки',
        'Песнь отдыха',
        'Волшебное вдохновение',
        'Коллегия бардов',
        'Компетентность',
        'Увеличение характеристик',
        'Источник вдохновения',
        'Контрочарование',
        'Тайны магии',
        'Превосходное вдохновение',
      ],
      subclasses: [
        {
          name: 'Коллегия знаний',
          description: 'Барды, собирающие знания из всех источников',
        },
        {
          name: 'Коллегия доблести',
          description: 'Отважные скальды, вдохновляющие на подвиги',
        },
        {
          name: 'Коллегия мечей',
          description: 'Клинки, сочетающие оружие и магию',
        },
      ],
      proficiencies: {
        armor: 'Лёгкие доспехи',
        weapons:
          'Простое оружие, длинные мечи, рапиры, короткие мечи, ручные арбалеты',
        tools: 'Три музыкальных инструмента на ваш выбор',
        savingThrows: 'Ловкость, Харизма',
        skills:
          'Выберите 3 навыка из: Атлетика, Акробатика, Ловкость рук, Скрытность, Магия, История, Анализ, Природа, Религия, Уход за животными, Проницательность, Медицина, Внимательность, Выживание, Обман, Запугивание, Выступление, Убеждение',
      },
      hitPoints: {
        hitDie: '1к8 за каждый уровень',
        firstLevel: '8 + ваш модификатор Телосложения',
        higherLevels:
          '1к8 (или 5) + модификатор Телосложения за каждый уровень этого класса, после первого (минимум 1)',
      },
      equipment: [
        'Рапира, длинный меч или любое простое оружие',
        'Набор дипломата или набор артиста',
        'Лютня или любой другой музыкальный инструмент',
        'Кожаный доспех и кинжал',
      ],
      image: 'bard.jpg',
      color: 'purple',
      icon: '🎵',
      source: 'Базовые',
      sourceCode: 'PHB',
    },
    {
      id: 3,
      name: 'Магус',
      hitDie: 'd8',
      primaryAbility: 'Интеллект',
      savingThrows: 'Интеллект, Телосложение',
      description: 'Воин-маг, сочетающий заклинания и сталь',
      features: ['Заклинания', 'Боевое колдовство'],
      subclasses: [{ name: 'Боевой маг', description: 'Боевая магия' }],
      proficiencies: {
        armor: 'Лёгкие доспехи',
        weapons: 'Воинское оружие',
        tools: 'Нет',
        savingThrows: 'Интеллект, Телосложение',
        skills: 'Выберите две из: Магия, История',
      },
      hitPoints: {
        hitDie: '1d8 за уровень магуса',
        firstLevel: '8 + модификатор Телосложения',
        higherLevels:
          '1d8 (или 5) + модификатор Телосложения за каждый уровень после 1-го',
      },
      equipment: ['Книга заклинаний', 'Арбалет'],
      image: 'magus.jpg',
      color: 'indigo',
      icon: '⚡',
      source: 'Homebrew',
      sourceCode: 'HB',
    },
    {
      id: 4,
      name: 'Жрец',
      hitDie: 'd8',
      primaryAbility: 'Мудрость',
      savingThrows: 'Мудрость, Харизма',
      description: 'Священный представитель божественной силы',
      features: [
        'Божественный домен',
        'Направление энергии',
        'Божественное вмешательство',
      ],
      subclasses: [
        {
          name: 'Домен жизни',
          description: 'Жрецы, специализирующиеся на исцелении',
        },
        { name: 'Домен войны', description: 'Божественные воины' },
      ],
      proficiencies: {
        armor: 'Лёгкие и средние доспехи, щиты',
        weapons: 'Простое оружие',
        tools: 'Нет',
        savingThrows: 'Мудрость, Харизма',
        skills: 'Выберите две из: История, Проницательность, Религия, Медицина',
      },
      hitPoints: {
        hitDie: '1d8 за уровень жреца',
        firstLevel: '8 + модификатор Телосложения',
        higherLevels:
          '1d8 (или 5) + модификатор Телосложения за каждый уровень жреца после первого',
      },
      equipment: ['Булава', 'Кольчужная рубаха', 'Щит', 'Священный символ'],
      image: 'cleric.jpg',
      color: 'yellow',
      icon: '✨',
      source: 'Базовые',
      sourceCode: 'PHB',
    },
    {
      id: 5,
      name: 'Воин',
      hitDie: 'd10',
      primaryAbility: 'Сила или Ловкость',
      savingThrows: 'Сила, Телосложение',
      description: 'Мастер боевых искусств и различного оружия',
      features: ['Боевой стиль', 'Второе дыхание', 'Дополнительная атака'],
      subclasses: [
        {
          name: 'Чемпион',
          description: 'Стремится к физическому совершенству',
        },
        {
          name: 'Боевой мастер',
          description: 'Тактик, использующий приёмы в бою',
        },
      ],
      proficiencies: {
        armor: 'Все доспехи, щиты',
        weapons: 'Простое и воинское оружие',
        tools: 'Нет',
        savingThrows: 'Сила, Телосложение',
        skills: 'Выберите две из: Атлетика, Восприятие, История, Запугивание',
      },
      hitPoints: {
        hitDie: '1d10 за уровень воина',
        firstLevel: '10 + модификатор Телосложения',
        higherLevels:
          '1d10 (или 6) + модификатор Телосложения за каждый уровень воина после первого',
      },
      equipment: ['Кольчуга', 'Воинское оружие и щит', 'Набор подземелий'],
      image: 'fighter.jpg',
      color: 'blue',
      icon: '⚔️',
      source: 'Базовые',
      sourceCode: 'PHB',
    },
    {
      id: 6,
      name: 'Плут',
      hitDie: 'd8',
      primaryAbility: 'Ловкость',
      savingThrows: 'Ловкость, Интеллект',
      description: 'Скрытный мастер навыков и точных атак',
      features: ['Экспертиза', 'Скрытая атака', 'Хитрое действие'],
      subclasses: [
        { name: 'Вор', description: 'Специалист по кражам и проникновению' },
        { name: 'Убийца', description: 'Мастер скрытных убийств' },
      ],
      proficiencies: {
        armor: 'Лёгкие доспехи',
        weapons: 'Простое оружие, ручные арбалеты, рапиры, короткие мечи',
        tools: 'Воровские инструменты',
        savingThrows: 'Ловкость, Интеллект',
        skills:
          'Выберите четыре из: Акробатика, Скрытность, Восприятие, Воровство, Обман, Убеждение',
      },
      hitPoints: {
        hitDie: '1d8 за уровень плута',
        firstLevel: '8 + модификатор Телосложения',
        higherLevels:
          '1d8 (или 5) + модификатор Телосложения за каждый уровень плута после первого',
      },
      equipment: [
        'Рапира',
        'Короткий лук и 20 стрел',
        'Кожаные доспехи',
        'Воровские инструменты',
      ],
      image: 'rogue.jpg',
      color: 'gray',
      icon: '🗡️',
      source: 'Базовые',
      sourceCode: 'PHB',
    },
  ];

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilters[cls.source];
    const matchesHitDie = hitDieFilters[cls.hitDie];
    return matchesSearch && matchesSource && matchesHitDie;
  });

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
    alert(
      `🎲 Создан новый персонаж!\n\n${newCharacter.name}\n${newCharacter.class} ${newCharacter.level} уровня`,
    );
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
              placeholder="Поиск..."
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
              Назад
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

            <button
              onClick={() => quickStartCharacter(selectedClassForDetail!)}
              className="btn"
            >
              Создать персонажа
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesComponent;
