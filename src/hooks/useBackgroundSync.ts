import { useEffect } from 'react';

export const useBackgroundSync = (syncFn: () => Promise<void>) => {
  useEffect(() => {
    const handler = () => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        syncFn().catch(console.error);
      }
    };
    window.addEventListener('sync', handler);
    return () => window.removeEventListener('sync', handler);
  }, [syncFn]);
};
