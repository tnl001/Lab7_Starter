// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';

// Once the service worker has been installed, feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  /**
   * TODO - Part 2 Step 2
   * Create a function as outlined above
   * Works Cited: https://developers.google.com/web/fundamentals/primers/service-workers
   */

   var urlsToCache = [
    '/assets/styles/main.css',
    '/assets/script/main.js'
  ];
   event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll([
          '/',
          '/assets/styles/main.css',
          '/assets/scripts/main.js'
        ]);
      })
  );
});

/**
 * Once the service worker 'activates', this makes it so clients loaded
 * in the same scope do not need to be reloaded before their fetches will
 * go through this service worker
 */
self.addEventListener('activate', function (event) {
  /**
   * TODO - Part 2 Step 3
   * Create a function as outlined above, it should be one line
   * Works Cited: https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll
   */

   event.waitUntil(clients.claim());
});

// Intercept fetch requests and store them in the cache
self.addEventListener('fetch', function (event) {
  /**
   * TODO - Part 2 Step 4
   * Create a function as outlined above
   * Works Cited: https://developers.google.com/web/fundamentals/primers/service-workers#cache_and_return_requests
   */

   event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});