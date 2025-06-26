import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface PluginInfo {
  name: string;
  path: string;
  enabled: boolean;
}

interface PluginState {
  plugins: PluginInfo[];
  togglePlugin: (name: string) => void;
  setPlugins: (plugins: PluginInfo[]) => void;
}

export const usePluginStore = create<PluginState>(
  persist(
    (set, get) => ({
      plugins: [],
      togglePlugin: (name) =>
        set((state) => ({
          plugins: state.plugins.map((p) =>
            p.name === name ? { ...p, enabled: !p.enabled } : p
          ),
        })),
      setPlugins: (plugins) => set({ plugins }),
    }),
    { name: 'plugin-store' }
  )
);
