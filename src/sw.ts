/// <reference lib="webworker" />

declare var sw: ServiceWorkerGlobalScope;
//@ts-ignore
var sw = self;
//@ts-ignore
sw.addEventListener('push', (e: PushEvent) => {
  console.log('from sw');
  sw.registration.showNotification('Somethig is happening', {
    body: 'Buzz! Buzz!',
    icon: '../icon.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'vibration-sample',
    renotify: true,
  });
});

sw.addEventListener('install', (e: any) => {
  //@ts-ignore
  sw.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});
