// Firebase initialization (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvgRQO9HRbpalmMAhuVBvj4Q6MWOHnj18",
  authDomain: "ai678-ba5c0.firebaseapp.com",
  projectId: "ai678-ba5c0",
  storageBucket: "ai678-ba5c0.firebasestorage.app",
  messagingSenderId: "780221195289",
  appId: "1:780221195289:web:7fe3192f9dcf9723f6f688",
  measurementId: "G-Q56LGQLDE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
try {
  const analytics = getAnalytics(app);
  console.log('Firebase analytics initialized', analytics);
} catch (err) {
  console.warn('Firebase analytics not initialized:', err);
}

// Initialize Firestore
const db = getFirestore(app);

// Helper: add an order document to 'orders' collection
async function addOrder(order) {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...order,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

// Helper: get recent orders
async function getOrders(limit = 50) {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Expose for quick debugging and usage in pages
window.firebaseApp = app;
window.firebaseDb = db;
window.addOrder = addOrder;
window.getOrders = getOrders;

export { app, db, addOrder, getOrders };
