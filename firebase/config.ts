

// FIX: Update Firebase imports to use the v8 namespaced API.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// NOTE: The Firebase configuration is using placeholder values.
// For the authentication to work, you must replace them with your actual
// Firebase project's configuration in your environment variables.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyC123abcDEF456ghiJKL789mnoPQR",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "amaderdhan-demo.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "amaderdhan-demo",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "amaderdhan-demo.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.FIREBASE_APP_ID || "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0",
};


let app: firebase.app.App;

// Initialize Firebase only once to avoid re-initialization errors
// FIX: Update Firebase initialization to use v8 namespaced API.
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// FIX: Update auth retrieval to use v8 namespaced API.
const auth = firebase.auth();

export { app, auth };