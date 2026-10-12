
/*
 * SkyCast Service Worker
 * Caches the app shell and same-origin static resources.
 * External APIs, CDN libraries, and map tiles are not cached.
 */

const CACHE_NAME = "skycast-shell-v1";
const APP_SHELL = "./index.html";

// Install the service worker and cache the main HTML page.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(APP_SHELL);
    })
  );

  self.skipWaiting();
});

// Activate the service worker and remove old SkyCast caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName.startsWith("skycast-") &&
              cacheName !== CACHE_NAME
          )
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );

  self.clients.claim();
});

// Handle network requests.
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only handle GET requests.
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Do not cache external requests such as weather APIs,
  // CDN libraries, or OpenStreetMap tiles.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Navigation: try the network first, then use cached HTML offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const responseToCache = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(APP_SHELL, responseToCache);
            });
          }

          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(APP_SHELL);

          return cachedPage || Response.error();
        })
    );

    return;
  }

  // Static same-origin resources: cache first, then network.
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        if (
          response &&
          response.ok &&
          response.type === "basic"
        ) {
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }

        return response;
      });
    })
  );
});
