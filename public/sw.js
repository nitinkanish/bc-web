// Service Worker for Himachal News PWA

const CACHE_NAME = "himachal-news-v1"
const OFFLINE_URL = "/offline"

// Assets to cache
const ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/logo.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/placeholder.svg",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      }),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  return self.clients.claim()
})

// Fetch event
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL)
      }),
    )
  } else {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((fetchResponse) => {
              // Cache important assets
              if (
                event.request.url.includes("/icons/") ||
                event.request.url.includes("/logo.svg") ||
                event.request.url.includes("/placeholder.svg")
              ) {
                const responseClone = fetchResponse.clone()
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseClone)
                })
              }
              return fetchResponse
            })
          )
        })
        .catch(() => {
          // For image requests, return a placeholder
          if (event.request.destination === "image") {
            return caches.match("/placeholder.svg")
          }
          return null
        }),
    )
  }
})
