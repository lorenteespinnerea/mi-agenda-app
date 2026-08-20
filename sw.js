// Cambiamos el nombre de la caché para forzar la actualización en los dispositivos
const CACHE_NAME = 'agenda-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './image_461b4b.jpg',
  './icon-192.png',
  './icon-512.png'
];

// Evento de instalación: guarda los archivos necesarios en caché
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Obliga al nuevo Service Worker a activarse inmediatamente
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Evento de activación: borra cachés antiguas automáticamente
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepción de red: sirve desde la caché si no hay conexión
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
