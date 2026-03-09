const CACHE_VERSION = 'rspaa-portfolio-v2';
const RUNTIME_CACHE = 'rspaa-runtime-v2';

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
    '/',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/profile.jpg',
];

// Offline fallback page (served as inline HTML — no extra file needed)
const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RSPAA — Offline</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Space+Grotesk:wght@500;700&display=swap');
  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #050510;
    color: #f0f0ff;
    font-family: 'Outfit', sans-serif;
    overflow: hidden;
  }
  .container {
    text-align: center;
    padding: 2rem;
    max-width: 480px;
    position: relative;
    z-index: 2;
  }
  .offline-icon {
    width: 80px; height: 80px; margin: 0 auto 1.5rem;
    border-radius: 50%;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem;
    animation: breathe 3s ease-in-out infinite;
  }
  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2rem; font-weight: 800;
    background: linear-gradient(135deg, #00f5ff, #8b5cf6, #ff00e5);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.75rem;
  }
  p { color: #a0a0c0; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; }
  .retry-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.75rem 2rem; border-radius: 999px;
    background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3);
    color: #f0f0ff; font-family: 'Outfit', sans-serif; font-weight: 600;
    font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease;
    text-decoration: none;
  }
  .retry-btn:hover {
    background: rgba(139, 92, 246, 0.3);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
    transform: translateY(-2px);
  }
  .bg-glow {
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    filter: blur(80px); opacity: 0.15; pointer-events: none;
  }
  .glow1 { top: -100px; right: -80px; background: #8b5cf6; }
  .glow2 { bottom: -100px; left: -80px; background: #00f5ff; }
  @keyframes breathe {
    0%, 100% { box-shadow: 0 0 15px rgba(139,92,246,0.15); }
    50% { box-shadow: 0 0 30px rgba(139,92,246,0.35); }
  }
</style>
</head>
<body>
  <div class="bg-glow glow1"></div>
  <div class="bg-glow glow2"></div>
  <div class="container">
    <div class="offline-icon">📡</div>
    <h1>You're Offline</h1>
    <p>No internet connection detected. Check your network and try again — my portfolio will be right here waiting!</p>
    <a href="/" class="retry-btn" onclick="location.reload(); return false;">
      ↻ Retry Connection
    </a>
  </div>
</body>
</html>`;

// Install: pre-cache essential assets + offline page
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then(async (cache) => {
            // Cache the offline page
            const offlineResponse = new Response(OFFLINE_HTML, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
            });
            await cache.put('/_offline', offlineResponse);
            // Cache precache assets
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    // Activate immediately
    self.skipWaiting();
});

// Activate: clean up old caches + take control
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_VERSION && name !== RUNTIME_CACHE)
                    .map((name) => caches.delete(name))
            );
        })
    );
    // Take control of all clients immediately
    self.clients.claim();
});

// Fetch: smart strategies per request type
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension and other non-http(s) requests
    if (!request.url.startsWith('http')) return;

    // Navigation requests: network-first with offline fallback
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache successful navigation responses
                    const responseClone = response.clone();
                    caches.open(CACHE_VERSION).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(async () => {
                    // Try cache first, then offline page
                    const cached = await caches.match(request);
                    if (cached) return cached;
                    const offlinePage = await caches.match('/_offline');
                    return offlinePage || new Response('Offline', { status: 503 });
                })
        );
        return;
    }

    // Next.js static assets (_next/static): stale-while-revalidate
    if (request.url.includes('/_next/static/')) {
        event.respondWith(
            caches.match(request).then((cached) => {
                const fetchPromise = fetch(request).then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
                    }
                    return response;
                }).catch(() => cached || new Response('', { status: 408 }));

                return cached || fetchPromise;
            })
        );
        return;
    }

    // Skip caching _next/data (dynamic server data)
    if (request.url.includes('/_next/data/')) {
        event.respondWith(
            fetch(request).catch(() =>
                new Response(JSON.stringify({ error: 'Offline' }), {
                    status: 503,
                    headers: { 'Content-Type': 'application/json' },
                })
            )
        );
        return;
    }

    // Static assets: cache-first
    if (
        request.url.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff2?|ttf|ico)$/) ||
        request.url.includes('fonts.googleapis.com') ||
        request.url.includes('fonts.gstatic.com')
    ) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;

                return fetch(request).then((response) => {
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(RUNTIME_CACHE).then((cache) => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                }).catch(() => {
                    return new Response('', { status: 408, statusText: 'Offline' });
                });
            })
        );
        return;
    }

    // API requests: network-only (no caching for dynamic data like GitHub/Spotify)
    event.respondWith(
        fetch(request).catch(() => {
            return new Response(JSON.stringify({ error: 'Offline' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
            });
        })
    );
});

// Listen for messages from the app (e.g., skip waiting)
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
