import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { useAudioStore } from '../stores/useAudioStore';
import { useAppTranslation } from '../hooks/useAppTranslation';

const AudioPlayer: React.FC = () => {
  const {
    playlists,
    activePlaylistId,
    setActivePlaylist,
    currentTrackIndex,
    setCurrentTrackIndex,
    volume,
    setVolume,
    isPlaying,
    setIsPlaying,
  } = useAudioStore();
  const { t } = useAppTranslation();

  const activePlaylist = playlists.find((p) => p.id === activePlaylistId);
  const [howl, setHowl] = useState<Howl | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!activePlaylist || activePlaylist.tracks.length === 0) return;
    const track = activePlaylist.tracks[currentTrackIndex];
    if (howl) {
      howl.unload();
    }
    const sound = new Howl({
      src: [track.url],
      html5: true,
      volume,
      onend: () => {
        const next = (currentTrackIndex + 1) % activePlaylist.tracks.length;
        setCurrentTrackIndex(next);
      },
    });
    setHowl(sound);
    if (isPlaying) {
      sound.play();
    }
  }, [activePlaylistId, currentTrackIndex]);

  useEffect(() => {
    if (howl) {
      howl.volume(volume);
    }
  }, [volume, howl]);

  useEffect(() => {
    if (!howl) return;
    if (isPlaying) {
      howl.play();
    } else {
      howl.pause();
    }
  }, [isPlaying, howl]);

  useEffect(() => {
    let id: number | undefined;
    if (howl && isPlaying) {
      id = window.setInterval(() => {
        setProgress(howl.seek() as number);
      }, 500);
    }
    return () => {
      if (id) clearInterval(id);
    };
  }, [howl, isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = parseFloat(e.target.value);
    if (howl) {
      howl.seek(p);
    }
    setProgress(p);
  };

  const changeTrack = (index: number) => {
    setCurrentTrackIndex(index);
  };

  const savePlaylist = () => {
    if (!activePlaylist) return;
    const newId = `pl_${Date.now()}`;
    useAudioStore.setState((state) => ({
      playlists: [
        ...state.playlists,
        {
          ...activePlaylist,
          id: newId,
          name: `${activePlaylist.name} (копия)`,
        },
      ],
    }));
  };

  if (!activePlaylist) return null;

  const track = activePlaylist.tracks[currentTrackIndex];
  const duration = howl?.duration() || 0;

  return (
    <div className="p-4 bg-gray-800 text-gray-200 space-y-2 rounded-md">
      <div className="flex space-x-2 items-center">
        <button
          onClick={togglePlay}
          className="px-2 py-1 bg-indigo-500 rounded"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <span>{track.name}</span>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={progress}
          onChange={handleSeek}
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
        <select
          value={activePlaylistId}
          onChange={(e) => setActivePlaylist(e.target.value)}
        >
          {playlists.map((pl) => (
            <option key={pl.id} value={pl.id}>
              {pl.name}
            </option>
          ))}
        </select>
        <button
          onClick={savePlaylist}
          className="px-2 py-1 bg-indigo-500 rounded"
        >
          {t('audio.savePlaylist')}
        </button>
      </div>
      <div className="flex space-x-2">
        {activePlaylist.tracks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => changeTrack(i)}
            className={`px-2 py-1 rounded ${i === currentTrackIndex ? 'bg-indigo-600' : 'bg-gray-700'}`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;
