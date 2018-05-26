var filesToCache = ["index.html", "view.html", "style.css", "view.css", "script.js", "view.js", "index.css"];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open("uiCache").then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('fetch', function(e) {
  if (e.request.url.indexOf("data.json") >= 0 || e.request.url.indexOf(new URL(location.href).origin) < 0) {
    console.log('[Service Worker] Fetching data');
    e.respondWith(
      caches.open("musicData").then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    console.log('[Service Worker] Fetching ui');

    // if url is view.html?piece-id return view.html
    var url = new URL(e.request.url);
    if(url.origin === location.origin && url.pathname.endsWith("view.html")) {
      url.search = "";
    }

    /* Get cache or network if not cached */
    e.respondWith(
      caches.open("musicData").then(function(cache) {
        return fetch(url).then(function(response){
          cache.put(url, response.clone());
          return response;
        });
      })
    );
  }
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== "uiCache") {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
