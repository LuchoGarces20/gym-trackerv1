const CACHE_NAME = 'gym-progress-v5'; // Subi a versão para forçar atualização inicial
const assets = ['./', './index.html', './app.js', './manifest.json'];

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
    // Nova estratégia: Network First, caindo para Cache. 
    // Assim as atualizações de HTML/JS que você fizer refletirão sempre que houver internet.
    e.respondWith(
        fetch(e.request).then(res => {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
            return res;
        }).catch(() => caches.match(e.request))
    );
});