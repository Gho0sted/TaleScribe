import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface Track {
  id: string;
  name: string;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface AudioState {
  playlists: Playlist[];
  activePlaylistId: string;
  currentTrackIndex: number;
  volume: number;
  isPlaying: boolean;
  setActivePlaylist: (id: string) => void;
  setCurrentTrackIndex: (idx: number) => void;
  setVolume: (v: number) => void;
  setIsPlaying: (p: boolean) => void;
  addPlaylist: (pl: Playlist) => void;
  setPlaylists: (pls: Playlist[]) => void;
}

const defaultPlaylists: Playlist[] = [
  {
    id: 'city',
    name: 'Город',
    tracks: [
      {
        id: 'city1',
        name: 'City Ambience',
        url: '/audio/city.mp3',
      },
    ],
  },
  {
    id: 'dungeon',
    name: 'Подземелье',
    tracks: [
      {
        id: 'dungeon1',
        name: 'Dungeon Ambience',
        url: '/audio/dungeon.mp3',
      },
    ],
  },
  {
    id: 'battle',
    name: 'Битва',
    tracks: [
      {
        id: 'battle1',
        name: 'Battle',
        url: '/audio/battle.mp3',
      },
    ],
  },
];

export const useAudioStore = create<AudioState>(
  persist(
    (set) => ({
      playlists: defaultPlaylists,
      activePlaylistId: defaultPlaylists[0].id,
      currentTrackIndex: 0,
      volume: 0.5,
      isPlaying: false,
      setActivePlaylist: (id) =>
        set({ activePlaylistId: id, currentTrackIndex: 0 }),
      setCurrentTrackIndex: (idx) => set({ currentTrackIndex: idx }),
      setVolume: (v) => set({ volume: v }),
      setIsPlaying: (p) => set({ isPlaying: p }),
      addPlaylist: (pl) =>
        set((state) => ({ playlists: [...state.playlists, pl] })),
      setPlaylists: (pls) => set({ playlists: pls }),
    }),
    { name: 'audio-store' },
  ),
);
