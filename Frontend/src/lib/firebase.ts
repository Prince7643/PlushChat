// Import the functions you need from the SDKs you need
import { initializeApp ,} from "firebase/app";
import { getMessaging,getToken,onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbqEKkHmcSRQZ5AMJE_sxqlzwtm2b-ODE",
  authDomain: "pluschat-3ad26.firebaseapp.com",
  projectId: "pluschat-3ad26",
  storageBucket: "pluschat-3ad26.firebasestorage.app",
  messagingSenderId: "88504319625",
  appId: "1:88504319625:web:4bc1f1c2875a3ee16ad058",
  measurementId: "G-7FXCC0L8X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging=getMessaging(app)

export const getTokenRequest=async () => {
    try {
        const permission=await Notification.requestPermission();
        if (permission=='granted') {
            const token=await getToken(messaging,{
                vapidKey:import.meta.env.FIREBASE_VAPID_KEY
            })
            console.log("Token FMC:",token)
            return token
        }else{
            console.log("Permission not granted")
        }
    } catch (error) {
        console.error('ERROR geting token:',error)
    }
}


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Firebase message received:", payload);
      resolve(payload);
    });
  });