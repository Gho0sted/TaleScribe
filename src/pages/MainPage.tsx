import React, { useState } from 'react';
import { useAppTranslation } from '../hooks/useAppTranslation';
import {
  Sparkles,
  Users,
  Package,
  FileText,
  User,
  Scroll,
  Swords,
  Crown,
  Dice6,
  Home,
  BarChart3,
  MessageCircle,
  Share2,
  UserPlus,
  Clock,
  Zap,
  MapPin,
  Database,
  Menu,
  X,
  ChevronDown,
  Globe,
  Search,
  Bell,
  Settings,
  UserCheck,
  BookOpen,
  ShieldCheck,
  Gem,
  ScrollText,
  Boxes,
  MonitorSpeaker,
  Building2,
  Shield,
  Sun,
  Moon,
} from 'lucide-react';

const MainPage: React.FC = () => {
  const { t } = useAppTranslation();
  const [diceResult, setDiceResult] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(t('nav.dashboard'));
  const [currentEdition, setCurrentEdition] = useState('D&D 5e');
  const [currentLanguage, setCurrentLanguage] = useState('RU');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const isAdmin = true;

  const themeColors = isDarkTheme
    ? {
        bg: 'from-slate-950 via-slate-900 to-slate-950',
        sidebarBg: 'bg-slate-900/99',
        headerBg: 'bg-slate-900/98',
        cardBg: 'bg-slate-800/80',
        cardBgHover: 'hover:bg-slate-800/95',
        border: 'border-slate-700/70',
        text: 'text-white',
        textSecondary: 'text-slate-300',
        hover: 'hover:bg-slate-800/80',
        iconBg: 'bg-slate-700/90',
        iconBgActive: 'bg-white/25',
      }
    : {
        bg: 'from-orange-50 via-amber-50 to-red-50',
        sidebarBg: 'bg-amber-50/99',
        headerBg: 'bg-amber-50/98',
        cardBg: 'bg-white/90',
        cardBgHover: 'hover:bg-white/98',
        border: 'border-amber-400/70',
        text: 'text-slate-900',
        textSecondary: 'text-amber-900',
        hover: 'hover:bg-amber-200/60',
        iconBg: 'bg-amber-200/90',
        iconBgActive: 'bg-amber-400/50',
      };

  const baseMenuItems = [
    { icon: Home, label: t('nav.dashboard'), color: 'bg-gradient-to-r from-blue-600 to-purple-600' },
    { icon: Users, label: t('nav.characters'), color: 'bg-slate-700' },
    { icon: Building2, label: t('pages.campaigns'), color: 'bg-slate-700' },
    { icon: Dice6, label: t('nav.dice'), color: 'bg-slate-700' },
    { icon: Sparkles, label: t('nav.character-generator'), color: 'bg-slate-700' },
    { icon: Crown, label: t('pages.classes'), color: 'bg-slate-700' },
    { icon: UserCheck, label: t('pages.races'), color: 'bg-slate-700' },
    { icon: Zap, label: t('pages.traits'), color: 'bg-slate-700' },
    { icon: BookOpen, label: t('pages.backgrounds'), color: 'bg-slate-700' },
    { icon: ScrollText, label: t('nav.spells'), color: 'bg-slate-700' },
    { icon: Boxes, label: t('pages.equipment'), color: 'bg-slate-700' },
    { icon: Swords, label: t('pages.bestiary'), color: 'bg-slate-700' },
    { icon: MonitorSpeaker, label: t('pages.tools'), color: 'bg-slate-700' },
    { icon: Settings, label: t('nav.settings'), color: 'bg-slate-700' },
  ];

  const adminMenuItems = [
    { icon: Shield, label: t('pages.admin'), color: 'bg-slate-700', isAdmin: true },
  ];

  const menuItems = [...baseMenuItems, ...(isAdmin ? adminMenuItems : [])];

  const editions = ['D&D 5e', 'D&D 3.5e', 'Pathfinder', 'Pathfinder 2e'];

  const mainFeatures = [
    {
      title: t('dashboard.characterGenerator'),
      subtitle: t('dashboard.characterGeneratorDesc'),
      icon: Sparkles,
      gradient: 'from-red-500 via-orange-600 to-amber-500',
      iconBg: isDarkTheme ? 'bg-red-500/20' : 'bg-red-100',
      iconColor: isDarkTheme ? 'text-red-400' : 'text-red-600',
      action: () => console.log('Генератор персонажей'),
    },
    {
      title: t('dashboard.characters'),
      subtitle: t('dashboard.charactersDesc'),
      icon: Users,
      gradient: 'from-amber-500 via-orange-600 to-red-600',
      iconBg: isDarkTheme ? 'bg-amber-500/20' : 'bg-amber-100',
      iconColor: isDarkTheme ? 'text-amber-400' : 'text-amber-600',
      action: () => console.log('Персонажи'),
    },
    {
      title: t('pages.bestiary'),
      subtitle: t('dashboard.bestiaryDesc'),
      icon: Swords,
      gradient: 'from-orange-500 via-red-600 to-rose-600',
      iconBg: isDarkTheme ? 'bg-orange-500/20' : 'bg-orange-100',
      iconColor: isDarkTheme ? 'text-orange-400' : 'text-orange-600',
      action: () => console.log('Бестиарий'),
    },
    {
      title: t('pages.magicItems'),
      subtitle: t('dashboard.itemsDesc'),
      icon: Gem,
      gradient: 'from-yellow-500 via-amber-600 to-orange-600',
      iconBg: isDarkTheme ? 'bg-yellow-500/20' : 'bg-yellow-100',
      iconColor: isDarkTheme ? 'text-yellow-400' : 'text-yellow-600',
      action: () => console.log('Предметы'),
    },
  ];

  const stats = [
    {
      label: t('nav.characters'),
      count: 0,
      icon: Users,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      subtext: t('dashboard.inDatabase'),
    },
    {
      label: t('nav.spells'),
      count: 0,
      icon: ScrollText,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      subtext: t('dashboard.inLibrary'),
    },
    {
      label: t('pages.bestiary'),
      count: 0,
      icon: Swords,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      subtext: t('dashboard.creatures'),
    },
    {
      label: t('pages.magicItems'),
      count: 0,
      icon: Gem,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      subtext: t('dashboard.inArsenal'),
    },
  ];

  const quickDice = [
    { sides: 4, color: 'from-red-500 to-rose-600', name: 'd4' },
    { sides: 6, color: 'from-orange-500 to-amber-600', name: 'd6' },
    { sides: 8, color: 'from-yellow-500 to-orange-600', name: 'd8' },
    { sides: 10, color: 'from-emerald-500 to-green-600', name: 'd10' },
    { sides: 12, color: 'from-blue-500 to-cyan-600', name: 'd12' },
    { sides: 20, color: 'from-purple-500 to-violet-600', name: 'd20' },
    { sides: 100, color: 'from-pink-500 to-rose-600', name: 'd100' },
    { sides: '%', color: 'from-slate-600 to-gray-700', name: 'd%' },
  ];

  const rollDice = (sides: number | '%') => {
    if (sides === '%') {
      const result = Math.floor(Math.random() * 100) + 1;
      setDiceResult(`d% = ${result}`);
    } else {
      const result = Math.floor(Math.random() * (sides as number)) + 1;
      setDiceResult(`d${sides} = ${result}`);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors.bg} ${themeColors.text} flex transition-all duration-300`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 ${themeColors.sidebarBg} backdrop-blur-xl border-r ${themeColors.border} transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        {/* Logo Section */}
        <div className={`flex items-center justify-center p-4 border-b ${themeColors.border}`}>
          <button
            onClick={() => {
              setActiveMenuItem('Главная');
              setSidebarOpen(false);
            }}
            className="flex items-center justify-center hover:opacity-80 transition-all duration-200 group w-full"
          >
            <svg
              viewBox="0 0 220 50"
              className="h-20 w-full max-w-[240px] group-hover:scale-105 transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="diceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
                  <stop offset="30%" style={{ stopColor: '#7C2D12', stopOpacity: 1 }} />
                  <stop offset="70%" style={{ stopColor: '#B45309', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#B45309', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#7C2D12', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#B45309', stopOpacity: 1 }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="dropShadow">
                  <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Magical Book Base */}
              <rect x="2" y="5" width="40" height="40" rx="5" fill="url(#bookGradient)" filter="url(#dropShadow)" />

              {/* Book Spine Details */}
              <rect x="2" y="5" width="8" height="40" rx="5" fill="#7C2D12" />
              <rect x="4" y="10" width="3" height="7" rx="1.5" fill="#FBBF24" opacity="0.9" />
              <rect x="4" y="20" width="3" height="7" rx="1.5" fill="#FBBF24" opacity="0.9" />
              <rect x="4" y="30" width="3" height="7" rx="1.5" fill="#FBBF24" opacity="0.9" />

              {/* D20 Dice on Book */}
              <g transform="translate(18,15)">
                <polygon points="10,3 17,10 10,17 3,10" fill="url(#diceGradient)" filter="url(#glow)" stroke="#FBBF24" strokeWidth="0.8" />
                <text x="10" y="12" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="white" filter="url(#dropShadow)">
                  20
                </text>
              </g>

              {/* Magical Sparkles */}
              <circle cx="35" cy="10" r="2" fill="#FBBF24" opacity="0.9">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="38" cy="15" r="1.5" fill="#DC2626" opacity="0.8">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="40" r="1.8" fill="#B45309" opacity="0.7">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
              </circle>

              {/* Quill Pen */}
              <g transform="translate(28,10)">
                <path d="M0,0 L10,15 L8,17 L-2,2 Z" fill="#7C2D12" opacity="0.9" />
                <path d="M10,15 L13,12 L15,15 L13,18 Z" fill="#FBBF24" />
              </g>

              {/* Text */}
              <text x="50" y="30" fontFamily="Cinzel, serif" fontSize="22" fontWeight="900" fill="url(#textGradient)" filter="url(#dropShadow)">
                Talescribe
              </text>

              {/* Subtitle */}
              <text x="50" y="40" fontFamily="serif" fontSize="10" fontWeight="500" fill="#B45309" opacity="0.9">
                D&D Chronicles
              </text>
            </svg>
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden p-2 rounded-lg ${themeColors.textSecondary} ${isDarkTheme ? 'hover:text-white hover:bg-slate-800/50' : 'hover:text-slate-900 hover:bg-amber-200/50'} transition-all`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = item.label === activeMenuItem;
            const isAdminItem = item.isAdmin;
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveMenuItem(item.label);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 py-3 rounded-xl text-left transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? isAdminItem
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30'
                      : 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-500/30'
                    : isDarkTheme
                    ? 'text-slate-200 hover:bg-slate-800/60 hover:text-white'
                    : 'text-amber-900 hover:bg-amber-200/60 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <div className={`absolute inset-0 rounded-xl ${
                    isAdminItem
                      ? 'bg-gradient-to-r from-red-400/20 to-orange-400/20'
                      : 'bg-gradient-to-r from-red-400/20 to-amber-400/20'
                  }`}></div>
                )}
                <div
                  className={`p-2 rounded-lg mr-3 transition-all duration-200 relative z-10 border ${
                    isActive
                      ? themeColors.iconBgActive + ' backdrop-blur border-white/30'
                      :
                          themeColors.iconBg +
                          ' border-slate-600/30 group-hover:' +
                          (isDarkTheme
                            ? 'bg-slate-600/80 border-slate-500/50'
                            : 'bg-amber-300/80 border-amber-400/50')
                  }`}
                >
                  <IconComponent size={18} className={isAdminItem && !isActive ? 'text-red-400' : ''} />
                </div>
                <div className="flex items-center space-x-2 relative z-10 flex-1 min-w-0">
                  <span className="text-sm font-medium truncate">{item.label}</span>
                  {isAdminItem && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={`${themeColors.headerBg} backdrop-blur-xl border-b ${themeColors.border} px-4 lg:px-6 py-4 sticky top-0 z-30`}>
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-4 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${themeColors.textSecondary} ${isDarkTheme ? 'hover:text-white hover:bg-slate-800/50' : 'hover:text-slate-900 hover:bg-amber-200/50'} transition-all`}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className={`text-xl lg:text-2xl font-bold truncate ${isDarkTheme ? 'bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent' : 'text-slate-900'}`}>{activeMenuItem}</div>
            </div>
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative group">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeColors.textSecondary} group-focus-within:text-red-400 transition-colors`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск персонажей, заклинаний, монстров и многого другого..."
                  className={`w-full ${isDarkTheme ? 'bg-slate-800/90 text-white border-slate-600/60 focus:ring-red-500/60 focus:border-red-500/60 placeholder-slate-300' : 'bg-white/95 text-slate-900 border-amber-400/60 focus:ring-red-500/60 focus:border-red-500/60 placeholder-amber-700'} backdrop-blur-md pl-12 pr-6 py-3 rounded-2xl text-sm border-2 focus:outline-none focus:ring-2 transition-all shadow-lg`}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`p-3 ${isDarkTheme ? 'bg-slate-800/90 hover:bg-slate-700/90' : 'bg-white/95 hover:bg-amber-100/95'} backdrop-blur-md border-2 ${themeColors.border} rounded-xl ${themeColors.textSecondary} ${isDarkTheme ? 'hover:text-white' : 'hover:text-slate-900'} transition-all shadow-xl`}
              >
                {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="relative hidden lg:block">
                <div className={`flex items-center ${isDarkTheme ? 'bg-slate-800/90 hover:bg-slate-700/90' : 'bg-white/95 hover:bg-amber-100/95'} backdrop-blur-md border-2 ${themeColors.border} rounded-xl px-4 py-2.5 text-sm transition-all cursor-pointer group shadow-xl`}>
                  <Dice6 className="w-4 h-4 text-amber-400 mr-3 group-hover:text-amber-300 transition-colors" />
                  <select value={currentEdition} onChange={(e) => setCurrentEdition(e.target.value)} className={`bg-transparent ${themeColors.text} appearance-none cursor-pointer focus:outline-none pr-8`}>
                    {editions.map((edition) => (
                      <option key={edition} value={edition} className={isDarkTheme ? 'bg-slate-800' : 'bg-white'}>
                        {edition}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`w-4 h-4 ${themeColors.textSecondary} ml-2 group-hover:text-slate-300 transition-colors`} />
                </div>
              </div>
              <div className={`flex items-center ${isDarkTheme ? 'bg-slate-800/90' : 'bg-white/95'} backdrop-blur-md border-2 ${themeColors.border} rounded-xl px-4 py-2.5 text-sm shadow-xl`}>
                <Globe className="w-4 h-4 text-red-400 mr-3" />
                <div className="flex items-center space-x-2">
                  <button className={`${themeColors.textSecondary} ${isDarkTheme ? 'hover:text-white' : 'hover:text-slate-900'} transition-colors px-1`}>EN</button>
                  <span className={themeColors.textSecondary}>|</span>
                  <button className={`${themeColors.text} font-medium px-1`}>RU</button>
                </div>
              </div>
              <button className={`relative p-3 ${isDarkTheme ? 'bg-slate-800/90 hover:bg-slate-700/90' : 'bg-white/95 hover:bg-amber-100/95'} backdrop-blur-md border-2 ${themeColors.border} rounded-xl ${themeColors.textSecondary} ${isDarkTheme ? 'hover:text-white' : 'hover:text-slate-900'} transition-all shadow-xl`}>
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              </button>
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center ring-2 ring-slate-700/50 shadow-lg">
                <span className="text-sm font-bold text-white">EP</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeColors.textSecondary}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className={`w-full ${isDarkTheme ? 'bg-slate-800/90 text-white border-slate-600/60 focus:ring-red-500/60 placeholder-slate-300' : 'bg-white/95 text-slate-900 border-amber-400/60 focus:ring-red-500/60 placeholder-amber-700'} backdrop-blur-md pl-10 pr-4 py-2.5 rounded-xl text-sm border-2 focus:outline-none focus:ring-2 transition-all shadow-lg`}
              />
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 lg:px-6 py-8 overflow-y-auto">
          <div className="w-full flex flex-col items-center justify-center mb-12">
            <div className="w-full flex items-center justify-center mb-8 px-4">
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 280 80"
                  className="h-auto max-h-32 sm:max-h-40 md:max-h-48 lg:max-h-56 xl:max-h-64 drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: 'auto', maxWidth: '100%' }}
                >
                  <defs>
                    <linearGradient id="mainDiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
                      <stop offset="30%" style={{ stopColor: '#7C2D12', stopOpacity: 1 }} />
                      <stop offset="70%" style={{ stopColor: '#B45309', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="mainTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#B45309', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="mainBookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#7C2D12', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#B45309', stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="mainGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="mainDropShadow">
                      <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
                    </filter>
                  </defs>

                  <rect x="5" y="15" width="50" height="50" rx="6" fill="url(#mainBookGradient)" filter="url(#mainDropShadow)" />
                  <rect x="5" y="15" width="10" height="50" rx="6" fill="#7C2D12" />
                  <rect x="7" y="20" width="3" height="8" rx="1.5" fill="#FBBF24" opacity="0.9" />
                  <rect x="7" y="32" width="3" height="8" rx="1.5" fill="#FBBF24" opacity="0.9" />
                  <rect x="7" y="44" width="3" height="8" rx="1.5" fill="#FBBF24" opacity="0.9" />
                  <rect x="7" y="56" width="3" height="6" rx="1.5" fill="#FBBF24" opacity="0.9" />

                  <g transform="translate(25,30)">
                    <polygon points="15,5 25,15 15,25 5,15" fill="url(#mainDiceGradient)" filter="url(#mainGlow)" stroke="#FBBF24" strokeWidth="1" />
                    <text x="15" y="18" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="bold" fill="white" filter="url(#mainDropShadow)">
                      20
                    </text>
                  </g>

                  <g>
                    <circle cx="45" cy="20" r="2" fill="#FBBF24" opacity="0.9">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="25" r="1.5" fill="#DC2626" opacity="0.8">
                      <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="52" cy="55" r="2.2" fill="#B45309" opacity="0.7">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" />
                      <animate attributeName="r" values="1.8;2.5;1.8" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="15" cy="25" r="1.3" fill="#FBBF24" opacity="0.6">
                      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  <g transform="translate(35,18)">
                    <path d="M0,0 L12,20 L9,22 L-3,2 Z" fill="#7C2D12" opacity="0.9" />
                    <path d="M12,20 L16,16 L18,20 L16,24 Z" fill="#FBBF24" filter="url(#mainGlow)" />
                    <path d="M15,18 L17,18 M15,20 L17,20" stroke="#B45309" strokeWidth="0.5" />
                  </g>

                  <text x="70" y="45" fontFamily="Cinzel, serif" fontSize="28" fontWeight="900" fill="url(#mainTextGradient)" filter="url(#mainDropShadow)">
                    Talescribe
                  </text>

                  <text x="70" y="58" fontFamily="serif" fontSize="12" fontWeight="500" fill="#B45309" opacity="0.9">
                    Chronicles & Adventures
                  </text>
                </svg>
              </div>
            </div>
            <div className="w-full flex justify-center mb-8">
              <h1 className="text-4xl lg:text-7xl font-bold text-center max-w-6xl">
                  <span className="bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                    {t('dashboard.welcome')}
                  </span>
                </h1>
              </div>
              <div className="w-full flex items-center justify-center px-4">
                <p className={`${themeColors.textSecondary} text-base sm:text-lg md:text-xl max-w-5xl text-center leading-relaxed`}>
                  {t('dashboard.tagline')}
                </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <button
                  key={index}
                  onClick={feature.action}
                  className={`relative bg-gradient-to-br ${feature.gradient} p-8 rounded-3xl text-white hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-2xl hover:shadow-3xl group overflow-hidden border border-white/10`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                  <div className={`w-16 h-16 ${feature.iconBg} border border-white/20 rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-xl backdrop-blur-sm`}>
                    <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-sm opacity-90 relative z-10 leading-relaxed">{feature.subtitle}</p>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`${themeColors.cardBg} backdrop-blur-md border-2 ${stat.borderColor} rounded-2xl p-6 ${themeColors.cardBgHover} transition-all duration-300 group shadow-2xl`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 ${stat.bgColor} border-2 ${isDarkTheme ? 'border-slate-600/40' : 'border-amber-300/40'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                      <IconComponent className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-3xl font-bold ${themeColors.text} mb-1`}>{stat.count}</div>
                      <div className={`text-sm ${isDarkTheme ? 'text-slate-100' : 'text-slate-900'} font-medium truncate`}>{stat.label}</div>
                      <div className={`text-xs ${themeColors.textSecondary}`}>{stat.subtext}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`${themeColors.cardBg} backdrop-blur-md border ${themeColors.border} rounded-3xl p-8 shadow-xl`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500/20 border border-red-500/20 rounded-2xl flex items-center justify-center shadow-lg">
                  <Dice6 className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${themeColors.text}`}>Быстрые броски</h2>
                  <p className={`${themeColors.textSecondary} text-sm`}>Бросайте кости одним кликом</p>
                </div>
              </div>
              {diceResult && (
                <div className="bg-gradient-to-r from-red-500/30 to-amber-500/30 backdrop-blur-md border border-red-500/40 px-6 py-3 rounded-2xl shadow-lg">
                  <span className="text-xl font-mono font-bold text-red-400">{diceResult}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
              {quickDice.map((dice, index) => (
                <button
                  key={index}
                  onClick={() => rollDice(dice.sides)}
                  className={`relative bg-gradient-to-br ${dice.color} p-6 rounded-2xl text-white font-bold hover:scale-110 active:scale-95 transform transition-all duration-200 shadow-xl hover:shadow-2xl group overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <Dice6 className="w-8 h-8 mx-auto mb-3 relative z-10" />
                  <div className="text-sm font-bold relative z-10">{dice.name}</div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
