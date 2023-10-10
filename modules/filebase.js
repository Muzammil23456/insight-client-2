// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
