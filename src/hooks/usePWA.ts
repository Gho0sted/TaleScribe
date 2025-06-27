import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';
import { BeforeInstallPromptEvent } from '../types/pwa';

export const usePWA = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    const appInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', appInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', appInstalled);
    };
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      const wb = new Workbox('/sw.js');
      wb.addEventListener('waiting', () => {
        if (window.confirm('Доступна новая версия, перезагрузить?')) {
          wb.addEventListener('controlling', () => window.location.reload());
          wb.messageSW({ type: 'SKIP_WAITING' });
        }
      });
      wb.register();
    }
  }, []);

  const promptInstall = () => {
    installPrompt?.prompt();
  };

  return { installPrompt, promptInstall, installed };
};
