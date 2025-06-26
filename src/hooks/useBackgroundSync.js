// Хук для фоновой синхронизации
import { useCallback } from 'react';

export const useBackgroundSync = () => {
  const syncData = useCallback(async () => {
    if (
      'serviceWorker' in navigator &&
      'sync' in window.ServiceWorkerRegistration.prototype
    ) {
      const registration = await navigator.serviceWorker.ready;
      try {
        await registration.sync.register('background-sync');
      } catch (err) {
        console.log('Background sync registration failed:', err);
      }
    }
  }, []);

  return { syncData };
};
