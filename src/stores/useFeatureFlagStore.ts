import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface FeatureFlags {
  CombatTracker: boolean;
  MapView: boolean;
}

interface FeatureFlagState {
  flags: FeatureFlags;
  toggleFlag: (name: keyof FeatureFlags) => void;
  setFlag: (name: keyof FeatureFlags, value: boolean) => void;
}

export const useFeatureFlagStore = create<FeatureFlagState>(
  persist(
    (set) => ({
      flags: { CombatTracker: false, MapView: false },
      toggleFlag: (name) =>
        set((state) => ({
          flags: { ...state.flags, [name]: !state.flags[name] },
        })),
      setFlag: (name, value) =>
        set((state) => ({
          flags: { ...state.flags, [name]: value },
        })),
    }),
    { name: 'feature-flags' },
  ),
);
