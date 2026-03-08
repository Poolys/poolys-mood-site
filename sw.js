// Service Worker per PWA – Pooly's Mood
const CACHE_NAME = 'poolys-mood-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/catalogo.html',
  '/css/style.css',
  '/css/catalogo.css',
  '/js/main.js',
  '/js/catalogo.js',
  '/js/translations.js',
  '/js/accept.js',
  '/js/modals.js',
  '/manifest.json',
  '/assets/img/logo.jpg',
  '/assets/img/hero/donna.jpg'
];

// Installa il service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache).catch(err => {
          console.warn('Non tutti i file sono stati cachati:', err);
        });
      })
  );
});

// Attiva il service worker e pulizia cache vecchia
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Strategie di fetch: cache first per asset, network first per API
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Non cachare richieste non-GET
  if (request.method !== 'GET') {
    return;
  }

  // API calls – network first
  if (url.pathname.includes('/api/') || url.pathname.includes('/Pooly-AI/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
  } 
  // Asset statici – cache first
  else if (request.destination === 'image' || 
           request.destination === 'style' || 
           request.destination === 'script') {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request))
        .catch(() => new Response('Asset non disponibile', { status: 404 }))
    );
  }
  // HTML e altro – network first con cache fallback
  else {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
