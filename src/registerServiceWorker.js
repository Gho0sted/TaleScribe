// Регистрация service worker
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((err) => {
        console.log('SW registration failed:', err);
      });
  }
};
