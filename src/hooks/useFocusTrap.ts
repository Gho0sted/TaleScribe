import { useEffect } from 'react';

export const useFocusTrap = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const focusable = node.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable?.focus();
  }, [ref]);
};
