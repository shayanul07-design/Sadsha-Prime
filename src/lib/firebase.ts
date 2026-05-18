import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC1SeeT0uuOgCuk-5UtMcUgxOwtKMXYeWI",
  authDomain: "rock-outrider-jtpfc.firebaseapp.com",
  projectId: "rock-outrider-jtpfc",
  storageBucket: "rock-outrider-jtpfc.firebasestorage.app",
  messagingSenderId: "62479955273",
  appId: "1:62479955273:web:9892d70e0187e387f65698"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
