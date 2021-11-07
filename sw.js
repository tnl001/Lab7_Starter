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
  
  // urls to cache
  let urls = [
    'assets/scripts/main.js', 
    'assets/scripts/Router.js',
    'assets/styles/main.css',
    'assets/components/RecipeCard.js',
    'assets/components/RecipeExpand.js',
    'assets/images/icons/0-star.svg',
    'assets/images/icons/1-star.svg',
    'assets/images/icons/2-star.svg',
    'assets/images/icons/3-star.svg',
    'assets/images/icons/4-star.svg',
    'assets/images/icons/5-star.svg',
    'assets/images/icons/arrow-down.png',
    'favicon.ico'
  ];

  // start caching
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Open cache');
      return cache.addAll(urls);
    })
  )
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
  console.log('Activated');
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
        // if a request matches a cached data then return it from cache
        if (response) {
          return response;
        }

        console.log(event.request);

        // otherwise fetch the new data, clone it, and store it to cache
        return fetch(event.request).then(
          function(response) {
            // check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            console.log(response);

            // cloning the response and add it to cache
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          }
        );
      }
    )
  );
});