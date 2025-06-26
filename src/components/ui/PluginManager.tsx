import React, { useEffect } from 'react';
import { usePluginStore } from '../../stores/usePluginStore';
import { Button } from './Button';

const PluginManager: React.FC = () => {
  const { plugins, togglePlugin, setPlugins } = usePluginStore();

  useEffect(() => {
    fetch('/plugins/manifest.json')
      .then((r) => r.json())
      .then((list: { name: string; path: string }[]) => {
        setPlugins(
          list.map((p) => ({
            ...p,
            enabled: plugins.find((pl) => pl.name === p.name)?.enabled || false,
          }))
        );
      })
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      {plugins.map((p) => (
        <div key={p.name} className="flex items-center justify-between">
          <span>{p.name}</span>
          <Button
            onClick={() => togglePlugin(p.name)}
            className="btn-secondary"
          >
            {p.enabled ? 'Disable' : 'Enable'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PluginManager;
