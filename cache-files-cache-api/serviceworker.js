const version = 'v1';
let countThis = 0;

self.addEventListener('install', function(event) {
  console.log('hit');
  event.waitUntil(
    caches
      .open(version)
      .then(function(cache) {
        return cache.addAll([
          '/cache-files-cache-api/waterfall.jpg',
          '/cache-files-cache-api/offline.html',
          '/cache-files-cache-api/app.js'
        ]);
      })
      .catch(e => {
        console.log(e);
        return new Error(e);
      })
  );
});

self.addEventListener('activate', function(event) {});
self.addEventListener('fetch', function(event) {
  console.log(`***************** START ${countThis} *****************`);
  countThis = countThis + 1;
  //console.log('event', event);
  //console.log('event request', event.request);
  console.log('EVENT URL', event.request.url);

  event.respondWith(
    // first use the match method in cache api to check to see if there's a match
    // for that request.
    // then we'll check to see if there's an actual response from the cache
    caches.match(event.request).then(function(res) {
      console.log('MATCH RES', res.url);
      // if there is a response we'll return it
      if (res) return res;
      // if not we'll check to see if we're online or not. If we're offline,
      // we'll return the HTML file
      console.log('offline', !navigator.onLine);
      if (!navigator.onLine)
        return caches.match(new Request('/cache-files-cache-api/offline.html'));
      // In either of the cases where we get a response from the cache, and
      // we're not sure that we're offline, we'll go ahead and we'll try to use
      // the network, and with that we should be getting all our offline content
      // directly from the cache.
      console.log('Fetch was sent');
      return fetch(event.request);
    })
  );
});
