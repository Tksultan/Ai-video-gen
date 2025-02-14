
import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_STORAGE_API_KEY,
  authDomain: "shortbot-954fb.firebaseapp.com",
  projectId: "shortbot-954fb",
  storageBucket: "shortbot-954fb.firebasestorage.app",
  messagingSenderId: "808697927244",
  appId: "1:808697927244:web:02e86fa5b885125e9e46e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);