import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/classes', label: 'Классы' },
  { path: '/races', label: 'Расы и происхождения' },
  { path: '/traits', label: 'Черты' },
  { path: '/class-features', label: 'Особенности классов' },
  { path: '/backgrounds', label: 'Предыстории' },
  { path: '/spells', label: 'Заклинания' },
  { path: '/weapons', label: 'Оружие' },
  { path: '/armor', label: 'Доспехи' },
  { path: '/equipment', label: 'Снаряжение' },
  { path: '/magic-items', label: 'Магические предметы' },
  { path: '/bestiary', label: 'Бестиарий' },
  { path: '/glossary', label: 'Глоссарий' },
  { path: '/tools', label: 'Инструменты' },
];

const TabNavigationComponent: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-wrap gap-2 mb-4">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors ${location.pathname === tab.path ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
};

const TabNavigation = React.memo(TabNavigationComponent);

export default TabNavigation;
