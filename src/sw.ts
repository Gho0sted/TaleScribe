self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil((self as ServiceWorkerGlobalScope).skipWaiting());
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil((self as ServiceWorkerGlobalScope).clients.claim());
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  );
});

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    (self as ServiceWorkerGlobalScope).skipWaiting();
  }
});

export {};
