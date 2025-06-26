import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const menu = [
  { path: 'users', label: 'Пользователи' },
  { path: 'campaigns', label: 'Кампании' },
  { path: 'sessions', label: 'Сессии' },
  { path: 'logs', label: 'Логи системы' },
  { path: 'flags', label: 'Флаги фич' },
  { path: 'translations', label: 'Настройки перевода' },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-2">
        {menu.map((m) => (
          <Link
            key={m.path}
            to={m.path}
            className={`block px-4 py-2 rounded-lg hover:bg-gray-700 ${
              location.pathname.endsWith(m.path) ? 'bg-gray-700' : ''
            }`}
          >
            {m.label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
