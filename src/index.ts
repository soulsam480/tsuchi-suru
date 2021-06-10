try {
  console.log('script running');

  function notifyCallback() {
    const audio = new Audio('ring.mp3');
    audio.play();
  }

  const handler: ProxyHandler<any> = {
    construct(target, args) {
      notifyCallback();
      return new target(...args);
    },
  };

  const ProxifiedNotification = new Proxy(Notification, handler);

  self.Notification = ProxifiedNotification;

  chrome.notifications.onClosed.addListener((e) => {
    notifyCallback();
  });

  function activateServiceWorker() {
    navigator.serviceWorker
      .register('sw.js', {
        scope: '.',
      })
      .then((reg) => {
        reg.active?.addEventListener('statechange', () => {
          if (!reg.active) activateServiceWorker();
        });
      });
  }
  activateServiceWorker();
} catch (error) {
  console.log(error);
}
