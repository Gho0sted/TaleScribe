import React, { useState } from 'react';
import ThemeSettings from '../ui/ThemeSettings';
import PluginManager from '../ui/PluginManager';

const SettingsPage: React.FC = () => {
  const [tab, setTab] = useState<'theme' | 'plugins'>('theme');

  return (
    <div className="p-8 text-white space-y-6">
      <div className="space-x-4 mb-4">
        <button
          className={`btn-primary ${tab === 'theme' ? '' : 'opacity-70'}`}
          onClick={() => setTab('theme')}
        >
          Theme
        </button>
        <button
          className={`btn-primary ${tab === 'plugins' ? '' : 'opacity-70'}`}
          onClick={() => setTab('plugins')}
        >
          Plugins
        </button>
      </div>
      {tab === 'theme' && <ThemeSettings />}
      {tab === 'plugins' && <PluginManager />}
    </div>
  );
};

export default SettingsPage;
