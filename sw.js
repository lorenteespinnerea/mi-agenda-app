const CACHE_NAME = 'agenda-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './image_461b4b.jpg',
  './icon-192.png',
  './icon-512.png'
];

// Instalación: Guarda los archivos en la caché del dispositivo
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepción de red: Carga desde la caché si está disponible sin conexión
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
