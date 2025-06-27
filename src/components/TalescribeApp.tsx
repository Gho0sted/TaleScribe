import React, { useState, Suspense } from 'react';
import {
  IconMenu,
  IconSearch,
  IconBell,
  IconAlertTriangle,
} from '../constants/icons';
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useTalescribe } from '../contexts/TalescribeContext';
import { NAVIGATION } from '../constants';
import { ROUTES } from '../constants/routes';
import EditionSelector from './ui/EditionSelector';
import LanguageSwitcher from './layout/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { usePWA } from '../hooks/usePWA';
const DiceRollerPage = React.lazy(() => import('./pages/DiceRollerPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const CharactersPage = React.lazy(() => import('./pages/CharactersPage'));
const QuestsPage = React.lazy(() => import('./pages/QuestsPage'));
const CampaignsPage = React.lazy(() => import('./pages/CampaignsPage'));
const CombatTrackerPage = React.lazy(() => import('./pages/CombatTrackerPage'));
const ContentGeneratorsPage = React.lazy(
  () => import('./pages/ContentGeneratorsPage'),
);
const DataManagerPage = React.lazy(() => import('./pages/DataManagerPage'));
const TalentsPage = React.lazy(() => import('./pages/TalentsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ClassesPage = React.lazy(() => import('../pages/ClassesPage'));
const RacesPage = React.lazy(() => import('../pages/RacesPage'));
const TraitsPage = React.lazy(() => import('../pages/TraitsPage'));
const ClassFeaturesPage = React.lazy(() => import('../pages/ClassFeaturesPage'));
const BackgroundsPage = React.lazy(() => import('../pages/BackgroundsPage'));
const SpellsPage = React.lazy(() => import('../pages/SpellsPage'));
const WeaponsPage = React.lazy(() => import('../pages/WeaponsPage'));
const ArmorPage = React.lazy(() => import('../pages/ArmorPage'));
const EquipmentPage = React.lazy(() => import('../pages/EquipmentPage'));
const MagicItemsPage = React.lazy(() => import('../pages/MagicItemsPage'));
const BestiaryPage = React.lazy(() => import('../pages/BestiaryPage'));
const GlossaryPage = React.lazy(() => import('../pages/GlossaryPage'));
const ToolsPage = React.lazy(() => import('../pages/ToolsPage'));
import { LoadingSpinner } from './ui/LoadingSpinner';

const TalescribeApp: React.FC = () => {
  const { t } = useTranslation();
  const { user, selectedEdition, setSelectedEdition } = useTalescribe();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOffline] = useState(!navigator.onLine);
  const { installPrompt, promptInstall } = usePWA();

  const PATH_MAP: Record<string, string> = {
    dashboard: ROUTES.home,
    characters: ROUTES.characters,
    dice: ROUTES.dice,
    quests: ROUTES.quests,
    content: ROUTES.content,
    'character-generator': ROUTES.generator,
    campaigns: ROUTES.campaignsCalendar,
    battle: ROUTES.combat,
    talents: ROUTES.talents,
    'data-manager': ROUTES.dataManager,
    settings: ROUTES.settings,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg backdrop-blur-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-3 text-gray-400 hover:text-white lg:hidden rounded-xl transition-colors"
            >
              <IconMenu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                onClick={() => {
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
              >
                <div className="text-4xl">🎲</div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">
                    Talescribe
                  </h1>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    D&D Assistant • Advanced Edition
                  </p>
                </div>
              </Link>
              <EditionSelector
                selectedEdition={selectedEdition}
                setSelectedEdition={setSelectedEdition}
              />
            </div>
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={t('header.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-12"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isOffline && (
                <div className="flex items-center text-yellow-400">
                  <IconAlertTriangle className="h-5 w-5 mr-2" />
                  <span className="text-sm hidden sm:block">
                    {t('header.offline')}
                  </span>
                </div>
              )}
              <button className="p-3 text-gray-400 hover:text-white rounded-xl transition-colors">
                <IconBell className="h-5 w-5" />
              </button>
              {installPrompt && (
                <button
                  onClick={promptInstall}
                  className="p-3 text-gray-400 hover:text-white rounded-xl transition-colors"
                >
                  Установить
                </button>
              )}
              <LanguageSwitcher />
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {t('header.gameMaster')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside
          className={`fixed lg:static lg:translate-x-0 z-30 w-72 h-screen bg-gray-800/90 backdrop-blur-md shadow-xl transition-transform duration-300 ease-in-out border-r border-gray-700 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <nav className="p-6 space-y-3 mt-6">
            {NAVIGATION.map((item) => {
              const Icon = item.icon;
              const to = PATH_MAP[item.id] || `/${item.id}`;
              const isActive = location.pathname === to;
              return (
                <Link
                  key={item.id}
                  to={to}
                  onClick={() => {
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all font-medium ${isActive ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white shadow-lg scale-105' : 'text-gray-300 hover:bg-gray-700/50 hover:scale-105'}`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{t(`nav.${item.id}`)}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route
                path="/"
                element={
                  <DashboardPage
                    onNavigate={(page) =>
                      navigate(PATH_MAP[page] || `/${page}`)
                    }
                  />
                }
              />
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/dice" element={<DiceRollerPage />} />
              <Route path="/combat" element={<CombatTrackerPage />} />
              <Route path="/quests" element={<QuestsPage />} />
              <Route path="/content" element={<ContentGeneratorsPage />} />
              <Route path="/talents" element={<TalentsPage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/races" element={<RacesPage />} />
              <Route path="/traits" element={<TraitsPage />} />
              <Route path="/class-features" element={<ClassFeaturesPage />} />
              <Route path="/backgrounds" element={<BackgroundsPage />} />
              <Route path="/spells" element={<SpellsPage />} />
              <Route path="/weapons" element={<WeaponsPage />} />
              <Route path="/armor" element={<ArmorPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/magic-items" element={<MagicItemsPage />} />
              <Route path="/bestiary" element={<BestiaryPage />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/data-manager" element={<DataManagerPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/campaigns/*" element={<CampaignsPage />} />
              <Route
                path="/generator"
                element={<div className="p-8">{t('nav.development')}</div>}
              />
              <Route
                path="*"
                element={<div className="p-8">{t('nav.development')}</div>}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default TalescribeApp;
