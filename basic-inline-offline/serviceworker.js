const v = 'v1';

self.addEventListener('install', function(event) {
  console.log(`${v} installing`);
  console.log('SW Installed at', new Date().toLocaleTimeString());
});

self.addEventListener('activate', function(event) {
  console.log(`${v} active`);
  console.log('SW Activated at', new Date().toLocaleTimeString());
});
self.addEventListener('fetch', function(event) {
  // check if the browser thinks it’s offline, you want to check
  // if you’re off line because sometimes the browser is in LiFi
  if (!navigator.onLine) {
    event.respondWith(
      new Response('<h1>Offline :(<br>This is offline content! </h1>', {
        headers: { 'Content-Type': 'text/html' }
      })
    );
  } else {
    console.log(event.request.url);
    event.respondWith(fetch(event.request));
  }
});
