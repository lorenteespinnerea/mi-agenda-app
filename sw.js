// Nombre de la caché para tu aplicación
const CACHE_NAME = 'agenda-app-v1';

// Archivos básicos a guardar en la caché del dispositivo
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Evento de instalación: guarda los archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos guardados en caché con éxito');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Evento de activación: limpia cachés antiguas si se actualiza la app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Evento fetch: permite que la app funcione o responda peticiones
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
