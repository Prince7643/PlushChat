/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDbqEKkHmcSRQZ5AMJE_sxqlzwtm2b-ODE",
  authDomain: "pluschat-3ad26.firebaseapp.com",
  projectId: "pluschat-3ad26",
  messagingSenderId: "88504319625",
  appId: "1:88504319625:web:4bc1f1c2875a3ee16ad058",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
