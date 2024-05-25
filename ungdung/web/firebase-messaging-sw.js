importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyC9uaYiB0xSyR6EgkPRAl1Q6ZnNKSX0xTY",
    authDomain: "fast-7d4f4.firebaseapp.com",
    projectId: "fast-7d4f4",
    storageBucket: "fast-7d4f4.appspot.com",
    messagingSenderId: "38142146854",
    appId: "1:38142146854:web:25efa78ac6cd4915f369e7",
    measurementId: "G-35BG39CFJT"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});