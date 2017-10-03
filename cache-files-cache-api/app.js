// console.log('before service 3');
if ('serviceWorker' in navigator) {
  // register() returns a promise
  navigator.serviceWorker
    .register('serviceworker.js')
    .catch(err => console.error('Theres a problem', err));
}
