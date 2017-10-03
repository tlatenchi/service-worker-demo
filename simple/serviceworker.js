const v = 'v2';

self.addEventListener('install', function(event) {
  console.log(`${v} installing`);
  console.log('SW Installed at', new Date().toLocaleTimeString());
});

self.addEventListener('activate', function(event) {
  console.log(`${v} active`);
  console.log('SW Activated at', new Date().toLocaleTimeString());
});
self.addEventListener('fetch', function(event) {
  console.log(`${v} fetch`);
  console.log(event.request.url);
  // responding to the fetch event by fetching original request
  // logging all the requests going out to the server
  event.respondWith(fetch(event.request));
});
