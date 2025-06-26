import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  Character,
  Spell,
  BestiaryCreature,
  Item,
  Campaign,
  Edition,
  User,
} from '../types';
import { DataManager } from '../utils/DataManager';
import { DataInitializer } from '../utils/DataInitializer';

interface TalescribeContextType {
  user: User;
  selectedEdition: Edition;
  setSelectedEdition: (edition: Edition) => void;
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  spells: Spell[];
  setSpells: (spells: Spell[]) => void;
  bestiary: BestiaryCreature[];
  setBestiary: (bestiary: BestiaryCreature[]) => void;
  items: Item[];
  setItems: (items: Item[]) => void;
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  deleteCharacter: (id: string) => void;
  saveData: () => Promise<void>;
  loadData: () => Promise<void>;
  clearAllData: () => void;
}

const TalescribeContext = createContext<TalescribeContextType | undefined>(
  undefined
);

export const useTalescribe = () => {
  const context = useContext(TalescribeContext);
  if (!context) {
    throw new Error('useTalescribe must be used within a TalescribeProvider');
  }
  return context;
};

interface TalescribeProviderProps {
  children: ReactNode;
}

export const TalescribeProvider: React.FC<TalescribeProviderProps> = ({
  children,
}) => {
  const [user] = useState<User>({
    id: 'user_1',
    name: 'Edward Petrakov',
    color: '#BD54C6',
  });

  const [selectedEdition, setSelectedEdition] = useState<Edition>('5e');
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('dark');

  const [characters, setCharacters] = useState<Character[]>([]);
  const [spells, setSpells] = useState<Spell[]>([]);
  const [bestiary, setBestiary] = useState<BestiaryCreature[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const dataManager = new DataManager();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (characters.length === 0) {
      setCharacters(DataInitializer.getInitialCharacters(selectedEdition));
    }
    if (spells.length === 0) {
      setSpells(DataInitializer.getInitialSpells(selectedEdition));
    }
    if (bestiary.length === 0) {
      setBestiary(DataInitializer.getInitialBestiary(selectedEdition));
    }
    if (items.length === 0) {
      setItems(DataInitializer.getInitialItems(selectedEdition));
    }
  }, [selectedEdition]);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applyAutoTheme = () => {
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      };

      applyAutoTheme();
      mediaQuery.addEventListener('change', applyAutoTheme);

      return () => mediaQuery.removeEventListener('change', applyAutoTheme);
    } else if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const updateCharacter = (id: string, updates: Partial<Character>) => {
    setCharacters((prev) =>
      prev.map((char) => (char.id === id ? { ...char, ...updates } : char))
    );
  };

  const deleteCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id));
  };

  const saveData = async () => {
    const data = {
      selectedEdition,
      theme,
      characters,
      spells,
      bestiary,
      items,
      campaigns,
    };
    await dataManager.saveData('talescribe_data', data);
  };

  const loadData = async () => {
    const data = await dataManager.loadData<{
      selectedEdition: Edition;
      theme: 'light' | 'dark' | 'auto';
      characters: Character[];
      spells: Spell[];
      bestiary: BestiaryCreature[];
      items: Item[];
      campaigns: Campaign[];
    }>('talescribe_data');
    if (data) {
      if (data.selectedEdition) setSelectedEdition(data.selectedEdition);
      if (data.theme) setTheme(data.theme);
      if (data.characters) setCharacters(data.characters);
      if (data.spells) setSpells(data.spells);
      if (data.bestiary) setBestiary(data.bestiary);
      if (data.items) setItems(data.items);
      if (data.campaigns) setCampaigns(data.campaigns);
    }
  };

  const clearAllData = () => {
    setCharacters([]);
    setSpells([]);
    setBestiary([]);
    setItems([]);
    setCampaigns([]);
    localStorage.clear();
  };

  const value: TalescribeContextType = {
    user,
    selectedEdition,
    setSelectedEdition,
    theme,
    setTheme,
    characters,
    setCharacters,
    spells,
    setSpells,
    bestiary,
    setBestiary,
    items,
    setItems,
    campaigns,
    setCampaigns,
    updateCharacter,
    deleteCharacter,
    saveData,
    loadData,
    clearAllData,
  };

  return (
    <TalescribeContext.Provider value={value}>
      {children}
    </TalescribeContext.Provider>
  );
};
