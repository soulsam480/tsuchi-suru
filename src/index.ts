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

window.Notification = ProxifiedNotification;

self.addEventListener('push', (e) => {
  notifyCallback();
});

chrome.notifications.onClosed.addListener((e) => {
  notifyCallback();
});
