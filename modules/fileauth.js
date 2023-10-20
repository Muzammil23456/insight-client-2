import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCLLIlPuWfr6Zq7_jCBkbAe7669KWx8bQg",
    authDomain: "insight-client-be64b.firebaseapp.com",
    projectId: "insight-client-be64b",
    storageBucket: "insight-client-be64b.appspot.com",
    messagingSenderId: "504018548929",
    appId: "1:504018548929:web:771aed39dd4cf5dde0bc40",
    measurementId: "G-79T0MRZG44"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth11 = getAuth(app);
export const auth = getAuth(app);

