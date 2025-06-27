import { useEffect } from 'react';
import { usePluginStore } from '../stores/usePluginStore';

const createApi = () => ({
  addButton: (label: string) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = 'btn';
    document.body.appendChild(btn);
  },
  addCommand: (cmd: { id: string; run: () => void }) => {
    window.addEventListener('message', (e) => {
      if (e.data === cmd.id) {
        cmd.run();
      }
    });
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
              { type: 'init', api: createApi() },
              '*',
            );
          };
          document.body.appendChild(iframe);
        }
      } else {
        existing?.remove();
      }
    });
  }, [plugins]);
};
