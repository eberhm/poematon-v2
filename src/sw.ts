/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { RangeRequestsPlugin } from 'workbox-range-requests'
import { ExpirationPlugin } from 'workbox-expiration'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

// Audio files: CacheFirst with Range request support for HTMLAudioElement streaming
registerRoute(
  /\.mp3$/,
  new CacheFirst({
    cacheName: 'audio-cache',
    plugins: [
      new RangeRequestsPlugin(),
      new ExpirationPlugin({ maxEntries: 10 }),
    ],
  })
)

// Verse data JSON files
registerRoute(
  /\/data\/.*\.json$/,
  new CacheFirst({
    cacheName: 'data-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 10 })],
  })
)
