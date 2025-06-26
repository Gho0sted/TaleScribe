import { useEffect } from 'react';

export const useKeyboardNavigation = (handlers: Record<string, () => void>) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const handler = handlers[e.key];
      if (handler) handler();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlers]);
};
