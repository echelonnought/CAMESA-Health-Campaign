const cacheName = 'camesaCache-v1';
const precacheResources = [
    '/',
    'faq.css',
    'faq.html',
    'faq.js',
    'index.js',
    'index.css',
    'index.html',
    'registration-form.css',
    'registration-form.html',
    'registration-form.js',
    'images/code.jpg',
    'images/med1.jpg',
    'images/med2.jpg',
    'images/med3.jpg',
    'images/med4.jpg'

]

self.addEventListener('install', event => {
    console.log('Service worker installing')
    event.waitUntil(
        caches.open(cacheName)
        .then( cache => {
            return cache.addAll(precacheResources)}
            )
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request))

.then(cachedResponse => {
      return cachedResponse || fetch(event.request)
    })
})