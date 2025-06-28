import { useEffect } from 'react';
import { usePluginStore } from '../stores/usePluginStore';

const listeners = new Map<string, (e: MessageEvent) => void>();

const createApi = (name: string) => ({
  addButton: (label: string) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = 'btn';
    document.body.appendChild(btn);
  },
  addCommand: (cmd: { id: string; run: () => void }) => {
    const handler = (e: MessageEvent) => {
      if (e.data === cmd.id) cmd.run();
    };
    listeners.set(`${name}-${cmd.id}`, handler);
    window.addEventListener('message', handler);
  },
});

export const usePluginLoader = () => {
  const { plugins } = usePluginStore();

  useEffect(() => {
    plugins.forEach((p) => {
      const id = `plugin-frame-${p.name}`;
      const existing = document.getElementById(id) as HTMLIFrameElement | null;
      if (p.enabled) {
        if (!existing) {
          const iframe = document.createElement('iframe');
          iframe.id = id;
          iframe.src = `/plugins/${p.path}`;
          iframe.style.display = 'none';
          iframe.setAttribute('sandbox', 'allow-scripts');
          iframe.onload = () => {
            iframe.contentWindow?.postMessage(
              { type: 'init', api: createApi(p.name) },
              '*',
            );
          };
          document.body.appendChild(iframe);
        }
      } else {
        listeners.forEach((handler, key) => {
          if (key.startsWith(p.name + '-')) {
            window.removeEventListener('message', handler);
            listeners.delete(key);
          }
        });
        existing?.remove();
      }
    });
    return () => {
      listeners.forEach((handler, key) => {
        window.removeEventListener('message', handler);
      });
      listeners.clear();
    };
  }, [plugins]);
};
