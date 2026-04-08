import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

const app = hasFirebaseConfig ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;
export const auth = app ? getAuth(app) : null;
export const analyticsPromise = app
  ? isSupported().then((supported) => (supported ? getAnalytics(app) : null)).catch(() => null)
  : Promise.resolve(null);

const authReadyPromise = auth
  ? setPersistence(auth, browserLocalPersistence).catch(() => {
      // If persistence fails, Firebase still works with in-memory session.
    })
  : Promise.resolve();

const mapUser = (user) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName || user.email?.split('@')[0] || 'Guest User',
    isGuest: user.isAnonymous,
  };
};

const ensureConfigured = () => {
  if (!auth) {
    throw new Error('Firebase is not configured. Add VITE_FIREBASE_* values in your .env file.');
  }
};

export const subscribeToAuthChanges = (callback) => {
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => callback(mapUser(user)));
};

export const signInWithEmail = async (email, password) => {
  ensureConfigured();
  await authReadyPromise;
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return mapUser(credential.user);
};

export const signUpWithEmail = async (email, password) => {
  ensureConfigured();
  await authReadyPromise;
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  const displayName = email.split('@')[0];
  await updateProfile(credential.user, { displayName });

  return {
    uid: credential.user.uid,
    email: credential.user.email,
    name: displayName,
    isGuest: false,
  };
};

export const signInAsGuest = async () => {
  ensureConfigured();
  await authReadyPromise;
  const credential = await signInAnonymously(auth);
  return mapUser(credential.user);
};

export const signOutUser = async () => {
  ensureConfigured();
  await signOut(auth);
};
