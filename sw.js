// ============================================================
// SERVICE WORKER — Aplicaciones Móviles · Cátedra 2025-2026
// ============================================================
// Este archivo está preconfigurado por la cátedra.
// NO es necesario modificarlo para cumplir con la etapa PWA.
// Implementa una estrategia Cache First para los recursos
// estáticos del shell de la aplicación.
// ============================================================

const CACHE_NAME = 'app-shell-v5';
const API_CACHE_NAME = 'api-cache-v1';
const API_ORIGIN = 'https://dummyjson.com';

// Recursos estáticos que se cachean durante la instalación.
// Si tu aplicación tiene archivos adicionales (fuentes locales,
// imágenes propias, etc.), podés agregarlos a esta lista.
const RECURSOS_SHELL = [
  '/feru-store/',
  '/feru-store/index.html',
  '/feru-store/manifest.json',
  '/feru-store/favicon.svg',
  '/feru-store/icons.svg',
  '/feru-store/icons/icon-192.png',
  '/feru-store/icons/icon-512.png',
];

// ── INSTALACIÓN ──────────────────────────────────────────────
// Se ejecuta cuando el Service Worker se registra por primera
// vez o cuando el archivo sw.js cambió. Precachea los recursos
// del shell para habilitar el funcionamiento offline.
self.addEventListener('install', event => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cacheando recursos del shell');
        return cache.addAll(RECURSOS_SHELL);
      })
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVACIÓN ───────────────────────────────────────────────
// Se ejecuta cuando el Service Worker toma el control.
// Elimina cachés de versiones anteriores para liberar espacio.
self.addEventListener('activate', event => {
  console.log('[SW] Activando Service Worker...');
  event.waitUntil(
    caches.keys()
      .then(nombres => {
        return Promise.all(
          nombres
            .filter(nombre => nombre !== CACHE_NAME && nombre !== API_CACHE_NAME)
            .map(nombre => {
              console.log('[SW] Eliminando caché anterior:', nombre);
              return caches.delete(nombre);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ── INTERCEPTACIÓN DE PETICIONES ─────────────────────────────
// Estrategia Cache First para recursos estáticos:
// 1. Busca el recurso en el caché local.
// 2. Si está disponible, lo devuelve directamente (sin red).
// 3. Si no está en caché, lo solicita a la red y lo guarda
//    para futuras peticiones.
//
// Las peticiones a la API siempre van a la red (Network Only)
// para garantizar datos actualizados.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(respuestaRed => {
          if (respuestaRed && respuestaRed.status === 200) {
            const copia = respuestaRed.clone();
            caches.open(CACHE_NAME).then(cache => cache.put('/feru-store/index.html', copia));
          }
          return respuestaRed;
        })
        .catch(() => caches.match('/feru-store/index.html'))
    );
    return;
  }

  if (url.origin === API_ORIGIN && url.pathname.startsWith('/products')) {
    event.respondWith(
      fetch(event.request)
        .then(respuestaRed => {
          if (respuestaRed && respuestaRed.status === 200) {
            const copia = respuestaRed.clone();
            caches.open(API_CACHE_NAME).then(cache => {
              cache.put(event.request, copia);
            });
          }

          return respuestaRed;
        })
        .catch(async () => {
          const respuestaCacheadaExacta = await caches.match(event.request);
          if (respuestaCacheadaExacta) {
            return respuestaCacheadaExacta;
          }

          const respuestaCacheadaRuta = await caches.match(event.request, { ignoreSearch: true });
          if (respuestaCacheadaRuta) {
            return respuestaCacheadaRuta;
          }

          return new Response(
            JSON.stringify({ error: 'Sin conexión. Los datos no están disponibles offline.' }),
            {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
    return;
  }

  if (url.origin !== self.location.origin) {
    if (event.request.destination === 'image') {
      event.respondWith(
        caches.match(event.request)
          .then(respuestaCacheada => {
            if (respuestaCacheada) {
              return respuestaCacheada;
            }

            return fetch(event.request)
              .then(respuestaRed => {
                if (!respuestaRed || respuestaRed.status !== 200) {
                  return respuestaRed;
                }

                const copiaRespuesta = respuestaRed.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, copiaRespuesta);
                });

                return respuestaRed;
              })
              .catch(() => caches.match('/feru-store/icons/icon-192.png'));
          })
      );
    }
    return;
  }

  // Para recursos estáticos own-origin: Cache First
  event.respondWith(
    caches.match(event.request)
      .then(respuestaCacheada => {
        if (respuestaCacheada) {
          return respuestaCacheada;
        }

        // No está en caché: solicitar a la red y guardar
        return fetch(event.request)
          .then(respuestaRed => {
            // Solo cachear respuestas válidas
            if (!respuestaRed || respuestaRed.status !== 200 ||
              respuestaRed.type !== 'basic') {
              return respuestaRed;
            }

            const copiaRespuesta = respuestaRed.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, copiaRespuesta);
            });

            return respuestaRed;
          })
          .catch(() => {
            if (event.request.destination === 'document') {
              return caches.match('/feru-store/index.html');
            }

            return Response.error();
          });
      })
  );
});
