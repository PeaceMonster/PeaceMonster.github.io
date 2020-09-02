const version = 1;
const cacheName = `test-version-${version}`;

self.addEventListener("install", event => {
    console.log("SW installed");
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll([
                "/index.html",
                "/main.js",
                "style.css"
            ]);
        })
    )
})

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open(cacheName).then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request.url);
            })
        })
    )
})