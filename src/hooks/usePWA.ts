import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

export const usePWA = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setInstallPrompt(null);
    });
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
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
