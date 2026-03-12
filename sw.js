const CACHE_NAME = 'gym-progress-v6'; // Subimos la versión para forzar la actualización de estos cambios
const assets = [
    './', 
    './index.html', 
    './app.js', 
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/chart.js' // OPTIMIZACIÓN: Añadido para que la gráfica cargue sin internet
];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(assets)));
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(
        keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)
    )));
});

self.addEventListener('fetch', e => {
    // OPTIMIZACIÓN: Solo interceptamos peticiones HTTP/HTTPS (evita errores con extensiones del navegador si lo abres en Desktop)
    if (!e.request.url.startsWith('http')) return;

    e.respondWith(
        fetch(e.request).then(res => {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
            return res;
        }).catch(() => caches.match(e.request))
    );
});