self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
