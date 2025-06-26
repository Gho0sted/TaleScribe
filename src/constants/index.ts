// Collection of static data used across the application
// Коллекция статических данных, используемых во всем приложении
import {
  IconHome,
  IconUser,
  IconSparkles,
  IconDice6,
  IconScroll,
  IconUsers,
  IconPackage,
  IconShield,
  IconSword,
  IconLightbulb,
  IconSave,
  IconSettings,
} from './icons';
import { 
  DNDEdition,
  NavigationItem,
  SpellSchool,
  CharacterClass,
  Race,
  Skill,
  AbilityScore 
} from '../types';

export const DND_EDITIONS: DNDEdition[] = [
  {
    id: '5e',
    name: 'D&D 5e',
    fullName: 'Dungeons & Dragons 5-я редакция',
    icon: '🐉',
    color: 'red',
    description: 'Современная и доступная редакция D&D'
  },
  {
    id: '3.5e',
    name: 'D&D 3.5e',
    fullName: 'Dungeons & Dragons 3.5 редакция',
    icon: '⚔️',
    color: 'blue',
    description: 'Классическая редакция с глубокой кастомизацией'
  },
  {
    id: 'pathfinder',
    name: 'Pathfinder',
    fullName: 'Pathfinder RPG',
    icon: '🗡️',
    color: 'purple',
    description: 'Эволюция D&D 3.5 с уникальными правилами'
  },
  {
    id: 'pf2e',
    name: 'Pathfinder 2e',
    fullName: 'Pathfinder 2-я редакция',
    icon: '🛡️',
    color: 'green',
    description: 'Современный Pathfinder с тактической глубиной'
  }
];

export const SPELL_SCHOOLS: SpellSchool[] = [
  { id: 'abjuration', name: 'Ограждение', icon: '🛡️', color: 'blue' },
  { id: 'conjuration', name: 'Вызывание', icon: '🌀', color: 'purple' },
  { id: 'divination', name: 'Прорицание', icon: '🔮', color: 'cyan' },
  { id: 'enchantment', name: 'Очарование', icon: '💫', color: 'pink' },
  { id: 'evocation', name: 'Воплощение', icon: '⚡', color: 'red' },
  { id: 'illusion', name: 'Иллюзия', icon: '👁️', color: 'indigo' },
  { id: 'necromancy', name: 'Некромантия', icon: '💀', color: 'gray' },
  { id: 'transmutation', name: 'Преобразование', icon: '🔄', color: 'green' }
];

export const CHARACTER_CLASSES: Record<string, CharacterClass[]> = {
  '5e': [
    { id: 'artificer', name: 'Изобретатель', hitDie: 8, primaryAbility: 'Интеллект', icon: '⚙️', spellcaster: true },
    { id: 'barbarian', name: 'Варвар', hitDie: 12, primaryAbility: 'Сила', icon: '🪓', spellcaster: false },
    { id: 'bard', name: 'Бард', hitDie: 8, primaryAbility: 'Харизма', icon: '🎵', spellcaster: true },
    { id: 'cleric', name: 'Клерик', hitDie: 8, primaryAbility: 'Мудрость', icon: '⛪', spellcaster: true },
    { id: 'druid', name: 'Друид', hitDie: 8, primaryAbility: 'Мудрость', icon: '🌿', spellcaster: true },
    { id: 'fighter', name: 'Воин', hitDie: 10, primaryAbility: 'Сила или Ловкость', icon: '⚔️', spellcaster: false },
    { id: 'monk', name: 'Монах', hitDie: 8, primaryAbility: 'Ловкость и Мудрость', icon: '👊', spellcaster: false },
    { id: 'paladin', name: 'Паладин', hitDie: 10, primaryAbility: 'Сила и Харизма', icon: '🛡️', spellcaster: true },
    { id: 'ranger', name: 'Следопыт', hitDie: 10, primaryAbility: 'Ловкость и Мудрость', icon: '🏹', spellcaster: true },
    { id: 'rogue', name: 'Плут', hitDie: 8, primaryAbility: 'Ловкость', icon: '🗡️', spellcaster: false },
    { id: 'sorcerer', name: 'Чародей', hitDie: 6, primaryAbility: 'Харизма', icon: '🔥', spellcaster: true },
    { id: 'warlock', name: 'Колдун', hitDie: 8, primaryAbility: 'Харизма', icon: '👹', spellcaster: true },
    { id: 'wizard', name: 'Волшебник', hitDie: 6, primaryAbility: 'Интеллект', icon: '📚', spellcaster: true }
  ]
};

export const RACES_DATA: Record<string, Record<string, Race>> = {
  '5e': {
    human: {
      name: 'Человек',
      bonuses: { any: 1 },
      size: 'Medium',
      speed: 30,
      languages: ['Common'],
      description: 'Универсальная раса с бонусом +1 к любой характеристике'
    },
    elf: {
      name: 'Эльф',
      bonuses: { dexterity: 2 },
      size: 'Medium',
      speed: 30,
      languages: ['Common', 'Elvish'],
      description: 'Ловкие и грациозные, +2 к Ловкости'
    },
    dwarf: {
      name: 'Дварф',
      bonuses: { constitution: 2 },
      size: 'Medium',
      speed: 25,
      languages: ['Common', 'Dwarvish'],
      description: 'Выносливые и крепкие, +2 к Телосложению'
    },
    halfling: {
      name: 'Полурослик',
      bonuses: { dexterity: 2 },
      size: 'Small',
      speed: 25,
      languages: ['Common', 'Halfling'],
      description: 'Маленькие и проворные, +2 к Ловкости'
    },
    dragonborn: {
      name: 'Драконорожденный',
      bonuses: { strength: 2, charisma: 1 },
      size: 'Medium',
      speed: 30,
      languages: ['Common', 'Draconic'],
      description: 'Потомки драконов, +2 к Силе, +1 к Харизме'
    }
  }
};

export const ABILITY_SCORES_DATA: AbilityScore[] = [
  { id: 'strength', name: 'Сила', short: 'СИЛ', description: 'Физическая мощь', icon: '💪' },
  { id: 'dexterity', name: 'Ловкость', short: 'ЛОВ', description: 'Проворность и рефлексы', icon: '🤸' },
  { id: 'constitution', name: 'Телосложение', short: 'ТЕЛ', description: 'Здоровье и выносливость', icon: '❤️' },
  { id: 'intelligence', name: 'Интеллект', short: 'ИНТ', description: 'Рассуждение и память', icon: '🧠' },
  { id: 'wisdom', name: 'Мудрость', short: 'МУД', description: 'Восприятие и интуиция', icon: '👁️' },
  { id: 'charisma', name: 'Харизма', short: 'ХАР', description: 'Сила личности', icon: '✨' }
];

export const SKILLS_DATA: Skill[] = [
  { id: 'acrobatics', name: 'Акробатика', ability: 'dexterity', icon: '🤸' },
  { id: 'animalHandling', name: 'Уход за животными', ability: 'wisdom', icon: '🐎' },
  { id: 'arcana', name: 'Магия', ability: 'intelligence', icon: '📜' },
  { id: 'athletics', name: 'Атлетика', ability: 'strength', icon: '💪' },
  { id: 'deception', name: 'Обман', ability: 'charisma', icon: '🎭' },
  { id: 'history', name: 'История', ability: 'intelligence', icon: '📚' },
  { id: 'insight', name: 'Проницательность', ability: 'wisdom', icon: '👁️' },
  { id: 'intimidation', name: 'Запугивание', ability: 'charisma', icon: '😠' },
  { id: 'investigation', name: 'Расследование', ability: 'intelligence', icon: '🔍' },
  { id: 'medicine', name: 'Медицина', ability: 'wisdom', icon: '⚕️' },
  { id: 'nature', name: 'Природа', ability: 'intelligence', icon: '🌲' },
  { id: 'perception', name: 'Восприятие', ability: 'wisdom', icon: '👀' },
  { id: 'performance', name: 'Выступление', ability: 'charisma', icon: '🎪' },
  { id: 'persuasion', name: 'Убеждение', ability: 'charisma', icon: '🗣️' },
  { id: 'religion', name: 'Религия', ability: 'intelligence', icon: '⛪' },
  { id: 'sleightOfHand', name: 'Ловкость рук', ability: 'dexterity', icon: '🪄' },
  { id: 'stealth', name: 'Скрытность', ability: 'dexterity', icon: '👤' },
  { id: 'survival', name: 'Выживание', ability: 'wisdom', icon: '🏕️' }
];

export { CLASS_TALENTS } from './CLASS_TALENTS';

export const NAVIGATION: NavigationItem[] = [
  { id: 'dashboard', name: 'Главная', icon: IconHome, color: 'blue' },
  { id: 'characters', name: 'Персонажи', icon: IconUser, color: 'green' },
  { id: 'character-generator', name: 'Генератор', icon: IconSparkles, color: 'emerald' },
  { id: 'dice', name: 'Кости', icon: IconDice6, color: 'teal' },
  { id: 'spells', name: 'Заклинания', icon: IconScroll, color: 'indigo' },
  { id: 'quests', name: 'Квесты', icon: IconScroll, color: 'pink' },
  { id: 'content', name: 'Контент', icon: IconSparkles, color: 'teal' },
  { id: 'campaigns', name: 'Кампании', icon: IconUsers, color: 'purple' },
  { id: 'items', name: 'Предметы', icon: IconPackage, color: 'amber' },
  { id: 'bestiary', name: 'Бестиарий', icon: IconShield, color: 'red' },
  { id: 'battle', name: 'Бой', icon: IconSword, color: 'orange' },
  { id: 'talents', name: 'Таланты', icon: IconLightbulb, color: 'yellow' },
  { id: 'data-manager', name: 'Данные', icon: IconSave, color: 'cyan' },
  { id: 'settings', name: 'Настройки', icon: IconSettings, color: 'gray' }
];

