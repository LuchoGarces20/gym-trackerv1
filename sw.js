// Nombre de nuestra caché (si actualizas la app en el futuro, cambia a v2, v3, etc.)
const CACHE_NAME = 'gym-progress-v1';

// Lista de archivos que queremos guardar en el teléfono para uso offline
const urlsToCache = [
    './',
    './index.html',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    'https://cdn.jsdelivr.net/npm/chart.js' // También guardamos la librería de gráficos
];

// FASE 1: Instalación
// Se ejecuta la primera vez que el usuario abre la página. Descarga todo.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos guardados en caché correctamente');
                return cache.addAll(urlsToCache);
            })
    );
});

// FASE 2: Activación
// Se ejecuta cuando el Service Worker toma el control. Sirve para borrar cachés viejas si cambiamos a 'gym-progress-v2'.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// FASE 3: Intercepción de peticiones (Fetch)
// Cada vez que la app pide un archivo (HTML, JS, una imagen), pasamos por aquí.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el archivo está en la caché del teléfono, lo devolvemos inmediatamente.
                if (response) {
                    return response;
                }
                // Si no está, lo vamos a buscar a internet de forma normal.
                return fetch(event.request);
            })
    );
});