window.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'init') {
    const api = e.data.api;
    api.addCommand({ id: 'hello', run: () => alert('Hello from plugin!') });
  }
});

window.parent.postMessage({ type: 'ready' }, '*');
