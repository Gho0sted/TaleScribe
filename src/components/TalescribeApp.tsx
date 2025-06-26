import React, { useState, useCallback } from 'react';
import { Menu, Search, Bell, AlertTriangle } from 'lucide-react';
import { useTalescribe } from '../contexts/TalescribeContext';
import { NAVIGATION } from '../constants';
import EditionSelector from './ui/EditionSelector';
import DiceRollerPage from './pages/DiceRollerPage';
import DashboardPage from './pages/DashboardPage';
import CharactersPage from './pages/CharactersPage';

const TalescribeApp: React.FC = () => {
  const { user, selectedEdition, setSelectedEdition } = useTalescribe();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOffline] = useState(!navigator.onLine);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'dice':
        return <DiceRollerPage />;
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'characters':
        return <CharactersPage />;
      default:
        return (
          <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-6">🎲</div>
              <h2 className="text-3xl font-bold text-white mb-4">Страница в разработке</h2>
              <p className="text-gray-400 text-lg">Эта функция скоро будет добавлена!</p>
            </div>
          </div>
        );
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-3 text-gray-400 hover:text-white lg:hidden rounded-xl transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="text-4xl">🎲</div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">Talescribe</h1>
                  <p className="text-xs text-gray-400 hidden sm:block">D&D Assistant • Advanced Edition</p>
                </div>
              </button>
              <EditionSelector selectedEdition={selectedEdition} setSelectedEdition={setSelectedEdition} />
            </div>
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Поиск персонажей, заклинаний, монстров..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-12"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isOffline && (
                <div className="flex items-center text-yellow-400">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span className="text-sm hidden sm:block">Офлайн</span>
                </div>
              )}
              <button className="p-3 text-gray-400 hover:text-white rounded-xl transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">Мастер игры</div>
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
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all font-medium ${isActive ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white shadow-lg transform scale-105' : 'text-gray-300 hover:bg-gray-700/50 hover:transform hover:scale-105'}`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? 'text-white' : ''}`} />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity" onClick={() => setSidebarOpen(false)} />}
        <main className="flex-1">{renderPage()}</main>
      </div>
    </div>
  );
};

export default TalescribeApp;
